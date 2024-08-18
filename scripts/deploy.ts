import { S3 } from 'aws-sdk';
import * as cliProgress from 'cli-progress';
import { config } from 'dotenv';
import { createReadStream, promises as fs } from 'fs';
import { lookup } from 'mime-types';
import * as path from 'path';
import { chdir, cwd } from 'process';
config({ path: 'env-prod' });

const stage = 'prod';

if (!stage) {
  throw new Error('Stage argument is needed');
}

interface Manifest {
  versions: string[];
}

type Stage = 'prod';

const STAGE_BUCKETS: Record<Stage, string> = {
  prod: 'www.nodrainer.com',
};

const accessKeyId = process.env['AWS_ACCESS_KEY_ID'];
const secretAccessKey = process.env['AWS_SECRET_ACCESS_KEY'];
const s3 = new S3({ accessKeyId, secretAccessKey });
const Bucket = STAGE_BUCKETS[stage];
const BucketBackups = `${Bucket}-backups`;
const MANIFEST_KEY = 'manifest.json';

chdir(path.join(cwd(), 'dist', 'no-drainer', 'browser'));

async function main() {
  const version = await getVersion();
  const manifest = await getManifest();
  await backupPreviousVersion(manifest);
  await uploadDir(path.resolve('.'));
  await updateManifest(version, manifest);

  console.log('Done');
}

main();

async function backupPreviousVersion(manifest: Manifest) {
  console.log('Backing up');

  const previousVersion = manifest.versions[0];

  const listedObjects = await s3.listObjectsV2({ Bucket }).promise();

  if (!listedObjects.Contents?.length) return;

  const promises = listedObjects.Contents.map(({ Key }) => Key)
    .filter(isNotNullish)
    .map((Key) => {
      return moveFileToBackup(Key, previousVersion);
    });

  await Promise.all(promises);

  if (listedObjects.IsTruncated) {
    await backupPreviousVersion(manifest);
  }
}

async function moveFileToBackup(file: string, version: string) {
  if (version) {
    await s3
      .copyObject({
        Bucket: BucketBackups,
        Key: `${version}/${file}`,
        CopySource: `${Bucket}/${file}`,
      })
      .promise();
  }

  await s3
    .deleteObject({
      Bucket,
      Key: file,
    })
    .promise();
}

async function updateManifest(version: string, manifest: Manifest) {
  console.log('Updating manifest...');

  manifest.versions.unshift(version);

  if (manifest.versions.length > 20) {
    const promises = manifest.versions
      .slice(20, manifest.versions.length)
      .map((dir) => {
        return emptyS3Directory(BucketBackups, dir);
      });
    await Promise.all(promises);

    manifest.versions = manifest.versions.splice(0, 20);
  }

  await s3
    .putObject({
      Key: MANIFEST_KEY,
      Bucket: BucketBackups,
      Body: JSON.stringify(manifest, undefined, 2),
    })
    .promise();
}

async function getManifest() {
  try {
    const manifest = await s3
      .getObject({
        Bucket: BucketBackups,
        Key: MANIFEST_KEY,
      })
      .promise();
    if (!manifest.Body) {
      throw new Error('S3 response does not have Body');
    }
    return JSON.parse(manifest.Body.toString('utf-8')) as Manifest;
  } catch (error: any) {
    if (error.code === 'NoSuchKey') {
      return { versions: [] };
    }
    throw error;
  }
}

async function getVersion() {
  interface Version {
    version: string;
  }

  const versionPromise = fs
    .readFile('./version.json')
    .then((contents) => JSON.parse(contents.toString()) as Version);
  const versionJSON = await versionPromise;
  const version = versionJSON.version;
  console.log(`Deploying version: ${version}`);
  return version;
}

async function uploadDir(localPath: string) {
  console.log('Uploading new version');
  // Recursive getFiles from
  // https://stackoverflow.com/a/45130990/831465
  async function getFiles(dir: string): Promise<string | string[]> {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
      })
    );
    return Array.prototype.concat(...files);
  }

  const files = (await getFiles(localPath)) as string[];

  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.rect);
  bar.start(files.length, 0);

  const uploads = files.map((filePath) => {
    const Key = `${path
      .relative(localPath, filePath)
      .split(path.sep)
      .join('/')}`;

    const ContentType = lookup(Key);

    return s3
      .putObject({
        Key,
        Bucket,
        Body: createReadStream(filePath),
        ContentType: ContentType ? ContentType : undefined,
      })
      .promise()
      .then(() => bar.increment());
  });
  return Promise.all(uploads).then(() => bar.stop());
}

async function emptyS3Directory(Bucket: string, dir: string) {
  const listedObjects = await s3
    .listObjectsV2({ Bucket, Prefix: dir })
    .promise();

  if (!listedObjects.Contents?.length) return;

  const deleteParams: S3.DeleteObjectsRequest = {
    Bucket,
    Delete: { Objects: [] },
  };

  listedObjects.Contents.map(({ Key }) => Key)
    .filter(isNotNullish)
    .forEach((Key) => {
      deleteParams.Delete.Objects.push({ Key });
    });

  await s3.deleteObjects(deleteParams).promise();

  if (listedObjects.IsTruncated) {
    await emptyS3Directory(Bucket, dir);
  } else {
    await s3
      .deleteObjects({
        Bucket,
        Delete: {
          Objects: [{ Key: dir }],
        },
      })
      .promise();
  }
}

function isNotNullish<T>(el: T | null | undefined): el is T {
  return el != null;
}

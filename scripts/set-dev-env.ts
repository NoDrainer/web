import { config } from 'dotenv';
import { writeFile } from 'fs';

// read environment variables from .env file
config({ path: '.env-prod' });

const targetPath = `./src/environments/environment.ts`;

const environmentFileContent = `
import { Env } from './model';

export const environment: Env = {
  production: false,
  contactEndpoint:
    'https://st80aqvsta.execute-api.us-east-1.amazonaws.com/dev/contact',
  contentfulSpace: '${process.env['CONTENTFUL_SPACE']}',
  contentfulAccessToken: '${process.env['CONTENTFUL_ACCESS_TOKEN']}',
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});

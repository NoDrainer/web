import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const date = new Date();
const nowUtc = Date.UTC(
  date.getUTCFullYear(),
  date.getUTCMonth(),
  date.getUTCDate(),
  date.getUTCHours(),
  date.getUTCMinutes(),
  date.getUTCSeconds()
);
const nowUtcIso = new Date(nowUtc).toISOString();

const versionJSON = JSON.stringify({ version: nowUtcIso });
fs.writeFileSync('public/version.json', versionJSON);

process.env['NODRAINER_VERSION'] = nowUtcIso;
console.log(nowUtcIso);

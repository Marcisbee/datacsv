const fs = require('fs');

const match = require('../match');
const jsontocsv = require('../jsontocsv');

async function remove({
  path,
  parser,
  headers,
  delimiter,
  filter,
}) {
  const tempFileName = '__temp_delete.csv';
  const temp = fs.createWriteStream(tempFileName);
  const deleted = [];

  await parser
    .fromFile(path)
    .subscribe((json) => {
      if (match(json, filter)) {
        deleted.push(json);
        return;
      }

      return new Promise((resolve) => {
        temp.write(jsontocsv(headers, [json], delimiter), resolve);
      });
    });

  fs.renameSync(tempFileName, path);
  return deleted;
}

module.exports = remove;

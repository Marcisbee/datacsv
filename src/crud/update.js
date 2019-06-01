const fs = require('fs');

const match = require('../match');
const jsontocsv = require('../jsontocsv');

async function update({
  path,
  parser,
  headers,
  delimiter,
  filter,
  data,
}) {
  const tempFileName = '__temp_update.csv';
  const temp = fs.createWriteStream(tempFileName);
  const updated = [];

  await parser
    .fromFile(path)
    .subscribe((json) => (
      new Promise((resolve) => {
        if (match(json, filter)) {
          const newData = {
            ...json,
            ...data,
          };
          updated.push(newData);
          temp.write(jsontocsv(headers, [newData], delimiter), resolve);
          return;
        }

        temp.write(jsontocsv(headers, [json], delimiter), resolve);
      })
    ));

  fs.renameSync(tempFileName, path);

  return updated;
}

module.exports = update;

const fs = require('fs');
const shortid = require('shortid');
const jsontocsv = require('../jsontocsv');

function addIds(data) {
  return data.map((item) => {
    if (!item.id) item.id = shortid.generate();
    return item;
  });
}

async function create({
  path,
  delimiter,
  parser,
  headers,
  data,
}) {
  const stream = fs.createWriteStream(path, { flags: 'a' });
  const preparedData = jsontocsv(headers, addIds(data), delimiter);

  await stream.write(preparedData);

  return parser.fromString(preparedData);
}

module.exports = create;

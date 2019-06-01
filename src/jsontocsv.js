const csv = require('csv-string');

/**
 * @param {string[]} headers
 * @param {Record<string, any>} data
 * @param {string} delimiter
 * @return {string}
 */
function jsontocsv(headers, data, delimiter) {
  const rows = data.map(
    (row) => headers.map((key) => row[key])
  );
  return csv.stringify(rows, delimiter);
}

module.exports = jsontocsv;

const match = require('../match');

/**
 * @param {Record<string, any>} path
 */
async function read({
  path,
  parser,
  filter,
  order = {},
  limit = 10000,
}) {
  const parsedLimit = parseInt(limit, 10);
  const keys = Object.keys(order);
  /**
   * @param {string} a
   * @param {string} b
   * @returns {number}
   */
  const sort = (a, b) => keys
    .reduce(
      (_, key) => Number(
        order[key] === 'desc'
          ? a[key] < b[key]
          : a[key] > b[key]
      ),
      0
    );

  if (Object.keys(filter).length > 0) {
    /** @type {string[]} */
    const output = [];

    await parser.fromFile(path).subscribe((json) => {
      if (match(json, filter)) {
        output.push(json);
      }
    });

    return output.sort(sort).slice(0, parsedLimit);
  }

  return (await parser.fromFile(path)).sort(sort).slice(0, parsedLimit);
}

module.exports = read;

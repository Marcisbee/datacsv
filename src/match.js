/**
 * @param {Record<string, any>} source
 * @param {Record<string, any>} filter
 * @returns {boolean}
 */
function match(source, filter) {
  const keys = Object.keys(filter || {});

  // If no filter, apply to all
  if (keys.length <= 0) return true;

  const matchedKeys = keys.reduce((acc, key) => {
    if ((source && source[key]) === filter[key]) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return matchedKeys === keys.length;
}

module.exports = match;

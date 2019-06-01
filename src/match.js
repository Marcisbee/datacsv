/**
 * @param {Record<string, any>} source
 * @param {Record<string, any>} filter
 * @returns {boolean}
 */
function match(source, filter) {
  const keys = Object.keys(filter || {});
  let hasMatch = false;

  // If no filter, apply to all
  if (keys.length <= 0) return true;

  keys.forEach((key) => {
    if (source[key] === filter[key]) {
      hasMatch = true;
    }
  });

  return hasMatch;
}

module.exports = match;

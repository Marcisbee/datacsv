const fs = require('fs-extra');
const csv = require('csvtojson');

const create = require('./crud/create');
const read = require('./crud/read');
const update = require('./crud/update');
const remove = require('./crud/delete');

/** @type {Record<string, any>} */
const defaults = {};

/**
 * @typedef Options
 * @property {number} [limit]
 * @property {Record<string, "asc" | "desc">} [order]
 */

/**
 * @typedef {Promise<Record<string, any>[]>} ReturnData
 */

/**
 * @typedef DB
 * @property {(filter?: Record<string, any>, options?: Options) => ReturnData} get
 * @property {(data: Record<string, any>[]) => ReturnData} add
 * @property {(filter: Record<string, any>, data: Record<string, any>) => ReturnData} edit
 * @property {(filter: Record<string, any>) => ReturnData} delete
 * @property {() => void} clear
 */

/**
 * @param {string} path
 * @param {Record<string, any>} headers
 * @param {string} delimiter
 * @returns {Promise<DB>}
 */
async function db(path, headers, delimiter = ',') {
  // Create file it it doesn't exist already
  fs.ensureFileSync(path);

  const headerKeys = [
    'id',
    ...Object.keys(headers),
  ];
  const headerTypes = {
    ...headers,
    id: String,
  };
  const parser = () => csv({
    headers: headerKeys,
    delimiter,
    // @ts-ignore
    colParser: headerTypes,
    flatKeys: true,
    noheader: true,
    trim: false,
  });

  return {
    get: async (
      filter = defaults,
      { limit, order } = defaults
    ) => read({
      path,
      parser: parser(),
      headers: headerKeys,
      filter,
      order,
      limit,
    }),

    add: async (data = [defaults]) => create({
      path,
      parser: parser(),
      headers: headerKeys,
      delimiter,
      data,
    }),

    edit: async (filter = defaults, data = defaults) => update({
      path,
      parser: parser(),
      headers: headerKeys,
      delimiter,
      filter,
      data,
    }),

    delete: async (filter = defaults) => remove({
      path,
      parser: parser(),
      headers: headerKeys,
      delimiter,
      filter,
    }),

    clear: async () => fs.truncate(path, 0, () => {}),
  };
}
module.exports = db;

const fp = require('lodash/fp');
const fs = require('fs');

const get = fp.curry((key, store) => new Promise((res, rej) => {
  const val = store.get(key);
  if (val !== undefined ) res(val) else rej(val)
}));

const has = fp.curry((key, store) => Promise.resolve(store.has(key)));

const set = fp.curry(
  (key, value, store) => Promise.resolve(store.set(key, value))
);

const unset = fp.curry((key, store) => Promise.resolve(store.delete(key)));


const localHash = (filePath) => {
  // read file(filePath)
  return Promise.resolve(new Map());
};

module.exports = {
  localHash,
  get,
  has,
  set,
  unset
};

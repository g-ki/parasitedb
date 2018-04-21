const fp = require('lodash/fp');
const fs = require('fs');

const get = fp.curry((key, store) => new Promise((res, rej) => {
  const val = store.get(key);
  if (val !== undefined )
    res(val)
  else
    rej(val)
}));

const has = fp.curry((key, store) => Promise.resolve(store.has(key)));

const set = fp.curry(
  (key, value, store) => Promise.resolve(store.set(key, value))
);

const unset = fp.curry((key, store) => Promise.resolve(store.delete(key)));

const read = async (filePath) => {
  var json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return Promise.resolve(new Map(json));
};


const write = (filePath, store) => {
  const json = JSON.stringify([...store]);

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, json, function(err) {
      if(err)
        return reject(err);

      resolve(store);
    });
  });
}


const open = async (filePath) => {
  return read(filePath).catch(() => write(filePath, new Map()));
}

module.exports = {
  get,
  has,
  set,
  unset,

  open,
};

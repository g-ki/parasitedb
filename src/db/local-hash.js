const fs = require('fs');


const read = async (filePath) => {
  var json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return Promise.resolve(new Map(json));
};


const write = (filePath, store) => {
  const json = JSON.stringify([...store]);

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, json, function (err) {
      if (err)
        return reject(err);

      resolve(store);
    });
  });
}


const open = async (filePath) =>
  read(filePath).catch(() => write(filePath, new Map()));


const localHash = async (filePath) => {
  const store = await open(filePath);

  const get = (key) => new Promise((resolve, reject) => {
    const val = store.get(key);
    if (val !== undefined) {
      resolve(val)
    }
    else {
      reject(val)
    }
  });

  const has = (key) => Promise.resolve(store.has(key));

  const set = (key, value) => {
    store.set(key, value);
    return write(filePath, store);
  }

  const unset = (key) => Promise.resolve(store.delete(key));

  return {
    get,
    has,
    set,
    unset,
  }
}


module.exports = localHash;

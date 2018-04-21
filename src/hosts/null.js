const get = (key) => Promise.resolve(null);

const has = (key) => Promise.resolve(false);

const set = (key, value) => Promise.resolve({ host: 'null', path: null });

const unset = (key) => Promise.resolve(key);


module.exports = {
  name: 'null',
  get,
  has,
  set,
  unset,
}

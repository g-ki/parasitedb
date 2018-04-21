const fp = require('lodash/fp');
const localHash = require('./local-hash');

const hosts = {};

const addHost = host => hosts[host.name] = host;

const getHost = fp.get(fp.__, hosts);

const randHost = () => {
  const keys = fp.keys(hosts);
  const randKey = keys[fp.random(0, keys.length - 1)];

  return hosts[randKey];
};


const get = fp.curry(async (collection, key, db) => {
  const location = await collection.get(key, db);
  const host = getHost(location.host);

  return host.get(location.path);
});


const has = fp.curry(async (collection, key, db) => {
  const location = await collection.has(key, db);
  const host = getHost(location.host);

  return host.has(location);
});


const set = fp.curry(async (collection, key, value, db) => {
  const host = randHost();
  const location = await host.set(key, value);

  return collection.set(key, location, db);
});


const unset = fp.curry(async (collection, key, db) => {
  const location = await collection.get(key, db);
  const host = getHost(location.host);

  return host.unset(location);
});


const parasitedb = {
  get: get(localHash),
  has: has(localHash),
  set: set(localHash),
  unset: unset(localHash),

  addHost: addHost,

  open: localHash.open,
};

module.exports = parasitedb;

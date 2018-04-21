const hosts = {};

const addHost = host => hosts[host.name] = host;
const getHost = x => hosts[x];

const randHost = () => {
  const choose = xs => xs[Math.floor(Math.random() * xs.length)];

  const names = Object.keys(hosts);
  const hostName = choose(names);

  return hosts[hostName];
};


const get = collection => async (key, db) => {
  const location = await collection.get(key, db);
  const host = getHost(location.host);

  return host.get(location.path);
};


const has = collection => async (key, db) => {
  const location = await collection.has(key, db);
  const host = getHost(location.host);

  return host.has(location);
};


const set = collection => async (key, value, db) => {
  const host = randHost();
  const location = await host.set(key, value);

  return collection.set(key, location, db);
};


const unset = collection => async (key, db) => {
  const location = await collection.get(key, db);
  const host = getHost(location.host);

  return host.unset(location);
};


const open = collection => collection.open

const localHash = require('./local-hash');

const parasitedb = {
  get: get(localHash),
  has: has(localHash),
  set: set(localHash),
  unset: unset(localHash),

  open: open(localHash),

  addHost: addHost,
};

module.exports = parasitedb;

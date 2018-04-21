const axios = require('axios');
const pdb = require('../src/db');
const nullHost = require('../src/hosts/null');
const Host = require('../src/hosts/host');
const Hastebin = require('../src/hosts/hastebin');

const hosts = {
  nullHost,
  izDemon: new Host('http://172.27.29.155:3000'),
  hastebin: new Hastebin()
};

(async () => {
  const db = await pdb('./users.pdb', hosts);

  await db.set('bob', { name: 'Bob', age: 21 });

  const result = await db.get('bob');
  console.log(result);
})();





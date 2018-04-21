const axios = require('axios');
const pdb = require('../src/db');

const encryptor = require('../src/plugins/encryptor');
const { fromFile } = require('../src/utils');

const nullHost = require('../src/hosts/null');
const Host = require('../src/hosts/host');
const Hastebin = require('../src/hosts/hastebin');

const SECRET_MESSAGE = 'qwerty12346';
const rootLocation = './data.pdb';

const hosts = {
  // nullHost,
  izDemon: new Host('http://172.27.29.155:3000'),
  hastebin: new Hastebin()
};

(async () => {
  const db = await encryptor(
    SECRET_MESSAGE,
    pdb(rootLocation, hosts)
  );

  await db.set('bob', { name: 'Bob', age: 21 });
  await db.set('file', await fromFile(rootLocation));

  const user = await db.get('bob');
  const file = await db.get('file');

  console.log(file);
})();

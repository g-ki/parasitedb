const axios = require('axios');
const pdb = require('../src/db');

const encryptor = require('../src/plugins/encryptor');

const nullHost = require('../src/hosts/null');
const Host = require('../src/hosts/host');

const SECRET_MESSAGE = 'qwerty12346';

const hosts = {
  nullHost,
  izDemon: new Host('http://172.27.29.155:3000')
};

(async () => {
  const db = await encryptor(
    SECRET_MESSAGE,
    pdb('./users.pdb', hosts)
  );

  await db.set('bob', { name: 'Bob', age: 21 });
  await db.set('image', { name: 'Bob', age: 21 });

  const result = await db.get('bob');

  console.log(result);
})();

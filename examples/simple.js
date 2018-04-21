const pdb = require('../src/db');
const nullHost = require('../src/hosts/null');
const Host = require('../src/hosts/host');

const hosts = {
  nullHost,
  izDemon: new Host('http://172.27.29.155:3000')
};

(async () => {
  const db = await pdb('./users.pdb', hosts);

  await db.set('text', 'habala babala');
  const result = await db.get('text');

  console.log(result);
})();





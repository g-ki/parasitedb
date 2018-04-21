const pdb = require('../src/db');
const nullHost = require('../src/hosts/null')

pdb.addHost(nullHost);

(async () => {
  const usersDb = await pdb.open('./users.pdb');

  const user = { name: 'Stefan S.', age: 21 };
  await pdb.set('stefan', user, usersDb);
  console.log(usersDb); // Map { 'stefan' => { host: 'null', path: null } }

  const stef = await pdb.get('stefan', usersDb);
  console.log(stef); // null
})();





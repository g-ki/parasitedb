const pdb = require('../db/parasitedb');
const { localHash } = require('../db/parasitedb/local-hash');

const usersDb = localHash('./users.pdb');

const saveStefan = pdb.set('stefan', { name: 'Stefan S.', age: 21 });

const saveMisho = pdb.set('misho', { name: 'Mice', age: 33 });


(async () => {
  const user = { name: 'Stefan S.', age: 21 };
  await pdb.set('stefan', user, usersDb);

  const stef = await pdb.get('stefan', usersDb);
  stef.age = 22;
  stef.pets = ['dog', 'cat'];

  await pdb.set('stef', stef, usersDb);
})();





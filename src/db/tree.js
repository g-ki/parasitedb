// Tree :: a -> Tree -> Tree
const Tree = (value, leftT = [], rightT = []) =>
  Object.freeze([leftT, value, rightT]);

const rootVal = ([l, v, r]) => v;

const isLeaf = ([l, v, r]) => l.length === 0 && r.length == 0;

const insert = (x, xs) => {
  if (xs.length === 0) return Tree(x);
  const [l, v, r] = xs;

  if (x < v)
    return Tree(v, insert(x, l), r);
  else if (x > v)
    return Tree(v, l, insert(x, r));

  return xs;
}

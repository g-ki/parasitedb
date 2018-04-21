const List = (value, tail = []) => Object.freeze([value, tail]);

const front = ([value, tail]) => value;

const popFront = ([value, tail]) => tail;

const pushFront = (x, list) => List(x, list);

const concat = (xs, ys) => {
  if (xs.length === 0) return ys
  const [x, xt] = xs;

  return List(x, concat(xt, ys));
};

const makeSafe = (func) => {
  return (...args) => {
    console.log(args[0]); // the rest parameter above (...args) is an array hence we can access it by index
    try {
      const result = func() + args[0] + args[1];

      return {
        type: "success",
        result,
      };
    } catch (e) {
      return {
        type: "failure",
        error: e,
      };
    }
  };
};

// we give makeSafe a function as an an argument and then we access and call that function in the function returned by makeSafe 

function add(a) {
  return +a + 1;
}

// const testFunction = makeSafe(() => 1); //we give makeSafe a function reference

// const result = testFunction(4, 5);

// console.log(result);

// const func = makeSafe(() => {
//     if (1 > 2) {
//       return "123";
//     }
//     throw new Error("Oh dear");
//   });

// const result = func();

// console.log(result);

////////////////////////////////

const createClassNamesFactory = (classes) => {
  // console.log(classes)
  return (type, ...otherClasses) => {
    // console.log(type);
    // console.log(otherClasses);
    const classList = [classes[type], ...otherClasses];
    return classList.join(" ");
  };};

const getBg = createClassNamesFactory({
  primary: "bg-blue-500",
  secondary: "bg-gray-500",
});

const result = getBg('primary');

// console.log(result);

//////////////////////////////////

const createCache = (initialCache) => {
  const cache = initialCache || {};

  return {
    get: (key) => cache[key],
    set: (key, value) => {
      cache[key] = value;
    },
    clone: (transform) => {
      const newCache = {};

      for (const key in cache) {
        newCache[key] = transform(cache[key]);
      }
      return createCache(newCache);
    },
  };
};


const cache = createCache();

cache.set("a", 1);
cache.set("b", 2);
const stringCache = cache.clone((el) => String(el));

console.log(typeof stringCache.get('a'));

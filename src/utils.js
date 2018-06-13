// runtime type check for debugging purposes
const checkArray = xs => {
  if (!Array.isArray(xs)) {
    throw new Error('matchObject expects a list of strings')
  }

  return xs
}

// standard compose function

const compose = (...fns) => x => fns.reduceRight((v,f) => f(v) , x)

// intended to take a single char and return true if it is a letter or number
const isChar = x => /[a-zA-Z0-9]/.test(x)

// takes two lists and returns true if all of the elements in the first
// list are present in the second list
const containsAll = (xs, ys) =>
  xs.map(x => y => y.includes(x)).reduce((res, f) => f(ys) && res, true)

// checks if a reflected list of arguments contains
// object destructuring syntax
const hasDestructuredObjectArguments = xs =>
  xs.some(x => /({|})/.test(x) && !/function/.test(x))

module.exports = {
  hasDestructuredObjectArguments,
  checkArray,
  containsAll,
  compose,
  isChar
}

require('./z')

var maximum = function(list){
  return list.$match(
    function(x)    { return x },
    function(x, xs){ return (x > maximum(xs)) ? x : maximum(xs)}
  )
}

console.log(maximum([23, 89, 56, 70]))


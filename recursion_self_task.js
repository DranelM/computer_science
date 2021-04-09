// Task 1: Without peeking, write your own recursive factorial method

// Task 2: Use your memo function from the previous exercise to memoize your factorial method

const { performance } = require('perf_hooks');

const noCacheFactorial = (n) => {
    if (n === 1) {
        return n
    } else {
        return n * noCacheFactorial(n - 1)
    }

}


const cacheFactorial = () => {
    const cache = { 1: 1 }
    const factorial = (n) => {
        if (n in cache) {
            return cache[n]
        } else {
            cache[n] = n * factorial(n - 1)
            return cache[n]
        }
    }

    return factorial
}

let withCacheFactorial = cacheFactorial()

var t0 = performance.now()
for (let i = 0; i < 15; i++) {
    noCacheFactorial(5000 + i)
}
var t1 = performance.now()
console.log("Factorial without cache took " + (t1 - t0) + " milliseconds.")


var t2 = performance.now()
for (let i = 0; i < 15; i++) {
    withCacheFactorial(5000 + i)
}
var t3 = performance.now()
console.log("Factorial with cache took " + (t3 - t2) + " milliseconds.")
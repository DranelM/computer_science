// Task 1: Write a function, times10, that takes an argument, n, and multiples n times 10
// a simple multiplication fn
const times10 = (n) => { return n * 10 };

console.log('~~~~~~~~~~~~~~TASK 1~~~~~~~~~~~~~~');
console.log('times10 returns:', times10(9));

// Task 2: Use an object to cache the results of your times10 function. 
// protip 1: Create a function that checks if the value for n has been calculated before.
// protip 2: If the value for n has not been calculated, calculate and then save the result in the cache object.

const cache = {};

const memoTimes10 = (n) => {
    let result
    if (cache[n]) {
        result = cache[n]
    } else {
        cache[n] = times10(n)
    }

    return cache[n]
}

console.log('~~~~~~~~~~~~~~TASK 2~~~~~~~~~~~~~~');
console.log('Task 2 calculated value:', memoTimes10(9));	// calculated
console.log('Task 2 cached value:', memoTimes10(9));	// cached

//  =========================================================================================================

// Task 3: Clean up your global scope by moving your cache inside your function.
// protip: Use a closure to return a function that you can call later.

const memoizedClosureTimes10 = (n) => {
    const cache = {}

    return (n) => {
        let result
        if (cache[n]) {
            result = cache[n]
        } else {
            cache[n] = times10(n)
        }

        return cache[n]
    }
};

const memoClosureTimes10 = memoizedClosureTimes10();
console.log('~~~~~~~~~~~~~~TASK 3~~~~~~~~~~~~~~');
try {
    console.log('Task 3 calculated value:', memoClosureTimes10(9));	// calculated
    console.log('Task 3 cached value:', memoClosureTimes10(9));	// cached
} catch (e) {
    console.error('Task 3:', e);
}

//  =========================================================================================================

// Task 4: Make your memo function generic and accept the times10 function as a callback rather than defining the n * 10 logic inside the if/else or pulling it in from the global scope.

// protip: Take advantage of the fact that parameters are saved in the closure as well, just like the cache from the previous example.
const memoize = (cb) => {
    const cache = {}

    return (...args) => {
        let result
        if (cache[args[0]]) {
            result = cache[args[0]]
        } else {
            cache[args[0]] = cb(...args)
        }

        return cache[args[0]]
    }
}

// returned function from memoizedAdd
const memoizedTimes10 = memoize(times10);
console.log('~~~~~~~~~~~~~~TASK 4~~~~~~~~~~~~~~');
try {
    console.log('Task 4 calculated value:', memoizedTimes10(9));	// calculated
    console.log('Task 4 cached value:', memoizedTimes10(9));	// cached
} catch (e) {
    console.error('Task 4:', e)
}
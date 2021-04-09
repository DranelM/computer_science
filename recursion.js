const factorial = (n) => {
    if (n <= 1) {
        return n
    } else {
        return factorial(n - 1) * n
    }
}

console.log(factorial(4))

// Task: rewrite this function so that it uses a loop rather than recursion

function joinElements(array, joinString) {

    function recurse(index, resultSoFar) {
        resultSoFar += array[index];

        if (index === array.length - 1) {
            return resultSoFar;
        } else {
            return recurse(index + 1, resultSoFar + joinString);
        }
    }

    return recurse(0, '');
}

function joinElements_loop(array, joinString) {
    let result = '';
    for (let i = 0; i < array.length; i++) {
        if (i == array.length - 1) {
            result += array[i]
        } else {
            result += array[i] + joinString
        }
    }
    return result
}

console.log(joinElements(['s', 'cr', 't cod', ' :) :)'], 'e'))
console.log(joinElements_loop(['s', 'cr', 't cod', ' :) :)'], 'e'))
const double = num => num * 2
const square = num => num ** 2

const doubleEach = (array) => {
    return array.map(double)
}

const squareEach = (array) => {
    return array.map(square)
}

const doubleAndSquareEach = (array) => {
    return array.map(double).map(square)
}

const myMap = (array, fn) => {
    const result = []
    for (let i = 0; i < array.length; i++) {
        result.push(fn(array[i]))
    }
    return result
}

const array = [1, 2, 3, 4]
console.log(doubleEach(array))
console.log(squareEach(array))
console.log(doubleAndSquareEach(array))

console.log(myMap(array, (num) => num * 2))
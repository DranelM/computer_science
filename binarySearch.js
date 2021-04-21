function linearSearch(value, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return value;
        }
    }
    return -1;
}

function recursiveBinarySearch(value, array) {
    let middleIdx = Math.floor(array.length / 2);

    if (value == array[middleIdx]) {
        return value
    }

    if (array.length) {
        if (value < array[middleIdx]) {
            return recursiveBinarySearch(value, array.slice(0, middleIdx));
        } else {
            return recursiveBinarySearch(value, array.slice(middleIdx))
        }
    }

    return -1
}

function iterativeBinarySearch(value, array) {
    let minIdx = 0;
    let maxIdx = array.length - 1;
    let middleIdx;

    while (minIdx <= maxIdx) {
        middleIdx = Math.floor((maxIdx + minIdx) / 2);

        if (value === array[middleIdx]) {
            return value
        } else if (value < array[middleIdx]) {
            maxIdx = middleIdx - 1;
        } else {
            minIdx = middleIdx + 1;
        }
    }

    return -1
}

const array = [1, 2, 3, 4, 5, 6];

console.log(linearSearch(3, array));
console.log(recursiveBinarySearch(3, array));
console.log(iterativeBinarySearch(0, array));
console.log(iterativeBinarySearch(1, array));
console.log(iterativeBinarySearch(2, array));
console.log(iterativeBinarySearch(3, array));
console.log(iterativeBinarySearch(4, array));
console.log(iterativeBinarySearch(5, array));
console.log(iterativeBinarySearch(6, array));
console.log(iterativeBinarySearch(7, array));

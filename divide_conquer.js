// TASK: Implement linear search.
function linearSearch(list, item) {
    let res;
    list.forEach((v, i) => {
        if (v === item) {
            res = i
        }
    })
    return res
}

const mergeSort = (array) => {
    const length = array.length
    const middle = Math.floor(length / 2)

    if (length === 1) {
        return array
    }

    const left = array.slice(0, middle)
    const right = array.slice(middle)

    return merge(mergeSort(left), mergeSort(right))
}

const merge = (left, right) => {
    const result = [];
    debugger
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }

    if (left.length) {
        result.push(...left)
    } else {
        result.push(...right)
    }

    return result
}

const bubbleSort = (array) => {
    let switched = true;
    while (switched) {
        switched = false
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                switched = true
                bubble(array, i, i + 1)
            }
        }
    }
    return array
}

const bubble = (array, i, j) => {
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
}


// let res = linearSearch([2, 6, 7, 90, 103], 90);
// console.log(res)

let array = [5, 6, 2, 4, 3, 1]
// let res = mergeSort(array)
let res = bubbleSort(array)
console.log(res);


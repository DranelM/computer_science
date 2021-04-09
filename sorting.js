function bubbleSort(nums) {
    let swapped
    do {
        swapped = false
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                temp = nums[i]
                nums[i] = nums[i + 1]
                nums[i + 1] = temp
                swapped = true
            }
        }
    } while (swapped)

    return nums
}


const insertSort = (nums) => {
    let i = 0;
    while (i < nums.length) {
        let j = i;
        while (nums[j] > nums[j + 1] && j >= 0) {
            swap(nums, j, j + 1);
            j -= 1;
        }
        i++;
    }
    return nums
}

const swap = (list, i, j) => {
    let temp = list[i];
    list[i] = list[j]
    list[j] = temp
}

const mergeSort = (nums) => {

    if (nums.length < 2) {
        return nums
    }

    const length = nums.length
    const middle = Math.floor(length / 2)
    const left = nums.slice(0, middle);
    const right = nums.slice(middle);

    const sortedLeft = mergeSort(left)
    const sortedRight = mergeSort(right)

    return stitch(sortedLeft, sortedRight)
}

const stitch = (left, right) => {
    let results = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            results.push(left.shift())
        } else {
            results.push(right.shift())
        }
    }
    results.push(...left)
    results.push(...right)

    return results
}

const quickSort = (nums) => {

    if (nums.length < 2) {
        return nums
    }

    const pivot = nums[nums.length - 1]
    const left = []
    const right = []

    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] < pivot) {
            left.push(nums[i])
        } else {
            right.push(nums[i])
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)]
}


class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(value) {
        const node = new Node(value)
        if (!this.head) {
            this.head = node
        } else {
            this.tail.next = node
        }

        this.tail = node
        this.length++
    }

    pop() {
        if (this.length === 0) {
            return
        } else if (this.length === 1) {
            this.head = null
            this.tail = null
        } else if (this.head) {
            let current = this.head;
            for (let i = 1; i < this.length - 1; i++) {
                current = current.next
            }

            this.tail = current
            current.next = null
        }

        this.length--
    }

    _find(value, test = this._test) {
        let current = this.head
        for (let i = 0; i < this.length; i++) {
            if (test(current.value, value)) {
                return current
            }
        }
    }

    _test(a, b) {
        return a === b
    }

    get(index) {
        let current = this.head
        if (index < this.length) {
            for (let i = 1; i <= index; i++) {
                current = current.next
            }

            return current
        }
    }

    delete(index) {
        let current = this.head
        if (index === 0) {
            this.head = this.head.next

        } else if (index < this.length) {
            for (let i = 1; i < index; i++) {
                current = current.next
            }
            current.next = current.next.next
        } else {

        }
        this.length--
    }

    _testIndex(search, __, i) {

    }
}

let linkedList = new LinkedList()
linkedList.push(1)
linkedList.push(2)
console.log(linkedList)
linkedList.delete(0)
console.log(linkedList)


// let nums = [2, 3, 1, 5, 6, 10, 9, 8]
// nums = bubbleSort(nums)
// nums = insertSort(nums)
// nums = mergeSort(nums)
// nums = quickSort(nums)

// console.log(nums)
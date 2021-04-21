const heapSort = (array) => {
    console.log(`Initial array: ${array}`);
    let maxHeap = createMaxHeap(array);
    console.log(`maxHeap: ${maxHeap}`);
    let arraySize = maxHeap.length - 1;
    while (arraySize) {
        swap(maxHeap, 0, arraySize);
        arraySize--;
        heapify(maxHeap, 0, arraySize)
        console.log(maxHeap);
    }

    return maxHeap
}

const createMaxHeap = (array) => {
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
        heapify(array, i, array.length);
    }

    return array;
}

const heapify = (array, index, heapSize) => {
    const leftIdx = 2 * index + 1;
    const rightIdx = 2 * index + 2;
    let maxIdx = index;

    if (heapSize >= leftIdx && array[maxIdx] < array[leftIdx]) {
        maxIdx = leftIdx;
    }

    if (heapSize >= rightIdx && array[maxIdx] < array[rightIdx]) {
        maxIdx = rightIdx;
    }

    if (maxIdx !== index) {
        swap(array, maxIdx, index);
        heapify(array, maxIdx, heapSize);
    }

    return array
}

const swap = (array, idx1, idx2) => {
    let temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp
}


const initialArray = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];

heapSort(initialArray);

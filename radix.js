function radixSort(array) {
    let count = Math.max(...array).toString().length;
    let queues;
    for (let i = 0; i < count; i++) {
        queues = new Array(10).fill().map(row => []);
        array.forEach(element => {
            let index = Math.floor(element / (10 ** i)) % 10;
            queues[index].push(element);
        });
        array = queues.reduce((acc, queue) => acc.concat(queue))
    }

    return array
}

const array = [20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34, 3000, 3001, 1200, 633];
console.log(radixSort(array));


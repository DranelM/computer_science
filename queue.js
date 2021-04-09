class Queue {
    constructor() {
        this._storage = {};
        this._tail = 0;
        this._head = 0;
    }

    enqueue(value) {
        this._storage[this._head + this._tail] = value;
        this._tail++;
    }

    dequeue() {
        if (this._head < this._tail) {
            const res = this._storage[this._head];
            delete this._storage[this._head];
            this._head++;
            this._tail--;
            return res;
        }
    }
}

let queue = new Queue();
console.log(queue);

queue.enqueue('first');
queue.enqueue('second');
console.log(queue);
queue.enqueue('third');
console.log(queue);
console.log(queue.dequeue());
console.log(queue);



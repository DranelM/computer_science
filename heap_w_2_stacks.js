class Stack {
    constructor() {
        this._storage = [];
    }

    push(value) {
        this._storage.push(value);
    }

    pop() {
        if (this._storage.length) {
            return this._storage.pop();
        }
    }

    peek() {
        if (this._storage.length) {
            return this._storage[this._storage.length - 1];
        }
    }
}

class HeapFromTwoStacks {
    constructor() {
        this._mainStack = new Stack();
        this._helperStack = new Stack();
    }

    enqueue(value) {
        this._mainStack.push(value);
    }

    dequeue() {
        if (this._mainStack.peek()) {
            this.fromOneToTheOther(this._mainStack, this._helperStack);
            let item = this._helperStack.pop();
            this.fromOneToTheOther(this._helperStack, this._mainStack);

            return item;
        }
    }

    fromOneToTheOther(stack1, stack2) {
        while (stack1.peek() != undefined) {
            stack2.push(stack1.pop());
        }
    }
}


let heap = new HeapFromTwoStacks();

console.log(heap);
heap.enqueue(1);
heap.enqueue(2);
heap.enqueue(3);
console.log(heap);
console.log(heap.dequeue());
console.log(heap);


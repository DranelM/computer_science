class Stack {
    constructor() {
        this._storage = [];
    }

    push(value) {
        let previousMin = this.getMin()
        let min = Math.min(previousMin === undefined ? Infinity : previousMin, value)
        this._storage.push({
            value: value,
            min: min
        })
    }

    pop() {
        if (this._storage.length) {
            return this._storage.pop()
        }
    }

    peek() {
        if (this._storage.length) {
            return this._storage[this._storage.length - 1].value
        }
    }

    getMin() {
        if (this._storage.length) {
            return this._storage[this._storage.length - 1].min
        }
    }
}

let stack = new Stack()

console.log(stack);
stack.push(5)
stack.push(2)
stack.push(1)
stack.push(4)
console.log(stack);
stack.pop()
console.log(stack);

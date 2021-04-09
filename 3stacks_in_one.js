class Stack {
    constructor() {
        this._storage = [];
        this._lengths = new Array(3).fill(0);
    }

    push(value, stack_nr) {
        const index = stack_nr - 1 + this.get_length(stack_nr) * 3
        this._storage[index] = value
        ++this._lengths[stack_nr - 1]
    }

    pop(stack_nr) {
        const length = this.get_length(stack_nr)
        if (length > 0) {
            const index = stack_nr - 1 + (length - 1) * 3
            this._storage[index] = undefined
            --this._lengths[stack_nr - 1]
        }
    }

    get_length(stack_nr) {
        return this._lengths[stack_nr - 1]
    }
}

let stack = new Stack();
console.log(stack);
stack.push(1, 1)
console.log(stack);
stack.push(2, 2)
stack.push(2, 2)
console.log(stack);
stack.pop(2)
console.log(stack);

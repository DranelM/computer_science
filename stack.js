class Stack {
    constructor() {
        this._storage = {};
        this._length = 0;

    }

    push(value) {
        this._storage[this._length] = value;
        this._length++;
    }

    pop() {
        if (this._length) {
            let result = this._storage[this._length - 1];
            delete this._storage[this._length - 1];
            this._length--;
            return result;
        }
    }

    peek() {
        if (this._length) {
            return this._storage[this._length - 1];
        }
    }
}


let stack = new Stack();
console.log('New Stack');
console.log(stack);

console.log('Adding two values');
stack.push('first')
stack.push('second')
console.log(stack);

console.log('popping value');
console.log(stack.pop())

console.log('after popping');
console.log(stack)

console.log('peek');
console.log(stack.peek());

stack.pop()
console.log(stack.pop());




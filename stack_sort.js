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

const sortStack = (stack) => {
    let helperStack = new Stack();
    helperStack.push(stack.pop());
    let curr;
    let count = 0;
    while (stack.peek() !== undefined) {
        curr = stack.pop();
        while (curr > helperStack.peek() && helperStack.peek() !== undefined) {
            stack.push(helperStack.pop());
            count++;
        }

        helperStack.push(curr);
        for (let i = 0; i < count; count--) {
            helperStack.push(stack.pop());
        }
    }

    return helperStack
}


let mainStack = new Stack();
mainStack.push(4);
mainStack.push(8);
mainStack.push(9);
mainStack.push(1);
mainStack.push(2);
mainStack.push(3);
console.log(mainStack);
mainStack = sortStack(mainStack)
console.log(mainStack);
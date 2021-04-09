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

const hasValidBrackets = (bracketsString) => {
    let openingsStack = new Stack();
    const openings = ['(', '[', '{'];
    const closings = [')', ']', '}'];
    for (let i = 0; i < bracketsString.length; i++) {
        if (openings.includes(bracketsString[i])) {
            openingsStack.push(bracketsString[i])
        } else if (openings.indexOf(openingsStack.pop()) !== closings.indexOf(bracketsString[i])) {
            return false
        }
    }
    return true
}

const validBrackets = '{([()])}()';
const invalidBrackets = '[(])';
console.log(`${validBrackets} is ${hasValidBrackets(validBrackets) ? "valid" : "invalid"}`);
console.log(`${invalidBrackets} is ${hasValidBrackets(invalidBrackets) ? "valid" : "invalid"}`);
const { CITY_NAMES } = require('./cityNames');

class Node {

    constructor(string) {
        const currentLetter = string[0];
        const next = string.substring(1);

        this.value = currentLetter || "";
        this.children = [];
        this.wordFinisher = false;

        if (!next.length) {
            this.wordFinisher = true;
        } else {
            this.children.push(new Node(next));
        }
    }

    add(word) {
        const currentLetter = word[0];
        const next = word.substring(1);
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            if (child.value === currentLetter) {
                if (next) {
                    child.add(next);
                } else {
                    child.wordFinisher = true;
                }
                return
            }
        }

        this.children.push(new Node(word))
    }

    _complete(string, previousLetters, resultArray) {
        const next = string.substring(1);

        if (resultArray.length >= 3 || (string && string[0] !== this.value)) {
            return resultArray;
        }

        if (this.wordFinisher) {
            resultArray.push(`${previousLetters}${this.value}`)
        }

        this.children.forEach(child => child._complete(next, `${previousLetters}${this.value}`, resultArray))

        return resultArray
    }

    complete(string) {
        return this.children
            .map(child => child._complete(string, '', []))
            .reduce((acc, results) => acc.concat(results));
    }
}

const createTrie = words => {
    const root = new Node("");
    words.forEach(word => {
        root.add(word.toLowerCase());
    });

    return root;
}

const words = CITY_NAMES;
const root = createTrie(words);
console.log(root.complete('san'));
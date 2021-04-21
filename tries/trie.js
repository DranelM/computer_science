const { CITY_NAMES } = require('./cityNames')

class Node {
    // you don't have to use this data structure, this is just how I did it
    // you'll almost definitely need more methods than this and a constructor
    // and instance variables
    constructor(value, wordEnd = false) {
        this.childList = [];
        this.value = value;
        this.wordEnd = wordEnd;
    }

    addChildNode(node) {
        if (!this.hasInChildList(node)) {
            this.childList.push(node)
        }
    }

    hasInChildList(value) {
        for (let child of this.childList) {
            if (child.value === value) {
                return child
            }
        }
        return false
    }

    finishWord(node, previousLetters, resultsArray) {
        const currentLetters = previousLetters + node.value
        if (resultsArray.length > 2) {
            return
        }

        if (node.wordEnd) {
            resultsArray.push(currentLetters)
        }

        if (node.childList.length) {
            node.childList.forEach((child) => {
                child.finishWord(child, currentLetters, resultsArray)
            })
        }

        return
    }

    complete(string) {
        let lastPrefixNode = this;
        let results = [];
        for (let i = 0; i < string.length; i++) {
            var existingChild = lastPrefixNode.hasInChildList(string[i])
            if (existingChild) {
                lastPrefixNode = existingChild;
            } else {
                console.log("No words found");
                return [];
            }
        }

        this.finishWord(lastPrefixNode, string.slice(0, string.length - 1), results)
        return results;
    }
}

const createTrie = words => {
    // you do not have to do it this way; this is just how I did it
    const root = new Node("");
    for (word of words) {
        word = word.toLowerCase();
        let currentNode = root;
        for (let i = 0; i < word.length; i++) {
            let existingChild = currentNode.hasInChildList(word[i]);
            if (existingChild) {
                currentNode = existingChild;
            } else {
                let newNode = new Node(word[i], i === word.length - 1 ? true : false);
                currentNode.addChildNode(newNode);
                currentNode = newNode;
            }
        }
    }

    return root;
};

const root = createTrie(CITY_NAMES);
console.log(root.complete('san'));
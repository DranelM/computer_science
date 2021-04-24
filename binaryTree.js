class Tree {
    constructor() {
        this.root = null
    }

    add(value) {

        let current = this.root
        if (!current) {
            this.root = new Node(value)
            return
        }
        while (true) {
            if (value < current.value) {
                if (current.left) {
                    current = current.left
                    continue
                } else {
                    current.left = new Node(value)
                    return
                }
            } else {
                if (current.right) {
                    current = current.right;
                    continue
                } else {
                    current.right = new Node(value)
                    return
                }
            }
        }
    }

    toObject() {
        return this.root
    }
}

class TreeWRecurrency {
    constructor() {
        this.root = null
    }

    add(value) {
        if (!this.root) {
            this.root = new Node(value);
        } else {
            this.addHelper(this.root, value);
        }
    }

    addHelper(node, value) {
        if (value < node.value) {
            if (node.left) {
                this.addHelper(node.left, value);
            } else {
                node.left = new Node(value);
                return node.left;
            }
        } else if (value > node.value) {
            if (node.right) {
                this.addHelper(node.right, value);
            } else {
                node.right = new Node(value);
                return node.right;
            }
        }
        return;
    }

    contains(value, node = this.root) {
        if (!node) {
            return false
        }

        if (node.value === value) {
            return true;
        } else if (value < node.value) {
            return this.contains(value, node.left);
        } else if (value > node.value) {
            return this.contains(value, node.right);
        }
    }

    toObject() {
        return this.root;
    }
}

class Node {
    constructor(value) {
        this.value = value
        this.left = null;
        this.right = null;
    }
}


const tree = new Tree();
tree.add(1)
tree.add(3)
tree.add(6)
console.log(tree)

const treeWRecurrency = new TreeWRecurrency();
treeWRecurrency.add(1)
treeWRecurrency.add(3)
treeWRecurrency.add(6)
console.log(treeWRecurrency)

console.log(treeWRecurrency.contains(3));
console.log(treeWRecurrency.contains(7));



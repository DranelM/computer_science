// class Tree {
//     constructor() {
//         this.root = null
//     }

//     add(value) {

//         let current = this.root
//         if (!current) {
//             this.root = new Node(value)
//             return
//         }
//         if (value < current.value) {
//             if (current.left) {
//                 current.left.add(value)
//             } else {
//                 current.left = new Tree(value)
//             }
//             return
//         } else {
//             if (current.right) {
//                 current.right.add(value)
//             } else {
//                 current.right = new Tree(value)
//             }
//             return
//         }
//     }

//     toObject() {
//         return this.root
//     }
// }

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




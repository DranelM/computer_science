class Graph {
    constructor() {
        this.adjList = {}
    }

    addNode(node) {
        this.adjList[node] = [];
    }

    addEdge(node1, node2) {
        this.adjList[node1].push(node2)
        this.adjList[node2].push(node1)
    }

    depthFirstTraversal(firstNode) {
        const stack = [];
        const visited = {};

        stack.push(firstNode);
        visited[firstNode] = true;

        while (stack.length) {
            const current = stack.pop();
            const neighbors = this.adjList[current];
            console.log(current);
            neighbors.forEach(neighbor => {
                if (!visited[neighbor]) {
                    stack.push(neighbor);
                    visited[neighbor] = true;
                }
            });
        }
    }

    breadthFirstTraversal(firsNode) {
        const queue = [];
        const visited = [];

        queue.push(firsNode);
        visited[firsNode] = true;

        while (queue.length) {
            const current = queue.shift();
            console.log(current);
            this.adjList[current].forEach(neighbor => {

                if (!visited[neighbor]) {
                    queue.push(neighbor);
                    visited[neighbor] = true;
                }
            })
        }
    }
}

const graph = new Graph();
graph.addNode(1);
graph.addNode(2);
graph.addNode(3);
graph.addNode(4);
graph.addNode(5);
graph.addEdge(1, 2);
graph.addEdge(1, 5);
graph.addEdge(2, 5);
graph.addEdge(2, 3);
graph.addEdge(4, 3);
graph.addEdge(4, 2);
graph.addEdge(4, 5);

console.log(graph);

// graph.depthFirstTraversal(1);
graph.breadthFirstTraversal(1);




export class Graph {
  adjacencyList: Map<number, { node: number; weight: number }[]>;

  constructor(public vertices: number) {
    this.adjacencyList = new Map();
    for (let i = 0; i < vertices; i++) {
      this.adjacencyList.set(i, []);
    }
  }

  addEdge(u: number, v: number, isUndirected: boolean = true, weight: number = 1) {
    this.adjacencyList.get(u)?.push({ node: v, weight });
    if (isUndirected) {
      this.adjacencyList.get(v)?.push({ node: u, weight });
    }
  }

  bfs(start: number): number[] {
    const visited = new Array(this.vertices).fill(false);
    const queue: number[] = [];
    const result: number[] = [];

    visited[start] = true;
    queue.push(start);

    while (queue.length > 0) {
      const vertex = queue.shift()!;
      result.push(vertex);

      for (const neighbor of this.adjacencyList.get(vertex)!) {
        if (!visited[neighbor.node]) {
          visited[neighbor.node] = true;
          queue.push(neighbor.node);
        }
      }
    }

    return result;
  }

  dfs(start: number): number[] {
    const visited = new Array(this.vertices).fill(false);
    const result: number[] = [];

    const dfsUtil = (vertex: number) => {
      visited[vertex] = true;
      result.push(vertex);

      for (const neighbor of this.adjacencyList.get(vertex)!) {
        if (!visited[neighbor.node]) {
          dfsUtil(neighbor.node);
        }
      }
    };

    dfsUtil(start);
    return result;
  }

  dijkstra(start: number, target: number): { path: number[]; distance: number } {
    const distances = new Array(this.vertices).fill(Infinity);
    const previous = new Array(this.vertices).fill(null);
    const pq = new PriorityQueue<number>();
    distances[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
      const { element: vertex } = pq.dequeue()!;

      for (const neighbor of this.adjacencyList.get(vertex)!) {
        const distance = distances[vertex] + neighbor.weight;
        if (distance < distances[neighbor.node]) {
          distances[neighbor.node] = distance;
          previous[neighbor.node] = vertex;
          pq.enqueue(neighbor.node, distance);
        }
      }
    }

    const path: number[] = [];
    let current = target;
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }

    return { path: path.length > 1 && path[0] === start ? path : [], distance: distances[target] };
  }

  topologicalSort(): number[] {
    const visited = new Array(this.vertices).fill(false);
    const stack: number[] = [];

    const dfsUtil = (vertex: number) => {
      visited[vertex] = true;
      for (const neighbor of this.adjacencyList.get(vertex)!) {
        if (!visited[neighbor.node]) {
          dfsUtil(neighbor.node);
        }
      }
      stack.push(vertex);
    };

    for (let i = 0; i < this.vertices; i++) {
      if (!visited[i]) {
        dfsUtil(i);
      }
    }

    return stack.reverse();
  }

  hasCycle(isUndirected: boolean = true): { hasCycle: boolean; cycle: number[] } {
    if (isUndirected) {
      return this.hasCycleUndirected();
    } else {
      return this.hasCycleDirected();
    }
  }

  private hasCycleUndirected(): { hasCycle: boolean; cycle: number[] } {
    const visited = new Array(this.vertices).fill(false);
    const parent = new Array(this.vertices).fill(-1);

    const dfsUtil = (vertex: number, par: number): { found: boolean; cycle: number[] } => {
      visited[vertex] = true;

      for (const neighbor of this.adjacencyList.get(vertex)!) {
        if (!visited[neighbor.node]) {
          parent[neighbor.node] = vertex;
          const result = dfsUtil(neighbor.node, vertex);
          if (result.found) return result;
        } else if (neighbor.node !== par) {
          // Found a back edge - cycle detected
          // Build cycle path from current vertex back to the neighbor
          const cycle: number[] = [];
          let current = vertex;
          
          // Trace back from current vertex to the neighbor (which creates the cycle)
          while (current !== neighbor.node) {
            cycle.push(current);
            current = parent[current];
          }
          
          // Add the neighbor to complete the cycle
          cycle.push(neighbor.node);
          
          // Reverse to get the cycle in correct order
          cycle.reverse();
          
          // Add the first node again to show the complete cycle
          cycle.push(cycle[0]);
          
          return { found: true, cycle };
        }
      }
      return { found: false, cycle: [] };
    };

    for (let i = 0; i < this.vertices; i++) {
      if (!visited[i]) {
        const result = dfsUtil(i, -1);
        if (result.found) {
          return { hasCycle: true, cycle: result.cycle };
        }
      }
    }
    return { hasCycle: false, cycle: [] };
  }

  private hasCycleDirected(): { hasCycle: boolean; cycle: number[] } {
    const visited = new Array(this.vertices).fill(false);
    const recStack = new Array(this.vertices).fill(false);
    const path: number[] = [];

    const dfsUtil = (vertex: number): { found: boolean; cycle: number[] } => {
      visited[vertex] = true;
      recStack[vertex] = true;
      path.push(vertex);

      for (const neighbor of this.adjacencyList.get(vertex)!) {
        if (!visited[neighbor.node]) {
          const result = dfsUtil(neighbor.node);
          if (result.found) return result;
        } else if (recStack[neighbor.node]) {
          // Found a back edge - cycle detected
          // Find the start of the cycle in the current path
          const cycleStartIndex = path.indexOf(neighbor.node);
          const cycle = path.slice(cycleStartIndex);
          
          // Add the neighbor again to complete the cycle
          cycle.push(neighbor.node);
          
          return { found: true, cycle };
        }
      }
      
      recStack[vertex] = false;
      path.pop(); // Remove vertex from path when backtracking
      return { found: false, cycle: [] };
    };

    for (let i = 0; i < this.vertices; i++) {
      if (!visited[i]) {
        path.length = 0; // Reset path for each component
        const result = dfsUtil(i);
        if (result.found) {
          return { hasCycle: true, cycle: result.cycle };
        }
      }
    }
    return { hasCycle: false, cycle: [] };
  }

  prim(): { edges: [number, number][]; totalWeight: number } {
    const mst: [number, number][] = [];
    const visited = new Array(this.vertices).fill(false);
    const pq = new PriorityQueue<{ u: number; v: number }>();
    let totalWeight = 0;

    visited[0] = true;
    for (const neighbor of this.adjacencyList.get(0)!) {
      pq.enqueue({ u: 0, v: neighbor.node }, neighbor.weight);
    }

    while (!pq.isEmpty() && mst.length < this.vertices - 1) {
      const edge = pq.dequeue()!;
      const { u, v } = edge.element;
      const weight = edge.priority;

      if (visited[v]) continue;

      visited[v] = true;
      mst.push([u, v]);
      totalWeight += weight;

      for (const neighbor of this.adjacencyList.get(v)!) {
        if (!visited[neighbor.node]) {
          pq.enqueue({ u: v, v: neighbor.node }, neighbor.weight);
        }
      }
    }

    return { edges: mst, totalWeight };
  }

  kruskal(): { edges: [number, number][]; totalWeight: number } {
    const mst: [number, number][] = [];
    const pq = new PriorityQueue<{ u: number; v: number }>();
    let totalWeight = 0;

    // Collect all edges
    for (let u = 0; u < this.vertices; u++) {
      for (const neighbor of this.adjacencyList.get(u)!) {
        if (u < neighbor.node) {
          // Avoid duplicate edges in undirected graph
          pq.enqueue({ u, v: neighbor.node }, neighbor.weight);
        }
      }
    }

    const parent = new Array(this.vertices).fill(-1);
    const find = (u: number): number => {
      if (parent[u] === -1) return u;
      return (parent[u] = find(parent[u]));
    };
    const union = (u: number, v: number): boolean => {
      const pu = find(u);
      const pv = find(v);
      if (pu === pv) return false;
      parent[pv] = pu;
      return true;
    };

    while (!pq.isEmpty() && mst.length < this.vertices - 1) {
      const edge = pq.dequeue()!;
      const { u, v } = edge.element;
      if (union(u, v)) {
        mst.push([u, v]);
        totalWeight += edge.priority;
      }
    }

    return { edges: mst, totalWeight };
  }

  connectedComponents(): number[][] {
    const visited = new Array(this.vertices).fill(false);
    const components: number[][] = [];

    // Build an undirected adjacency list for connected components
    const undirectedAdjList = new Map<number, Set<number>>();
    for (let i = 0; i < this.vertices; i++) {
      undirectedAdjList.set(i, new Set());
    }

    // Add all edges as bidirectional for connected components analysis
    for (let i = 0; i < this.vertices; i++) {
      for (const neighbor of this.adjacencyList.get(i)!) {
        undirectedAdjList.get(i)!.add(neighbor.node);
        undirectedAdjList.get(neighbor.node)!.add(i);
      }
    }

    const dfsUtil = (vertex: number, component: number[]) => {
      visited[vertex] = true;
      component.push(vertex);

      for (const neighbor of undirectedAdjList.get(vertex)!) {
        if (!visited[neighbor]) {
          dfsUtil(neighbor, component);
        }
      }
    };

    for (let i = 0; i < this.vertices; i++) {
      if (!visited[i]) {
        const component: number[] = [];
        dfsUtil(i, component);
        components.push(component);
      }
    }

    return components;
  }

  // Helper function to check if graph is a valid binary tree
  isBinaryTree(): { isValid: boolean; message: string } {
    // First check if graph has cycles (binary trees are always directed and acyclic)
    const { hasCycle } = this.hasCycle(false); // Binary trees are directed
    if (hasCycle) {
      return { isValid: false, message: "Graph contains cycles - not a tree" };
    }

    // Check if each node has at most 2 children (for binary tree)
    for (let i = 0; i < this.vertices; i++) {
      const neighbors = this.adjacencyList.get(i)!;
      if (neighbors.length > 2) {
        return { isValid: false, message: `Node ${i} has ${neighbors.length} children - not a binary tree` };
      }
    }

    // Check if there's exactly one root (node with no incoming edges)
    const inDegree = new Array(this.vertices).fill(0);
    for (let i = 0; i < this.vertices; i++) {
      for (const neighbor of this.adjacencyList.get(i)!) {
        inDegree[neighbor.node]++;
      }
    }

    const roots = inDegree.filter(degree => degree === 0).length;
    if (roots !== 1) {
      return { isValid: false, message: `Found ${roots} root nodes - binary tree must have exactly one root` };
    }

    return { isValid: true, message: "Valid binary tree" };
  }

  inorderTraversal(): { result: number[]; message: string } {
    const validation = this.isBinaryTree();
    if (!validation.isValid) {
      return { result: [], message: validation.message };
    }

    // Find root node (node with no incoming edges)
    const inDegree = new Array(this.vertices).fill(0);
    for (let i = 0; i < this.vertices; i++) {
      for (const neighbor of this.adjacencyList.get(i)!) {
        inDegree[neighbor.node]++;
      }
    }
    const root = inDegree.findIndex(degree => degree === 0);

    const result: number[] = [];
    
    const inorderUtil = (node: number) => {
      const neighbors = this.adjacencyList.get(node)!;
      
      // In a binary tree, we need to determine left and right children
      // Assuming smaller indexed neighbor is left child
      const sortedNeighbors = neighbors.sort((a, b) => a.node - b.node);
      
      // Traverse left subtree
      if (sortedNeighbors.length > 0) {
        inorderUtil(sortedNeighbors[0].node);
      }
      
      // Visit root
      result.push(node);
      
      // Traverse right subtree
      if (sortedNeighbors.length > 1) {
        inorderUtil(sortedNeighbors[1].node);
      }
    };

    if (root !== -1) {
      inorderUtil(root);
    }

    return { result, message: "Inorder traversal completed" };
  }

  preorderTraversal(): { result: number[]; message: string } {
    const validation = this.isBinaryTree();
    if (!validation.isValid) {
      return { result: [], message: validation.message };
    }

    // Find root node
    const inDegree = new Array(this.vertices).fill(0);
    for (let i = 0; i < this.vertices; i++) {
      for (const neighbor of this.adjacencyList.get(i)!) {
        inDegree[neighbor.node]++;
      }
    }
    const root = inDegree.findIndex(degree => degree === 0);

    const result: number[] = [];
    
    const preorderUtil = (node: number) => {
      // Visit root first
      result.push(node);
      
      const neighbors = this.adjacencyList.get(node)!;
      const sortedNeighbors = neighbors.sort((a, b) => a.node - b.node);
      
      // Traverse left subtree
      if (sortedNeighbors.length > 0) {
        preorderUtil(sortedNeighbors[0].node);
      }
      
      // Traverse right subtree
      if (sortedNeighbors.length > 1) {
        preorderUtil(sortedNeighbors[1].node);
      }
    };

    if (root !== -1) {
      preorderUtil(root);
    }

    return { result, message: "Preorder traversal completed" };
  }

  postorderTraversal(): { result: number[]; message: string } {
    const validation = this.isBinaryTree();
    if (!validation.isValid) {
      return { result: [], message: validation.message };
    }

    // Find root node
    const inDegree = new Array(this.vertices).fill(0);
    for (let i = 0; i < this.vertices; i++) {
      for (const neighbor of this.adjacencyList.get(i)!) {
        inDegree[neighbor.node]++;
      }
    }
    const root = inDegree.findIndex(degree => degree === 0);

    const result: number[] = [];
    
    const postorderUtil = (node: number) => {
      const neighbors = this.adjacencyList.get(node)!;
      const sortedNeighbors = neighbors.sort((a, b) => a.node - b.node);
      
      // Traverse left subtree
      if (sortedNeighbors.length > 0) {
        postorderUtil(sortedNeighbors[0].node);
      }
      
      // Traverse right subtree
      if (sortedNeighbors.length > 1) {
        postorderUtil(sortedNeighbors[1].node);
      }
      
      // Visit root last
      result.push(node);
    };

    if (root !== -1) {
      postorderUtil(root);
    }

    return { result, message: "Postorder traversal completed" };
  }
}

class PriorityQueue<T> {
  private items: { element: T; priority: number }[] = [];

  enqueue(element: T, priority: number) {
    this.items.push({ element, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): { element: T; priority: number } | undefined {
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

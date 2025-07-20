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

  hasCycle(): { hasCycle: boolean; cycle: number[] } {
    const visited = new Array(this.vertices).fill(false);
    const recStack = new Array(this.vertices).fill(false);
    const parent = new Array(this.vertices).fill(null);
    let cycle: number[] = [];

    const dfsUtil = (vertex: number, par: number | null): boolean => {
      visited[vertex] = true;
      recStack[vertex] = true;

      for (const neighbor of this.adjacencyList.get(vertex)!) {
        if (!visited[neighbor.node]) {
          parent[neighbor.node] = vertex;
          if (dfsUtil(neighbor.node, vertex)) return true;
        } else if (recStack[neighbor.node] && neighbor.node !== par) {
          // Found a cycle, reconstruct it
          cycle = [neighbor.node];
          let current = vertex;
          while (current !== neighbor.node) {
            cycle.unshift(parent[current]!);
            current = parent[current]!;
          }
          cycle.push(neighbor.node); // Close the cycle
          return true;
        }
      }
      recStack[vertex] = false;
      return false;
    };

    for (let i = 0; i < this.vertices; i++) {
      if (!visited[i]) {
        if (dfsUtil(i, null)) return { hasCycle: true, cycle };
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

    const dfsUtil = (vertex: number, component: number[]) => {
      visited[vertex] = true;
      component.push(vertex);

      for (const neighbor of this.adjacencyList.get(vertex)!) {
        if (!visited[neighbor.node]) {
          dfsUtil(neighbor.node, component);
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
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Graph } from "@/lib/graph";

type Props = {
  nodes: string[];
  edges: [string, string][];
  isUndirected: boolean;
  onHighlightPath: (path: number[]) => void;
};

export default function GraphAlgorithms({ nodes, edges, isUndirected, onHighlightPath }: Props) {
  const [algorithm, setAlgorithm] = useState<string>("");
  const [startNode, setStartNode] = useState<string>("");
  const [targetNode, setTargetNode] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const runAlgorithm = () => {
    const graph = new Graph(nodes.length);
    edges.forEach(([u, v]) => {
      const uIndex = nodes.indexOf(u);
      const vIndex = nodes.indexOf(v);
      graph.addEdge(uIndex, vIndex, isUndirected, 1); // Default weight of 1
    });

    let path: number[] = [];
    let output = "";
    switch (algorithm) {
      case "bfs":
        if (startNode) {
          path = graph.bfs(nodes.indexOf(startNode));
          output = `BFS Traversal: ${path.map((i) => nodes[i]).join(" -> ")}`;
        }
        break;
      case "dfs":
        if (startNode) {
          path = graph.dfs(nodes.indexOf(startNode));
          output = `DFS Traversal: ${path.map((i) => nodes[i]).join(" -> ")}`;
        }
        break;
      case "dijkstra":
        if (startNode && targetNode) {
          const { path: dijkstraPath, distance } = graph.dijkstra(
            nodes.indexOf(startNode),
            nodes.indexOf(targetNode)
          );
          path = dijkstraPath;
          output = dijkstraPath.length
            ? `Shortest Path: ${dijkstraPath.map((i) => nodes[i]).join(" -> ")} (Distance: ${distance})`
            : "No path exists";
        }
        break;
      case "topological":
        path = graph.topologicalSort();
        output = `Topological Sort: ${path.map((i) => nodes[i]).join(" -> ")}`;
        break;
      case "cycle":
        const { hasCycle, cycle } = graph.hasCycle();
        path = cycle;
        output = hasCycle ? `Cycle Detected: ${cycle.map((i) => nodes[i]).join(" -> ")}` : "Graph is acyclic";
        break;
      case "prim":
        if (isUndirected) {
          const { edges: mst, totalWeight } = graph.prim();
          path = mst.flat();
          output = `Prim's MST: ${mst.map(([u, v]) => `${nodes[u]} -> ${nodes[v]}`).join(", ")} (Total Weight: ${totalWeight})`;
        } else {
          output = "Prim's algorithm requires an undirected graph";
        }
        break;
      case "kruskal":
        if (isUndirected) {
          const { edges: mst, totalWeight } = graph.kruskal();
          path = mst.flat();
          output = `Kruskal's MST: ${mst.map(([u, v]) => `${nodes[u]} -> ${nodes[v]}`).join(", ")} (Total Weight: ${totalWeight})`;
        } else {
          output = "Kruskal's algorithm requires an undirected graph";
        }
        break;
      case "components":
        if (isUndirected) {
          const components = graph.connectedComponents();
          output = `Connected Components: ${components.map((comp, i) => `Component ${i + 1}: ${comp.map((n) => nodes[n]).join(", ")}`).join("; ")}`;
          path = components.flat(); // Highlight all nodes
        } else {
          output = "Connected Components algorithm requires an undirected graph";
        }
        break;
      default:
        output = "Please select an algorithm";
    }
    setResult(output);
    onHighlightPath(path);
  };

  return (
    <div className="w-full bg-white/95 rounded-xl shadow-lg p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Run Graph Algorithms</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-800">Select Algorithm</label>
          <Select value={algorithm} onValueChange={setAlgorithm}>
            <SelectTrigger className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Choose an algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bfs">BFS (Breadth-First Search)</SelectItem>
              <SelectItem value="dfs">DFS (Depth-First Search)</SelectItem>
              <SelectItem value="dijkstra">Dijkstra's Shortest Path</SelectItem>
              <SelectItem value="topological">Topological Sort</SelectItem>
              <SelectItem value="cycle">Cycle Detection</SelectItem>
              <SelectItem value="prim">Prim's MST</SelectItem>
              <SelectItem value="kruskal">Kruskal's MST</SelectItem>
              <SelectItem value="components">Connected Components</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(algorithm === "bfs" || algorithm === "dfs" || algorithm === "dijkstra") && (
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">Start Node</label>
            <Select value={startNode} onValueChange={setStartNode}>
              <SelectTrigger className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select start node" />
              </SelectTrigger>
              <SelectContent>
                {nodes.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {algorithm === "dijkstra" && (
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">Target Node</label>
            <Select value={targetNode} onValueChange={setTargetNode}>
              <SelectTrigger className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select target node" />
              </SelectTrigger>
              <SelectContent>
                {nodes.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button
          onClick={runAlgorithm}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 font-semibold"
          disabled={!algorithm || (algorithm === "bfs" && !startNode) || (algorithm === "dfs" && !startNode) || (algorithm === "dijkstra" && (!startNode || !targetNode))}
        >
          Run Algorithm
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-800">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
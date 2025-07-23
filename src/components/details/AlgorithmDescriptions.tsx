import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Algorithm {
  name: string;
  category: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  useCase: string;
  keyFeatures: string[];
}

export default function AlgorithmDescriptions() {
  const algorithms: Algorithm[] = [
    {
      name: "Depth-First Search (DFS)",
      category: "Traversal",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      description: "A graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (either explicitly or through recursion) to keep track of vertices to visit.",
      useCase: "Used for pathfinding, cycle detection, topological sorting, and solving maze problems.",
      keyFeatures: [
        "Uses stack data structure (LIFO)",
        "Goes deep into the graph before exploring siblings",
        "Can be implemented recursively or iteratively",
        "Memory efficient for deep graphs"
      ]
    },
    {
      name: "Breadth-First Search (BFS)",
      category: "Traversal",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      description: "A graph traversal algorithm that explores all vertices at the current depth before moving to vertices at the next depth level. It uses a queue to keep track of vertices to visit.",
      useCase: "Used for finding shortest paths in unweighted graphs, level-order traversal, and finding connected components.",
      keyFeatures: [
        "Uses queue data structure (FIFO)",
        "Explores graph level by level",
        "Guarantees shortest path in unweighted graphs",
        "Good for finding minimum steps solutions"
      ]
    },
    {
      name: "Cycle Detection",
      category: "Analysis",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      description: "An algorithm to detect if a graph contains cycles. For directed graphs, it uses DFS with a recursion stack. For undirected graphs, it checks for back edges during DFS traversal.",
      useCase: "Used in deadlock detection, dependency analysis, and validating DAGs (Directed Acyclic Graphs).",
      keyFeatures: [
        "Different approaches for directed vs undirected graphs",
        "Uses color coding or recursion stack",
        "Can identify the actual cycle path",
        "Essential for topological sorting validation"
      ]
    },
    {
      name: "Prim's Algorithm",
      category: "Minimum Spanning Tree",
      timeComplexity: "O(E log V)",
      spaceComplexity: "O(V)",
      description: "A greedy algorithm that finds the minimum spanning tree (MST) of a weighted undirected graph. It starts with an arbitrary vertex and grows the MST by adding the smallest edge that connects a vertex in the MST to a vertex outside.",
      useCase: "Used in network design, clustering, and approximation algorithms for NP-hard problems.",
      keyFeatures: [
        "Greedy approach - always picks minimum weight edge",
        "Grows MST from a single starting vertex",
        "Uses priority queue for efficiency",
        "Works only on connected, undirected graphs"
      ]
    },
    {
      name: "Kruskal's Algorithm",
      category: "Minimum Spanning Tree",
      timeComplexity: "O(E log E)",
      spaceComplexity: "O(V)",
      description: "A greedy algorithm that finds the minimum spanning tree by sorting all edges and adding them to the MST if they don't create a cycle. It uses Union-Find data structure to detect cycles efficiently.",
      useCase: "Used in network design, clustering, and when edge weights are pre-sorted or when working with sparse graphs.",
      keyFeatures: [
        "Sorts all edges by weight first",
        "Uses Union-Find for cycle detection",
        "Builds MST by combining components",
        "More efficient for sparse graphs"
      ]
    },
    {
      name: "Dijkstra's Algorithm",
      category: "Shortest Path",
      timeComplexity: "O((V + E) log V)",
      spaceComplexity: "O(V)",
      description: "An algorithm for finding the shortest paths from a source vertex to all other vertices in a weighted graph with non-negative edge weights. It uses a greedy approach with a priority queue.",
      useCase: "Used in GPS navigation, network routing protocols, and social networking (shortest connection paths).",
      keyFeatures: [
        "Finds shortest path from source to all vertices",
        "Requires non-negative edge weights",
        "Uses priority queue for efficiency",
        "Greedy algorithm with optimal substructure"
      ]
    },
    {
      name: "Topological Sort",
      category: "Ordering",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      description: "A linear ordering of vertices in a directed acyclic graph (DAG) such that for every directed edge (u, v), vertex u comes before vertex v in the ordering. Can be implemented using DFS or Kahn's algorithm.",
      useCase: "Used in task scheduling, dependency resolution, course prerequisite ordering, and build systems.",
      keyFeatures: [
        "Only works on DAGs (no cycles allowed)",
        "Multiple valid orderings may exist",
        "Can be implemented with DFS or BFS",
        "Essential for dependency management"
      ]
    },
    {
      name: "Connected Components",
      category: "Analysis",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      description: "An algorithm to find all connected components in an undirected graph. A connected component is a maximal set of vertices such that there is a path between every pair of vertices within the component.",
      useCase: "Used in social network analysis, image processing (finding connected regions), and network reliability analysis.",
      keyFeatures: [
        "Works on undirected graphs",
        "Uses DFS or BFS for traversal",
        "Identifies isolated subgraphs",
        "Useful for clustering and community detection"
      ]
    },
    {
      name: "Inorder Traversal",
      category: "Tree Traversal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      description: "A tree traversal method that visits nodes in the order: Left subtree → Root → Right subtree. In binary search trees, this traversal visits nodes in sorted order.",
      useCase: "Used to retrieve data from BST in sorted order, expression tree evaluation, and syntax tree processing.",
      keyFeatures: [
        "Visits left subtree first, then root, then right",
        "Produces sorted output for BSTs",
        "Recursive implementation is natural",
        "Can be implemented iteratively with stack"
      ]
    },
    {
      name: "Preorder Traversal",
      category: "Tree Traversal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      description: "A tree traversal method that visits nodes in the order: Root → Left subtree → Right subtree. This traversal processes the root before its children.",
      useCase: "Used for copying/cloning trees, prefix expression evaluation, and tree serialization.",
      keyFeatures: [
        "Visits root first, then left and right subtrees",
        "Good for tree copying and serialization",
        "Processes parent before children",
        "Natural for top-down processing"
      ]
    },
    {
      name: "Postorder Traversal",
      category: "Tree Traversal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      description: "A tree traversal method that visits nodes in the order: Left subtree → Right subtree → Root. This traversal processes children before their parent.",
      useCase: "Used for deleting trees, calculating directory sizes, postfix expression evaluation, and bottom-up computations.",
      keyFeatures: [
        "Visits children before parent",
        "Good for cleanup and deletion operations",
        "Bottom-up processing approach",
        "Used in calculating aggregate values"
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Traversal": return "bg-blue-500";
      case "Analysis": return "bg-green-500";
      case "Minimum Spanning Tree": return "bg-purple-500";
      case "Shortest Path": return "bg-orange-500";
      case "Ordering": return "bg-red-500";
      case "Tree Traversal": return "bg-indigo-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Graph Algorithms</h2>
        <p className="text-white/80 text-lg max-w-3xl mx-auto">
          Comprehensive guide to essential graph algorithms and their applications
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {algorithms.map((algorithm, index) => (
          <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-white text-xl">{algorithm.name}</CardTitle>
                  <CardDescription className="text-white/70 mt-2">
                    {algorithm.description}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${getCategoryColor(algorithm.category)} text-white`}>
                    {algorithm.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Complexity</h4>
                  <div className="text-white/80 text-sm space-y-1">
                    <p><strong>Time:</strong> {algorithm.timeComplexity}</p>
                    <p><strong>Space:</strong> {algorithm.spaceComplexity}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Use Case</h4>
                  <p className="text-white/80 text-sm">{algorithm.useCase}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Key Features</h4>
                <ul className="text-white/80 text-sm space-y-1">
                  {algorithm.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

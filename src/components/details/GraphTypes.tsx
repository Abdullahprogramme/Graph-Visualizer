"use client";

import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CytoscapeElement {
  data: {
    id: string;
    source?: string;
    target?: string;
    weight?: string;
  };
}

interface CytoscapeLayout {
  name: string;
  radius?: number;
  padding?: number;
  directed?: boolean;
  roots?: string;
  spacingFactor?: number;
}

interface CytoscapeStyle {
  selector: string;
  style: Record<string, unknown>;
}

interface GraphVisualizationProps {
  id: string;
  elements: CytoscapeElement[];
  layout?: CytoscapeLayout;
  style?: CytoscapeStyle[];
}

function GraphVisualization({ id, elements, layout, style }: GraphVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: style || [
        {
          selector: 'node',
          style: {
            'background-color': '#3b82f6',
            'label': 'data(id)',
            'color': 'white',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': 40,
            'height': 40,
            'font-size': 14,
            'font-weight': 'bold'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#64748b',
            'target-arrow-color': '#64748b',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
      layout: layout || {
        name: 'circle',
        radius: 60,
        padding: 20
      },
      userZoomingEnabled: false,
      userPanningEnabled: false,
      boxSelectionEnabled: false,
      autoungrabify: true
    });

    return () => {
      cy.destroy();
    };
  }, [elements, layout, style, id]);

  return (
    <div
      ref={containerRef}
      className="w-full h-32 border rounded-lg bg-gray-50"
      id={id}
    />
  );
}

export default function GraphTypes() {
  // Directed Graph
  const directedElements = [
    { data: { id: 'A' } },
    { data: { id: 'B' } },
    { data: { id: 'C' } },
    { data: { id: 'D' } },
    { data: { id: 'AB', source: 'A', target: 'B' } },
    { data: { id: 'BC', source: 'B', target: 'C' } },
    { data: { id: 'CD', source: 'C', target: 'D' } },
    { data: { id: 'DA', source: 'D', target: 'A' } }
  ];

  // Undirected Graph
  const undirectedElements = [
    { data: { id: 'A' } },
    { data: { id: 'B' } },
    { data: { id: 'C' } },
    { data: { id: 'D' } },
    { data: { id: 'AB', source: 'A', target: 'B' } },
    { data: { id: 'BC', source: 'B', target: 'C' } },
    { data: { id: 'CD', source: 'C', target: 'D' } },
    { data: { id: 'AD', source: 'A', target: 'D' } }
  ];

  const undirectedStyle = [
    {
      selector: 'node',
      style: {
        'background-color': '#10b981',
        'label': 'data(id)',
        'color': 'white',
        'text-valign': 'center',
        'text-halign': 'center',
        'width': 40,
        'height': 40,
        'font-size': 14,
        'font-weight': 'bold'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#64748b',
        'curve-style': 'bezier'
      }
    }
  ];

  // Binary Tree
  const treeElements = [
    { data: { id: 'A' } },
    { data: { id: 'B' } },
    { data: { id: 'C' } },
    { data: { id: 'D' } },
    { data: { id: 'E' } },
    { data: { id: 'F' } },
    { data: { id: 'G' } },
    { data: { id: 'AB', source: 'A', target: 'B' } },
    { data: { id: 'AC', source: 'A', target: 'C' } },
    { data: { id: 'BD', source: 'B', target: 'D' } },
    { data: { id: 'BE', source: 'B', target: 'E' } },
    { data: { id: 'CF', source: 'C', target: 'F' } },
    { data: { id: 'CG', source: 'C', target: 'G' } }
  ];

  const treeLayout = {
    name: 'breadthfirst',
    directed: true,
    roots: '#A',
    padding: 10,
    spacingFactor: 1.5
  };

  const treeStyle = [
    {
      selector: 'node',
      style: {
        'background-color': '#8b5cf6',
        'label': 'data(id)',
        'color': 'white',
        'text-valign': 'center',
        'text-halign': 'center',
        'width': 35,
        'height': 35,
        'font-size': 12,
        'font-weight': 'bold'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#64748b',
        'target-arrow-color': '#64748b',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier'
      }
    }
  ];

  // Weighted Graph
  const weightedElements = [
    { data: { id: 'A' } },
    { data: { id: 'B' } },
    { data: { id: 'C' } },
    { data: { id: 'D' } },
    { data: { id: 'AB', source: 'A', target: 'B', weight: '5' } },
    { data: { id: 'BC', source: 'B', target: 'C', weight: '3' } },
    { data: { id: 'CD', source: 'C', target: 'D', weight: '2' } },
    { data: { id: 'AD', source: 'A', target: 'D', weight: '7' } }
  ];

  const weightedStyle = [
    {
      selector: 'node',
      style: {
        'background-color': '#f59e0b',
        'label': 'data(id)',
        'color': 'white',
        'text-valign': 'center',
        'text-halign': 'center',
        'width': 40,
        'height': 40,
        'font-size': 14,
        'font-weight': 'bold'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#64748b',
        'target-arrow-color': '#64748b',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': 'data(weight)',
        'font-size': 12,
        'text-background-color': 'white',
        'text-background-opacity': 0.8,
        'text-background-padding': 2
      }
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Graph Types</h2>
        <p className="text-white/80 text-lg max-w-3xl mx-auto">
          Understanding different types of graphs and their characteristics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Directed Graph */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Directed Graph</CardTitle>
            <CardDescription className="text-white/70">
              Edges have direction, represented by arrows
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <GraphVisualization
              id="directed-graph"
              elements={directedElements}
            />
            <div className="text-white/80 text-sm space-y-2">
              <p><strong>Characteristics:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Edges have a specific direction (A → B ≠ B → A)</li>
                <li>Used to model one-way relationships</li>
                <li>Examples: Web links, social media follows, dependency graphs</li>
                <li>Can have cycles and be traversed in specific directions</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Undirected Graph */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Undirected Graph</CardTitle>
            <CardDescription className="text-white/70">
              Edges have no direction, bidirectional connections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <GraphVisualization
              id="undirected-graph"
              elements={undirectedElements}
              style={undirectedStyle}
            />
            <div className="text-white/80 text-sm space-y-2">
              <p><strong>Characteristics:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Edges are bidirectional (A ↔ B)</li>
                <li>Represents symmetric relationships</li>
                <li>Examples: Friendships, road networks, molecular structures</li>
                <li>Simpler to analyze for connectivity and paths</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Binary Tree */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Binary Tree</CardTitle>
            <CardDescription className="text-white/70">
              Hierarchical structure with at most two children per node
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <GraphVisualization
              id="tree-graph"
              elements={treeElements}
              layout={treeLayout}
              style={treeStyle}
            />
            <div className="text-white/80 text-sm space-y-2">
              <p><strong>Characteristics:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Each node has at most two children (left and right)</li>
                <li>Exactly one root node with no incoming edges</li>
                <li>No cycles - acyclic structure</li>
                <li>Used for searching, sorting, and hierarchical data</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Weighted Graph */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Weighted Graph</CardTitle>
            <CardDescription className="text-white/70">
              Edges have associated weights or costs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <GraphVisualization
              id="weighted-graph"
              elements={weightedElements}
              style={weightedStyle}
            />
            <div className="text-white/80 text-sm space-y-2">
              <p><strong>Characteristics:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Each edge has an associated numerical weight</li>
                <li>Weights can represent distance, cost, time, or capacity</li>
                <li>Used in shortest path and minimum spanning tree algorithms</li>
                <li>Examples: Road networks with distances, network latency</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

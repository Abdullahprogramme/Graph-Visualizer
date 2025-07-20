"use client";

import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

type Props = {
  nodes: string[];
  edges: [string, string][];
  isUndirected: boolean;
  cyRef: React.RefObject<cytoscape.Core | null>;
  highlightPath: number[];
};

export default function GraphCanvas({ nodes, edges, isUndirected, cyRef, highlightPath }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || nodes.length === 0) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: [
        ...nodes.map((node) => ({
          data: { id: node },
        })),
        ...edges.map(([u, v]) => ({
          data: { id: `${u}-${v}`, source: u, target: v },
        })),
      ],
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#0ea5e9",
            label: "data(id)",
            color: "white",
            "font-size": "12px",
            "text-valign": "center",
            "text-halign": "center",
            width: "30px",
            height: "30px",
          },
        },
        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": "#94a3b8",
            "target-arrow-color": isUndirected ? "none" : "#94a3b8",
            "target-arrow-shape": isUndirected ? "none" : "triangle",
            "curve-style": "bezier",
          },
        },
        {
          selector: ".highlighted-node",
          style: {
            "background-color": "#22c55e",
            "border-color": "#16a34a",
            "border-width": 2,
          },
        },
        {
          selector: ".highlighted-edge",
          style: {
            "line-color": "#22c55e",
            "target-arrow-color": isUndirected ? "none" : "#22c55e",
            width: 5,
          },
        },
      ],
      layout: {
        name: "grid",
        rows: Math.ceil(nodes.length / 2),
        fit: true,
        padding: 30,
      },
    });

    cyRef.current = cy;

    // Highlight path
    if (highlightPath.length > 0) {
      cy.nodes().removeClass("highlighted-node");
      cy.edges().removeClass("highlighted-edge");

      highlightPath.forEach((nodeIndex) => {
        const nodeId = nodes[nodeIndex];
        cy.getElementById(nodeId).addClass("highlighted-node");
      });

      for (let i = 0; i < highlightPath.length - 1; i++) {
        const u = nodes[highlightPath[i]];
        const v = nodes[highlightPath[i + 1]];
        const edgeId = `${u}-${v}`;
        const reverseEdgeId = `${v}-${u}`;
        cy.getElementById(edgeId).addClass("highlighted-edge");
        if (isUndirected) {
          cy.getElementById(reverseEdgeId).addClass("highlighted-edge");
        }
      }
    }

    // Adjust layout on window resize
    const handleResize = () => {
      cy.fit();
      cy.center();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cy.destroy();
    };
  }, [nodes, edges, isUndirected, highlightPath]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[60vh] min-h-[700px] max-h-[800px] border rounded-lg bg-white"
    />
  );
}
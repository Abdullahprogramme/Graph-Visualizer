"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Download, CheckCircle, ArrowBigDownDash } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import GraphCanvas from "@/components/graph/GraphCanvas";
import GraphForm from "@/components/graph/GraphForm";
import GraphAlgorithms from "@/components/graph/GraphAlgorithms";
import UploadGraph from "@/components/graph/UploadGraph";
import { Graph } from "@/lib/graph";
import cytoscape from "cytoscape";

export default function CreatePage() {
  const [edges, setEdges] = useState<[string, string][]>([]);
  const [nodes, setNodes] = useState<string[]>([]);
  const [isUndirected, setIsUndirected] = useState(true);
  const [highlightPath, setHighlightPath] = useState<number[]>([]);
  const cyRef = useRef<cytoscape.Core | null>(null);

  const handleCreate = (nodes: string[], edges: [string, string][], isUndirected: boolean) => {
    setNodes(nodes);
    setEdges(edges);
    setIsUndirected(isUndirected);
    setHighlightPath([]); // Reset highlight when graph changes

    const graph = new Graph(nodes.length);
    edges.forEach(([u, v]) => {
      const uIndex = nodes.indexOf(u);
      const vIndex = nodes.indexOf(v);
      graph.addEdge(uIndex, vIndex, isUndirected);
    });

    // Show success toast
    toast.success("Graph created successfully!", {
      description: `Created ${isUndirected ? 'undirected' : 'directed'} graph with ${nodes.length} nodes and ${edges.length} edges`,
      icon: <CheckCircle className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleSaveFile = () => {
    if (nodes.length === 0) {
      toast.error("No graph to save", { duration: 2000 });
      return;
    }

    const content = `${nodes.length}\n${nodes.join('\n')}\n${edges.length}\n${edges.map(e => e.join(' ')).join('\n')}\n${isUndirected ? 'UD' : 'D'}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "graph.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSaveImage = () => {
    if (cyRef.current) {
      try {
        const pngDataUrl = cyRef.current.png({ scale: 2, full: true, bg: "white" });
        const link = document.createElement("a");
        link.href = pngDataUrl;
        link.download = "graph.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error generating PNG:", error);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Header */}
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Desktop Layout - Horizontal */}
          <div className="hidden sm:block">
            <div className="relative flex items-center">
              {/* Back Button - Left Side */}
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2 bg-white/80 hover:bg-white text-gray-900">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              
              
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Breadcrumb>
                  <BreadcrumbList className="text-white/80">
                    <BreadcrumbItem>
                      <BreadcrumbLink 
                        asChild
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        <Link href="/">
                          <Home className="h-4 w-4" />
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-white/60" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-white font-medium">
                        Graph Visualizer
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </motion.div>
            </div>
          </div>

          {/* Mobile Layout - Vertical Stack */}
          <div className="block sm:hidden">
            <div className="flex flex-col items-center space-y-4">
              {/* Breadcrumb - Top on Mobile */}
              <motion.div
                className="w-full flex justify-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Breadcrumb>
                  <BreadcrumbList className="text-white/80">
                    <BreadcrumbItem>
                      <BreadcrumbLink 
                        asChild
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        <Link href="/">
                          <Home className="h-4 w-4" />
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-white/60" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-white font-medium">
                        Graph Visualizer
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </motion.div>

              {/* Back Button - Bottom on Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              >
                <Link href="/">
                  <Button variant="outline" className="flex items-center gap-2 bg-white/80 hover:bg-white text-gray-900">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="flex flex-col lg:flex-row gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Form Section (30%) */}
          <div className="w-full lg:w-[30%] bg-white/95 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Create Your Graph</h2>
              <UploadGraph onGraphUpload={handleCreate} />
            </div>
            <GraphForm onCreate={handleCreate} />
            {nodes.length > 0 && (
              <GraphAlgorithms
                nodes={nodes}
                edges={edges}
                isUndirected={isUndirected}
                onHighlightPath={setHighlightPath}
              />
            )}
          </div>

          {/* Graph Visualization (70%) */}
          <div className="w-full lg:w-[70%] bg-white/95 rounded-xl shadow-lg p-6">
            {nodes.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Graph Visualization</h3>
                  <div className="flex items-center gap-2 justify-end w-full">
                    <TooltipProvider>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={handleSaveFile}
                            disabled={nodes.length === 0}
                            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-md disabled:opacity-50"
                          >
                            {/* Use FileText icon for .txt download */}
                            <Download className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Download Graph as .txt file</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={handleSaveImage}
                            disabled={nodes.length === 0}
                            className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2 shadow-md disabled:opacity-50"
                          >
                            {/* Use Image icon for PNG download */}
                            <ArrowBigDownDash className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Download Graph as PNG</p>
                        </TooltipContent>
                      </Tooltip>
                      
                    </TooltipProvider>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <GraphCanvas
                    nodes={nodes}
                    edges={edges}
                    isUndirected={isUndirected}
                    cyRef={cyRef}
                    highlightPath={highlightPath}
                  />
                </div>
              </>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

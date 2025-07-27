"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

interface UploadGraphProps {
  onGraphUpload: (nodes: string[], edges: [string, string][], isUndirected: boolean) => void;
}

export default function UploadGraph({ onGraphUpload }: UploadGraphProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.txt')) {
      toast.error("Please upload a .txt file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const lines = content.trim().split('\n').map(line => line.trim());
        
        if (lines.length < 3) {
          throw new Error("File format is incorrect. Must have at least 3 lines.");
        }

        // Parse number of nodes
        const numNodes = parseInt(lines[0]);
        if (isNaN(numNodes) || numNodes <= 0) {
          throw new Error("First line must be a positive number representing node count.");
        }

        // Parse node names
        const nodes: string[] = [];
        for (let i = 1; i <= numNodes; i++) {
          if (i >= lines.length) {
            throw new Error(`Missing node name at line ${i + 1}`);
          }
          nodes.push(lines[i]);
        }

        // Parse number of edges
        const edgeStartLine = numNodes + 1;
        if (edgeStartLine >= lines.length) {
          throw new Error("Missing edge count line");
        }
        
        const numEdges = parseInt(lines[edgeStartLine]);
        if (isNaN(numEdges) || numEdges < 0) {
          throw new Error("Edge count must be a non-negative number.");
        }

        // Parse edges
        const edges: [string, string][] = [];
        for (let i = edgeStartLine + 1; i <= edgeStartLine + numEdges; i++) {
          if (i >= lines.length) {
            throw new Error(`Missing edge at line ${i + 1}`);
          }
          
          const edgeParts = lines[i].split(' ').filter(part => part.length > 0);
          if (edgeParts.length !== 2) {
            throw new Error(`Edge at line ${i + 1} must have exactly 2 nodes separated by space.`);
          }
          
          const [source, target] = edgeParts;
          if (!nodes.includes(source) || !nodes.includes(target)) {
            throw new Error(`Edge at line ${i + 1} contains unknown node(s): ${source}, ${target}`);
          }
          
          edges.push([source, target]);
        }

        // Parse graph type (last line)
        const graphTypeLine = edgeStartLine + numEdges + 1;
        if (graphTypeLine >= lines.length) {
          throw new Error("Missing graph type line (UD for undirected or D for directed)");
        }
        
        const graphType = lines[graphTypeLine].toUpperCase();
        if (graphType !== 'UD' && graphType !== 'D') {
          throw new Error("Graph type must be 'UD' (undirected) or 'D' (directed)");
        }
        
        const isUndirected = graphType === 'UD';

        // Call the handler with parsed data
        onGraphUpload(nodes, edges, isUndirected);
        
        // Close popover and show success
        setIsOpen(false);
        toast.success("Graph uploaded successfully!", {
          description: `Loaded ${nodes.length} nodes, ${edges.length} edges (${isUndirected ? 'undirected' : 'directed'})`,
        });

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

      } catch (error) {
        toast.error("Failed to parse file", {
          description: error instanceof Error ? error.message : "Invalid file format",
        });
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read file");
    };

    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const exampleContent = `4
A
B
C
D
3
A B
B C
C A
UD`;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 border-gray-300 hover:border-gray-400"
        >
          <Upload className="h-4 w-4" />
          Upload
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 sm:w-96 p-4 sm:p-6" align="start">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Upload Graph File</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* File Upload Button */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Choose a text file (.txt)
            </label>
            <Button
              onClick={handleButtonClick}
              className="w-full flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <FileText className="h-4 w-4" />
              Select File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Example Format */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Expected file format:
            </label>
            <div className="bg-gray-50 rounded-md p-3 border">
              <pre className="text-xs text-gray-800 font-mono whitespace-pre">
                {exampleContent}
              </pre>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Line 1:</strong> Number of nodes</p>
              <p><strong>Lines 2-5:</strong> Node names (one per line)</p>
              <p><strong>Line 6:</strong> Number of edges</p>
              <p><strong>Lines 7-9:</strong> Edges (source target, space-separated)</p>
              <p><strong>Last line:</strong> Graph type (UD = undirected, D = directed)</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  onCreate: (nodes: string[], edges: [string, string][], isUndirected: boolean) => void;
};

export default function GraphForm({ onCreate }: Props) {
  const [numNodes, setNumNodes] = useState(2);
  const [nodeNames, setNodeNames] = useState<string[]>(["A", "B"]);
  const [edges, setEdges] = useState<[string, string][]>([]);
  const [isUndirected, setIsUndirected] = useState(true);

  const handleNumNodesChange = (value: string) => {
    const num = Math.min(Number(value), 20);
    setNumNodes(num);
    setNodeNames((prev) => {
      const newNames = [...prev];
      if (num > prev.length) {
        for (let i = prev.length; i < num; i++) {
          newNames.push(String.fromCharCode(65 + i));
        }
      } else {
        newNames.length = num;
      }
      return newNames;
    });
    setEdges([]);
  };

  const handleNodeNameChange = (index: number, value: string) => {
    setNodeNames((prev) => {
      const newNames = [...prev];
      newNames[index] = value;
      return newNames;
    });
    setEdges([]);
  };

  const addEdge = () => {
    if (nodeNames.length >= 2) {
      setEdges((prev) => [...prev, [nodeNames[0], nodeNames[1]]]);
    }
  };

  const updateEdge = (index: number, position: "start" | "end", value: string) => {
    setEdges((prev) => {
      const newEdges = [...prev];
      newEdges[index] = position === "start" ? [value, newEdges[index][1]] : [newEdges[index][0], value];
      return newEdges;
    });
  };

  const removeEdge = (index: number) => {
    setEdges((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (nodeNames.every((name) => name.trim() !== "")) {
      onCreate(nodeNames, edges, isUndirected);
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-200px)] pr-4 md:pr-6">
      <div className="space-y-6 p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm max-w-2xl mx-auto">
        {/* Number of Nodes */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-800">Number of Nodes (max 20)</label>
          <Input
            type="number"
            value={numNodes}
            onChange={(e) => handleNumNodesChange(e.target.value)}
            min={1}
            max={20}
            className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of nodes"
          />
        </div>

        {/* Node Names */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-800">Node Names</label>
          <div className="grid gap-3 sm:grid-cols-2">
            {nodeNames.map((name, index) => (
              <Input
                key={index}
                value={name}
                onChange={(e) => handleNodeNameChange(index, e.target.value)}
                placeholder={`Node ${index + 1}`}
                className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
        </div>

        {/* Undirected Switch */}
        <div className="flex items-center space-x-3">
          <Switch
            id="undirected"
            checked={isUndirected}
            onCheckedChange={setIsUndirected}
            className="data-[state=checked]:bg-blue-600"
          />
          <Label htmlFor="undirected" className="text-sm font-semibold text-gray-800 cursor-pointer">
            Undirected Graph
          </Label>
        </div>

        {/* Edges */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-800">Edges</label>
          <div className="space-y-3">
            {edges.map((edge, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-2 items-center">
                <Select
                  value={edge[0]}
                  onValueChange={(value) => updateEdge(index, "start", value)}
                >
                  <SelectTrigger className="w-full sm:w-24 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Start" />
                  </SelectTrigger>
                  <SelectContent>
                    {nodeNames.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-gray-500 hidden sm:inline">→</span>
                <Select
                  value={edge[1]}
                  onValueChange={(value) => updateEdge(index, "end", value)}
                >
                  <SelectTrigger className="w-full sm:w-24 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="End" />
                  </SelectTrigger>
                  <SelectContent>
                    {nodeNames.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="destructive"
                  onClick={() => removeEdge(index)}
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <Button
            onClick={addEdge}
            className="mt-3 w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            disabled={nodeNames.length < 2}
          >
            Add Edge
          </Button>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md py-2 font-semibold"
        >
          Generate Graph
        </Button>

        {/* Reset Button */}
        <Button
          onClick={() => {
            setNumNodes(2);
            setNodeNames(["A", "B"]);
            setEdges([]);
            setIsUndirected(true);
          }}
          variant="outline"
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md py-2 font-semibold"
        >
          Reset
        </Button>
      </div>
    </ScrollArea>
  );
}
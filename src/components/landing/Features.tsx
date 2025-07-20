"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LucideGrape, LucideSettings, LucideSearch } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: (
        <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
          <LucideGrape className="h-8 w-8 text-white" />
        </div>
      ),
      title: "Interactive Graphs",
      description: "Build and manipulate graphs visually with intuitive controls.",
      bgClass: "bg-gradient-to-br from-blue-100 to-blue-50",
    },
    {
      icon: (
        <div className="mx-auto h-12 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
          <LucideSettings className="h-8 w-8 text-white" />
        </div>
      ),
      title: "Customizable Options",
      description: "Choose directed or undirected, set vertices and edges, and more.",
      bgClass: "bg-gradient-to-br from-indigo-100 to-indigo-50",
    },
    {
      icon: (
        <div className="mx-auto h-12 w-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
          <LucideSearch className="h-8 w-8 text-white" />
        </div>
      ),
      title: "Algorithm Visualization",
      description: "Run BFS, DFS, and other algorithms and see results such as paths.",
      bgClass: "bg-gradient-to-br from-purple-100 to-purple-50",
    },
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-12 tracking-tight">
            Powerful Features
          </h2>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Card className={`${feature.bgClass} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50`}>
                <CardHeader>
                  {feature.icon}
                  <Separator className="my-4 bg-gray-300/50" />
                  <p className="text-xl sm:text-2xl font-semibold text-gray-800">
                    {feature.title}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 bg-blue-200/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </section>
  );
}
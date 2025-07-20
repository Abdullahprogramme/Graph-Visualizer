"use client";

import { Button } from "@/components/ui/button";
import { 
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ArrowRight, Home, SlashIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

            {/* Content */}
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
              
                <motion.div
                    className="mb-6 sm:mb-8 flex justify-center"
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

              {/* Main Title */}
              <motion.div
                className="mb-8 sm:mb-12 lg:mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
                  Craft Stunning Graphs <br /> with Seamless Ease
                </h1>
              </motion.div>

              {/* Breadcrumb-style Features */}
              <motion.div
                className="flex justify-center mb-10 sm:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <Breadcrumb>
                  <BreadcrumbList className="text-white/90 text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-white/90 font-medium">
                        Visualize
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <span className="flex items-center justify-center">
                          <SlashIcon size={32} className="text-white/70" />
                        </span>
                      </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-white/90 font-medium">
                        Analyze
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <span className="flex items-center justify-center">
                        <SlashIcon size={32} className="text-white/70" />
                      </span>
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-white/90 font-medium">
                        Innovate
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <Link href="/create">
                  <Button
                    size="lg"
                    className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Creating
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>

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
        </section>
    );
}
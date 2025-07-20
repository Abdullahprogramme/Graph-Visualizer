"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      question: "What is this app used for?",
      answer: "This app helps you create, visualize, and analyze directed and undirected graphs for learning or demonstration purposes.",
    },
    {
      question: "Can I customize the graph type?",
      answer: "Yes! You can choose between directed, undirected, and customize vertices, edges, and many other options such as algorithms to run on the graph.",
    },
    {
      question: "Is it suitable for learning algorithms?",
      answer: "Absolutely. You can run BFS, DFS, and see them colour coded to understand how they work on graphs.",
    },
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto rounded-lg border border-gray-200/50 shadow-lg bg-gradient-to-br from-white to-gray-50"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="border-b border-gray-200/50 last:border-b-0"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300">
                  <p className="text-base sm:text-lg font-semibold text-gray-800 text-left">
                    {faq.question}
                  </p>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4">
                  <p className="text-sm sm:text-base text-gray-600">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 bg-blue-200/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </section>
  );
}
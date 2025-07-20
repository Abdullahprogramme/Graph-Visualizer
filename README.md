# 🔗 Graph Visualizer

A modern, interactive web application for creating, visualizing, and analyzing graphs with various algorithms. Built with Next.js, TypeScript, and cutting-edge web technologies for educational purposes and graph theory exploration.

![Graph Visualizer](https://img.shields.io/badge/Next.js-15.4.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Cytoscape](https://img.shields.io/badge/Cytoscape-3.32.1-orange?style=for-the-badge)

## ✨ Features

### 📊 Graph Creation & Visualization
- **Interactive Graph Builder**: Create custom graphs with up to 20 nodes
- **Real-time Visualization**: Powered by Cytoscape.js for smooth, interactive graph rendering
- **Directed & Undirected Graphs**: Toggle between graph types with a simple switch
- **Dynamic Edge Management**: Add, edit, and remove edges with intuitive controls
- **Export Functionality**: Download graphs as high-quality PNG images

### 🧮 Algorithm Implementation
- **Breadth-First Search (BFS)**: Explore graphs level by level
- **Depth-First Search (DFS)**: Traverse graphs depth-wise
- **Dijkstra's Algorithm**: Find shortest paths between nodes
- **Topological Sort**: Order vertices in directed acyclic graphs
- **Cycle Detection**: Identify cycles in graphs
- **Minimum Spanning Tree**: Prim's and Kruskal's algorithms
- **Connected Components**: Find disconnected graph components

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Glass Morphism Effects**: Modern, translucent design elements
- **Smooth Animations**: Framer Motion for fluid user interactions
- **Toast Notifications**: Real-time feedback using Sonner
- **Accessibility**: Full keyboard navigation and screen reader support

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.17.0 or later
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdullahprogramme/Graph-Visualizer
   cd Graph-Visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## 📱 How to Use

### Creating a Graph

1. **Set Number of Nodes**: Choose between 1-20 nodes
2. **Name Your Nodes**: Customize node labels (defaults to A, B, C...)
3. **Choose Graph Type**: Toggle between directed/undirected
4. **Add Edges**: Select start and end nodes to create connections
5. **Generate**: Click "Generate Graph" to visualize

### Running Algorithms

1. **Select Algorithm**: Choose from the dropdown menu
2. **Set Parameters**: Pick start node (and target node for pathfinding)
3. **Execute**: Click "Run Algorithm" to see results
4. **View Results**: Algorithm output and path highlighting

### Exporting Graphs

- Click the download button to save your graph as a PNG image
- High-resolution export with customizable scaling

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 15.4.2](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://reactjs.org/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern React component library
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Class Variance Authority](https://cva.style/)** - CSS-in-JS variants

### Graph Visualization
- **[Cytoscape.js 3.32.1](https://cytoscape.org/)** - Graph theory library for visualization
- **Custom Graph Class** - TypeScript implementation of graph data structures

### Animations & Interactions
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library

### Development Tools
- **[ESLint 9](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Turbopack](https://turbo.build/pack)** - Fast bundler for development

## 📁 Project Structure

```
graph-visualizer/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── create/            # Graph creation page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── graph/             # Graph-related components
│   │   │   ├── GraphCanvas.tsx
│   │   │   ├── GraphForm.tsx
│   │   │   └── GraphAlgorithms.tsx
│   │   ├── landing/           # Landing page components
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   └── FAQ.tsx
│   │   ├── Navs/              # Navigation components
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   └── ui/                # shadcn/ui components
│   └── lib/
│       ├── graph.ts           # Graph data structure & algorithms
│       └── utils.ts           # Utility functions
├── public/                    # Static assets
├── components.json            # shadcn/ui configuration
└── tailwind.config.js         # Tailwind configuration
```

## 🎯 Algorithms Implemented

| Algorithm | Purpose | Time Complexity | Space Complexity |
|-----------|---------|----------------|------------------|
| **BFS** | Graph traversal, shortest path (unweighted) | O(V + E) | O(V) |
| **DFS** | Graph traversal, topological sort | O(V + E) | O(V) |
| **Dijkstra** | Shortest path (weighted graphs) | O((V + E) log V) | O(V) |
| **Prim's MST** | Minimum spanning tree | O(E log V) | O(V) |
| **Kruskal's MST** | Minimum spanning tree | O(E log E) | O(V) |
| **Cycle Detection** | Find cycles in graphs | O(V + E) | O(V) |
| **Connected Components** | Find graph components | O(V + E) | O(V) |
| **Topological Sort** | Order vertices in DAG | O(V + E) | O(V) |

## 🎨 Design System

### Color Palette
- **Primary**: Blue to Purple gradient (#3B82F6 → #8B5CF6)
- **Secondary**: Indigo shades
- **Neutral**: Gray scale for text and backgrounds
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Primary Font**: Geist Sans (Vercel's font family)
- **Monospace**: Geist Mono for code elements

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abdullah. T**
- Portfolio: [https://abdullahtariq2004.netlify.app/](https://abdullahtariq2004.netlify.app/)
- LinkedIn: [abdullahtariq78](https://www.linkedin.com/in/abdullahtariq78/)
- GitHub: [Abdullahprogramme](https://github.com/Abdullahprogramme)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [shadcn](https://ui.shadcn.com/) for the beautiful UI components
- [Cytoscape.js](https://cytoscape.org/) for graph visualization capabilities
- Open source community for inspiration and tools

---

<div align="center">
  <strong>Built with ❤️ for the graph theory community</strong>
</div>

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-transparent sticky top-0 z-50 opacity-90 pb-2 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* App Name - Left Side */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 p-2">
              Graph <br />
              <span className="pl-4 inline-block">Visualizer</span>
            </h1>
          </Link>

          {/* App Icon - Right Side */}
          <div className="flex items-center">
            <div className="p-2">
              <Image
                src="/graph.png"
                alt="Graph Visualizer Icon"
                width={40}
                height={40}
                className="h-10 w-10"
                />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
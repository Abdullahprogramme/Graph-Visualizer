import Link from "next/link";
import Image from "next/image";
import { Settings, MessageCircle, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

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

          {/* App Icon and Settings - Right Side */}
          <div className="flex items-center gap-2">
            <div className="p-2 order-2">
              <Image
                src="/graph.png"
                alt="Graph Visualizer Icon"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Settings className="h-6 w-6 text-gray-700" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[180px]">

                <DropdownMenuItem className="flex flex-col items-start gap-1">
                  <span className="font-medium">Help me improve</span>
                  <Separator />
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                    <Link href="https://github.com/Abdullahprogramme/Graph-Visualizer/issues" className="text-xs text-gray-500" rel="noopener noreferrer">Give feedback</Link>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex flex-col items-start gap-1">
                  <span className="font-medium">Version information</span>
                  <Separator />
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-purple-500" />
                    <span className="text-xs text-gray-500">v1.0.0</span>
                  </div>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

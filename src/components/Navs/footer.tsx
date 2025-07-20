import { LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Left Side - Project Attribution */}
                    <div className="text-sm">
                        <span>A project by: </span>
                        <Link 
                            href="https://abdullahtariq2004.netlify.app/" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors font-medium underline decoration-transparent hover:decoration-current"
                        >
                            Abdullah. T
                        </Link>
                    </div>

                    {/* Center - Social Navigation */}
                    <TooltipProvider>
                        <NavigationMenu>
                            <NavigationMenuList className="flex items-center space-x-2">
                                <NavigationMenuItem>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="https://www.linkedin.com/in/abdullahtariq78/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                                >
                                                    <LinkedInLogoIcon className="h-5 w-5" />
                                                </Link>
                                            </NavigationMenuLink>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>LinkedIn</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="https://github.com/Abdullahprogramme"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                                                >
                                                    <GitHubLogoIcon className="h-5 w-5" />
                                                </Link>
                                            </NavigationMenuLink>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>GitHub</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="mailto:abdtariq78@gmail.com"
                                                    className="p-2 text-gray-300 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                                >
                                                    <Mail className="h-5 w-5" />
                                                </Link>
                                            </NavigationMenuLink>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Email</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </TooltipProvider>

                    {/* Right Side - Copyright (on mobile this will be below) */}
                    <div className="text-sm text-gray-400 order-first sm:order-last">
                        © {new Date().getFullYear()} Graph Visualizer
                    </div>
                </div>
            </div>
        </footer>
    );
}

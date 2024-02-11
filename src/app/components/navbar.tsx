import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/theme";
import { useAuth } from "../contexts/auth";
import { cn } from "@/lib/utils";

export function NavBar() {
  const location = useLocation();

  const { setTheme } = useTheme();
  const { onLogout } = useAuth();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            to="/dashboard"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname !== "/dashboard" && "text-muted-foreground"
            )}
          >
            Overview
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden"
          >
            Categories
          </Link>
          <Link
            to="/links"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname !== "/links" && "text-muted-foreground"
            )}
          >
            Links
          </Link>
          <Link
            to="/settings"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname !== "/settings" && "text-muted-foreground"
            )}
          >
            Settings
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
                size="icon"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" onClick={() => onLogout()}>
            <LogOut className="sm:mr-2 h-4 w-4" />
            <span className="hidden sm:flex">Log-out</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

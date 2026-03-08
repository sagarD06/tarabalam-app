"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-border">
      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌟</span>
        <div>
          <h1 className="text-lg font-bold text-foreground leading-none">
            Tarabalam
          </h1>
          <p className="text-xs text-muted-foreground">
            Daily Star Checker
          </p>
        </div>
      </div>

      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark"
          ? <Sun className="h-5 w-5 text-primary" />
          : <Moon className="h-5 w-5 text-primary" />
        }
      </Button>
    </nav>
  );
}
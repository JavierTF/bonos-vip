"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, User, LogOut, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("bonos-vip");
    if (userData) {
      const parsed = JSON.parse(userData);
      if (parsed.user) {
        setUser(parsed.user);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bonos-vip");
    setUser(null);
    router.push("/");
  };

  return (
    <header className="border-b">
      <div className="py-4 bg-red-600">
        <div className="flex items-center justify-between px-10">
          <Link href="/" className="text-2xl font-bold text-white">
            BonosArtGoMA
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar ofertas..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push("/admin")}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Panel admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/form">
                <Button variant="outline">Iniciar sesión</Button>
              </Link>
            )}
          </div>
        </div>

        <nav className="flex gap-6 mt-4 px-10">
          {["Spa", "Restaurantes", "Ocio", "Viajes", "Belleza"].map(
            (category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="text-white hover:text-gray-900"
              >
                {category}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}

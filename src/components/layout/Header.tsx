"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, LogOut, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import User from "@/models/user"

export function Header() {
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("bonos-vip");
    if (userData) {
      const parsed = JSON.parse(userData);
      if (parsed.user) {
        setUser(parsed.user);
      }
    }
  }, []);

  const handleAdmin = () => {

    toast({
      variant: "default",
      title: "Abriendo dashboard",
      description: "Redirigiendo...",
    });

    setTimeout(() => {
      router.push("/admin")
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("bonos-vip");
    setUser(null);

    toast({
      variant: "default",
      title: "Sesión cerrada exitosamente",
      description: "Has cerrado sesión correctamente.",
    });

    setTimeout(() => {
      router.push("/");
    }, 1000);
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
            {user && user.role === "admin" ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={user.avatar || undefined}
                      alt={`Avatar de ${user.name}`}
                    />
                    <AvatarFallback>
                      {user.name ? user.name.charAt(0).toUpperCase() : ""}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="font-normal">
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuItem onClick={handleAdmin}>
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Panel admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
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

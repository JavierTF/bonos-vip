import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="container px-10 py-4 bg-red-600">
        <div className="flex items-center justify-between">
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

            <Link href="/form">
              <Button variant="outline">Iniciar sesión</Button>
            </Link>
            {/* <Link href="/sign-up">
              <Button>Registrarse</Button>
            </Link> */}
          </div>
        </div>

        <nav className="flex gap-6 mt-4">
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

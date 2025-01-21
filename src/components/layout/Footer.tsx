import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Sobre Nosotros</h3>
            <ul className="space-y-2">
              <li><Link href="/about">Quiénes somos</Link></li>
              <li><Link href="/contact">Contacto</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li><Link href="/category/spa">Spa</Link></li>
              <li><Link href="/category/restaurantes">Restaurantes</Link></li>
              <li><Link href="/category/ocio">Ocio</Link></li>
              <li><Link href="/category/viajes">Viajes</Link></li>
              <li><Link href="/category/belleza">Belleza</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy">Privacidad</Link></li>
              <li><Link href="/terms">Términos</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Síguenos</h3>
            <ul className="space-y-2">
              <li><Link href="https://facebook.com">Facebook</Link></li>
              <li><Link href="https://instagram.com">Instagram</Link></li>
              <li><Link href="https://twitter.com">Twitter</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} BonosArtGoMA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
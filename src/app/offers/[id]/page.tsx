import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OfferCard } from '@/components/offers/OfferCard'

async function getOffer(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/offers/${id}`)
  if (!res.ok) return null
  return res.json()
}

async function getSimilarOffers(category: string, currentId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/offers?category=${category}`)
  if (!res.ok) return []
  const offers = await res.json()
  return offers.filter(offer => offer.id !== currentId).slice(0, 4)
}

export default async function OfferPage({ params }: { params: { id: string } }) {
  const offer = await getOffer(params.id)
  
  if (!offer) {
    notFound()
  }

  const similarOffers = await getSimilarOffers(offer.category, offer.id)

  return (
    <main className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative h-96">
          <Image
            src={offer.images[0]}
            alt={offer.title}
            width={500}
            height={400}
            className="object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{offer.title}</h1>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={20} />
            <span>{offer.placeName}</span>
          </div>

          <div className="space-y-2">
            <p className="line-through text-muted-foreground">
              Precio original: {offer.price}€
            </p>
            <p className="text-3xl font-bold text-red-600">
              {(offer.price * (1 - offer.discount / 100)).toFixed(2)}€
            </p>
            <p className="text-sm text-muted-foreground">
              Descuento del {offer.discount}%
            </p>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={20} />
            <span>Oferta válida por tiempo limitado</span>
          </div>

          <Button size="lg" className="w-full">
            Comprar ahora
          </Button>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold">Descripción</h2>
            <p>{offer.description}</p>
          </div>
        </div>
      </div>

      {similarOffers.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Ofertas similares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
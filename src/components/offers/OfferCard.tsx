import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { IOffer } from '@/types/interfaces'

interface OfferCardProps {
  offer: IOffer
}

export function OfferCard({ offer }: OfferCardProps) {
  const finalPrice = offer.price * (1 - (offer.discount || 0) / 100)

  return (
    <Link href={`/offers/${offer.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full">
          <Image 
            src={offer.images[0]}
            alt={offer.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded">
            {offer.discount}% OFF
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2">{offer.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">
            {offer.shortDescription}
          </p>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin size={16} />
            {offer.placeName}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div>
            <p className="text-sm line-through text-muted-foreground">
              {offer.price}€
            </p>
            <p className="text-xl font-bold text-red-600">
              {finalPrice.toFixed(2)}€
            </p>
          </div>
          <span className="text-sm px-2 py-1 bg-gray-100 rounded">
            {offer.category}
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
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
      <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative aspect-[4/3] w-full">
          <Image 
            src={offer.images[0]}
            alt={offer.title}
            width={400}
            height={300}
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {offer.discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded">
              {offer.discount}% OFF
            </div>
          )}
        </div>
        <CardContent className="flex-1 p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{offer.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {offer.shortDescription}
          </p>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin size={16} />
            <span className="line-clamp-1">{offer.placeName}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div>
            {offer.discount > 0 && (
              <p className="text-sm line-through text-muted-foreground">
                {offer.price}€
              </p>
            )}
            <p className="text-xl font-bold text-red-600">
              {finalPrice.toFixed(2)}€
            </p>
          </div>
          <span className="text-sm px-2 py-1 bg-gray-100 rounded truncate max-w-[40%]">
            {offer.category}
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
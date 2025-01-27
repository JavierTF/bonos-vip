import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OfferCard } from "@/components/offers/OfferCard";
import Offer, { OfferAttributes } from "@/models/offer";

async function getOffer(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/offers/${id}`
  );
  if (!res.ok) return null;
  return res.json();
}

async function getSimilarOffers(category: string, currentId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/offers?category=${category}`
  );
  if (!res.ok) return [];
  const offers = await res.json();
  return offers
    .filter((offer: OfferAttributes) => offer.id !== currentId)
    .slice(0, 4);
}

export default async function OfferPage({
  params,
}: {
  params: { id: string };
}) {
  const offer = await getOffer(params.id);

  if (!offer) {
    notFound();
  }

  const similarOffers = await getSimilarOffers(offer.category, offer.id);

  return (
    <main className="container mx-auto py-10 px-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative h-96 w-[95%]">
          <Carousel className="w-full">
            <CarouselContent>
              {offer.images.map((image, index) => (
                <>
                  <CarouselItem key={"index"}>
                    <Image
                      src={"/images/1-ford-ranger-top-10.png"}
                      alt={`${offer.title} - Image ${index + 1}`}
                      width={500}
                      height={400}
                      className="object-cover rounded-lg w-full h-96"
                    />
                  </CarouselItem>
                  <CarouselItem key={index}>
                    <Image
                      src={image || "/images/1-ford-ranger-top-10.png"}
                      alt={`${offer.title} - Image ${index + 1}`}
                      width={500}
                      height={400}
                      className="object-cover rounded-lg w-full h-96"
                    />
                  </CarouselItem>
                </>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
  );
}

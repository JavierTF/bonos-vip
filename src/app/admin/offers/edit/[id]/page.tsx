import { OfferFormWrapper } from "./OfferFormWrapper";
import Offer from "@/models/offer";

interface Props {
  params: { id: string };
}

export default async function EditOfferPage({ params }: Props) {
  const offer = await Offer.findByPk(params.id);

  const formattedOffer = offer ? {
    id: offer.id,
    title: offer.title,
    shortDescription: offer.shortDescription,
    description: offer.description,
    images: offer.images,
    category: offer.category,
    placeName: offer.placeName,
    location: {
      lat: offer.location.lat,
      lng: offer.location.lng,
    },
    price: offer.price,
    discount: offer.discount,
  } : null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Offer</h1>
      {formattedOffer && <OfferFormWrapper initialData={formattedOffer} />}
    </div>
  );
}
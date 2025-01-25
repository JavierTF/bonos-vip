import { OfferForm } from '@/components/admin/offers/OfferForm'

export default function CreateOfferPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Offer</h1>
      <OfferForm />
    </div>
  )
}
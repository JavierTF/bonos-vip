import { OfferList } from '@/components/offers/OfferList'

export default function Home() {
  return (
    <main>
      <div className="container mx-auto p-10">
        <h1 className="text-4xl font-bold mb-8">Ofertas Destacadas</h1>
        <OfferList />
      </div>
    </main>
  )
}
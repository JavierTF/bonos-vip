'use client'
import { useEffect, useState } from 'react'
import { OfferCard } from './OfferCard'
import { OfferFilters } from './OfferFilters'
import { IOffer } from '@/types/interfaces'

export function OfferList() {
  const [offers, setOffers] = useState([])
  const [filteredOffers, setFilteredOffers] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    fetchOffers()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      setFilteredOffers(offers.filter((offer: IOffer) => 
        offer.category === selectedCategory
      ))
    } else {
      setFilteredOffers(offers)
    }
  }, [selectedCategory, offers])

  const fetchOffers = async () => {
    try {
      const response = await fetch('/api/offers')
      const data = await response.json()
      setOffers(data)
      setFilteredOffers(data)
    } catch (error) {
      console.error('Error fetching offers:', error)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <OfferFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {filteredOffers.map((offer: IOffer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  )
}
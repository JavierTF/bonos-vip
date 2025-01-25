"use client";
import { useEffect, useState } from "react";
import { OfferCard } from "./OfferCard";
import { OfferFilters } from "./OfferFilters";
import { IOffer } from "@/types/interfaces";

export function OfferList() {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredOffers(
        offers.filter((offer: IOffer) => offer.category === selectedCategory)
      );
    } else {
      setFilteredOffers(offers);
    }
  }, [selectedCategory, offers]);

  const fetchOffers = async () => {
    try {
      const response = await fetch("/api/offers");
      const data = await response.json();
      setOffers(data);
      setFilteredOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <OfferFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="flex flex-wrap mt-6 -mx-3">
        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer: IOffer) => (
            <div key={offer.id} className="w-1/6 px-3 mb-6">
              <OfferCard offer={offer} />
            </div>
          ))
        ) : (
          <div className="w-full mt-6 text-center py-12 rounded-lg">
            <p className="text-gray-600 text-lg">
              No hay ofertas en esta categoría
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

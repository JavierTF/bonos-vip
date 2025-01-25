"use client";

import { useState, useEffect } from "react";
import OffersTable from "@/components/admin/offers/OffersTable";

interface Offer {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  images: string[];
  category: string;
  placeName: string;
  location: {
    lat: number;
    lng: number;
  };
  price: number;
  discount?: number;
  userId: string;
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOffers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/offers");
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveOffer = async (values: Omit<Offer, 'id' | 'userId'>, offerId?: string) => {
    try {
      const url = offerId ? `/api/offers/${offerId}` : "/api/offers";
      const method = offerId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, userId: "current-user-id" }),
      });

      if (response.ok) {
        fetchOffers();
      }
    } catch (error) {
      console.error("Error saving offer:", error);
    }
  };

  const handleDeleteOffer = async (id: string) => {
    try {
      await fetch(`/api/offers/${id}`, { method: "DELETE" });
      fetchOffers();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="p-6">
      <OffersTable 
        offers={offers}
        onSaveOffer={handleSaveOffer}
        onDeleteOffer={handleDeleteOffer}
        isLoading={isLoading}
      />
    </div>
  );
}
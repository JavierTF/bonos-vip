"use client";

import { useState, useEffect } from "react";
import OffersTable from "@/components/admin/offers/OffersTable";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
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

  const handleSaveOffer = async (
    values: Omit<Offer, "id" | "userId">,
    offerId?: string
  ) => {
    try {
      console.log("values:", values);
      console.log("offerId:", offerId);

      const userData = localStorage.getItem("bonos-vip");
      console.log("User data:", userData);
      const userId = userData ? JSON.parse(userData).user.id : null;
      console.log("userId:", userId);

      const url = offerId ? `/api/offers/${offerId}` : "/api/offers";
      console.log("url", url);
      const method = offerId ? "PUT" : "POST";
      console.log("method", method);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userId}`
        },
        body: JSON.stringify({ ...values, userId: userId }),
      });

      console.log("response", response);

      if (response.ok) {
        toast({
          title: "Oferta guardada exitosamente",
          description: "Actualizando...",
        });
        fetchOffers();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al guardar oferta",
        description: "Consulte con el equipo técnico...",
      });
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

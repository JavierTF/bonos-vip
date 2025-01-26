"use client";

import { useState, useEffect } from "react";
import OffersTable from "@/components/admin/offers/OffersTable";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import OffersGraphics from "@/components/admin/offers/OffersGraphics";

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
      const userData = localStorage.getItem("bonos-vip");
      const userId = userData ? JSON.parse(userData).user.id : null;

      const url = offerId ? `/api/offers/${offerId}` : "/api/offers";
      const method = offerId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify({ ...values, userId: userId }),
      });

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
      const userData = localStorage.getItem("bonos-vip");
      const userId = userData ? JSON.parse(userData).user.id : null;

      const response = await fetch(`/api/offers/${id}/delete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify({ isDeleted: new Date(), userId: userId }),
      });

      if (response.ok) {
        toast({
          title: "Oferta eliminada exitosamente",
          description: "Actualizando lista...",
        });
        fetchOffers();
      }
    } catch (error) {
      console.error("Error deleting offer:", error);
      toast({
        variant: "destructive",
        title: "Error al eliminar oferta",
        description: "Por favor, intente nuevamente",
      });
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="p-6">
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="graphics">
          <AccordionTrigger>Offers Analytics</AccordionTrigger>
          <AccordionContent>
            <OffersGraphics offers={offers} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="offers">
          <AccordionTrigger>Manage Offers</AccordionTrigger>
          <AccordionContent>
            <OffersTable
              offers={offers}
              onSaveOffer={handleSaveOffer}
              onDeleteOffer={handleDeleteOffer}
              isLoading={isLoading}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
'use client'
import { OfferForm } from "@/components/admin/offers/OfferForm";

interface FormProps {
  initialData: any;
}

export function OfferFormWrapper({ initialData }: FormProps) {
  return <OfferForm initialData={initialData} />;
}
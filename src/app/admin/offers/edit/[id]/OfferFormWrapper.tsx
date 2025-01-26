'use client';

import { OfferForm } from "@/components/admin/offers/OfferForm";

interface FormProps {
  initialData: any;
  readOnly?: boolean;
}

export function OfferFormWrapper({ initialData, readOnly = false }: FormProps) {
  return <OfferForm initialData={initialData} readOnly={readOnly} />;
}
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = ["Spa", "Restaurantes", "Ocio", "Viajes", "Belleza"];

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  shortDescription: z
    .string()
    .min(10, "La descripción corta debe tener al menos 10 caracteres"),
  description: z
    .string()
    .min(20, "La descripción debe tener al menos 20 caracteres"),
  images: z.array(z.string().url("Debe ser una URL válida")),
  category: z.string().min(1, "Debe seleccionar una categoría"),
  placeName: z
    .string()
    .min(2, "El nombre del lugar debe tener al menos 2 caracteres"),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  price: z.number().min(0, "El precio debe ser positivo"),
  discount: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface OfferFormProps {
  initialData?: FormValues;
}

export function OfferForm({ initialData }: OfferFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      shortDescription: "",
      description: "",
      images: [""],
      category: "",
      placeName: "",
      location: {
        lat: 0,
        lng: 0,
      },
      price: 0,
      discount: 0,
    },
  });

  const { fields, append, remove } = useFieldArray<FormValues>({
    control: form.control,
    name: 'images'
  })

  async function onSubmit(data: FormValues) {
    try {
      const url = initialData ? `/api/offers/${initialData.id}` : "/api/offers";
      const method = initialData ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al guardar la oferta");
      }

      toast({
        title: initialData ? "Oferta actualizada" : "Oferta creada",
        description: "La oferta se ha guardado correctamente",
      });

      router.push("/admin/offers");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un error al guardar la oferta",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Título de la oferta" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción Corta</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Descripción para las cards" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción Detallada</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Descripción completa" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Imágenes</FormLabel>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormField
                control={form.control}
                name={`images.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input {...field} placeholder="URL de la imagen" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
                className="shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append("")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Añadir imagen
          </Button>
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="placeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del lugar</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nombre del establecimiento" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location.lat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitud</FormLabel>
                <FormControl>
                  <Input {...field} type="number" step="any" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location.lng"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitud</FormLabel>
                <FormControl>
                  <Input {...field} type="number" step="any" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input {...field} type="number" step="0.01" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descuento (%)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          {initialData ? "Actualizar oferta" : "Crear oferta"}
        </Button>
      </form>
    </Form>
  );
}

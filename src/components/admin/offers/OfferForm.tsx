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
  readOnly?: boolean;
}

export function OfferForm({ initialData, readOnly = false }: OfferFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: Number(initialData.price),
          discount: initialData.discount ? Number(initialData.discount) : 0,
        }
      : {
          title: "",
          shortDescription: "",
          description: "",
          images: [""],
          category: "",
          placeName: "",
          location: { lat: 0, lng: 0 },
          price: 0,
          discount: 0,
        },
  });

  const { fields, append, remove } = useFieldArray<FormValues>({
    control: form.control,
    name: "images",
  });

  const commonInputProps = {
    readOnly,
    disabled: readOnly,
    className: readOnly ? "bg-gray-100" : "",
  };

  async function onSubmit(data: FormValues) {
    console.log("Form data:", data);
    console.log("Form state:", form.formState);

    if (!form.formState.isValid) {
      console.log("Form is invalid");
      return;
    }
    
    console.log("onSubmit onSubmit onSubmit onSubmit");
    try {
      const userData = localStorage.getItem("bonos-vip");
      if (!userData) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No estás autorizado",
        });
        return;
      }

      const url = initialData ? `/api/offers/${initialData.id}` : "/api/offers";
      const method = initialData ? "PUT" : "POST";

      console.log("token??", JSON.parse(userData).user.token);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(userData).user.token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          initialData
            ? "Error al actualizar la oferta"
            : "Error al crear la oferta"
        );
      }

      toast({
        title: "Operación exitosa",
        description: initialData
          ? "Oferta actualizada correctamente"
          : "Oferta creada correctamente",
      });

      router.push("/admin/offers");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Error al procesar la oferta",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) =>
          console.log("Form errors:", errors)
        )}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} {...commonInputProps} />
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
                <Input {...field} {...commonInputProps} />
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
                <Textarea {...field} {...commonInputProps} />
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
                      <Input {...field} {...commonInputProps} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!readOnly && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                  className="shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          {!readOnly && (
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
          )}
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={readOnly}
              >
                <FormControl>
                  <SelectTrigger className={readOnly ? "bg-gray-100" : ""}>
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
                <Input {...field} {...commonInputProps} />
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
                  <Input
                    {...field}
                    type="number"
                    step="any"
                    {...commonInputProps}
                  />
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
                  <Input
                    {...field}
                    type="number"
                    step="any"
                    {...commonInputProps}
                  />
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
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    {...commonInputProps}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
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
                  <Input
                    {...field}
                    type="number"
                    {...commonInputProps}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {!readOnly && (
          <Button type="submit" className="w-full">
            {initialData ? "Actualizar oferta" : "Crear oferta"}
          </Button>
        )}
      </form>
    </Form>
  );
}

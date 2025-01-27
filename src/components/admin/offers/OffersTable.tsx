"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";

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

interface OffersTableProps {
  offers: Offer[];
  onSaveOffer: (
    values: Omit<Offer, "id" | "userId">,
    offerId?: string
  ) => Promise<void>;
  onDeleteOffer: (id: string) => Promise<void>;
  isLoading: boolean;
}

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  shortDescription: z
    .string()
    .min(2, "Short description must be at least 2 characters"),
  description: z.string().min(2, "Description must be at least 2 characters"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.string().min(1, "Category is required"),
  placeName: z.string().min(2, "Place name is required"),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  price: z.number().min(0, "Price must be positive"),
  discount: z.number().optional(),
});

const OffersTable = ({
  offers,
  onSaveOffer,
  onDeleteOffer,
  isLoading,
}: OffersTableProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);
  const [readOnly, setReadOnly] = useState(false);
  const [imagePath, setImagePath] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      description: "",
      images: [],
      category: "",
      placeName: "",
      location: { lat: 0, lng: 0 },
      price: 0,
      discount: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSaveOffer(values, currentOffer?.id);
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error saving offer",
        description: "Please try again",
      });
    }
  };

  const handleDelete = async (id: string) => {
    toast({
      variant: "destructive",
      title: "¿Desea eliminar esta oferta?",
      description: "Soft-delete",
      action: (
        <ToastAction
          onClick={async () => await onDeleteOffer(id)}
          altText="Eliminar"
        >
          Eliminar
        </ToastAction>
      ),
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const uploadedPaths = [];

    for (const file of Array.from(e.target.files)) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.path) {
        uploadedPaths.push(data.path);
      }
    }

    setImagePath(uploadedPaths);
    form.setValue("images", uploadedPaths, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Offers</h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            if (!open) setReadOnly(false);
            setIsDialogOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setCurrentOffer(null);
                form.reset();
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{currentOffer ? "Edit" : "New"} Offer</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={readOnly} />
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
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={readOnly} />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} readOnly={readOnly} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={readOnly}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="restaurants">
                            Restaurants
                          </SelectItem>
                          <SelectItem value="hotels">Hotels</SelectItem>
                          <SelectItem value="activities">Activities</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={readOnly}
                          multiple
                          {...field}
                        />
                      </FormControl>
                      {imagePath && (
                        <p className="text-sm text-muted-foreground">
                          Selected: {imagePath}
                        </p>
                      )}
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
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            disabled={readOnly}
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
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            disabled={readOnly}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="placeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Place Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={readOnly} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            disabled={readOnly}
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
                        <FormLabel>Discount (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            disabled={readOnly}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {readOnly ? (
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Close
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!!currentOffer && !form.formState.isDirty}
                  >
                    {currentOffer
                      ? form.formState.isDirty
                        ? "Save Offer"
                        : "Close"
                      : "Save Offer"}
                  </Button>
                )}
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-3">
                Cargando...
              </TableCell>
            </TableRow>
          ) : (
            offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell className="font-medium">{offer.title}</TableCell>
                <TableCell>{offer.shortDescription}</TableCell>
                <TableCell>{offer.category}</TableCell>
                <TableCell>${offer.price}</TableCell>
                <TableCell>
                  {offer.discount ? `${offer.discount}%` : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const offerWithNumberPrice = {
                          ...offer,
                          price: Number(offer.price),
                        };
                        setCurrentOffer(offerWithNumberPrice);
                        form.reset(offerWithNumberPrice);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(offer.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setCurrentOffer(offer);
                        form.reset(offer);
                        const formFields = Object.keys(form.getValues());
                        formFields.forEach((key) => {
                          if (key in offer) {
                            form.setValue(
                              key,
                              key === "price" ? Number(offer[key]) : offer[key],
                              { shouldValidate: true }
                            );
                          }
                        });
                        setReadOnly(true);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OffersTable;

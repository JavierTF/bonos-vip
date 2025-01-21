import { EUserRole, EOfferCategory } from "./enums";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: EUserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IOffer {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  images: string[];
  category: EOfferCategory;
  placeName: string;
  location: Location;
  price: number;
  discount: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ICreateOfferDTO {
  title: string;
  shortDescription: string;
  description: string;
  images: string[];
  category: EOfferCategory;
  placeName: string;
  location: Location;
  price: number;
  discount: number;
}

export interface IUpdateOfferDTO extends Partial<ICreateOfferDTO> {}

export interface IApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IOfferFormData {
  title: string;
  shortDescription: string;
  description: string;
  images: string[];
  category: EOfferCategory;
  placeName: string;
  location: {
    lat: string | number;
    lng: string | number;
  };
  price: string | number;
  discount: string | number;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterData extends ILoginCredentials {
  name: string;
}

export interface ISession {
  user: {
    id: string;
    email: string;
    name: string;
    role: EUserRole;
  };
  expires: string;
}

export interface IOfferCardProps {
  offer: IOffer;
}

export interface IOfferListProps {
  offers: IOffer[];
  isLoading?: boolean;
  error?: string;
}

export interface IOfferFiltersProps {
  selectedCategory: EOfferCategory | "";
  onCategoryChange: (category: EOfferCategory | "") => void;
}

export interface IOfferFormProps {
  initialData?: IOfferFormData;
  onSubmit: (data: IOfferFormData) => void;
  isSubmitting?: boolean;
}

export interface IOffersState {
  offers: IOffer[];
  filteredOffers: IOffer[];
  selectedCategory: EOfferCategory | "";
  isLoading: boolean;
  error: string | null;
}

export interface IOffersContextType extends IOffersState {
  setCategory: (category: EOfferCategory | "") => void;
  refreshOffers: () => Promise<void>;
  createOffer: (offer: ICreateOfferDTO) => Promise<void>;
  updateOffer: (id: string, offer: IUpdateOfferDTO) => Promise<void>;
  deleteOffer: (id: string) => Promise<void>;
}

export interface IApiError {
  message: string;
  code: string;
  status: number;
}

export type TSortDirection = "asc" | "desc";

export interface ISortOptions {
  field: keyof IOffer;
  direction: TSortDirection;
}

export interface IFilterOptions {
  category?: EOfferCategory;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
}

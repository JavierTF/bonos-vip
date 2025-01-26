import { Model, DataTypes } from 'sequelize';
import sequelize from '@/lib/db';

export interface OfferAttributes {
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
  isDeleted: Date | null;
}

class Offer extends Model<OfferAttributes> implements OfferAttributes {
  public id!: string;
  public title!: string;
  public shortDescription!: string;
  public description!: string;
  public images!: string[];
  public category!: string;
  public placeName!: string;
  public location!: {
    lat: number;
    lng: number;
  };
  public price!: number;
  public discount?: number;
  public userId!: string;
  public isDeleted!: Date | null;
}

Offer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Offer',
  }
);

export default Offer;
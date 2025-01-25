import { Model, DataTypes } from "sequelize";
import sequelize from "@/lib/db";

export interface UserAttributes {
  id: string;
  role: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  newsletter: boolean;
  isla: "Tenerife" | "Gran Canaria" | "La Palma" | "Lanzarote";
  avatar?: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public role!: string;
  public name!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public newsletter!: boolean;
  public isla!: "Tenerife" | "Gran Canaria" | "La Palma" | "Lanzarote";
  public avatar!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "user"
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 255],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 255],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    newsletter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isla: {
      type: DataTypes.STRING,
      defaultValue: "Tenerife",
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    paranoid: true,
  }
);

export default User;

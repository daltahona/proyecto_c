import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class Tipo_Producto extends Model {
  public nombre!: string;
  public estado!: boolean;
}

export interface Tipo_ProductoI {
  nombre: string;
  estado?: boolean;
}

Tipo_Producto.init(
  {

    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isHidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Por defecto no está oculto
  },
    
  },
  {
    tableName: "tipo_productos",
    sequelize: database,
    timestamps: false
  }
);
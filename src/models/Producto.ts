import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Tipo_Producto } from "./Tipo_Producto";

export class Producto extends Model {
  public nombre!: string;
  public marca!: string;
  public precio!: number;
  public stockMin!: number;
  public cantidad!: number;
  public tipo_producto_id!: number;
  public estado!: boolean;
}

export interface ProductoI {
  nombre: string;
  marca: string;
  precio: number;
  stockMin: number;
  cantidad: number;
  tipo_producto_id: number;
  estado?: boolean;
}

Producto.init(
  {
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stockMin: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tipo_producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tipo_Producto,
        key: 'id',
      },
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
    tableName: "productos",
    sequelize: database,
    timestamps: true,
  }
);

Producto.belongsTo(Tipo_Producto, { foreignKey: "tipo_producto_id", as: "tipo_producto" });
import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Producto } from "./Producto";
import { Venta } from "./Venta";

export class Product_Venta extends Model {
  public producto_id!: number;
  public venta_id!: number;
  public cantidad!: number;
  public precio!: number;
  public total!: number;
  public estado!: boolean;
}

export interface Product_VentaI {
  producto_id: number;
  venta_id: number;
  cantidad: number;
  precio: number;
  total: number;
  estado?: boolean;
}

Product_Venta.init(
  {
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Producto,
        key: 'id',
      },
    },
    venta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Venta,
        key: 'id',
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
    tableName: "product_venta",
    sequelize: database,
    timestamps: true,
  }
);

Product_Venta.belongsTo(Producto, { foreignKey: "producto_id", as: "producto" });
Product_Venta.belongsTo(Venta, { foreignKey: "venta_id", as: "venta" });
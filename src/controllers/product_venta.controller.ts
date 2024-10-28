import { Request, Response } from 'express';
import { Product_Venta, Product_VentaI } from '../models/Product_Venta';
import { Producto, ProductoI } from '../models/Producto';
import { Venta, VentaI } from '../models/Venta';
import { NextFunction } from 'express';

export class Product_VentaController {
  public async test(req: Request, res: Response): Promise<void> {
    try {
      res.send('hola, método test para ProductVenta');
    } catch (error) {
      res.status(500).send({ error: 'Error en el método test de ProductVenta' });
    }
  }

  public async getOneProduct_Venta(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id: idParam } = req.params;
  
    try {
        const product_venta: Product_VentaI | null = await Product_Venta.findOne({
            where: { 
                id: idParam,
                isHidden: false // Asegúrate de incluir este filtro
            }
        });
  
        if (product_venta) {
            res.status(200).json(product_venta);
        } else {
            res.status(300).json({ msg: "El Producto de Venta no existe o está oculto" }); // Cambia a 404 para mejor semántica
        }
    } catch (error) {
        console.error('Error al obtener el producto de venta:', error);
        res.status(500).json({ msg: "Error Internal" });
    }
    next(); // Llamar a la siguiente función de middleware, aunque podrías omitirlo si no tienes más middleware en esta ruta
  }

  public async getAllProduct_Venta(req: Request, res: Response) {
    try {
        // Filtrar Productos de ventas ocultos
        const product_ventas: Product_VentaI[] = await Product_Venta.findAll({
            where: { isHidden: false } // Asegúrate de incluir este filtro
        });

        res.status(200).json({ Product_Venta: product_ventas });
    } catch (error) {
        console.error('Error al obtener todos los productos de ventas:', error);
        res.status(500).json({ msg: "Error al obtener los productos de ventas" });
    }
}

  public async createProduct_Venta(req: Request, res: Response): Promise<void> {
    const { producto_id, venta_id, cantidad, precio, total } = req.body;
    try {
      const product_venta: Product_VentaI = await Product_Venta.create({
        producto_id,
        venta_id,
        cantidad,
        precio,
        total,
      });
      res.status(201).json({ product_venta });
    } catch (error) {
      res.status(500).send({ error: 'Error al crear la relación producto-venta' });
    }
  }

  public async updateProduct_Venta(req: Request, res: Response): Promise<void> {
    const { id: pk } = req.params;
    const { producto_id, venta_id, cantidad, precio, total } = req.body;

    try {
      const product_ventaExist: Product_VentaI | null = await Product_Venta.findByPk(pk);
      if (!product_ventaExist) {
        res.status(500).json({ msg: "La relación producto-venta no existe" });
      }

      await Product_Venta.update(
        { producto_id, venta_id, cantidad, precio, total },
        { where: { id: pk } }
      );

      const updatedProduct_Venta: Product_VentaI | null = await Product_Venta.findByPk(pk);
      if (updatedProduct_Venta) {
        res.status(200).json({ product_venta: updatedProduct_Venta });
      } else {
        res.status(500).json({ msg: "Error al actualizar la relación producto-venta" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error Internal" });
    }
  }

  public async deleteProduct_Venta(req: Request, res: Response): Promise<void> {
    const { id: pk } = req.params;
    try {
      const product_ventaExist: Product_VentaI | null = await Product_Venta.findByPk(pk);
      if (!product_ventaExist) {
        res.status(500).json({ msg: "La relación producto-venta no existe" });
      }

      await Product_Venta.destroy({ where: { id: pk } });
      res.status(200).json({ msg: "Relación producto-venta eliminada" });
    } catch (error) {
      res.status(500).json({ msg: "Error Internal" });
    }
  }

  async hideProduct_Venta(req: Request, res: Response): Promise<void> {
    const product_ventaId = req.params.id;
    console.log(`Ejecutando hideProductVenta para el ID: ${product_ventaId}`);
  
    try {
      const product_venta = await Product_Venta.findByPk(product_ventaId);
  
      if (!product_venta) {
        res.status(404).json({ message: 'Producto de Venta no encontrado' });
      } else {
        // Actualizar el producto de venta ocultándolo (cambio lógico)
        await product_venta.update({ isHidden: true });
        res.json({
          message: 'Producto de Venta ocultado correctamente',
          product_venta: product_venta
        });
      }
    } catch (error: any) {
        console.error('Error en hideProductVenta:', error);
        res.status(500).json({
          message: 'Error al ocultar el Producto de Venta',
          error: error.message
        });
      }
}

}
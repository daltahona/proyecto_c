import {  Request, Response } from 'express';
import { where } from 'sequelize/types';
import { NextFunction } from 'express';
import { Tipo_Producto, Tipo_ProductoI } from '../models/Tipo_Producto';


export class Tipo_ProductoController {

  public async test(req: Request, res: Response) {
    try {
      res.send('hola, método test para TipoProducto');
    } catch (error) {
      // maneja el error
    }
  }

  public async getAllTipo_Producto(req: Request, res: Response) {
    try {
        // Filtrar Tipos de productos ocultos
        const tipo_productos: Tipo_ProductoI[] = await Tipo_Producto.findAll({
            where: { isHidden: false } // Asegúrate de incluir este filtro
        });

        res.status(200).json({ Tipo_Producto: tipo_productos });
    } catch (error) {
        console.error('Error al obtener todos los tipos de productos:', error);
        res.status(500).json({ msg: "Error al obtener tipos de productos" });
    }
}


public async getOneTipo_Producto(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id: idParam } = req.params;

  try {
      const tipo_producto: Tipo_ProductoI | null = await Tipo_Producto.findOne({
          where: { 
              id: idParam,
              isHidden: false // Asegúrate de incluir este filtro
          }
      });

      if (tipo_producto) {
          res.status(200).json(tipo_producto);
      } else {
          res.status(300).json({ msg: "El Tipo de Producto no existe o está oculto" }); // Cambia a 404 para mejor semántica
      }
  } catch (error) {
      console.error('Error al obtener el tipo de producto:', error);
      res.status(500).json({ msg: "Error Internal" });
  }
  next(); // Llamar a la siguiente función de middleware, aunque podrías omitirlo si no tienes más middleware en esta ruta
}

  public async createTipo_Producto(req: Request, res: Response) {
    const { nombre } = req.body;

    try {
      let body: Tipo_ProductoI = {
        nombre
      };

      const tipo_producto: Tipo_ProductoI = await Tipo_Producto.create({ ...body });
      res.status(200).json({ tipo_producto });
    } catch (error) {
      // maneja el error
    }
  }

  public async updateTipo_Producto(req: Request, res: Response): Promise<void> {
    const { id: pk } = req.params;
    const { nombre } = req.body;

    try {
      let body: Tipo_ProductoI = {
        nombre
      };

      const tipo_productoExist: Tipo_ProductoI | null = await Tipo_Producto.findByPk(pk);
      if (!tipo_productoExist) {
        res.status(404).json({ msg: "El Tipo de Producto No existe" });
        return;
      }

      await Tipo_Producto.update(
        body,
        {
          where: { id: pk }
        }
      );

      const tipo_producto: Tipo_ProductoI | null = await Tipo_Producto.findByPk(pk);
      if (tipo_producto) {
        res.status(200).json({ tipo_producto });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error interno" });
    }
  }

  public async deleteTipo_Producto(req: Request, res: Response): Promise<void> {
    const { id: pk } = req.params;

    try {
      const tipo_productoExist: Tipo_ProductoI | null = await Tipo_Producto.findByPk(pk);
      if (!tipo_productoExist) {
        res.status(404).json({ msg: "El Tipo de Producto No existe" });
        return;
      }

      await Tipo_Producto.destroy({
        where: { id: pk }
      });
      res.status(200).json({ msg: "Tipo de Producto Eliminado" });
    } catch (error) {
      // maneja el error
    } finally {
      return Promise.resolve();
    }
  }

  async hideTipo_Producto(req: Request, res: Response): Promise<void> {
    const tipo_productoId = req.params.id;
    console.log(`Ejecutando hideTipoProducto para el ID: ${tipo_productoId}`);
  
    try {
      const tipo_producto = await Tipo_Producto.findByPk(tipo_productoId);
  
      if (!tipo_producto) {
        res.status(404).json({ message: 'Tipo de Producto no encontrado' });
      } else {
        // Actualizar el tipo de producto ocultándolo (cambio lógico)
        await tipo_producto.update({ isHidden: true });
        res.json({
          message: 'Tipo de Producto ocultado correctamente',
          tipo_producto: tipo_producto
        });
      }
    } catch (error: any) {
        console.error('Error en hideTipo_Producto:', error);
        res.status(500).json({
          message: 'Error al ocultar el tipo de producto',
          error: error.message
        });
      }
}

}
import { Request, Response, Application, Router } from "express";
import { Tipo_ProductoController } from '../controllers/tipo_producto.controller';

export class Tipo_ProductoRoutes {
  public tipo_productoController: Tipo_ProductoController = new Tipo_ProductoController();

  public routes(app: Application): void {
    app.route("/tipo_productos/test").get(this.tipo_productoController.test)
    app.route("/tipo_productos").get(this.tipo_productoController.getAllTipo_Producto)
    app.route("/tipo_producto/:id").get(this.tipo_productoController.getOneTipo_Producto)
    app.route("/tipo_producto").post(this.tipo_productoController.createTipo_Producto)
    app.route("/tipo_producto/:id").put(this.tipo_productoController.updateTipo_Producto)
    app.route("/tipo_producto/:id").delete(this.tipo_productoController.deleteTipo_Producto)
    app.route('/tipo_producto/:id').patch(this.tipo_productoController.hideTipo_Producto);
  }
}
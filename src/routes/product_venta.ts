import { Request, Response, Application, Router } from "express";
import { Product_VentaController } from '../controllers/product_venta.controller';

export class Product_VentaRoutes {
  public product_ventaController: Product_VentaController = new Product_VentaController();

  public routes(app: Application): void {
    app.route("/product_ventas/test").get(this.product_ventaController.test)
    app.route("/product_ventas").get(this.product_ventaController.getAllProduct_Venta)
    app.route("/product_venta/:id").get(this.product_ventaController.getOneProduct_Venta)
    app.route("/product_venta").post(this.product_ventaController.createProduct_Venta)
    app.route("/product_venta/:id").put(this.product_ventaController.updateProduct_Venta)
    app.route("/product_venta/:id").delete(this.product_ventaController.deleteProduct_Venta)
    app.route('/product_venta/:id').patch(this.product_ventaController.hideProduct_Venta);
  }
}
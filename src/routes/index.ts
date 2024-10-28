import { ClienteRoutes } from './cliente';
import { Tipo_ProductoRoutes } from './tipo_producto';
import { VentaRoutes } from './venta';
import { ProductoRoutes } from './producto';
import { Product_VentaRoutes } from './product_venta';

export class Routes {
    public clienteRoutes: ClienteRoutes = new ClienteRoutes();
    public ventaRoutes: VentaRoutes = new VentaRoutes();
    public tipo_productoRoutes: Tipo_ProductoRoutes = new Tipo_ProductoRoutes();
    public productoRoutes: ProductoRoutes = new ProductoRoutes();
    public product_ventaRoutes: Product_VentaRoutes = new Product_VentaRoutes();
}
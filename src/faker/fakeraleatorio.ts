import { Cliente } from "../models/Cliente";
import { Venta } from "../models/Venta";
import { Product_Venta } from "../models/Product_Venta";
import { Producto } from "../models/Producto";
import { Tipo_Producto } from "../models/Tipo_Producto";
import { faker } from "@faker-js/faker";

async function createFakerData() {
  // Crear clientes falsos
  for (let i = 0; i < 50; i++) {
    await Cliente.create({
      nombre: faker.person.fullName(),
      direccion: faker.location.street(),
      telefono: faker.phone.number(),
      correo: faker.internet.email(),
      password: faker.internet.password(),
      estado: faker.datatype.boolean()
    });
  }

  // Crear tipos de productos falsos
  for (let i = 0; i < 5; i++) {
    await Tipo_Producto.create({
      nombre: faker.commerce.department(),
      estado: faker.datatype.boolean()
    });
  }

  // Crear productos falsos
  const tipo_productos = await Tipo_Producto.findAll();
  for (let i = 0; i < 20; i++) {
    await Producto.create({
      nombre: faker.commerce.productName(),
      marca: faker.company.name(),
      precio: faker.commerce.price(),
      stockMin: faker.number.int({ min: 1, max: 10 }),
      cantidad: faker.number.int({ min: 1, max: 100 }),
      tipo_producto_id: tipo_productos[faker.number.int({ min: 0, max: tipo_productos.length - 1 })].get('id'),
    });
  }

  // Crear ventas falsas
  const clientes = await Cliente.findAll();
  for (let i = 0; i < 10; i++) {
    await Venta.create({
      fechaVenta: faker.date.past().toISOString(),
      subtotal: faker.commerce.price(),
      impuestos: faker.commerce.price(),
      descuentos: faker.commerce.price(),
      total: faker.commerce.price(),
      clientes_id: clientes[faker.number.int({ min: 0, max: clientes.length - 1 })].get('id'),
    });
  }

  // Crear productos ventas falsos
  const ventas = await Venta.findAll();
  const productos = await Producto.findAll();
  for (let i = 0; i < 30; i++) {
    await Product_Venta.create({
      cantidad: faker.number.int({ min: 1, max: 10 }),
      precio: faker.commerce.price(),
      total: faker.commerce.price(),
      venta_id: ventas[faker.number.int({ min: 0, max: ventas.length - 1 })].get('id'),
      producto_id: productos[faker.number.int({ min: 0, max: productos.length - 1 })].get('id'),
    });
  }
}

createFakerData().then(() => {
  console.log("Datos falsos creados exitosamente");
}).catch((error) => {
  console.error("Error al crear datos falsos:", error);
});

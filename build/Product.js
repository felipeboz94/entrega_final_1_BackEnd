"use strict";
/*
Clase ProductManager: Contenedora de productos.

Los productos tendrán las propiedades:

1. title        --> Nombre del producto;
2. description  --> Descripción del producto;
3. price        --> Precio;
4. thumbnail    --> Ruta de imagen;
5. code         --> Código identificador;
6. stock        --> Número de piezas disponibles.

Además tendrá los métodos:

1. addProduct   --> Agrega un producto al arreglo inicial. Valida
que no se repita la propiedad 'code' y que todos los campos sean obligatorios.
Además crea un id autoincrementable;
2. getProducts  --> Devuelve el arreglo con todos los productos creados hasta el momento;
3. getProductById > Busca en el arreglo el producto que coincida con el id. Si no coincide,
muestra en la consola un error de 'Not found'.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
//import {insertData,readAllData} from './dataHandling'
class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = '';
        this.description = '';
        this.price = 0;
        this.thumbnail = '';
        this.code = '';
        this.stock = 0;
        //Valido que ningún campo sea nulo
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Cuidado. Hay campos que están vacíos");
        }
        else {
            this.title = title;
            this.description = description;
            this.price = price;
            this.thumbnail = thumbnail;
            this.code = code;
            this.stock = stock;
        }
    }
}
exports.Product = Product;

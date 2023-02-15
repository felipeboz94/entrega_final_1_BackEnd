"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToCart = exports.addCart = exports.getCartById = exports.getCarts = exports.deleteProduct = exports.updateProduct = exports.addProduct = exports.getProductById = exports.getProducts = exports.readAllData = exports.insertCartsData = exports.insertProductsData = void 0;
const PRODUCTS_PATH = './ProductManager.json';
const CARTS_PATH = './CartManager.json';
//----------------FUNCIONES FRONTERA CON DATABASE----------------------
function insertProductsData(path, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const fs = require('fs');
        yield fs.promises.writeFile(path, JSON.stringify(data));
    });
}
exports.insertProductsData = insertProductsData;
function insertCartsData(path, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const fs = require('fs');
        yield fs.promises.writeFile(path, JSON.stringify(data));
    });
}
exports.insertCartsData = insertCartsData;
function readAllData(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const fs = require('fs');
        const readedData = yield fs.promises.readFile(path, 'utf-8');
        return readedData;
    });
}
exports.readAllData = readAllData;
//-------------------------------------------------------------------
//---------------------------FUNCIONES DE MANEJO DE PRODUCTOS--------------------
function getProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        let resultado = yield readAllData(PRODUCTS_PATH); //Adding !before variable tells typescript to remove undefined or null as possibles types for variable:
        let productos = JSON.parse(resultado);
        return productos;
    });
}
exports.getProducts = getProducts;
function getProductById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let resultado = yield readAllData(PRODUCTS_PATH);
        let productos = JSON.parse(resultado);
        let productoFiltrado = productos.filter(producto => producto.id == id);
        return productoFiltrado;
    });
}
exports.getProductById = getProductById;
function addProduct(newProduct) {
    return __awaiter(this, void 0, void 0, function* () {
        let estaEnProductManager = false;
        let resultado = yield readAllData(PRODUCTS_PATH);
        let productos = JSON.parse(resultado);
        if (productos) {
            for (let producto of productos) {
                if (newProduct.code === producto.producto.code) {
                    estaEnProductManager = true;
                }
            }
        }
        if (estaEnProductManager) {
            console.log('Error. Este producto ya se encuentra en el ProductManager. Código repetido.');
        }
        else {
            let id = productos.length + 1;
            let productoNuevo = { id: id, producto: newProduct };
            productos.push(productoNuevo);
            insertProductsData(PRODUCTS_PATH, productos)
                .then(() => {
                console.log("Producto agregado satisfactoriamente");
                console.log("Su id es: %d", id);
            });
        }
    });
}
exports.addProduct = addProduct;
function updateProduct(id, productoActualizado) {
    return __awaiter(this, void 0, void 0, function* () {
        let resultado = yield readAllData(PRODUCTS_PATH);
        let productos = JSON.parse(resultado);
        let indice = -1;
        productos.map((producto, index) => {
            if (producto.id == id) {
                indice = index;
                producto.producto = productoActualizado;
            }
        });
        if (indice > -1) {
            insertProductsData(PRODUCTS_PATH, productos)
                .then(() => console.log('Se actualizó el objeto de id: ' + id));
        }
        else {
            console.log('No se realizó actualización debido a que no se encontró el objeto de id ' + id);
        }
    });
}
exports.updateProduct = updateProduct;
/*
export async function updateProduct(id:number,campo: keyof Object,valor:any):Promise<void>{
    let resultado : string = await readAllData(PRODUCTS_PATH);
    let productos : Array<{id:number, producto: Product}> = JSON.parse(resultado);
    let indice : number = -1;
    let existeCampo : boolean = ['title','description','price','thumbnail','code','stock'].includes(campo);
    if (productos && existeCampo){
        productos.map((producto,index) =>{
            if (producto.id == id){
                indice = index;
                producto.producto[campo] = valor;
            }
        }
    )
    }
    if (indice > -1 && existeCampo){
        insertProductsData(PRODUCTS_PATH,productos)
        .then(() =>
        console.log('Se actualizó el objeto de id: ' + id + ' y campo '+campo ))
        
    }
    else if (indice == -1 && existeCampo){
        console.log('Error al intentar actualizar el objeto. No existe el id: ' + id);
    }
    else if (indice > -1 && ! existeCampo){
        console.log('Error al intentar actualizar el objeto. No existe el campo: ' + campo);
    }
    else{
        console.log('Error al intentar actualizar el objeto. No existe ni id: ' + id + ' ni campo '+campo);
    }
}
*/
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let resultado = yield readAllData(PRODUCTS_PATH);
        let productos = JSON.parse(resultado);
        let indice = -1;
        if (productos) {
            productos.map((producto, index) => {
                if (producto.id == id) {
                    indice = index;
                    productos.splice(index, 1);
                }
            });
        }
        if (indice > -1) {
            insertProductsData(PRODUCTS_PATH, productos)
                .then(() => console.log('Se eliminó el objeto de id: ' + id));
        }
        else {
            console.log('Error al intentar eliminar el objeto. No existe el id: ' + id);
        }
    });
}
exports.deleteProduct = deleteProduct;
//---------------------------FUNCIONES DE MANEJO DE CARTS--------------------
function getCarts() {
    return __awaiter(this, void 0, void 0, function* () {
        let resultado = yield readAllData(CARTS_PATH); //Adding !before variable tells typescript to remove undefined or null as possibles types for variable:
        let carts = JSON.parse(resultado);
        return carts;
    });
}
exports.getCarts = getCarts;
function getCartById(cid) {
    return __awaiter(this, void 0, void 0, function* () {
        let resultado = yield readAllData(CARTS_PATH);
        let carts = JSON.parse(resultado);
        let cartFiltrado = carts.filter(cart => cart.id == cid);
        return cartFiltrado;
    });
}
exports.getCartById = getCartById;
function addCart() {
    return __awaiter(this, void 0, void 0, function* () {
        let resultado = yield readAllData(CARTS_PATH);
        let carts = JSON.parse(resultado);
        let id = carts.length + 1;
        let cartNuevo = { id: id, cart: [] };
        carts.push(cartNuevo);
        insertCartsData(CARTS_PATH, carts)
            .then(() => {
            console.log("Cart agregado satisfactoriamente");
            console.log("Su id es: %d", id);
        });
    });
}
exports.addCart = addCart;
function addProductToCart(cid, pid) {
    return __awaiter(this, void 0, void 0, function* () {
        let cartEstaEnCartManager = false;
        let productoEnCart = false;
        let resultado = yield readAllData(CARTS_PATH);
        let carts = JSON.parse(resultado);
        if (carts) {
            carts.map((cart, indexCart) => {
                if (cart.id === cid) {
                    cartEstaEnCartManager = true;
                    cart.cart.map((producto, indexProduct) => {
                        if (producto.pid === pid) {
                            productoEnCart = true;
                            producto.quantity += 1;
                        }
                    });
                    //si el producto no está en el carrito, se pushea un nuevo producto en este
                    if (!productoEnCart) {
                        cart.cart.push({ pid: pid, quantity: 1 });
                    }
                }
            });
            if (!cartEstaEnCartManager) {
                console.log('Error, producto no está en carrito');
            }
        }
        insertCartsData(CARTS_PATH, carts)
            .then(() => {
            console.log("Producto agregado satisfactoriamente");
            console.log("Su id es: %d", cid);
        });
    });
}
exports.addProductToCart = addProductToCart;

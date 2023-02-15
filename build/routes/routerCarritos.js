"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataHandling_1 = require("../dataHandling"); //getProductById,insertData,deleteProduct,updateProduct
const routerCarritos = express_1.default.Router();
routerCarritos.get('/', (_req, res) => {
    let isLoading = true;
    console.log('Está cargando...');
    (0, dataHandling_1.getCarts)()
        .then((carts) => {
        isLoading = false;
        console.log('Carga finalizada');
        res.send({ carritos: carts });
    });
    console.log(isLoading);
});
routerCarritos.get('/:cid', (req, res) => {
    let isLoading = true;
    const cartID = parseInt(req.params.cid);
    console.log('Está cargando...');
    (0, dataHandling_1.getCartById)(cartID)
        .then((cartFiltrado) => {
        isLoading = false;
        console.log('Carga finalizada');
        res.send({ carrito: cartFiltrado });
    })
        .catch((err) => res.send(err));
    console.log(isLoading);
});
routerCarritos.post('/', (req, res) => {
    let isLoading = true;
    console.log('Creando carrito...');
    (0, dataHandling_1.addCart)()
        .then(() => {
        isLoading = false;
        console.log('Carrito nuevo!');
        res.send('Carrito nuevo!');
    })
        .catch((err) => res.send(err));
    console.log(isLoading);
});
routerCarritos.post('/:cid/products/:pid', (req, res) => {
    let isLoading = true;
    const cartID = parseInt(req.params.cid);
    const productID = parseInt(req.params.pid);
    console.log('Agregando producto a carrito...');
    (0, dataHandling_1.addProductToCart)(cartID, productID)
        .then(() => {
        isLoading = false;
        console.log('Producto nuevo en carrito!');
        res.send('Producto nuevo en carrito!');
    })
        .catch((err) => res.send(err));
    console.log(isLoading);
    //res.json(productos);
});
exports.default = routerCarritos;

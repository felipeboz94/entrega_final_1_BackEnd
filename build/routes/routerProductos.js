"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataHandling_1 = require("../dataHandling"); //getProductById,insertData,deleteProduct,updateProduct
const routerProductos = express_1.default.Router();
routerProductos.get('/', (req, res) => {
    let isLoading = true;
    console.log('Está cargando...');
    (0, dataHandling_1.getProducts)()
        .then((productos) => {
        isLoading = false;
        console.log('Carga finalizada');
        const { limit } = req.query;
        let productosLimite = limit ? productos.slice(0, parseInt(limit)) : productos;
        res.send({ productos: productosLimite });
    })
        .catch((err) => res.send(err));
    console.log(isLoading);
});
routerProductos.get('/:pid', (req, res) => {
    let isLoading = true;
    const productoID = parseInt(req.params.pid);
    console.log('Está cargando...');
    (0, dataHandling_1.getProductById)(productoID)
        .then((productoFiltrado) => {
        isLoading = false;
        console.log('Carga finalizada');
        res.send({ productos: productoFiltrado });
    })
        .catch((err) => res.send(err));
    console.log(isLoading);
});
routerProductos.put('/:pid', (req, res) => {
    let isLoading = true;
    const productoID = parseInt(req.params.pid);
    const productoActualizado = req.body;
    console.log(productoActualizado);
    (0, dataHandling_1.updateProduct)(productoID, productoActualizado)
        .then(() => {
        isLoading = false;
        console.log('Actualización finalizada');
        res.send('Actualización finalizada');
    })
        .catch((err) => res.send(err));
    console.log(isLoading);
});
routerProductos.post('/', (req, res) => {
    let isLoading = true;
    console.log('--------------------req.body');
    console.log(req.body);
    console.log(typeof req.body);
    const productoNuevo = req.body;
    console.log(productoNuevo);
    (0, dataHandling_1.addProduct)(productoNuevo)
        .then(() => {
        isLoading = false;
        console.log('Carga finalizada');
        res.send('Carga finalizada');
    })
        .catch((err) => res.send(err));
    console.log(isLoading);
});
routerProductos.delete('/:pid', (req, res) => {
    let isLoading = true;
    const productoID = parseInt(req.params.pid);
    console.log('Está procesando el delete...');
    (0, dataHandling_1.deleteProduct)(productoID)
        .then(() => {
        isLoading = false;
        console.log('Delete finalizado');
        res.send('Delete finalizado');
    })
        .catch((err) => res.send(err));
    console.log(isLoading);
});
exports.default = routerProductos;

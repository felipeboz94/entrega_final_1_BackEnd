
import express, {Request, Response, Router} from "express";
import {Product} from '../Product'
import {addProduct,getProducts,getProductById,deleteProduct,updateProduct} from '../dataHandling'; //getProductById,insertData,deleteProduct,updateProduct
const routerProductos : Router = express.Router();


routerProductos.get('/',(req : Request<{}> , res : Response) =>{
    let isLoading : boolean = true;
    console.log('Está cargando...');
    getProducts() 
    .then((productos)=>{
        isLoading = false;
        console.log('Carga finalizada');
        const {limit} = req.query;
        let productosLimite = limit ? productos.slice(0,parseInt(limit as string)) : productos;
        res.send({productos:productosLimite});
    })
    .catch((err)=> res.send(err));
    console.log(isLoading);
});

routerProductos.get('/:pid',(req : Request , res : Response) =>{
    let isLoading : boolean = true;
    const productoID : number = parseInt(req.params.pid as string);
    console.log('Está cargando...');
    getProductById(productoID) 
    .then((productoFiltrado)=>{
        isLoading = false;
        console.log('Carga finalizada');
        res.send({productos:productoFiltrado});
    })
    .catch((err)=> res.send(err));
    console.log(isLoading);

});
routerProductos.put('/:pid',(req : Request , res : Response) =>{
    let isLoading : boolean = true;
    const productoID : number = parseInt(req.params.pid as string);
    const productoActualizado : Product = req.body;
    console.log(productoActualizado);
    updateProduct(productoID,productoActualizado)
    .then(()=>{
        isLoading = false;
        console.log('Actualización finalizada');
        res.send('Actualización finalizada');
        })
        .catch((err)=> res.send(err));
        console.log(isLoading);

    })

routerProductos.post('/',(req : Request , res : Response) =>{
    let isLoading : boolean = true;
    console.log('--------------------req.body')
    console.log(req.body);
    console.log(typeof req.body);
    const productoNuevo : Product = req.body;
    console.log(productoNuevo);
    addProduct(productoNuevo)
    .then(()=>{
        isLoading = false;
        console.log('Carga finalizada');
        res.send('Carga finalizada');
        })
        .catch((err)=> res.send(err));
        console.log(isLoading);
});

routerProductos.delete('/:pid',(req : Request , res : Response) =>{
    let isLoading : boolean = true;
    const productoID : number = parseInt(req.params.pid as string);
    console.log('Está procesando el delete...');
    deleteProduct(productoID) 
    .then(()=>{
        isLoading = false;
        console.log('Delete finalizado');
        res.send('Delete finalizado');
    })
    .catch((err)=> res.send(err));
    console.log(isLoading);
})

export default routerProductos;
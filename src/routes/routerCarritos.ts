
import express, {Request, Response, Router} from "express";
import {getCarts,getCartById,addCart,addProductToCart} from '../dataHandling'; //getProductById,insertData,deleteProduct,updateProduct

const routerCarritos : Router = express.Router();

routerCarritos.get('/',(_req : Request , res : Response) =>{
    let isLoading : boolean = true;
    console.log('Está cargando...');
    getCarts() 
    .then((carts)=>{
        isLoading = false;
        console.log('Carga finalizada');
        res.send({carritos:carts});
    })
    console.log(isLoading);

});

routerCarritos.get('/:cid',(req : Request , res : Response) =>{
    let isLoading : boolean = true;
    const cartID : number = parseInt(req.params.cid as string);
    console.log('Está cargando...');
    getCartById(cartID) 
    .then((cartFiltrado)=>{
        isLoading = false;
        console.log('Carga finalizada');
        res.send({carrito:cartFiltrado});
    })
    .catch((err)=> res.send(err));
    console.log(isLoading);

});

routerCarritos.post('/',(req : Request , res : Response) =>{
    let isLoading : boolean = true;
    console.log('Creando carrito...');
    addCart()
    .then(()=>{
        isLoading = false;
        console.log('Carrito nuevo!');
        res.send('Carrito nuevo!');
    })
    .catch((err)=> res.send(err));
    console.log(isLoading);
});

routerCarritos.post('/:cid/products/:pid',(req : Request , res : Response) =>{
    let isLoading : boolean = true;
    const cartID : number = parseInt(req.params.cid as string);
    const productID : number = parseInt(req.params.pid as string);
    console.log('Agregando producto a carrito...');
    addProductToCart(cartID,productID)
    .then(()=>{
        isLoading = false;
        console.log('Producto nuevo en carrito!');
        res.send('Producto nuevo en carrito!');
    })
    .catch((err)=> res.send(err));
    console.log(isLoading);
    //res.json(productos);

});


export default routerCarritos;
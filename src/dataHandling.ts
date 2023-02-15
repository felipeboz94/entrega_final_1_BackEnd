

/*
ProductManager es de la forma: 
{
    path: '',
    productos :  [
        producto1,
        producto2,
        ...,
        productoN
    ]
}
Los métodos:
1. addProduct   --> Agrega un producto al arreglo inicial. Valida
que no se repita la propiedad 'code' y que todos los campos sean obligatorios.
Además crea un id autoincrementable;
2. getProducts  --> Devuelve el arreglo con todos los productos creados hasta el momento;
3. getProductById > Busca en el arreglo el producto que coincida con el id. Si no coincide,
muestra en la consola un error de 'Not found'.

Luego los productos son de la forma:
{
    title : '',
    description : '',
    price : 1000,
    thumbnail : '',
    code : 01,
    stock : 1
}
*/
import {Product} from './Product';
import {productsInCart} from './Cart';
const PRODUCTS_PATH : string = './ProductManager.json';
const CARTS_PATH : string = './CartManager.json'
//----------------FUNCIONES FRONTERA CON DATABASE----------------------
export async function insertProductsData(path: string, data : Array<{id:number, producto: Product}>): Promise<void>{
    const fs = require('fs');
    await fs.promises.writeFile(path,JSON.stringify(data));
} 

export async function insertCartsData(path: string, data : Array<{id:number, cart: Array<productsInCart>}>): Promise<void>{
    const fs = require('fs');
    await fs.promises.writeFile(path,JSON.stringify(data));
} 

export async function readAllData(path:string):Promise<string>{
    const fs = require('fs');
    const readedData : Promise<string> = await fs.promises.readFile(path,'utf-8');  
    return readedData;
}
//-------------------------------------------------------------------

//---------------------------FUNCIONES DE MANEJO DE PRODUCTOS--------------------
export async function getProducts() : Promise<Array<{id:number, producto: Product}>> {
    let resultado : string = await readAllData(PRODUCTS_PATH); //Adding !before variable tells typescript to remove undefined or null as possibles types for variable:
    let productos : Array<{id:number, producto: Product}> = JSON.parse(resultado);
    return productos;
}

export async function getProductById(id:number): Promise<Array<{id:number, producto: Product}>>{
    let resultado : string = await readAllData(PRODUCTS_PATH); 
    let productos : Array<{id:number, producto: Product}> = JSON.parse(resultado);
    let productoFiltrado = productos.filter(producto=> producto.id == id)
    return productoFiltrado;
}

export async function addProduct(newProduct : Product) {
        
    let estaEnProductManager : boolean = false;
    let resultado : string = await readAllData(PRODUCTS_PATH);
    let productos : Array<{id:number, producto: Product}> = JSON.parse(resultado);
    if (productos){
        for (let producto of productos){
            if (newProduct.code === producto.producto.code){
                estaEnProductManager = true;
            }
        }
    }
    if (estaEnProductManager){
        console.log('Error. Este producto ya se encuentra en el ProductManager. Código repetido.');
    }
    else{
        let id = productos.length + 1 ;
        let productoNuevo : {id:number, producto: Product} = {id:id,producto: newProduct};
        productos.push(productoNuevo);
        insertProductsData(PRODUCTS_PATH, productos)
         .then(()=>{
            console.log("Producto agregado satisfactoriamente");
            console.log("Su id es: %d",id);
        })
    }

}

export async function updateProduct(id:number,productoActualizado: Product):Promise<void>{
    let resultado : string = await readAllData(PRODUCTS_PATH);
    let productos : Array<{id:number, producto: Product}> = JSON.parse(resultado);
    let indice : number = -1;
    productos.map((producto,index) =>{
            if (producto.id == id){
                indice = index;
                producto.producto = productoActualizado;
            }
        }
    )    
    if (indice > -1 ){
        insertProductsData(PRODUCTS_PATH,productos)
        .then(() =>
        console.log('Se actualizó el objeto de id: ' + id))
        
    }
    else{
        console.log('No se realizó actualización debido a que no se encontró el objeto de id '+ id );
    }
}



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
export async function deleteProduct(id:number){
    let resultado : string = await readAllData(PRODUCTS_PATH);
    let productos : Array<{id:number, producto: Product}> = JSON.parse(resultado);
    let indice :number = -1;
    if (productos){
        productos.map((producto,index) =>{
            if (producto.id == id){
                indice = index;
                productos.splice(index,1);
            }
        }
    )
    }
    if (indice > -1){
        insertProductsData(PRODUCTS_PATH,productos)
        .then(() =>
            console.log('Se eliminó el objeto de id: ' + id))
    }
    else{
        console.log('Error al intentar eliminar el objeto. No existe el id: ' + id);
    }
}

//---------------------------FUNCIONES DE MANEJO DE CARTS--------------------
export async function getCarts() : Promise<Array<{id:number, cart: Array<productsInCart>}>> {
    let resultado : string = await readAllData(CARTS_PATH); //Adding !before variable tells typescript to remove undefined or null as possibles types for variable:
    let carts : Array<{id:number, cart: Array<productsInCart>}> = JSON.parse(resultado);
    return carts;
}

export async function getCartById(cid:number): Promise<Array<{id:number, cart: Array<productsInCart>}>>{
    let resultado : string = await readAllData(CARTS_PATH); 
    let carts : Array<{id:number, cart: Array<productsInCart>}> = JSON.parse(resultado);

    let cartFiltrado = carts.filter(cart=> cart.id == cid);
    return cartFiltrado;
}

export async function addCart(){
    let resultado : string = await readAllData(CARTS_PATH);
    let carts : Array<{id:number, cart: Array<productsInCart>}> = JSON.parse(resultado);
        let id = carts.length + 1 ;
        let cartNuevo : {id:number, cart: Array<productsInCart>} = {id:id,cart: [] };
        carts.push(cartNuevo);
        insertCartsData(CARTS_PATH, carts)
         .then(()=>{
            console.log("Cart agregado satisfactoriamente");
            console.log("Su id es: %d",id);
        })
    

}

export async function addProductToCart(cid : number, pid : number) {
        
    let cartEstaEnCartManager : boolean = false;
    let productoEnCart : boolean = false;
    let resultado : string = await readAllData(CARTS_PATH);
    let carts : Array<{id:number, cart: Array<productsInCart>}> = JSON.parse(resultado);
    if (carts){
        carts.map((cart,indexCart)=>{
            if (cart.id === cid){
                cartEstaEnCartManager = true;
                cart.cart.map((producto,indexProduct)=>{
                    if (producto.pid === pid){
                        productoEnCart = true;
                        producto.quantity += 1;
                    }
                })
                //si el producto no está en el carrito, se pushea un nuevo producto en este
                if (!productoEnCart){
                    cart.cart.push({pid:pid,quantity:1});
                }
            }
        })
        if(!cartEstaEnCartManager){
            console.log('Error, producto no está en carrito')
        }
    }
        insertCartsData(CARTS_PATH, carts)
         .then(()=>{
            console.log("Producto agregado satisfactoriamente");
            console.log("Su id es: %d",cid);
        })
    }



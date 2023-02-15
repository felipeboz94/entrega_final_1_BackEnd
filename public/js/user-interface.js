async function onClickEvent(pid){


    console.log('El id del producto seleccionado es '+pid)
    
    //acá hace el fetch de post y luego el get del carrito
}

function getCart(){
    fetch('http://localhost:8080/api/carts')
    .then(data => {
        data.json().then((datos)=>{    
            console.log(datos)
        }
        )})
}

function addToCart(pid){
/*  producto dentro de carro tiene el formato:
    {
        cid: number,
        pid: number,
        quantity: number
    }*/


    onClickEvent(pid)
}

async function muestraProductos(){
    const div_dinamico = document.getElementById('div-dinamico')

    fetch('http://localhost:8080/api/products')
    .then(data => {
        data.json().then((datos)=>{
            //ver por qué se duplica por ser promesa
            datos.productos && datos.productos.map((product,index)=>{
            let producto = product.producto
            
            console.log(product)            
            const div = document.createElement("div");
            const title = document.createElement("h2")
            const description = document.createElement("h3")
            const stock = document.createElement("h5")
            const price = document.createElement("h3")
            //const buttonResta = document.createElement("button")
            const buttonSuma = document.createElement("button")
            title.innerText = producto.title
            description.innerText = producto.description
            stock.innerText = producto.stock
            price.innerText = producto.price
            //buttonResta.innerText = '-'
            buttonSuma.innerText = '+'
            //buttonResta.addEventListener('click', function(){addToCart(product.id,false)})
            buttonSuma.addEventListener('click', function(){addToCart(product.id)})
            div.appendChild(title)
            div.appendChild(description)
            div.appendChild(stock)
            div.appendChild(price)
            //div.appendChild(buttonResta)
            div.appendChild(buttonSuma)

            div_dinamico.appendChild(div)
                  //  div_dinamico.appendChild(para)
                })
        }
        )    
    })

}

muestraProductos()




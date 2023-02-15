async function onClickEvent(pid,esSuma){


    console.log('El id del producto seleccionado es '+pid)
    
    //acá hace el fetch de post y luego el get del carrito
}

function funcionDeClick(pid,esSuma){

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
            const buttonEditar = document.createElement("button")
            const buttonEliminar = document.createElement("button")
            title.innerText = producto.title
            description.innerText = producto.description
            stock.innerText = producto.stock
            price.innerText = producto.price
            buttonEditar.innerText = 'Editar'
            buttonEliminar.innerText = 'Eliminar'
            buttonEditar.addEventListener('click', function(){funcionDeClick(product.id,false)})
            buttonEliminar.addEventListener('click', function(){funcionDeClick(product.id,true)})
            //button.innerText = '+'
            div.appendChild(title)
            div.appendChild(description)
            div.appendChild(stock)
            div.appendChild(price)
            div.appendChild(buttonEditar)
            div.appendChild(buttonEliminar)

            div_dinamico.appendChild(div)
                  //  div_dinamico.appendChild(para)
                })
        }
        )    
    })

}

muestraProductos()




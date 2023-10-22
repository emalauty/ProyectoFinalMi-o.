const productos = document.getElementById("productos");
const verCarrito = document.getElementById("verCarrito");
const carritoDiv = document.getElementById("carritoDiv");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const obtPokemons = async () => {
    const response = await fetch("data.json");
    const data = await response.json();

    data.forEach((pokemon) => {
        let contenido = document.createElement("div");
        contenido.className = "container1";
        contenido.innerHTML = `
            <img src="${pokemon.img}">
            <h3>${pokemon.nombre}</h3>
            <p class="precio">${pokemon.precio} ¥</p>
           
        `;
        productos.append(contenido);
    
        let compra = document.createElement("button");
        compra.className = "compra";
        compra.innerText = "comprar";
        contenido.append(compra);

        compra.addEventListener("click",() =>{
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === pokemon.id);
        Swal.fire({
            title: 'Perfecto!',
            text: 'Tu pokemon fue agredado al carrito',
            icon: 'success',
            confirmButtonText: 'Continuar'
          })
        if (repeat){
            carrito.map((poke) =>{
                if(poke.id === pokemon.id){
                    poke.cantidad++;
                }
            });
         
        } else{
            carrito.push({
                id: pokemon.id,
                img: pokemon.img,
                nombre: pokemon.nombre,
                precio: pokemon.precio,
                cantidad: pokemon.cantidad,
            });
        }
        carritoCounter();
        guardarDatos();
        }) 
    });
    
};
    obtPokemons();


    const guardarDatos = () =>{
        localStorage.setItem("carrito",JSON.stringify(carrito));
    };


const pintarCarrito = () => {
    carritoDiv.innerHTML = "";
    carritoDiv.style.display = "flex";
    const carritoHeader = document.createElement("div");
    carritoHeader.className = "carrito-header";
    carritoHeader.innerHTML = `
        <h1 class="carrito-titulo-header">Tus Pokemons. </h1>
    `;
    carritoDiv.append(carritoHeader);

    const carritoBoton = document.createElement("h1");
    carritoBoton.innerText = "X";
    carritoBoton.className = "carrito-boton";

    carritoBoton.addEventListener("click", () => {
        carritoDiv.style.display = "none";
    })

    carritoHeader.append(carritoBoton);

    carrito.forEach((pokemon) => {
        let contenidoCarrito = document.createElement("div");
        contenidoCarrito.className = "contenido-carrito";
        contenidoCarrito.innerHTML = `
            <img src="${pokemon.img}">
            <h3>${pokemon.nombre}</h3>
            <p>${pokemon.precio} ¥</p>
            <span class="restar"> - </span>
            <p>Cantidad: ${pokemon.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total : ${pokemon.cantidad * pokemon.precio}</p>
            <span class="eliminar-pokemon"> 🗑️ </span>
    `;  

    carritoDiv.append(contenidoCarrito);

    let restar = contenidoCarrito.querySelector(".restar")
    restar.addEventListener("click", () =>{
        if (pokemon.cantidad !== 1){
            pokemon.cantidad--;
        }
     
        pintarCarrito();
        guardarDatos();
    })

    let sumar = contenidoCarrito.querySelector(".sumar")
    sumar.addEventListener("click", () =>{
        pokemon.cantidad++;
        pintarCarrito();
        guardarDatos();
    })
    let eliminar = contenidoCarrito.querySelector(".eliminar-pokemon");
    eliminar.addEventListener("click", () =>{
        eliminarProducto(pokemon.id);
    });


});
    
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "total-contenido";
    totalCompra.innerHTML = `total a pagar: ${total} ¥`;
    carritoDiv.append(totalCompra);

  
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((pokemon) => pokemon.id === id);
    carrito = carrito.filter((carritoId) =>{
        return carritoId !== foundId;           
    });
    carritoCounter();
    guardarDatos();
    pintarCarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const lengthCarrito = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(lengthCarrito));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

JSON.parse(localStorage.getItem("carrito"));

carritoCounter();


// variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // cuando agregas un curso presionanado 'agregar al carrito'
 listaCursos.addEventListener('click', agregarCurso);

 //Elmina curso del carrito
 carrito.addEventListener('click', eliminarCurso);

 // vaciar el carrito
 vaciarCarritoBtn.addEventListener('click' , () =>{
    articulosCarrito = []; // reseateamos el arreglo

    limpiarHTML(); // eliminamos todo el HTML

 })

}

// Funciones 
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }

}
//elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //elimina del arreglo de articulosCarrito por el Data-Id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        
        carritoHTML(); // iterar sobre el carrito de compra y mostrar su HTML
    }

}


// Lee el contenido del HTML al que le dimos click y extare la informacion del curso

function leerDatosCurso(curso) {
    // console.log(curso);

    // crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    //revisa si un elemento ya existe en el carrito

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id );
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            }
            else{
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }
    else{

        // Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito,infoCurso];
    }


    

    console.log(articulosCarrito);
    carritoHTML();
 }

 // muestra el carrito de compra en el HTML


 function carritoHTML(){

    // limpiar el Html
    limpiarHTML();

    // recorre el carrito y genera el HTML 

    articulosCarrito.forEach( curso  =>{
        const{imagen,titulo,precio,cantidad,id} = curso
        console.log(curso);
        const row = document.createElement('tr');
        row.innerHTML =  `
        <td>
           <img src="${imagen}" width="100">
        </td>
        <td>${titulo} </td>
        <td> ${precio}</td>
        <td> ${cantidad}</td>
        <td>
        <a href='#' class='borrar-curso' data-id="${id}"> X </a>
        </td> 
        
        `;

        // Agrega el HTML del carrito en el Tbody
        contenedorCarrito.appendChild(row);

    })
 }

 // Elimina los cursos de Tbody

 function limpiarHTML(){
    //forma lenta 
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
 }


 // comprueba si hay hijos  y los elimina hasta que se termine el ciclo
//  <div>
//     <p>1</p>
//     <p>2</p>
//     <p>3</p>

//  </div>


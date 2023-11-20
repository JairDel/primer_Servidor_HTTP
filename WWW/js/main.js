console.log("Hola JavaScript del lado del cliente");

let button = document.getElementById('boton-ocultar');          //document: a la pagina que ya se tiene renderizada 

function hideImage(){
    let image = document.getElementById('imagen');
    image.style = 'display:none';
}

button.onclick = hideImage;
puntos = 0;
match = 0;

let AddAgregar = docEleme("Agregar");
let botonUpdate = docEleme("btnUpdate");
let botonEliminar = docEleme("btnEliminar");
let arrPerson;
let imgPersonaje = document.querySelector("#imgCollapse");

const urlPhp = "http://hdecstudio.com/api/Ruleta/service.php"
/*const srcJson = "http://127.0.0.1:5500/ruleta.json";*/
let i = 0;

document.querySelector("#Prev").innerHTML = "<img id='btnPrev' src='img/back2.png' class='btn' onClick='botoNPrev()'>";
document.querySelector("#Next").innerHTML = "<img id='btnNext' src='img/next2.png' class='btn' onClick='botoNNext()'>";
document.querySelector("#tituloSelector").innerHTML = "<p style='text-aling:center;'>PERSONAJES ROBLOX</p>";

let botonPrev = document.querySelector("#btnPrev");
let botonNext = document.querySelector("#btnNext");


function botoNPrev() {

    if (i <= 0) {
        i = arrPerson.length - 1;

    } else {
        i = i - 1;
    }
    console.log("PREVIO:" + i);

    actualizarImagen(arrPerson, i);

}


function botoNNext() {
    if (i >= arrPerson.length - 1) {
        i = 0;
    } else {
        i = i + 1;
    }
    console.log("NEXT :" + i);
    actualizarImagen(arrPerson, i);
}

function docEleme(id) {
    return document.getElementById(id);
}

//Obetner - GET
/*$.ajax(urlPhp)
    .then(response => {
        if (response.statusCode == "0") {
            data = response.data;
        }
    })*/

//post
AddAgregar.addEventListener('click', () => {
    let NombreF = docEleme("fName").value;
    let NumeroF = docEleme("fNumber").value;
    let PonitF = docEleme("fPoint").value;
    let UrlF = docEleme("fUrl").value;

    const parametros = { name: NombreF, number: NumeroF, point: PonitF, src: UrlF };

    //Guardar - POST
    fetch(urlPhp, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(parametros), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            if (response.statusCode == "0") {
                alert(response.statusMessage);
                consumirServicio();
            } else {
                alert(response.statusMessage);
            }

        }
        )
        .catch(error => console.error('Error:', error));
})


botonUpdate.addEventListener('click', () => {

    let NombreF = docEleme("fName").value;
    let NumeroF = docEleme("fNumber").value;
    let PonitF = docEleme("fPoint").value;
    let UrlF = docEleme("fUrl").value;

    const parametros = { name: NombreF, number: NumeroF, point: PonitF, src: UrlF };

    //PUT

    fetch(urlPhp, {
        method: 'PUT',
        body: JSON.stringify(parametros),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(res => res.json())
        .then(response => {
            if (response.statusCode == "0") {
                alert(response.statusMessage);
                consumirServicio();
            } else {
                alert(response.statusMessage);
            }
        })
})



botonEliminar.addEventListener('click', () => {

    let NombreF = docEleme("fName").value;
    let NumeroF = docEleme("fNumber").value;
    let PonitF = docEleme("fPoint").value;
    let UrlF = docEleme("fUrl").value;

    const parametros = { name: NombreF, number: NumeroF, point: PonitF, src: UrlF };

    fetch(urlPhp, {
        method: 'DELETE',
        body: JSON.stringify(parametros),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(res => res.json())
        .then(response => {
            if (response.statusCode == "0") {
                alert(response.statusMessage);
                consumirServicio();
            } else {
                alert(response.statusMessage);
            }
        })
})



function actualizarImagen(arr, indice) {
    var person = arr[indice];
    var imagen = person.src;
    var nombre = person.name;
    var numero = person.number;
    var punto = person.point;

    if (imagen.indexOf("jpg") != -1 || imagen.indexOf("png") != -1) {
        document.querySelector("#imgCollapse").innerHTML = "<img id='imagenPersonaje'  src='" +
            imagen + "'/>";
    } else {
        document.querySelector("#imgCollapse").innerHTML = "<img id='imagenPersonaje' alt='Imagen de error' />";
    }

    document.querySelector("#itemPersonaje").innerHTML = "<th>Numero</th><th>Puntos</th>"
    document.querySelector("#datosPersonaje").innerHTML = "<tr><td>" + numero + "</td><td>" + punto + "</td></tr>"
    document.querySelector("#cardHeader").innerHTML = "<p style='margin:0px;'>" + nombre + "</p>";


}


function consumirServicio() {
    fetch(urlPhp)
        .then(respon => respon.json())
        .then(elemento => {

            if (elemento.statusCode == "0") {
                i = 0;

                console.log("termina consulta :" + i);
                arrPerson = elemento.data.personaje;

                actualizarImagen(arrPerson, i);

               /*botonPrev.addEventListener('click', () => {

                    if (i <= 0) {
                        i = arrPerson.length - 1;

                    } else {
                        i = i - 1;
                    }
                    console.log("PREVIO:" + i);

                    actualizarImagen(arrPerson, i);

                })

                botonNext.addEventListener('click', () => {


                    if (i >= arrPerson.length - 1) {
                        i = 0;
                    } else {
                        i = i + 1;
                    }
                    console.log("NEXT :" + i);
                    actualizarImagen(arrPerson, i);
                })*/


            } else {
                alert('Error Cavsa');
            }


        })
}


consumirServicio();



/*$('.carousel').carousel({
    interval: 0
})*/
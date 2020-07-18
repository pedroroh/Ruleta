puntos = 0;
match = 0;

let AddAgregar = docEleme("Agregar");
let arrPerson;
let imgPersonaje = document.querySelector("#imgCollapse");



const urlPhp = "http://hdecstudio.com/api/Ruleta/service.php"
/*const srcJson = "http://127.0.0.1:5500/ruleta.json";*/
let i = 0;

document.querySelector("#Prev").innerHTML = "<img id='btnPrev' src='img/back2.png' class='btn'>";
document.querySelector("#Next").innerHTML = "<img id='btnNext' src='img/next2.png' class='btn'>";
document.querySelector("#tituloSelector").innerHTML = "<p style='text-aling:center;'>PERSONAJES ROBLOX</p>";

let botonPrev = document.querySelector("#btnPrev");
let botonNext = document.querySelector("#btnNext");



function docEleme(id) {
    return document.getElementById(id);
}

//Obetner - GET
$.ajax(urlPhp)
    .then(response => {
        if (response.statusCode == "0") {
            data = response.data;
        }
    })

//post
AddAgregar.addEventListener('click', () => {
    let NombreF = docEleme("fName").value;
    let NumeroF = docEleme("fNumber").value;
    let PonitF = docEleme("fPoint").value;
    let UrlF = docEleme("fUrl").value;

    const parametros = { name: NombreF, number: NumeroF, point: PonitF, url: UrlF };

    //


    //Guardar - POST
    fetch(urlPhp, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(parametros), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));

})


function consumirServicio() {
    fetch(urlPhp)
        .then(respon => respon.json())
        .then(elemento => {
            console.log("1111111111");

            if (elemento.statusCode == "0") {
                arrPerson = elemento.data.personaje;
                var person = arrPerson[i];
                var imagen = person.src;
                var nombre = person.name;
                var numero = person.number;
                var punto = person.point;

                document.querySelector("#imgCollapse").innerHTML = "<img id='imagenPersonaje'  src='" +
                    imagen + "'>";
                document.querySelector("#itemPersonaje").innerHTML = "<th>Numero</th><th>Puntos</th>"
                document.querySelector("#datosPersonaje").innerHTML = "<tr><td>" + numero + "</td><td>" + punto + "</td></tr>"
                document.querySelector("#cardHeader").innerHTML = "<p style='margin:0px;'>" + nombre + "</p>";

                debugger

                botonPrev.addEventListener('click', (a, arrPerson) => {
                    console.log(arrPerson.length);
                    if (i <= 0) {
                        i = arrPerson.length - 1;
                    } else {
                        i = i - 1;
                    } //consumirServicio();
                })

                botonNext.addEventListener('click', (arrPerson) => {
                    console.log("Boton Next");

                    if (i >= arrPerson.length - 1) {
                        i = 0;
                    } else {
                        i = i + 1;
                    }
                })


            } else {
                alert('Error Cavsa');
            }


        })
}


consumirServicio();



/*$('.carousel').carousel({
    interval: 0
})*/
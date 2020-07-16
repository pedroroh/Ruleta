puntos = 0;
match = 0;



let AddAgregar = docEleme("Agregar");


let data;
let botonPrev = document.querySelector("#Prev");
let botonNext = document.querySelector("#Next");
let imgPersonaje = document.querySelector("#imgCollapse");

const srcJson = "http://hdecstudio.com/api/Ruleta/service.php"
/*const srcJson = "http://127.0.0.1:5500/ruleta.json";*/
let i = 0;

document.querySelector("#Prev").innerHTML = "<img id='btnPrev' src='img/back2.png' class='btn'>";
document.querySelector("#Next").innerHTML = "<img id='btnNext' src='img/next2.png' class='btn'>";
document.querySelector("#tituloSelector").innerHTML = "<p style='text-aling:center;'>PERSONAJES ROBLOX</p>";

function docEleme(id) {
    return document.getElementById(id);
}

//get
/*$.ajax(urlPhp + "?name=" + docEleme("name").value +
    "&number=" + docEleme("number").value + "&point=" +
    docEleme("point").value + "&src=" + docEleme("src").value)
    .then(response => {
        if (response.status == "0") {


        }
    })*/

//post
AddAgregar.addEventListener('click', () => {
    let NombreF = docEleme("fName").value;
    let NumeroF = docEleme("fNumber").value;
    let PonitF = docEleme("fPoint").value;
    let UrlF = docEleme("fUrl").value;

    const parametros = { name: NombreF, number: NumeroF, point: PonitF, url: UrlF };


    fetch(srcJson, {
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
    fetch(srcJson)
        .then(respon => respon.json())
        .then(elemento => {
            data = elemento;

            var person = data.personaje[i];
            var imagen = person.src;
            var nombre = person.name;
            var numero = person.number;
            var punto = person.point;

            document.querySelector("#imgCollapse").innerHTML = "<img id='imagenPersonaje'  src='" +
                imagen + "'>";
            document.querySelector("#itemPersonaje").innerHTML = "<th>Numero</th><th>Puntos</th>"
            document.querySelector("#datosPersonaje").innerHTML = "<tr><td>" + numero + "</td><td>" + punto + "</td></tr>"
            document.querySelector("#cardHeader").innerHTML = "<p style='margin:0px;'>" + nombre + "</p>";

        })
}

function election() {
    consumirServicio();

    botonNext.addEventListener('click', () => {
        if (i >= data.personaje.length - 1) {
            i = 0;
        } else {
            i = i + 1;
        } consumirServicio();
    })

    /* imgPersonaje.addEventListener('click', () => {
          document.querySelector("#imgCollapse").click();
      });*/

    botonPrev.addEventListener('click', () => {
        if (i <= 0) {
            i = data.personaje.length - 1;
        } else {
            i = i - 1;
        } consumirServicio();
    })
}

//election();


$('.carousel').carousel({
    interval: 0
})
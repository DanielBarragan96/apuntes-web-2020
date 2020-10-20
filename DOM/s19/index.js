const drinksAPI = 'http://dsaw.mybluemix.net/api/drinks';    
// const drinksAPI = 'http://localhost:3000/api/drinks';
function loadJSON(urlJSON ,cbOK,cbError) {
    console.log(`loading JSON data from ${urlJSON}`);
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar: PUT actualizar archivo
    xhr.open('GET', urlJSON);
    // 4. Enviar solicitud
    xhr.send();
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
    if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
    // Ocurrió un error
    alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
    cbError();
    // ejecutar algo si error
    } else {
    let datos = JSON.parse(xhr.response); //esta es la línea que hay que probar
    // Ejecutar algo si todo está correcto
    console.log(datos); // Significa que fue exitoso
    cbOK(datos);
    }
    };
}
function sendJSON(urlJSON,datos,cbOK,cbError) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open('POST', urlJSON);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    // 4. Enviar solicitud al servidor
    xhr.send([JSON.stringify(datos)]);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200 && xhr.status != 201) { // analizar el estatus de la respuesta HTTP 
            // Ocurrió un error
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            cbOK(xhr.status + ': ' + xhr.statusText);
        } else {
            console.log(xhr.responseText); // Significa que fue exitoso
            cbOK(xhr.status + ': ' + xhr.statusText+' - '+xhr.responseText);
        }
    };    
}
function deleteJSON(urlJSON,cbOK,cbError) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open('DELETE', urlJSON);
    // 3. indicar tipo de datos JSON
    xhr.send();
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 204) { // analizar el estatus de la respuesta HTTP 
            // Ocurrió un error
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            cbOK(xhr.status + ': ' + xhr.statusText);
        } else {
            console.log(xhr.responseText); // Significa que fue exitoso
            cbOK(xhr.status + ': ' + xhr.statusText+' - '+xhr.responseText);
        }
    };    
}

function remove_item(element){
    console.log('deleting drink..');
    let drinkId = element.getAttribute('data-id');
    let drinkRev = element.getAttribute('data-rev');
    let url = `${drinksAPI}/${drinkId}?rev=${drinkRev}`;
    deleteJSON(url,()=>{
        console.log('deleting drink sucess..');
        getData();
    },()=>{

    })
}


function add_drink(element){
    console.log('adding drink..');
    let name = document.getElementById('addDrink_name').value;
    let price = document.getElementById('addDrink_price').value;
    let image = document.getElementById('addDrink_image').value ;
    let type = document.getElementById('addDrink_type').value ;
    let drink = {
        name : name,
        price : price,
        image : image,
        type: type
    }
    sendJSON(drinksAPI,drink,()=>{
        console.log('adding drink sucess..');
        $("#modal_addDrink").modal("hide");
        getData();
    },()=>{

    })
}
function drinkToHTML(drink){
    console.log(drink);
    let html =  `<li class="media">
                <img class="mr-3"
                    id
                    src="${drink.image}"
                    alt="Generic placeholder image">
                <div class="media-body">
                    <h5 class="mt-0 mb-1">${drink.name}</h5>
                    <ul>
                        <li><strong>Tipo:</strong> ${drink.type} </li>
                        <li><strong>Precio:</strong> ${drink.price}</li>
                        <li><button  type="button" class="btn btn-danger btn-sm" data-id="${drink.id}" data-rev="${drink.rev}" >
                            <svg width="1em" height="1em"
                                    viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path fill-rule="evenodd"
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg>
                            </button></li>
                    </ul>
                </div>
            </li>`;
            // console.log(html);
    return html;
    
}

function getData(){
    console.log('getting data...');
    loadJSON(drinksAPI,(data)=>{
        // console.table(data);
        document.getElementById("drinksList").innerHTML =data.map(drinkToHTML).join('');
    },()=>{

    })
}

function saveDrink(){

}


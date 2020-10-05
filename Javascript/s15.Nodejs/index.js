function guardarJSON(datos) {
    let urlJSON = 'http://practica2-iteso.mybluemix.net/users';
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', urlJSON);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(datos)]);
    xhr.onload = function () {
        document.getElementById('content').innerHTML = `${xhr.status} ${xhr.statusText} ${xhr.responseText}`;
        if (xhr.status != 200) {
            alert(xhr.status + ":" + xhr.statusText);
        } else {
            console.log(xhr.responseText);
        }
    }
}

let user = [{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
}, ];

guardarJSON(user);
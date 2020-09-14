console.log('index2.js')

function crearNuevoUsuario(id, userName, guardarDatos) {
    if (id > 0 && id < 10000) {
        guardarDatos(id, userName);
    } else {
        console.log('id incorrecto');
    }
}

function guardar(id, name) {
    console.log(`id:${id} name:${name}`);
}

function guardarMysql(id, name) {
    console.log(`Guardanfo en MySql id:${id} name:${name}`);
}

let save = guardar;
crearNuevoUsuario(123, 'Juan Perez', save);
crearNuevoUsuario(123, 'Juan Perez', guardarMysql);
crearNuevoUsuario(11000, 'Juan Perez', save);

crearNuevoUsuario(123, 'Juan Perez', function () {
    console.log('esto se puso raro');
});

function saveUser(id, userName, fnCallback) {
    //smulate store in database
    let sucess = true;
    if (sucess) {
        fnCallback(undefined, 'guardado', undefined)
    } else {
        fnCallback('error de comunicacion', 'no guardado', undefined);
    }
}

/* Funcion callback con function */
// saveUser(123, 'Juan', function (err, sucess, failure) {
//     if (err)
//         console.error(err, failure);
//     else
//         console.log(sucess);
// });

/* Funcion callback con arrow function */
saveUser(123, 'Juan', (err, sucess, failure) => {
    if (err)
        console.error(err, failure);
    else
        console.log(sucess);
});

function sumar() {
    let y = 0;
    for (let x of arguments) {
        y += x;
    }
    console.log(y);
}

sumar(1, 2, 3, 4, 5, 6);
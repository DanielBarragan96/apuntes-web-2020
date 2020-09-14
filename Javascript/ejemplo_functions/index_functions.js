console.log("Hola mundo");

function fun1() {
    console.log("Hola funcion");
}

fun1();

function fun2(par1, par2 = "adios") {
    if (typeof par2 === 'number') {
        console.log('Tipo de datp correcto');
    } else {
        console.log('Tipo de datp incorrecto');
    }
    console.log(`El valor es ${par1} y valor 2 es ${par2}`);
    return;
}

fun2("Hola", "mundo");
fun2("Hola");
fun2("Hola", "5");

let v3 = 3;

function fun3(v1, v2) {
    return v1 + v2 + v3;
}

console.log(fun3(1, 2));

function fun4(v1, v2) {
    let v4 = 5;
    return v1 + v2 + v4;
}
console.log(fun4(1, 2));

function mostrarMensaje(texto) {
    console.log(texto);
}

// let mensaje = mostrarMensaje;
// mensaje('Hola');
// console.log(mensaje);
// console.log(typeof mensaje);

let mensaje = function mostrarMensaje(texto) {
    console.log(texto);
};
console.log(mensaje);
mostrarMensaje('hola mundo!');
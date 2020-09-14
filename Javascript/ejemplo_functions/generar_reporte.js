let aprobado = (nombre, calif) => {
    console.log(`${nombre} esta aprobado con ${calif}`)
}
let reprobado = (nombre, calif) => {
    console.log(`${nombre} esta reprobado con ${calif}`)
}

function generarReporte(nombre, calif, fnAprobado, fnReprobado) {
    if (calif >= 6) {
        fnAprobado(nombre, calif);
    } else {
        fnReprobado(nombre, calif)
    }
}

generarReporte('Pepito', 0, aprobado, reprobado);
generarReporte('Juan', 10, aprobado, reprobado);
generarReporte('Chale,', 5.99999999,
    (nombre, calif) => {
        console.log(`${nombre} esta aprobado con ${calif}`)
    },
    (nombre, calif) => {
        console.log(`${nombre} esta reprobado con ${calif}`)
    },
);
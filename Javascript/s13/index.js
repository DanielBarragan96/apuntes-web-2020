let flagHola = false;
let flagMundo = false;
const TIMER = 1000;

/*
////Ejemplo usando callbakcs
function callbackHellHola() {
    setTimeout(function primerHola() {
        console.log('Hola1');
        setTimeout(function primerHola() {
            console.log('Hola2');
            setTimeout(function primerHola() {
                console.log('Hola3');
                setTimeout(function primerHola() {
                    console.log('Hola4');
                    setTimeout(function primerHola() {
                        console.log('Hola5');
                        flagHola = true;
                    }, TIMER)
                }, TIMER)
            }, TIMER)
        }, TIMER)
    }, TIMER)
}

function callbackHellMundo() {
    setTimeout(function primerMundo() {
        console.log('Mundo1');
        setTimeout(function primerMundo() {
            console.log('Mundo2');
            setTimeout(function primerMundo() {
                console.log('Mundo3');
                setTimeout(function primerMundo() {
                    console.log('Mundo4');
                    setTimeout(function primerMundo() {
                        console.log('Mundo5');
                        flagMundo = true;
                    }, TIMER)
                }, TIMER)
            }, TIMER)
        }, TIMER)
    }, TIMER)
}

function ifEnd() {
    if (flagHola && flagMundo) {
        console.log('Fin');
    } else {
        setTimeout(ifEnd);
    }
}

callbackHellHola();
callbackHellMundo();
setTimeout(ifEnd);
*/

/*
////Ejemplo usando promise
function printHola(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Hola ${value}`);
            resolve(value + 1);
        }, TIMER);
    });
}

let pH = printHola(1).then((result) => {
    printHola(result).then((result) => {
        printHola(result).then((result) => {
            printHola(result).then((result) => {
                printHola(result).then()
            })
        })
    })
})
*/

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

async function printHola() {
    for (let i = 0; i < 5; i++) {
        let response = await delay(1000);
        console.log(`Hola ${i}`);
    }
    return Promise.resolve();
}

async function printMundo() {
    for (let i = 0; i < 5; i++) {
        let response = await delay(1000);
        console.log(`Mundo ${i}`);
    }
    return Promise.resolve();
}

Promise.all([printHola(), printMundo()]).then(() => console.log('FIN'));

document.getElementById('content').innerHTML = '<h1>Hola mundo<\h1>';
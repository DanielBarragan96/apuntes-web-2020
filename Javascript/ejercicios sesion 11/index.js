console.log("Hola mundo");

let a1 = {
    nombre: "Juan",
    apellido: "Perez",
    carrera: "isc",
    semestre: 9
}

console.log(a1);
a1.promedio = 9.9;
console.log(a1);
delete a1.carrera;
console.log(a1);

function crearAlumno(nombre, carrera) {
    return {
        nombre: nombre,
        carrera: carrera
    };
}

console.log(crearAlumno("jorge", "is"));

function Alumno_old(nombre, carrera) {
    this.nombre = nombre;
    this.carrera = carrera;
}

let alu1 = new Alumno_old('Juan', 'ISC');
console.log(alu1);
console.log(alu1.hasOwnProperty('promedio'));

class Alumno {
    constructor(nombre, carrera) {
        this.nombre = nombre;
        this.carrera = carrera;
    }
}

let alu2 = new Alumno('Adrian', 'IE');
console.log(alu2)

class Book {
    constructor(title, year, publisher, author) {
        this.title = title;
        this.year = year;
        this.publisher = publisher;
        this.author = author;
    }
}

console.log(new Book('harry potter', 2009, 'scholastic', 'J. K. Rowling'));
if (a1.expediente === undefined) {
    console.log('Alumno 1 no tiene esa propiedad');
}
if (!('expediente' in a1)) {
    console.log('Alumno 1 no tiene esa propiedad');
}

for (let prop in a1) {
    console.log(`${prop}: ${a1[prop]}`);
}

console.log(a1)
let a3 = a1;
a3.semestre = 12;
console.log(a1)
if (a3 == a1) {
    console.log('a3==a1');
}
if (a3 === a1) {
    console.log('a3===a1');
}
let a4 = {};
Object.assign(a4, a1); //Se usa para copiar un elemento a otro
console.log(a4)
a4.semestre = 2;
console.log(a1)
console.log(a4)

//Ejercicio 1
let book1 = new Book('harry potter', 2009, 'scholastic', 'J. K. Rowling');

function logProps(object1) {
    for (let prop in object1) {
        console.log(`${prop}: ${book1[prop]}`);
    }
}

function hasProp(object1, prop) {
    if (object1[prop])
        console.log(`${object1.title} has property ${prop}: ${object1[prop]}`);
    else
        console.log(`${object1.title} has no property ${prop}`);
}

logProps(book1);
hasProp(book1, 'ISBN');
hasProp(book1, 'title');
//Fin ejercicio 1

let student = {
    name: 'Edith',
    age: 22,
    showName() {
        console.log(this.name);
        console.log(student.name);
    }
}
student.showName();
let newS = student;
student = null;
//newS.showName(); //no se puede por que es null

let student2 = {
    name: 'Leo'
}

function showName() {
    console.log(this);
}
student2.newFn = showName;
student2.newFn();
student2['newFn']();
//student2.showName(); //no se puede por que este objeto no tiene esta funcion
showName(); //imprime a nivel raiz, en este caso windows, es como this.showName();

let alumno = {
    name: 'juan',
    gpa: 9.8,
    get nombre() {
        return this.name;
    },
    get reporte() {
        return `${this.name}->${this.gpa}`;
    },
    set reporte(valores) {
        let [nom, cal] = valores.split(' ');
        this.name = nom;
        this.gpa = cal;
    },
}

console.log(alumno.name);
console.log(alumno.nombre);
console.log(alumno.reporte);
alumno.reporte = "marco 5.5"
console.log(alumno.reporte);

class Student {
    constructor(name, degree) {
        this._name = name;
        this._degree = degree;
    }
    get name() {
        return this._name;
    }
    set name(val) {
        this._name = val;
    }
}

let s1 = new Student('John', 'bachelor');
console.log(s1.name);
s1.name = 'George';
console.log(s1.name);


class BookN {
    constructor(title, year, publisher, author) {
        this.t = title;
        this.y = year;
        this.p = publisher;
        this.a = author;
    }
    get title() {
        return this.t
    }
    set title(title) {
        this.t = title;
    }
}

let b2 = new BookN('t1', 'y1', 'p1', 'a1');
console.log(b2.title);
b2.title = 'otro'
console.log(b2.title);

//JSON examples

let persona = {
    nombre: 'Francisco',
    edad: 82,
    idiomas: {
        spanish: "100%",
        english: "50%"
    },
    hobbies: [
        'futbol',
        'leer'
    ]
}

console.log(persona);
let json = JSON.stringify(persona); // pasar json a string
console.log(json);
console.log(typeof json);
//console.log(json.nombre);// no se puede por que es un string

let obj = JSON.parse(json); // cast de string a json
console.log(obj.nombre);
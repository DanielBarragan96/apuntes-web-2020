class Book {
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

let arr1 = new Array();
let arr2 = [];
let arr3 = new Array(5);
let arr4 = [1, 2, 3, 4];
let arr5 = new Array(1, 2, 3, 4, 5);
console.log(arr3[0]);
console.log(arr3.length);

for (let i = 0; i < arr4.length; i++) {
    console.log(arr4[i]);
}
console.log('Imprimiendo valores...');
for (let value of arr4) {
    console.log(value);
}
console.log('Imprimiendo llaves...');
for (let value in arr4) {
    console.log(value);
}

let arr6 = [1, 2, 3, 4, 5];
console.log(arr6);
console.log(arr6.length);
arr6.length = 3
console.log(arr6);
console.log(arr6.length);
arr6.length = 5;
console.log(arr6[4]);
console.log(arr6);
arr6.length = 0;
console.log(arr6);

let mat1 = [
    [1, 2],
    [3, 4],
    [5, 6]
];
console.log(mat1);
console.log(mat1[1][1]);
console.log([] + 2);
console.log([2] + 2);
console.log([2, 3] + 2);

//Metodos de arreglos

let arr = ['uno', {
    nombre: 'Juan'
}, true, function () {
    console.log('Hola a todos');
}, ]
console.log(arr[1].nombre);
arr[3]();
console.log();
let arr7 = [1, 2, 3, ];
console.log(arr7);
arr7.push(4);
console.log(arr7);
arr7.pop();
console.log(arr7);
console.table(arr7);
console.table(mat1);
//existen shift y unshift para hacer pop o push al inicio del arreglo

let a1 = [];
a1.push(new Book('Harry Potter1', 2019, 'publisher', 'J.K.Rowling'));
a1.push(new Book('Harry Potter2', 2019, 'publisher', 'J.K.Rowling'));
a1.push(new Book('Harry Potter3', 2019, 'publisher', 'J.K.Rowling'));
console.table(a1);
a1.unshift(new Book('Harry Potter0', 2019, 'publisher', 'J.K.Rowling'));
console.table(a1);

let myreverse = (arr) => {
    let narr = new Array();
    console.table(arr);
    while (arr.length > 0) {
        narr.push(arr.pop());
    }
    console.table(narr);
    return narr;
}

let a2 = myreverse(a1);
console.table(a2)
console.table(a2.reverse())
console.log(a2.length)

let array2 = [1, 2, 3, 4];
console.log(array2.slice(1, 3)); //[2,3]
let array3 = [1, 2];
let array4 = array3.concat([3, 4], [5, 6]);
console.log(array4);
array4.forEach((item, index, array) => {
    console.log(item);
});

console.table(a2);
let book = a2.find(item => item.title === 'Harry Potter2');
console.log(book);

let b1 = a2.filter(item => item.y < 2020);
console.log(b1);

let a4 = [1, 34, 67, 45, 2, 4];
a4.sort((a, b) => {
    if (a > b) return 1;
    else if (b > a) return -1;
    else return 0;
});
console.table(a4);


// //Callbacks
// console.log('uno');
// setTimeout(() => {
//     console.log('A');
// }, 7000);
// setTimeout(() => {
//     console.log('B');
// }, 0);
// setTimeout(() => {
//     console.log('C');
// }, 2000);
// setTimeout(() => {
//     console.log('D');
// }, 1000);
// console.log('end');

// //Piramide de Doom
// setTimeout(() => {
//     console.log('Hola1');
//     setTimeout(() => {
//         console.log('Hola2');
//         setTimeout(() => {
//             console.log('Hola3');
//             setTimeout(() => {
//                 console.log('Hola4');
//                 setTimeout(() => {
//                     console.log('Hola5');
//                     console.log('mundo5');
//                 }, 1000);
//                 console.log('mundo4');
//             }, 1000);
//             console.log('mundo3');
//         }, 1000);
//         console.log('mundo2');
//     }, 1000);
//     console.log('mundo1');
// }, 1000);
// console.log('Antes de Hola');
let calc = document.getElementById('calculadora');
let num1 = undefined;
let num2 = undefined;
let op = undefined;
let res = undefined;
let afet_equal = false;

calc.addEventListener('click', (event) => {
    let key = event.target.innerHTML;
    if (key == "+") {
        op = key;
        num1 = document.getElementById("result").value;
        document.getElementById("result").value = "";
    } else if (key == "-") {
        op = key;
        num1 = document.getElementById("result").value;
        document.getElementById("result").value = "";
    } else if (key == "=") {
        num2 = document.getElementById("result").value;
        if (num1 !== undefined && num2 !== undefined) {
            num1 = parseInt(num1);
            num2 = parseInt(num2);
            if(op == "+") res = num1 + num2;
            else if(op == "-") res = num1 - num2;
            document.getElementById("result").value = res;
            afet_equal = true;
            // console.log(num1 + op + num2 + key + res);
            op = undefined;
            num1 = undefined;
            num2 = undefined;
            res = undefined;
        } else {
            document.getElementById("result").value = "";
            op = undefined;
            num1 = undefined;
            num2 = undefined;  
            res = undefined;          
        }
    } else {
        if(afet_equal) {
            afet_equal = false;
            document.getElementById("result").value = "";
        }
        document.getElementById("result").value += key;
    }
})
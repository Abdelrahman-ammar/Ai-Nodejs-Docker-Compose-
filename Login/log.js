
// Login Validation


let unlogin = document.querySelector("#unlogin");
let psslogin = document.querySelector("#psslogin");
let f1 = document.querySelector("#form1");
let valid1 =document.querySelector("#valid");
let valid2 = document.querySelector("#valid2");
let valid3 = document.querySelector("#valid3");

let confun = /\w+@\d*(gmail|yahoo).com$/;  // ($ or text + \b) = End

let confpss = /(\w+\d+\W+)|(\d+\w+\W+)|(\w+\W+\d+)/;

onblur =function() {
    unlogin.style.border = "white solid 1px";
    valid1.style.visibility = "hidden";
}

window.onload = function() {
    unlogin.focus();
}
f1.onsubmit = function (send) {
    let uc = false;
    let pssc = false;
    
    if(unlogin.value !== ""){
        uc = true;
        unlogin.style.border = "white solid 1px";
        valid1.style.visibility = "hidden";
        valid3.style.visibility = "hidden";
        if(confun.test(unlogin.value) === false || unlogin.value.match(/^\d+/)){         // (^ or \b + text) = Start
            send.preventDefault();
            unlogin.style.border = "red solid 1px";
            valid1.style.visibility = "visible";
        }
        if(unlogin.value.match(/\s+/g)){
            let s = unlogin.value.replace(/\s+/g, "");
        }
    }
    if(unlogin.value === ""){
        unlogin.focus();
        unlogin.style.border = "red solid 1px";
        valid1.style.visibility = "visible";
        send.preventDefault();
    }
    if(psslogin.value !== ""){
        pssc = true;
        psslogin.style.border = "white solid 1px";
        valid2.style.visibility = "hidden";
        valid3.style.visibility = "hidden";
        if(psslogin.value.length < 8){
            send.preventDefault();
            valid3.style.visibility = "visible";
            psslogin.style.border = "red solid 1px";
            psslogin.focus();
        }
        if(confpss.test(psslogin.value) === false){
            send.preventDefault();
            psslogin.style.border = "red solid 1px";
            valid2.style.visibility = "visible";
            valid2.style.fontSize = "8pt";
            valid2.innerHTML = "symbols, numbers and letters(Capital&Small)";
        }
    }
    if(psslogin.value === ""){
        psslogin.style.border = "red solid 1px";
        valid2.style.visibility = "visible";
        send.preventDefault();
    }
    if(uc === false || pssc === false){
        send.preventDefault();
    }
}









// Register Validation





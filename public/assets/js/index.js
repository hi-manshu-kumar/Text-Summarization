window.addEventListener("DOMContentLoaded", init);


function init(){
    console.log("hi");
    document.getElementById("summ").addEventListener("click", convertJson);
}

function convertJson(){
    console.log("insde the convertJson");
    var x = document.getElementById("inputbox").value;
    var article = JSON.stringify(x);
    console.log({article});
}
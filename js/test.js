
function test1() {
    let resultado = findList("home");
    return resultado == home;
}

function test2() {
    let resultado = findList("kjasdk lajsdlkjasd");

    return resultado == null;
}

$(document).ready(function () {
    
    console.log("test1 -" + test1());
    console.log("test2 -" + test2());
});
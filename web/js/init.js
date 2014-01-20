var isQtReady = setInterval(function(){
    if(typeof(qtInterface) != "undefined"){
        clearInterval(isQtReady);
        new App().renderInto(document.body);
}}, 100);





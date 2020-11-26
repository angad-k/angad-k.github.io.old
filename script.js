
function setupCanvas(){   
    var c = document.createElement('canvas'),        
    ctx = c.getContext('2d'),
    size = c.width = c.height = window.innerHeight;

    for( var x = 0.0; x < size; x += 100.0 ){
        for( var y = 0.0; y < size; y+= 100.0 ){
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(x, y, 100, 100);
        }
    }

    if(Math.random() > 0.5)
    {
        document.getElementById("first").remove();
        document.getElementById("second").remove();
        document.getElementById("third").remove();
        document.getElementById("fourth").remove();
        document.getElementById("fifth").remove();
        document.getElementById("sixth").remove();
    }
    document.body.style.background = 'url(' + c.toDataURL() + ')';
}
    

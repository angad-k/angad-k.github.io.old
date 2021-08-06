function setupCarousel() 
{

    var stop_secs = 4;

    var projects = document.getElementsByClassName("containerCard");
    
    for(var i = 0; i < projects.length; i++)
    {
        projects[i].style.opacity = "0";
        console.log(projects[i].style.opacity)
        projects[i].style.zIndex = "0";
        for(var j = 0; j < projects.length; j++)
        {
            var dot = document.createElement("div");
            dot.style = "width: 20px; height: 20px; background: white; border-radius: 50%; margin: 10px"
            dot.className = j
            dot.style.fontSize = "4rem"
            if(j!=i)
            {
                dot.style.cursor = "default"
                dot.style.opacity = "0.5"
            }
            else
            {
                dot.style.cursor = "default"
            }
            
            projects[i].getElementsByClassName("dots")[0].appendChild(dot)
            
            console.log
        }
    }
    start = Date.now();
    projects[0].style.zIndex = "1"
    projects[0].style.opacity = "1"
    console.log(projects[0].style.opacity)
    var curproj = 0;
    var time_elapsed = 0;
    var lastproj = projects.length - 1;
    
    function carouselLoop()
    {
        var current = Date.now(),
        delta = current - start;
        start = current;
        time_elapsed += delta;
        if(time_elapsed > stop_secs*1000)
        {
            time_elapsed = 0;
            projects[curproj].style.zIndex = "0";
            projects[curproj].style.opacity = "1";
            lastproj = curproj;
            curproj += 1;
            curproj %= projects.length;
            projects[curproj].style.zIndex = "1";
            projects[curproj].style.opacity = "0";
        }
        projects[curproj].style.opacity = (Math.min(parseFloat(projects[curproj].style.opacity) + 0.05, 1.0)).toString();
        projects[lastproj].style.opacity= (Math.max(parseFloat(projects[lastproj].style.opacity) - 0.05, 0.0)).toString();
        window.requestAnimationFrame(carouselLoop);
    }

    carouselLoop();
}

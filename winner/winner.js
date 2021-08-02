var div_point;
var point;
function create_point() {
    div_point = document.createElement("div");
    div_point.classList.add("point");
    point = parseInt(localStorage.getItem('sum_point'));
    var i = 0;
    var clearpoint_interval = setInterval(function () {
        div_point.innerHTML = i;
        if (i == point)
            clearInterval(clearpoint_interval);
        i++;
    }, 10);
    document.getElementById("all").appendChild(div_point);
    
}

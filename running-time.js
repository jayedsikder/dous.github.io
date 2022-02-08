setInterval(myTimer, 1000);
    
function myTimer() {
  const d = new Date();

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      
      const d1 = new Date();
      let day = days[d1.getDay()];

  document.getElementById("time3").innerHTML = day +" "+ d.toLocaleTimeString();
  document.getElementById("time4").innerHTML = day +" "+ d.toLocaleTimeString();
  document.getElementById("time5").innerHTML = day +" "+ d.toLocaleTimeString();
  document.getElementById("time6").innerHTML = day +" "+ d.toLocaleTimeString();
  document.getElementById("time7").innerHTML = day +" "+ d.toLocaleTimeString();
 

}

var vid = document.getElementById("myVideo"); 
               
function playVid() { 
  vid.play(); 
} 

function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
   
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
}) 

document.getElementById("toastbtn").onclick = function() {
  var toastElList = [].slice.call(document.querySelectorAll('.toast'))
  var toastList = toastElList.map(function(toastEl) {
    return new bootstrap.Toast(toastEl)
  })
  toastList.forEach(toast => toast.show()) 
}

setInterval(myTimer, 1000);

function myTimer() {
  const d = new Date();

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      
      const d1 = new Date();
      let day = days[d1.getDay()];

  document.getElementById("dt").innerHTML = "Today is "+ day +" . "+" It is -"+ d.toLocaleTimeString();
  document.getElementById("dt1").innerHTML = "Today is "+ day +" . "+" It is -"+ d.toLocaleTimeString();
}

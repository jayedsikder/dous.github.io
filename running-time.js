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

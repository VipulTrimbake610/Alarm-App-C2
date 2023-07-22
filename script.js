const timers = [];
const section4 = document.getElementById("section4");
var x = document.getElementById("myAudio"); 

let gindex;
var myinterval;
function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
function renderData(){
    section4.innerHTML = "";
        timers.forEach(function(e,i){
                let s4 = document.createElement("div");
                s4.className = "s4";
                s4.innerHTML = `<div class="timeLeft">Time Left</div>
                                <div class="inputs1 inputs">
                                    <input type="text" name="hrs"   value=${e.hh} placeholder="hh"  maxlength="2" readonly>
                                    <span class="colon">:</span>
                                    <input type="text" name="mins" value=${e.mm} placeholder="mm" maxlength="2" readonly>
                                    <span class="colon colon2" >:</span>
                                    <input type="text"  name="secs" value=${e.ss} placeholder="ss" maxlength="2" readonly>
                                </div>
                                <button class="btnDelete">Delete</button>`;
                section4.appendChild(s4);  
    
                (document.getElementsByClassName("btnDelete")[gindex]).addEventListener("click",function(e){
                    timers.forEach(function(e,i){
                        if(gindex === i){
                            timers.splice(i,1);
                            clearInterval(myinterval);
                            x.pause();
                            renderData();
                        }
                    })
                })
        });

}
(document.getElementById("btnSet")).addEventListener("click",function(){
    // deleteStatus = true;
    let hh = document.getElementById("hrs").value;
    let mm = document.getElementById("mins").value;
    let ss = document.getElementById("secs").value;
    if((hh === 0 && mm === 0 && ss === 0) || hh<0 || mm<0 || ss<0  || hh === "" || mm === "" || ss === ""){
        alert("Please Choose a Valid Timer");
        
    }else{

        let obj1 = {hh:hh,mm:mm,ss:ss,status:false};
        index = timers.length;
        gindex = index;
        timers.push(obj1);
        myinterval = setInterval(() => {
            renderData();
            if(timers[index].ss > 0){
                timers[index].ss -= 1;
            }
            if(timers[index].ss === 0){
                if(timers[index].mm > 0){
                    // console.log("Hello1");
                    timers[index].mm -= 1;
                    timers[index].ss = 59;
                }else{
                    // console.log("helolo2");
                    if(timers[index].hh > 0){
                        timers[index].hh -= 1;
                        timers[index].mm = 59;
                        timers[index].ss = 59;
                        // }else if(timers[index].hh === 0){
                        }else{
                            clearInterval(myinterval);
                            // timers[index].status = true; 
                            (document.getElementsByClassName("timeLeft")[index]).style.visibility = "hidden"; 
                            (document.getElementsByClassName("inputs1")[index]).innerText = "Timer is Up";
                            (document.getElementsByClassName("inputs1")[index]).style.color = "black";
                            (document.getElementsByClassName("inputs1")[index]).style.fontSize = "25px";
                            (document.getElementsByClassName("inputs1")[index]).style.fontWeight = "600";
                            (document.getElementsByClassName("btnDelete")[index]).innerText = "Stop";
                            (document.getElementsByClassName("btnDelete")[index]).style.backgroundColor = "#34344A";
                        (document.getElementsByClassName("btnDelete")[index]).style.color = "white";
                        (document.getElementsByClassName("s4")[index]).style.backgroundColor = "yellow";
                        x.play();
                    }
                }
            }
        }, 1000);
    }
    
});
(document.getElementById("btnCurrentTimers")).addEventListener("click",function(){
    if(timers.length === 0){
        section4.innerHTML = "You have no timers currently!";
    }
    if(timers.length > 0){
        if(section4.style.visibility === "hidden"){
            section4.style.visibility = "visible";
        }else{
            section4.style.visibility = "hidden";
        }
    }
})

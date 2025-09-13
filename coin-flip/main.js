let tura=0;
let yazi=0;


let coin=document.querySelector(".coin");
let flipbtn=document.querySelector("#flip-button");
let resetbtn=document.querySelector("#reset-button");

flipbtn.addEventListener("click",()=>{
    let i=Math.floor(Math.random()*2);
    coin.style.animation = "none";
    if(i){
        setTimeout(() => {
            coin.style.animation ="spin-tura 3s forwards";
        }, 100);
        tura++;
    }else{
        setTimeout(() => {
            coin.style.animation ="spin-yazi 3s forwards";
        }, 100);
        yazi++;
    }



    setTimeout(updateStats,3000);
    disabledButton();
});

function updateStats(){
    document.querySelector("#tura-count").textContent=`Tura: ${tura}`;
    document.querySelector("#yazi-count").textContent=`Yazı: ${yazi}`;
}

function disabledButton(){
    flipbtn.disabled=true;
    setTimeout(() => {
        flipbtn.disabled=false;
    }, 3000);
}


resetbtn.addEventListener("click",()=>{
    coin.style.animation = "none";
    tura=0;
    yazi=0;
    updateStats();
});
const textarea=document.querySelector("textarea");
const voiceList=document.querySelector("select");
const voicebtn=document.querySelector("button");


let synth=speechSynthesis;
let isSpeaking=true;


function voices(){
    for(let voice of synth.getVoices()){
        let selected= voice.name==="Google US English"?
        "selected" : "";
        let option=`<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`
        voiceList.insertAdjacentHTML("beforeend",option)

    }
}

synth.addEventListener("voiceschanged",voices);


function textToSpeach(text){
    let utterance=new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name===voiceList.value){
            utterance.voice=voice;
        }
    }

    utterance.addEventListener("end",()=>{
        isSpeaking=false;
        document.querySelector(".placeholder").style.display="none";
    
    });

    synth.speak(utterance);
    isSpeaking=true;
    

}
voicebtn.addEventListener("click",(e)=>{
    e.preventDefault();
    if(textarea.value !=""){
        if(!synth.speaking){
            textTopeach(textarea.value);
            document.querySelector(".placeholder").style.display="block";
            document.querySelector("#inputText").value="";
            
            
            
        }
    }
})




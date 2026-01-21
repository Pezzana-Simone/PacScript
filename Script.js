document.addEventListener("DOMContentLoaded",main,false);

const MAX_WIDTH = 500;
const MAX_HEIGHT = 500;
const PIXEL_DIM = 20;
const GAMETICK = 70;
let id_game = null;
let campo;
let pos;
let direzione;
let maxPunteggio;
let remPunteggio;
let giro,tempo;
let elementi;

const colori = ["white","green","yellow","black"];
const dimensioni = [PIXEL_DIM,14,PIXEL_DIM,PIXEL_DIM];
const dispoElementi = [  [3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3],
                    [3,3,3,3,0,0,0,3,0,0,3,3,3,3,3,3,0,0,0,0,0,3,3,3,3],
                    [3,3,3,3,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,3,3,3,3],
                    [3,3,3,3,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,3,3,3,3],
                    [3,3,3,3,0,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,3,3,3,3],
                    [3,3,3,3,0,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,3,3,3,3],
                    [3,3,3,3,0,0,3,0,3,0,3,3,3,3,0,0,0,3,0,0,0,3,3,3,3],
                    [3,3,3,3,0,3,3,0,0,3,3,0,0,3,0,0,0,0,3,0,0,3,3,3,3],
                    [3,3,3,3,0,3,0,0,3,0,0,0,0,3,0,3,0,0,3,0,0,3,3,3,3],
                    [3,3,3,3,0,3,0,0,0,0,3,0,0,3,0,0,0,3,0,3,3,3,3,3,3],
                    [3,3,3,3,0,3,3,3,3,3,3,3,3,3,3,0,0,3,0,0,0,3,3,3,3],
                    [3,3,3,3,0,0,0,0,0,0,3,0,0,0,3,0,3,0,0,3,0,3,3,3,3],
                    [3,3,3,3,0,0,3,3,3,3,3,3,0,3,3,0,0,0,0,3,0,3,3,3,3],
                    [3,3,3,3,0,0,3,0,0,0,0,0,0,0,0,3,3,0,0,3,0,3,3,3,3],
                    [3,3,3,3,0,0,3,0,0,0,3,0,3,0,3,0,0,0,0,3,0,3,3,3,3],
                    [3,3,3,3,0,3,3,0,0,0,0,0,0,3,0,0,0,0,0,3,0,3,3,3,3],
                    [3,3,3,3,0,3,0,0,0,0,0,3,0,0,0,3,3,3,0,3,0,3,3,3,3],
                    [3,3,3,3,0,0,3,0,3,3,3,0,0,3,3,3,0,3,3,3,0,3,3,3,3],
                    [3,3,3,3,0,0,0,3,0,0,0,0,3,3,0,0,0,3,0,0,0,3,3,3,3],
                    [3,3,3,3,0,0,0,3,0,0,3,0,0,0,3,0,0,3,3,3,3,3,3,3,3],
                    [3,3,3,3,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,0,0,3,3,3,3],
                    [3,3,3,3,0,0,0,0,0,0,0,3,0,0,3,0,3,0,0,0,0,3,3,3,3],
                    [3,3,3,3,0,0,0,0,0,0,3,0,0,0,3,3,0,0,0,0,0,3,3,3,3],
                    [3,3,3,3,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3],
                    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
                ];
elementi = dispoElementi;
function getObj(id){
    return document.getElementById(id);
}

function main(){
    getObj("start").addEventListener("click",game);
    document.addEventListener("keydown",(a) => {
        if(id_game == null) return
        let b = a.code;
        console.log(b)
        switch(b){
            case "KeyR":
                stopGame();
                break;
            case "KeyW":
            case "ArrowUp":
                direzione = [0,-1];
                break;
            case "KeyS":
            case "ArrowDown":
                direzione = [0,1];  
                break
            case "KeyA":
            case "ArrowLeft":
                direzione = [-1,0];
                break;
            case "KeyD":
            case "ArrowRight":
                direzione = [1,0];
                break;
        }
    })
    campo =  getObj("campoGioco").getContext("2d");
}

function game(){
    if(id_game != null) return
    reset()
    id_game = setInterval(() => {
    	calcolaPos();
        calcolatempo(),
        checkFood();
        clearCampo();
        disegnaCampo();
        disegnaQuadrato(campo,pos[0],pos[1],colori[2]);
        setTempo();
        checkPunti();

    },GAMETICK);
}

function calcolaPos(){
    let Npos = [pos[0] + direzione[0] , pos[1] + direzione[1]];
    if(elementi[Npos[1]][Npos[0]] == 3) return
    pos = Npos;
}
function checkPunti(){
    if(remPunteggio==0){
        stopGame();
    }
}

function calcolatempo(){
    giro++;
    let ms = giro * GAMETICK;
    let s = ms > 1000 ? (ms/1000).toFixed(0):0;
    let m = s > 60 ? (s/60).toFixed(0):0;
    tempo = `${m} : ${s%60} : ${ms%1000}`;
}
function disegnaCampo(){
    for(let y = 0;y < elementi.length;y++){
        for(let x = 0;x < elementi[y].length;x++){
            let elemento = elementi[y][x];
            let colore = colori[elemento];
            let dimensione = dimensioni[elemento];
            disegnaQuadrato(campo,x,y,colore,dimensione);
        }
    }
}

function trasforma(){
    for(let i = 0; i < elementi.length;i++){
        for(let j = 0; j < elementi[i].length;j++){
            if(elementi[i][j] == 0){
                elementi[i][j] = 1;
                remPunteggio++;
            }
        }
    }
}

function checkFood(){
    if(elementi[pos[1]][pos[0]] == 1){
        elementi[pos[1]][pos[0]] = 0;
        maxPunteggio++;
        remPunteggio--;
    }
}

function stopGame(){
    clearInterval(id_game);
    clearCampo();
    reset();
    
}

function setTempo(){
    let ogg = getObj("Tmp");
    ogg.innerText = `Tempo: ${tempo}`;
}

function reset(){
    direzione = [1,0];
    pos = [10,9];
    id_game = null;
    remPunteggio = 0;
    trasforma();
    maxPunteggio = 0;
    giro=0;
    elementi = dispoElementi;
}

function clearCampo(){
    campo.fillStyle = "white";
    campo.fillRect(0,0,MAX_WIDTH,MAX_HEIGHT);
}


function disegnaQuadrato(c,x,y,colore,dim = PIXEL_DIM,center = true){
    c.fillStyle = colore;
    x = center && dim != PIXEL_DIM && dim%2==0 ? x*20 + 10 - (dim/2) : x*20;
    y = center && dim != PIXEL_DIM && dim%2==0 ? y*20 + 10 - (dim/2) : y*20;
    c.fillRect(x,y,dim,dim);
}
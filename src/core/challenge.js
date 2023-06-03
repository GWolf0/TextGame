class GameChallenge{
    static game;
    static curChallenge;
    static precisionChallengeState={pos:20,speed:3};

    static init(game){
        GameChallenge.game=game;
    }

    static async PrecisionBarChallenge(game,title){
        const challContainer=document.createElement("div");
        challContainer.className="precisionBarChallenge";
        const challInnerContainer=document.createElement("div");
        challInnerContainer.onclick=()=>{GameChallenge.onPrecisionChallengeAction();};
        const indicator=document.createElement("div");
        challInnerContainer.appendChild(indicator);
        challContainer.appendChild(challInnerContainer);
        GameChallenge.curChallenge={type:"precisionBar",container:challContainer};
        return await MenuService.showCustomMenu(game,title,challContainer);
    }

    static update(){
        if(!GameChallenge.curChallenge)return;
        let chall=GameChallenge.curChallenge;
        if(chall.type=="precisionBar"){
            let pos=GameChallenge.precisionChallengeState.pos;
            if(pos>100||pos<0){
                GameChallenge.precisionChallengeState.speed*=-1;
            }
            let speed=GameChallenge.precisionChallengeState.speed;
            GameChallenge.precisionChallengeState.pos+=speed;
            let newPos=GameChallenge.precisionChallengeState.pos;
            chall.container.children[0].children[0].style.left=`${newPos}%`;
        }
    }

    //actions
    static onPrecisionChallengeAction(){
        //let chall=GameChallenge.curChallenge;
        let pos=GameChallenge.precisionChallengeState.pos;
        //convert pos(which is a position percentage) to 0(when pos=0) 1(when pos=50) 0(pos=100), basically the more the value close to 50 the more better(1)
        let diff=(50-pos)/50;
        let absdiff=Math.abs(diff);
        let mirrored=0.5-absdiff+0.5;//console.log(pos,diff,absdiff,mirrored)
        GameChallenge.game.returnedResult=mirrored;
        GameChallenge.game.isBlocked=false;
    }

}
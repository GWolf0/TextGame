class TxtGame{
    static DEFAULT_CONF={writeDelay:30};
    guis=[];
    blockingInterval;
    isBlocked=false;
    returnedResult;//a result return by a certain function after the isBlocked is false (from a custom menu for example)
    userInputElement;
    userSelectElement;userSelectElementChoiceIdx=0;
    menuElement;
    guiElement;
    //
    guiInstsFn;instsFn;

    constructor(title="Text Game",conf=TxtGame.DEFAULT_CONF){
        this.title=title;
        this.conf=conf;
        this.outerContainer=document.getElementById("txtGame");
        this.container=this.outerContainer.children[1];
        this.overlay=this.container.children[0];
        this.header=this.outerContainer.children[0];
        this.footer=this.outerContainer.children[2];
    }

    start(guiInstsFn=null,instsFn=null){
        this.guiInstsFn=guiInstsFn;
        this.instsFn=instsFn;
        //init services
        AudioService.init();
        MenuService.init(this.overlay);
        GameChallenge.init(this);
        //bind keydown event
        window.addEventListener('keydown',(e)=>{
            let key=e.key;
            let kc=e.keyCode;console.log(key,kc);
            // if there is a userInputElement then if pressed key!= enter key then write the key
            // if enter is pressed then set blocking to false and userInputElement to null
            if(this.userInputElement){
                if(kc===13){//enter
                    this.isBlocked=false;
                    this.userInputElement=null;
                }else if(kc===8){//backspace
                    this.userInputElement.innerHTML=this.userInputElement.innerHTML.substr(0,this.userInputElement.innerHTML.length-1);
                }else{
                    if(/^[a-z0-9]$/gi.test(key)){
                        this.userInputElement.innerHTML+=key;
                    }
                }
            }
            // if there is a userSelectElement then if pressed key is up or down arrow then change selected choice item
            // if enter is pressed then set blocking to false and userSelectElement to null
            else if(this.userSelectElement){
                if(kc===13){
                    this.isBlocked=false;
                    this.userSelectElement=null;
                }else{
                    if(kc===40||kc===38){//downarrow || uparrow
                        let options=Array.from(this.userSelectElement.querySelectorAll(".selectable"));
                        let count=options.length;
                        this.userSelectElementChoiceIdx+=kc===40?1:-1;
                        this.userSelectElementChoiceIdx=Math.max(0,this.userSelectElementChoiceIdx);
                        this.userSelectElementChoiceIdx=Math.min(count-1,this.userSelectElementChoiceIdx);
                        options.forEach((option,idx)=>{
                            if(idx===this.userSelectElementChoiceIdx){
                                option.classList.add("selected");
                            }else{
                                option.classList.remove("selected");
                            }
                        });
                    }
                }
            }
            //if there is a challenge
            else if(GameChallenge.curChallenge){//space key==32
                if(kc==32&&GameChallenge.curChallenge.type=="precisionBar"){
                    GameChallenge.curChallenge.container.children[0].click();
                }
            }
            // if enter is pressed then set blocking to false and menuElement to null
            else if(this.menuElement){
                if(kc===13){
                    this.isBlocked=false;
                    this.menuElement=null;
                }else{
                    if(kc===40||kc===38){//downarrow || uparrow
                        let options=Array.from(this.menuElement.querySelectorAll(".selectable"));
                        let count=options.length;
                        this.userSelectElementChoiceIdx+=kc===40?1:-1;
                        this.userSelectElementChoiceIdx=Math.max(0,this.userSelectElementChoiceIdx);
                        this.userSelectElementChoiceIdx=Math.min(count-1,this.userSelectElementChoiceIdx);
                        options.forEach((option,idx)=>{
                            if(idx===this.userSelectElementChoiceIdx){
                                option.classList.add("selected");
                            }else{
                                option.classList.remove("selected");
                            }
                        });
                    }
                }
            }// if there is a userSelectElement then if pressed key is up or down arrow then change selected choice item
            // if enter is pressed then set blocking to false and userSelectElement to null
            else if(this.guiElement){
                if(kc===13){
                    this.isBlocked=false;
                    this.guiElement=null;
                }else{
                    if(kc===40||kc===38){//downarrow || uparrow
                        let options=Array.from(this.guiElement.querySelectorAll(".selectable"));
                        let count=options.length;
                        this.userSelectElementChoiceIdx+=kc===40?1:-1;
                        this.userSelectElementChoiceIdx=Math.max(0,this.userSelectElementChoiceIdx);
                        this.userSelectElementChoiceIdx=Math.min(count-1,this.userSelectElementChoiceIdx);//console.log(count,this.userSelectElementChoiceIdx)
                        options.forEach((option,idx)=>{
                            if(idx===this.userSelectElementChoiceIdx){
                                option.classList.add("selected");
                            }else{
                                option.classList.remove("selected");
                            }
                        });
                    }
                }
            }
        });
        //
        let hideOverlayAndRun=()=>{
            //hide the overlay and the start btn
            this.overlay.style.display="none";
            document.getElementById("startBtn").style.display="none";
            //run
            this.run();
        }
        //start btn click event
        if(instsFn){
            document.getElementById("startBtn").onclick=()=>{
                hideOverlayAndRun();
            }
        }else{
            hideOverlayAndRun();
        }
    }

    update(){
        GameChallenge.update();
        requestAnimationFrame(()=>this.update());
    }

    run(){
        console.log(`New game started '${this.title}'`);
        if(this.guiInstsFn)this.guiInstsFn();
        if(this.instsFn)this.instsFn();
        this.update();
    }

}
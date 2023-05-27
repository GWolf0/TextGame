class CMD{

    //static cmds
    //clear 
    static async clear(game){
        game.container.innerHTML="";
    }
    //clear 
    static async divider(game){
        let divider=document.createElement("div");
        divider.className="divider";
        game.container.appendChild(divider);
    }
    //wait 
    static async wait(game,millis){
        return new Promise((resolve,reject)=>{
            game.isBlocked=true;
            game.blockingInterval=setTimeout(()=>{
                clearTimeout(game.blockingInterval);
                resolve(true);
            },millis);
        });
    }
    //write line
    static async write(game,text){
        const nohtml=text.replaceAll(/(<[a-z]+>|<\/[a-z]+>|<[a-z]+ (\w+=".*")*>)/gi," ");
        return new Promise((resolve,reject)=>{
            game.isBlocked=true;
            let p=document.createElement("p");
            p.className="txtGameText";
            p.innerHTML=nohtml[0];
            game.container.appendChild(p);
            let charIdx=0;
            game.blockingInterval=setInterval(()=>{
                charIdx++;
                if(charIdx>nohtml.length-1){
                    game.isBlocked=false;
                    clearInterval(game.blockingInterval);
                    p.innerHTML=text;
                    game.container.scrollTo(0,game.container.getBoundingClientRect().height)
                    resolve(true);
                }else{
                    let char=nohtml[charIdx];
                    p.innerHTML+=char;
                }
            },game.conf.writeDelay);
        });
    }
    //read line
    static async read(game,text){
        await CMD.write(game,text);
        return new Promise((resolve,reject)=>{
            game.isBlocked=true;
            let p=document.createElement("p");
            p.className="txtGameText userInput blinking";
            game.container.appendChild(p);
            game.userInputElement=p;
            game.blockingInterval=setInterval(()=>{
                if(!game.isBlocked){
                    clearInterval(game.blockingInterval);
                    p.classList.remove("blinking");
                    resolve(p.innerText);
                }
            },100);
        });
    }
    //select choice
    static async select(game,text,choices){
        game.userSelectElementChoiceIdx=0;
        text+=" >";
        await CMD.write(game,text);
        return new Promise((resolve,reject)=>{
            game.isBlocked=true;
            let select=document.createElement("ul");
            select.className="txtGameSelect";
            choices.forEach((choice,i)=>{
                let option=document.createElement("li");
                option.className="selectable";
                option.innerHTML=choice;
                if(i===game.userSelectElementChoiceIdx)option.classList.add("selected");
                option.onclick=()=>{console.log("click on",i)
                    select.children[game.userSelectElementChoiceIdx].classList.remove("selected");
                    game.userSelectElementChoiceIdx=i;
                    select.children[game.userSelectElementChoiceIdx].classList.add("selected");
                    game.isBlocked=false;
                    clearInterval(game.blockingInterval);
                    resolve(choices[game.userSelectElementChoiceIdx]);
                };
                select.appendChild(option);
            });
            game.container.appendChild(select);
            game.userSelectElement=select;
            game.blockingInterval=setInterval(()=>{
                if(!game.isBlocked){
                    clearInterval(game.blockingInterval);
                    resolve(choices[game.userSelectElementChoiceIdx]);
                }
            },100);
        });
    }
    //grid map
    static gridMap(game,dataDesc,data,gap='8px'){
        const cols=data[0].length;
        const rows=data.length;
        const gridMap=document.createElement("div");
        gridMap.className="txtGameGridMap";
        gridMap.style.gridTemplateColumns=`repeat(${cols},1fr)`;
        gridMap.style.padding=gap;
        gridMap.style.gap=gap;
        for(let y=0;y<data.length;y++){
            for(let x=0;x<data[y].length;x++){
                const cellData=data[y][x];
                const gridItem=document.createElement("div");
                gridItem.innerHTML=cellData.text;
                const cellStyle=dataDesc.find(elem=>elem.id===cellData.id);
                const cellStyleCSV=cellStyle.style.split("_");
                const radius=cellStyleCSV[0]=="s"?'0px':"50%";
                const color=cellStyleCSV[1];
                gridItem.style.borderRadius=radius;
                gridItem.style.background=color;
                const cellNumElem=document.createElement("span");
                cellNumElem.className="cellNum";
                cellNumElem.innerHTML=`${(y*cols+x)+1}`;
                gridItem.appendChild(cellNumElem);
                gridMap.appendChild(gridItem);
            }
        }
        game.container.appendChild(gridMap);
    }

}
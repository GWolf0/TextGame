class GUI{

    //box
    static box(game,id,args,container){
        const box=document.createElement("div");
        box.dataset.type="box";
        GUI.assignCommonProps(box,id,args,container);
        box.style.background=args.bg||"#212121";
        box.style.display="grid";
        box.style.gap=args.gap||"0";
        box.style.gridTemplateColumns=args.cols||"1fr";
        box.style.justifyContent=args.justify||"start";
        box.style.alignItems=args.align||"start";
        box.style.padding=args.padding||"0.25rem";
        box.style.margin=args.margin||"0px";
        box.style.borderRadius=args.radius||"0px";
        box.style.overflow="hidden";
        if(!container)game.container.appendChild(box);
        else container.appendChild(box);
        game.guis.push(box);
        return box;
    }
    //text
    static text(game,id,txt,args,container){
        const text=document.createElement("p");
        text.dataset.type="text";
        GUI.assignCommonProps(text,id,args,container);
        text.innerHTML=txt;
        text.style.background=args.bg||"#212121";
        text.style.color=args.color||"#eee";
        box.style.borderRadius=args.radius||"0px";
        text.style.padding=args.padding||"0.25rem";
        text.style.margin=args.margin||"0px";
        if(!container)game.container.appendChild(text);
        else container.appendChild(text);
        game.guis.push(text);
        return text;
    }
    //text
    static button(game,id,txt,onclick,args,container){
        const button=document.createElement("button");
        button.dataset.type="button";
        button.className="selectable";
        button.onclick=onclick;
        GUI.assignCommonProps(button,id,args,container);
        button.innerHTML=txt;
        button.style.background=args.bg||"#212121";
        button.style.color=args.color||"#eee";
        button.style.padding=args.padding||"0.25rem";
        button.style.margin=args.margin||"0px";
        if(!container)game.container.appendChild(button);
        else container.appendChild(button);
        game.guis.push(button);
        return button;
    }
    //image
    static image(game,id,src,args,container){
        const image=document.createElement("img");
        image.dataset.type="image";
        GUI.assignCommonProps(image,id,args,container);
        image.src=src;
        image.style.background=args.bg||"transparent";
        image.style.objectFit="contain";
        image.style.margin=args.margin||"0px";
        if(!container)game.container.appendChild(image);
        else container.appendChild(image);
        game.guis.push(image);
        return image;
    }

    //helpers
    static assignCommonProps(elem,id,args,container){
        elem.dataset.id=id;
        elem.style.position=container?"auto":"fixed";
        if(args.left){
            elem.style.left=container?"0":args.left;
        }else if(args.right){
            elem.style.right=container?"0":args.right;
        }
        if(args.top){
            elem.style.top=container?"0":args.top;
        }else if(args.bottom){
            elem.style.bottom=container?"0":args.bottom;
        }
        elem.style.width=args.width;
        elem.style.height=args.height;
    }
    //focus
    static focus(game,elem){
        return new Promise((resolve,reject)=>{
            game.userSelectElementChoiceIdx=0;
            let options=Array.from(elem.querySelectorAll(".selectable"));
            options[game.userSelectElementChoiceIdx].classList.add("selected");
            game.isBlocked=true;
            game.guiElement=elem;
            game.blockingInterval=setInterval(()=>{
                if(!game.isBlocked){
                    options.forEach((option)=>option.classList.remove("selected"));
                    clearInterval(game.blockingInterval);
                    options[game.userSelectElementChoiceIdx].click();
                    resolve(options[game.userSelectElementChoiceIdx].dataset.id);
                }
            },100);
        });
    }
    //set visibility
    static setVisible(elem,val){
        elem.style.display=val?"auto":"none";
    }
    //set prop
    static setProp(elem,key,val){
        const type=elem.dataset.type;
        if(type=="box"){
            
        }else if(type=="text"){
            switch(key){
                case "text":
                elem.innerHTML=val;
                break;
            }
        }
    }
    
}
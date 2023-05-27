class MenuService{
    static container;

    static init(container){
        MenuService.container=container;
    }

    static async showMenu(game,title,cols,items){
        game.userSelectElementChoiceIdx=0;
        return new Promise((resolve,reject)=>{
            game.isBlocked=true;
            const menu=document.createElement("div");
            menu.className="txtGameMenu";
            const header=document.createElement("div");
            header.innerHTML=title;
            const content=document.createElement("div");
            content.style.gridAutoColumns=cols;
            items.forEach((item,idx)=>{
                const itemElem=document.createElement("div");
                itemElem.className="selectable";
                if(idx===0)itemElem.classList.add("selected");
                itemElem.innerText=item.text;
                itemElem.onclick=()=>{
                    clearInterval(game.blockingInterval);
                    menu.parentNode.removeChild(menu);
                    MenuService.container.style.display="none";
                    resolve(item.action());
                };
                content.appendChild(itemElem);
            });
            menu.appendChild(header);
            menu.appendChild(content);
            MenuService.container.appendChild(menu);
            MenuService.container.style.display="initial";
            game.menuElement=content;
            game.blockingInterval=setInterval(()=>{
                if(!game.isBlocked){
                    clearInterval(game.blockingInterval);
                    menu.parentNode.removeChild(menu);
                    MenuService.container.style.display="none";
                    resolve(items[game.userSelectElementChoiceIdx].action());
                }
            },100);
        });
    }

}
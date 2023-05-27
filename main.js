
window.onload=()=>{
    let game=new TxtGame("My test game");
    let farm=new Farm(4,4);
    farm.init();
    let header;
    game.start(()=>{
        header=GUI.box(game,"header",{width:"80%",height:"100%",bg:"black",cols:'repeat(2,1fr)',gap:'4px'},game.header);
        for(let i=0;i<4;i++){
            let btn=GUI.button(game,"btn"+i,"Button"+i,()=>{console.log(i,"clicked");return "Hi";},{height:'100%',radius:'4px'},header);
        }
    },
    async ()=>{
        let res=await GUI.focus(game,header);alert(res)
        let requestEnd=true;
        while(!requestEnd){
            CMD.gridMap(game,Farm.mapStyle,farm.data);
            let choice=await CMD.select(game,"What should you do?",["Cultivate Cell","Plant Cell","Quit"]);
            if(choice=="Cultivate Cell"||choice=="Plant Cell"){
                let userInput=await CMD.read(game,"Type the cell number");
                let f_input=parseInt(userInput);
                if(!f_input||!farm.getCellByIdx(f_input-1)){
                    await CMD.write(game,"Cell not found try again.");
                    continue;
                }else{
                    let cellIdx=f_input-1;
                    if(choice=="Cultivate Cell"){
                        let success=farm.cultivateCell(cellIdx);
                        await CMD.write(game,`Cell ${cellIdx+1} cultivating action ${success?'Success':"Failed"}!`);
                    }else if(choice=="Plant Cell"){
                        let success=farm.plantOnCell(cellIdx);
                        await CMD.write(game,`Cell ${cellIdx+1} planting action ${success?'Success':"Failed"}!`);
                    }
                    await CMD.wait(game,3000);
                    CMD.clear(game);
                }
            }else if(choice=="Quit"){
                requestEnd=true;
            }
        }
        await CMD.write(game,"You quit the farm!");
    });
}

class Farm{
    static CellState={"empty":0,"cultivated":1,"planted":2};
    static mapStyle=[{id:0,style:"s_black"},{id:1,style:"s_brown"},{id:2,style:"s_green"}];

    constructor(cols,rows){
        this.cols=cols;
        this.rows=rows;
    }

    init(){
        this.data=[];
        for(let y=0;y<this.rows;y++){
            this.data.push([]);
            for(let x=0;x<this.cols;x++){
                this.data[y].push({id:Farm.CellState.empty,text:"Empty"});
            }
        }
    }

    cultivateCell(idx){
        let cell=this.getCellByIdx(idx);
        if(this.isCellCultivated(idx)){
            return false;
        }
        cell.id=1;
        cell.text==Farm.CellState.cultivated;
        return true;
    }
    plantOnCell(idx){
        let cell=this.getCellByIdx(idx);
        if(this.isCellPlanted(idx)||!this.isCellCultivated(idx)){
            return false;
        }
        cell.id=2;
        cell.text==Farm.CellState.planted;
        return true;
    }

    isCellEmpty(idx){
        let cell=this.getCellByIdx(idx);
        return cell.id===Farm.CellState.empty;
    }
    isCellCultivated(idx){
        let cell=this.getCellByIdx(idx);
        return cell.id===Farm.CellState.cultivated;
    }
    isCellPlanted(idx){
        let cell=this.getCellByIdx(idx);
        return cell.id===Farm.CellState.planted;
    }

    getCellByIdx(idx){
        let yidx=Math.floor(idx/this.cols);
        let xidx=idx-this.cols*yidx;
        return this.data[yidx][xidx];
    }

}

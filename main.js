// window.onload=async()=>{
//     let keyEvents=[];
//     let game=new BaseGame("Test Game",["Game Started!"],keyEvents);
//     //items
//         //wooden sword
//     let woodenSword=new GameItem(0,"Wooden sword",ItemType.weapon,"Wooden sword",{att:4});
//     let woodenShield=new GameItem(0,"Wooden shield",ItemType.shield,"Wooden shield",{def:4});
//     //entities
//         //player
//     let player=new GameEntity("Player",{lvl:1,exp:1,hp:50,att:12,def:7,money:109,_ini:20,_expReward:0});
//         //merchant
//     let merchant=new GameEntity("Merchant",{lvl:1,hp:50,att:12,def:10,_expReward:0});
//     merchant.setInteractions(game,[
//         new GameEntityInteraction(merchant.uid,"Who are you?",async()=>{
//             await CMD.write(game.game,"I am a merchant as you can see.");
//         }),
//         new GameEntityInteraction(merchant.uid,"Buy",async()=>{
//             let ch=await CMD.select(game.game,"What would you buy?",["Wooden sword","Wooden shield","Quit"]);
//             if(ch=="Wooden sword"){
//                 player.stats.money-=17;
//                 player.addItem(woodenSword);
//                 await CMD.write(game.game,"You bought the wooden sword!");
//             }else if(ch=="Wooden shield"){
//                 player.stats.money-=19;
//                 player.addItem(woodenShield);
//                 await CMD.write(game.game,"You bought the wooden shield!");
//             }else if(ch=="Quit"){
//                 await CMD.write(game.game,"Come again!");
//             }
//         })
//     ]);
//         //goblin
//     let goblin=new GameEntity("Goblin",{lvl:1,hp:30,att:8,def:8,hostile:true,_ini:5,_expReward:8});
//     goblin.setInteractions(game,[
//         new GameEntityInteraction(goblin.uid,"Who are you?",async()=>{
//             await CMD.write(game.game,"I am a goblin.");
//         })
//     ]);
//     //areas
//         //playerHouse
//     let playerHouse=new GameArea("House",[player],[],[
//         new GameActivity("Go outside",async()=>{
//             game.currentAreaIdx=1;
//             await CMD.write(game.game,"You went outside");
//         }),
//         new GameActivity("Sleep",async()=>{
//             await CMD.write(game.game,"You slept");
//         }),
//     ],
//     [{id:0,style:"s_black"},{id:1,style:"s_purple"}],
//     [
//         [{id:0,text:"Bed"},{id:0,text:""},{id:0,text:"Drawer"}],
//         [{id:0,text:""},{id:0,text:""},{id:0,text:""}],
//         [{id:0,text:"Wardrobe"},{id:0,text:""},{id:1,text:"Door"}]
//     ]);
//         //outside
//     let outside=new GameArea("Outside",[player,merchant,goblin],[],[
//         new GameActivity("Go home",async()=>{
//             game.currentAreaIdx=0;
//             await CMD.write(game.game,"You went home");
//         }),
//     ],
//     [{id:0,style:"s_black"},{id:1,style:"s_purple"}],
//     [
//         [{id:0,text:""},{id:0,text:""},{id:0,text:""}],
//         [{id:1,text:"House"},{id:0,text:""},{id:0,text:""}],
//         [{id:0,text:""},{id:0,text:""},{id:0,text:""}]
//     ]);

//     //
//     game.init();
//     game.setAreas([playerHouse,outside]);
//     await game.run();
// };


window.onload=()=>{
    let game=new TxtGame("My test game");
    game.start(()=>{

    },
    async ()=>{
        await CMD.write(game,"test");
        let res=await GameChallenge.PrecisionBarChallenge(game,"Test challenge");
        await CMD.write(game,`Res ${res}`);
    });
}

// class Farm{
//     static CellState={"empty":0,"cultivated":1,"planted":2};
//     static mapStyle=[{id:0,style:"s_black"},{id:1,style:"s_brown"},{id:2,style:"s_green"}];

//     constructor(cols,rows){
//         this.cols=cols;
//         this.rows=rows;
//     }

//     init(){
//         this.data=[];
//         for(let y=0;y<this.rows;y++){
//             this.data.push([]);
//             for(let x=0;x<this.cols;x++){
//                 this.data[y].push({id:Farm.CellState.empty,text:"Empty"});
//             }
//         }
//     }

//     cultivateCell(idx){
//         let cell=this.getCellByIdx(idx);
//         if(this.isCellCultivated(idx)){
//             return false;
//         }
//         cell.id=1;
//         cell.text==Farm.CellState.cultivated;
//         return true;
//     }
//     plantOnCell(idx){
//         let cell=this.getCellByIdx(idx);
//         if(this.isCellPlanted(idx)||!this.isCellCultivated(idx)){
//             return false;
//         }
//         cell.id=2;
//         cell.text==Farm.CellState.planted;
//         return true;
//     }

//     isCellEmpty(idx){
//         let cell=this.getCellByIdx(idx);
//         return cell.id===Farm.CellState.empty;
//     }
//     isCellCultivated(idx){
//         let cell=this.getCellByIdx(idx);
//         return cell.id===Farm.CellState.cultivated;
//     }
//     isCellPlanted(idx){
//         let cell=this.getCellByIdx(idx);
//         return cell.id===Farm.CellState.planted;
//     }

//     getCellByIdx(idx){
//         let yidx=Math.floor(idx/this.cols);
//         let xidx=idx-this.cols*yidx;
//         return this.data[yidx][xidx];
//     }

// }

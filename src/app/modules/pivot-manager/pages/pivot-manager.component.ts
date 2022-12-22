import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Champion } from 'src/app/shared/models/champion.model';
import { Trait } from 'src/app/shared/models/traits.model';

import { ReRoll, ReRollVal } from '../models/reroll';
import { LevelXp, LevelXpVal } from '../models/levelXp';
import { StageData, StageDataVal } from '../models/stageData.models';
import { ChampionService } from 'src/app/shared/services/champion.service';
import { TraitService } from 'src/app/shared/services/trait.service';
import { HexCase } from '../models/HexCase.models';
import { MatSliderChange } from '@angular/material/slider';
import { State } from 'src/app/shared/enums/State.enum';

@Component({
  selector: 'app-pivot-manager',
  templateUrl: './pivot-manager.component.html',
  styleUrls: ['./pivot-manager.component.scss']
})
export class PivotManagerComponent implements OnInit {
  
  champions : Champion[] = new Array();
  //board : Champion[][] = [];
  //La différence est que board Data contient uniquement les informations lié aux champion pas leur position
  
  //boardData : Champion[] = [];
  //bench : Champion[] = new Array();
  
  
  board : HexCase[][] = [];
  boardData : Champion[] = [];
  bench : HexCase[] = new Array();
  
  shop : Champion[] = new Array();
  
  activesTraitsPH : Trait[] | undefined; //PH pour distinguer le pivot helper de l'autre component
  currentLevel: LevelXp = new LevelXp(1);
  currentGold: number = 50;
  goldExpend: number = 0;
  currentStage : StageData = new StageData(null);
  
  prepaDone : boolean = false;
  
  reRoll = ReRollVal;
  stageData = StageDataVal;
  levelXp = LevelXpVal;
  timeLeft: number = 30;
  timerDisplay: number = 100;
  interval: number = 0;
  
  
  constructor(private championService : ChampionService, private traitService : TraitService,
    private changeDetection: ChangeDetectorRef) { }
    
  ngOnInit(): void {
    this.traitService.getAll();
    this.currentStage = new StageData(this.stageData[0]);
      this.timeLeft = this.currentStage.prepDuration;

      this.currentLevel = new LevelXp(1);
       this.championService.getAll().subscribe(
        (champions : Champion[]) =>{
          this.champions = champions;
          this.RefreshShop();
        }
      );
      
      for (let index = 0; index < 9; index++) {
        this.bench.push(new HexCase());
      }
      
      for (let tri = 0; tri < 4; tri++) {
        this.board.push(new Array());
        for (let tdi = 0; tdi < 7; tdi++) {
          this.board[tri].push(new HexCase());
        }
      }
  }
  

    //#region drag drop
    
    
    sellChampion(ev:any) : void{ 
      
      var champDrag : string = ev.dataTransfer.getData("idChampDrag"); //hexdrag-board/bench-x
      var appHexDrag : HTMLElement|null = document.getElementById(champDrag); //hexdrag-bench-x
      var idDragDiv : string = appHexDrag!.id
      
      var idDrag : number = +idDragDiv.replace('hexdrag-bench-','');
      var idDragRow : number = +idDragDiv.replace('hexdrag-board-','').split("-")[0];
      var idDragColumn : number = +idDragDiv.replace('hexdrag-board-','').split("-")[1];
      
      var champ : Champion|undefined = undefined;
      var hex : HexCase = new HexCase();
      if(idDragDiv.includes("board"))//from board
      {
        hex = this.board[idDragRow][idDragColumn]
        champ = this.board[idDragRow][idDragColumn].champion;
        this.board[idDragRow][idDragColumn] = new HexCase();
        if(hex.champion)
        this.boardData.splice(this.boardData.indexOf(hex.champion),1);
      }
      else{ // from bench
        
        champ = this.bench[idDrag].champion;
        this.bench[idDrag]= new HexCase();
      }
      
      if(champ)
      this.currentGold += champ.cost;
      this.boardChange();
    }
    
    
    allowDrop(ev:any) {
      ev.preventDefault();
    }
    
    onDrag(ev:any) {
      ev.dataTransfer.setData("idChampDrag", ev.target.id);
      ev.dataTransfer.setData("idParentChampDrag", ev.target.parentNode.id);
    }
    
    onDrop(ev:any) {
      
      ev.preventDefault();
      //ev.target = app-hex-champion      
      var champDrag : string = ev.dataTransfer.getData("idChampDrag"); //hexdrag-board/bench-x
      var idParentChampDrag: string  = ev.dataTransfer.getData("idParentChampDrag");//div-board/bench-x
      
      var appHexDrag : HTMLElement|null = document.getElementById(champDrag); //hexdrag-bench-x
      var idDragDiv : string = appHexDrag!.id
      var appHexDiv : HTMLElement|null  = document.getElementById(idParentChampDrag);
      
      var appHexTarget : HTMLElement|null = document.getElementById(ev.target.closest('app-champion-hexagone').id);
      var idTargetDiv: string  = ev.target.parentNode.closest('.case').id //div-board/bench - x
      
      var targetDiv : HTMLElement|null = document.getElementById(idTargetDiv);
      
      this.bench = [...this.bench];//voir l'utilité de ca
      this.board = [...this.board];
      //board to bench        
      if(idDragDiv.includes("board") && idTargetDiv.includes("bench"))//board to bench
      {
        var idTarget : number = +appHexTarget!.id.replace('hexdrag-bench-','');
        var idDragRow : number = +idDragDiv.replace('hexdrag-board-','').split("-")[0];
        var idDragColumn : number = +idDragDiv.replace('hexdrag-board-','').split("-")[1];
        
        
        var boardCount = this.boardData.length -1; //-1 car on remplace un champion
        this.boardData.forEach(champion=> {
          if(champion?.dataTraits?.some(dt=>dt.name == 'Dragon'))
          {
            boardCount +=1
          }
        });
        //si celui que l'on ajout est un dragon
        if(this.bench[idDragRow].champion?.dataTraits.some(dt=>dt.name == 'Dragon'))
        {
          boardCount +=1
        }
        
        if(boardCount + 1 > this.currentLevel.level) //+1 car ajout
        {
          return;
        }
        else{          
          
          var poseSave = this.board[idDragRow][idDragColumn];
          this.board[idDragRow][idDragColumn] = this.bench[idTarget];
          this.bench[idTarget] = poseSave;
        }
        
        //retrait du board
        if(poseSave.champion)
        this.boardData.splice(this.boardData.indexOf(poseSave.champion),1);
      }
      else if(idDragDiv.includes("board") && idTargetDiv.includes("board"))//board to board
      {
        var idTargetRow : number = +appHexTarget!.id.replace('hexdrag-board-','').split("-")[0];
        var idTargetColumn : number = +appHexTarget!.id.replace('hexdrag-board-','').split("-")[1];
        var idDragRow : number = +idDragDiv.replace('hexdrag-board-','').split("-")[0];
        var idDragColumn : number = +idDragDiv.replace('hexdrag-board-','').split("-")[1];
        
        var poseSave = this.board[idDragRow][idDragColumn];
        this.board[idDragRow][idDragColumn] = this.board[idTargetRow][idTargetColumn];
        this.board[idTargetRow][idTargetColumn] = poseSave;
      }
      //test si on ajoute au board ou si on deplace sur le bench
      else if(idDragDiv.includes("bench") && idTargetDiv.includes("board"))//bench to board
      {        
        //récupération du contenu 
        var idDrag : number = +idDragDiv.replace('hexdrag-bench-','');
        var idTargetRow : number = +appHexTarget!.id.replace('hexdrag-board-','').split("-")[0];
        var idTargetColumn : number = +appHexTarget!.id.replace('hexdrag-board-','').split("-")[1];
        
        var poseSave = this.bench[idDrag];
        
        //si la case ne contient pas de champion et si on depasse le nombre de champion par level on annule
        //var hexChamionBoard : Champion = this.board[idTargetRow][idTargetColumn]
        var hexBoard : HexCase = this.board[idTargetRow][idTargetColumn]
        var hexChampionBoard : Champion | undefined = this.board[idTargetRow][idTargetColumn].champion
        if(hexChampionBoard) // on remplace un existant
        {
          
          var boardCount = this.boardData.length -1; //-1 car on remplace un champion
          this.boardData.forEach(champion=> {
            if(champion.dataTraits.some(dt=>dt.name == 'Dragon'))
            {
              boardCount +=1
            }
          });
          //si celui que l'on ajout est un dragon
          if(this.bench[idDrag].champion?.dataTraits.some(dt=>dt.name == 'Dragon'))
          {
            boardCount +=1
          }
          
          if(boardCount + 1 > this.currentLevel.level) //+1 car ajout
          {
            return;
          }
          else{
            
            //a revoir
            this.boardData.splice(this.boardData.indexOf(hexChampionBoard),1);
            
            
            //ajout au board
            if(poseSave.champion)
            this.boardData.push(poseSave.champion);
            
            this.bench[idDrag] = this.board[idTargetRow][idTargetColumn];
            this.board[idTargetRow][idTargetColumn] = poseSave;   
          }
        }
        else
        {
          var boardCount = this.boardData.length
          this.boardData.forEach(champion=> {
            if(champion.dataTraits.some(dt=>dt.name == 'Dragon'))
            {
              boardCount +=1
            }
          });
          //si celui que l'on ajout est un dragon
          if(this.bench[idDrag].champion?.dataTraits.some(dt=>dt.name == 'Dragon'))
          {
            boardCount +=1
          }
          
          if(boardCount + 1 > this.currentLevel.level) //+1 car ajout
          {
            alert("pas d'espace disponible");
            return;
          }
          else{
            //ajout au board
            if(poseSave.champion)
            
            this.bench[idDrag] = this.board[idTargetRow][idTargetColumn];
            this.board[idTargetRow][idTargetColumn] = poseSave;  
          }
        }
        
      }
      else  //bench to bench
      {          
        //récupération du contenu 
        var idDrag : number = +idDragDiv.replace('hexdrag-bench-','');
        var idTarget : number = +appHexTarget!.id.replace('hexdrag-bench-','');
        
        //on swape
        var poseSave = this.bench[idDrag];
        this.bench[idDrag] = this.bench[idTarget];
        this.bench[idTarget] = poseSave;
        
      }
      //switch id
      var idSave = appHexDrag!.id ;
      appHexDrag!.id = appHexTarget!.id;
      appHexTarget!.id = idSave;
      
      /*laisser commenté :  pas de swap html car sinon au rafraichissement tout plante
      targetDiv?.appendChild(appHexDrag??new Node());
      appHexDiv?.appendChild(appHexTarget??new Node());
      */
      this.boardChange();
      
    }
    //#endregion
    


    //#region shop
    RefreshShop(): void {
      var champShop : Champion[] = new Array();
      champShop = this.SelectRandomChamp(5);
      this.shop = champShop;
    }

    
    SelectRandomChamp(numb : number): Champion[] {
      //en fonction du niveau actuel on recupere un pourcentage de champion par tier
      var champShop : Champion[] = new Array();
      var currReRoll : ReRoll = this.reRoll[this.currentLevel.level-1];
      //tant que le shop n'as pas numb element
      var secu = 0;
      var currRerollTier = 0;
      while (champShop.length<numb && secu<100) {      
        
        for (let index = 1; index < 6; index++) { //each cost
          
          switch (index) {
            case 1:       
            default:
            currRerollTier = currReRoll.tier1;
            break;
            case 2:
            currRerollTier = currReRoll.tier2;
            break;
            case 3:
            currRerollTier = currReRoll.tier3;
            break;
            case 4:
            currRerollTier = currReRoll.tier4;
            break;
            case 5:
            currRerollTier = currReRoll.tier5;
            break;  
          }
          
          // on le teste il a x% de chance de rester      
          var pickPercent = Math.floor(Math.random() * (100+1)) // on prend un chiffre entre 0 et 100
          if(pickPercent > 0 && pickPercent <= currRerollTier)
          {
            //on prends un champion random tier1
            var arraycost = this.champions.filter(c=>c.cost==index);
            if (index==4) {
              arraycost = arraycost.concat(this.champions.filter(c=>c.cost==8));
            }
            else if (index==5){
              arraycost = arraycost.concat(this.champions.filter(c=>c.cost==10));
            }
            
            var champ = arraycost[Math.floor(Math.random() * arraycost.length)];
            champShop.push(champ);            
            if(champShop.length==numb)
            {
              break;
            }
          }
        }
        
        secu ++; 
      }
      //on fait la meme chose pour les 5 niveau
      //on boucle
      return champShop;
    }
    //#endregion

  selectChampion(champion : Champion) : void{    
      
    if (champion) {
      var champEmpty = this.bench.find(hex=>hex.champion==undefined)
      
      for (let row of this.board) //on ne peut pas faire de break avec foreach
      {
        if(row.some(hex=>hex.champion==undefined))
        {
          var ind = row.findIndex(hex=>hex.champion==undefined)
          row[ind].champion = champion; 
          break;
        }
      };
    }     
    this.boardChange();    
  }

  selectChampionShop(champion : Champion) : void{ 
    champion.stars = 1;
    var championName = champion.name
    var nbChampBoard = 0;
    this.goldExpend = 0; 
    
    this.board.forEach(row=>{
      row.forEach(hex=>{
        var champ : Champion | undefined = hex.champion;
        
        if(champ && champ.name == championName)
        nbChampBoard ++;
      })
      
    })
    var nbChampBench = this.bench.filter(hex=>hex.champion?.stars == 1 && hex.champion?.name ==championName)?.length
    
    var ind = 0;
    var buyToStar :boolean=false;
    
    var allChamps : HexCase[] = [];
    allChamps = allChamps.concat(this.board.flatMap(row => row.filter(h=>h.champion != undefined)))
    allChamps = allChamps.concat(this.bench.filter(h=>h.champion != undefined));
    allChamps.push({champion : champion}as HexCase);
    //--- controle stars
    //2*
    //on cherche tous les champions 
    var result = this.countAllChamps(allChamps);
    
    for (let hex of allChamps) {
      // si on en trouve trois 1* on passe le premier a 2* et on retire 2x 1*      
      if((result as any)[hex.champion?.name+"_1"] >= 3)
      {
        //le premier 1 * trouvé passe a 2*
        if(hex.champion?.stars==1){
          
          hex.champion!.stars=2
          
          //les 2autres 1* sont retirés
          var other1star =  allChamps.filter(h=>h.champion?.name==hex.champion?.name).filter(h=>h.champion?.stars ==1);
          
          other1star.forEach(h=>h.champion = undefined);
          
          //on recompte pour les champions passé a 2*
          result = this.countAllChamps(allChamps);
          buyToStar = true;
        }
      }
      
      if((result as any)[hex.champion?.name+"_2"] >= 3)
      {
        if(hex.champion?.stars==2){
          //le premier 2* trouvé passe a 3*
          hex.champion!.stars=3
          
          //les 2autres 2* sont retirés
          var other2star =  allChamps.filter(h=>h.champion?.name==hex.champion?.name).filter(h=>h.champion?.stars ==2);          
          other2star.forEach(h=>h.champion = undefined);
        }
      }
    }
    
    //on regarde si on achete pour faire une étoile
    if(buyToStar)
    {
      const index = this.shop.indexOf(champion, 0);
      if (index > -1) {
        this.shop.splice(index, 1);
      }        
      this.currentGold -= champion.cost;
    }
    //sinon verification si il reste de la place
    else if(this.bench.some(hex=>hex.champion==undefined))
    {
      const index = this.shop.indexOf(champion, 0);
      if (index > -1) {
        this.shop.splice(index, 1);
      }
      this.currentGold -= champion.cost;
      
      ind = this.bench.findIndex(hex=>hex.champion==undefined)
      
      var tempcopy = JSON.stringify(champion)
      var cloneChamp = JSON.parse(tempcopy);
      
      this.bench[ind].champion = cloneChamp; //clone celui que l'on viens d'acheter
    }
    
    this.boardChange();
    
    return ;
  }

  countAllChamps(allChamps : HexCase[]) : any{
    const result = allChamps.reduce((total, value) => {
      if(value.champion){          
        var count = ((total as any)[value.champion!.name+ "_"+ value.champion!.stars] || 0) + 1;
        (total as any)[value.champion!.name +"_"+ value.champion!.stars] = count;
        return total;          
      }
      return total;
    }, {});
    return result;
  }
    
  boardChange() : void
  {    
    var traitsActiv : Trait[] | undefined;
    var traitTest : Trait[]|undefined;    
    var champsName : string[]=[];    
    this.board.forEach(row => {
      if(!row.every(hex=>hex.champion?.name==''))
      {          
        row.forEach(col =>{
          traitTest = col.champion?.dataTraits
          
          if(traitTest && traitTest.length>0 && !champsName.some(c=>c==col.champion?.name))
          {
            champsName.push(col.champion?.name??"");
            if(!traitsActiv)
            traitsActiv = [];
            
            if(traitTest.some(t=>t.name == 'Dragon'))
            {
              //ajout de x fois le trait correspondant au dragon
              for (let i = 0; i < 2; i++) {
                traitsActiv.push(traitTest[0])
              }
              traitsActiv = traitsActiv.concat(traitTest)
            }
            else{
              traitsActiv = traitsActiv.concat(traitTest);                
            }
          }
        })
      }
    });
    this.activesTraitsPH = traitsActiv;
    
    this.boardData = this.board.flatMap(row => row.filter(h=>h.champion != undefined)).map(h=>h.champion!)    
  }

  //#endregion

  loadRandom(){
    this.clearAll();
    this.doRefresh(true);
    
    var list = this.SelectRandomChamp(this.currentLevel.level);
    
    list.forEach(c=>{
      this.selectChampion(c)
    });
  }
  
  clearAll() : void{
      
    this.board.forEach(row => {
      if(!row.every(hex=>hex.champion?.name==''))
      {          
        row.forEach(col =>{
          if(col.champion?.dataTraits?.length??0>0)
          {
            col.champion?.dataTraits.forEach(t=>{t = new Trait();})
            col.champion?.dataTraits.forEach(t=>{t.state=State.Unactive;t.currentPallier=1})
            
          }
        })
      }
    });
    
    this.board = [];
    this.boardData = [];
    this.bench= [];      
    for (let index = 0; index < 9; index++) {
      this.bench.push(new HexCase());
    }
    
    for (let tri = 0; tri < 4; tri++) {
      this.board.push(new Array());
      for (let tdi = 0; tdi < 7; tdi++) {
        this.board[tri].push(new HexCase());
      }
    }
    this.boardChange();
    
  }
  
  buyXP(){
    this.currentGold -= 4;
    this.addXp(4);
  }
  
  addXp(xpAdd : number){
    
    this.currentLevel.currentXp += xpAdd;
    
    var xpSup = this.currentLevel.currentXp - this.currentLevel.xpNeed;
    if(xpSup >= 0)
    {
      this.currentLevel = new LevelXp(this.currentLevel.level+1,xpSup);
    }
  }

  doRefresh(free : boolean):void{
    if(!free)
    {
      this.currentGold -= 2;
      this.goldExpend +=2; 
    }
    this.RefreshShop();
  }
  
  /*TODO : a sortir dans un composant a part*/
    //#region timer
    startTimer() {
      this.interval = window.setInterval(() => {        

        if(!this.prepaDone)
        {
          if(this.timeLeft > 0 ) 
          {
            //deroulement préparation
            this.timeLeft--;
            this.timerDisplay = (this.timeLeft??0) * 100/ (this.currentStage.prepDuration??0);
          } 
          else 
          { 
            this.prepaDone = true;  
            //pour le timer prochain
            this.timeLeft = this.currentStage.duration??0
          }
        }
        else
        {
          if(this.timeLeft > 0 ) 
          {
            //deroulement fight
            this.timeLeft--;
            this.timerDisplay = (this.timeLeft??0) * 100/ (this.currentStage.duration??0);
          } 
          else 
          {
            this.addXp(2);
            this.RefreshShop();
            this.currentStage = this.currentStage.NextPhase();
            //pour le timer prochain
            this.timeLeft = this.currentStage.prepDuration;

            this.prepaDone = false; 
          }
        }
      },1000)
    }
    
    stopTimer() {
      this.currentStage = new StageData(this.stageData[0]);
      this.timeLeft = (this.currentStage.prepDuration??0);  
      this.timerDisplay = 100;
      window.clearInterval(this.interval);
    }
    
    endRound(){      
      this.currentStage = this.currentStage.NextPhase();
      this.currentGold += 5;
      this.timeLeft = this.currentStage?.prepDuration??30;          
      this.timerDisplay = (this.timeLeft??0) * 100/ (this.currentStage.prepDuration??0);
    }
    //#endregion
  
}

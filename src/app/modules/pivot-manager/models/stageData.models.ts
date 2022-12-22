
import stageDataJson from 'src/assets/divers/stageData.json';
export const StageDataVal : StageData[] = <StageData[]>stageDataJson;

export class StageData{   
    
    stage : number =0 ;
    phase : number =0;
    prepDuration : number =0;
    duration : number =0;
    isCarouselle : boolean = false;
    isAugment : boolean= false;
    isMonster : boolean= false;
    isFight : boolean= false;
    get IsFight() : boolean {
        return (!this.isCarouselle && !this.isAugment && !this.isMonster);
    }
    

    constructor(json:any) {
        if(json)
        {            
            this.stage = json.stage;
            this.phase = json.phase;
            this.prepDuration = json.prepDuration;
            this.duration = json.duration;
            this.isCarouselle = json.isCarouselle;
            this.isAugment = json.isAugment;
            this.isMonster = json.isMonster;
        }
      }

NextPhase(){

    if((this.stage == 1 && this.phase >= 3)  || this.phase >= 7)
    {    
        this.NextStage()
    }
    else {
        this.phase += 1;
    }
    
    return new StageData(StageDataVal.filter(s=>s.stage == this.stage && s.phase == this.phase)[0])
}

    NextStage(){
        this.stage += 1;
        this.phase = 1
    } 
}



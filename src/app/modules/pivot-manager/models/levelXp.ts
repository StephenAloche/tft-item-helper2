
export const LevelXpVal : LevelXp[] = [
    {
    "level" : 1,
    "xpNeed" : 0,
    "currentXp" : 0,
    },
    {
    "level" : 2,
    "xpNeed" : 2,
    "currentXp" : 0,
    },
    {
    "level" : 3,
    "xpNeed" : 6,
    "currentXp" : 0,
    },
    {
    "level" : 4,
    "xpNeed" : 10,
    "currentXp" : 0,
    },
    {
    "level" : 5,
    "xpNeed" : 20,
    "currentXp" : 0,
    },
    {
    "level" : 6,
    "xpNeed" : 36,
    "currentXp" : 0,
    },
    {
    "level" : 7,
    "xpNeed" : 56,
    "currentXp" : 0,
    },
    {
    "level" : 8,
    "xpNeed" : 80,
    "currentXp" : 0,
    },
    {
    "level" : 9,
    "xpNeed" : 100,
    "currentXp" : 0,
    },
    {
    "level" : 10,
    "xpNeed" : 200,
    "currentXp" : 0,
    }
    ]
    
    export class LevelXp{
      level : number =0;
      xpNeed : number =0;
      currentXp : number =0;

      constructor(level : number, currentXp? : number)
      {
if(level<1)
level =1;

        this.level = level;
        this.xpNeed = LevelXpVal[level-1].xpNeed
        if(currentXp)
          this.currentXp = currentXp
        else  
        currentXp = 0;
      }
    }
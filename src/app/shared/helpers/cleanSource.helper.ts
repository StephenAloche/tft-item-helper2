import { Type } from "@angular/core";

export function cleanSetVariable<Type>(data : Type[]):Type[] {
    var stringified = JSON.stringify(data);
    stringified = stringified.replace(/{45c7ed6b}/g,"BonusCritDmgPerCritAbove100");
    stringified = stringified.replace(/{9f2eb1e2}/g,"CritChanceAmpPercent");
    stringified = stringified.replace(/{268f634e}/g,"CritAmpPercent");
    stringified = stringified.replace(/{bdd452e8}/g,"PercentDamageReduction");        
    stringified = stringified.replace(/{cb6b5298}/g,"PercentBonusDamage");
    stringified = stringified.replace(/{bdd452e8}/g,"AttackPercent");
    stringified = stringified.replace(/{ff57f232}/g,"AttackPercent*100");
    stringified = stringified.replace(/{c51d362c}/g,"ChargeIncreasePct");
    stringified = stringified.replace(/{7f1304b2}/g,"AbilityPower");
    stringified = stringified.replace(/{d49caf5d}/g,"BonusAP");
    stringified = stringified.replace(/{cc4e6814}/g,"DamageInc*100");
    stringified = stringified.replace(/{af2150c6}/g,"ManaAmount");
    stringified = stringified.replace(/{a8ca7859}/g,"AttackSpeedPercent");
    stringified = stringified.replace(/{ad16f688}/g,"Omnivamp");
    stringified = stringified.replace(/{a77cf7ad}/g,"ShieldPercentAmount");
    stringified = stringified.replace(/{4a1c6695}/g,"TooltipMultiplier");
    stringified = stringified.replace(/{bdd452e8}/g,"AttackSpeed*100");
    stringified = stringified.replace(/{6c216145}/g,"NumItems");
    stringified = stringified.replace(/{92c2d0ac}/g,"StatPercent");
    stringified = stringified.replace(/{a68d353d}/g,"APPercent");
    stringified = stringified.replace(/{2afd498b}/g,"APMultiplier*100");
    stringified = stringified.replace(/{08a84200}/g,"ADandAP");
    stringified = stringified.replace(/{5064373e}/g,"DamageReductionPercent");

    stringified = stringified.replace(/{6c216145}/g,"NumItems");
    /*champion*/
    stringified = stringified.replace('ModifiedDamage',"Damage");
    var valueCorrected = JSON.parse(stringified);
    return valueCorrected;
};

export function cleanItemVariable<Type> (data : Type[]):Type[] {
    var stringified = JSON.stringify(data);
    
    //les chiffres sont d'abord remplacer par le texte de la description, ensuite celui ci est reformatter dans fomratItem de item.service
    stringified = stringified.replace(/{45c7ed6b}/g,"BonusCritDmgPerCritAbove100");
    stringified = stringified.replace(/{d34ac151}/g,"BonusCritDamage");
    stringified = stringified.replace(/{a961afa0}/g,"CostIncrease");
    stringified = stringified.replace(/{9c7c9547}/g,"Tooltip1StarBonusAD");
    stringified = stringified.replace(/{d4afa164}/g,"Tooltip2StarBonusAD");
    stringified = stringified.replace(/{edb2fb8}/g,"Tooltip3StarBonusAD");
    stringified = stringified.replace(/{8b1e9f37}/g,"HexRange");
    stringified = stringified.replace(/{d48caf5d}/g,"BonusAP");
    stringified = stringified.replace(/{deada01e}/g,"SmallBonusPct");
    stringified = stringified.replace(/{b9ae7546}/g,"LargeBonusPct");
    stringified = stringified.replace(/{16384c97}/g,"HexRangeIncrease");
    stringified = stringified.replace(/{c4b5578c}/g,"DodgeChance");
    stringified = stringified.replace(/{ad16f699}/g,"OmniVamp");
    stringified = stringified.replace(/{4b8a3b61}/g,"FlatManaRestore");
    stringified = stringified.replace(/{fe078f34}/g,"MRShred");
    stringified = stringified.replace(/{b223087c}/g,"MRShredDuration");
    stringified = stringified.replace(/{5deb4eb2}/g,"APPerInterval");
    stringified = stringified.replace(/{a7db7345}/g,"IntervalSeconds");
    stringified = stringified.replace(/{b3b9f644}/g,"StackingAD");
    stringified = stringified.replace(/{8386f00d}/g,"StackCap");
    stringified = stringified.replace(/{b55018fa}/g,"BonusResistsAtStackCap");
    stringified = stringified.replace(/{6fb8af6a}/g,"1StarShieldValue");
    stringified = stringified.replace(/{0d46330d}/g,"2StarShieldValue");
    stringified = stringified.replace(/{928e6cec}/g,"3StarShieldValue");
    stringified = stringified.replace(/{1ee760be}/g,"1StarAoEDamage");
    stringified = stringified.replace(/{a3b88e8}/g,"2StarAoEDamage");
    stringified = stringified.replace(/{156febb9}/g,"3StarAoEDamage");
    stringified = stringified.replace(/{0034a6ef}/g,"ShieldHealthPercent");
    stringified = stringified.replace(/{276ba2c9}/g,"MultiplierForDamage");
    stringified = stringified.replace(/{df6f64b8}/g,"ManaRatio");
    stringified = stringified.replace(/{7ba9c0e3}/g,"ArmorPerEnemy");
    stringified = stringified.replace(/{7ba8c0e3}/g,"ArmorPerEnemy");
    stringified = stringified.replace(/{7c684b41}/g,"MRPerEnemy");
    stringified = stringified.replace(/{7c694b41}/g,"MRPerEnemy");
    stringified = stringified.replace(/{7ff4f3b6}/g,"SummonedStatReduction");
    //Morello
    stringified = stringified.replace(/{57706a68}/g,"BurnPercent");
    stringified = stringified.replace(/{87e52ce9}/g,"BurnDuration");
    stringified = stringified.replace(/{2161bfa2}/g,"GrievousWoundsPercent");
    //redemption
    stringified = stringified.replace(/{c8f222c0}/g,"HealTickRate");
    stringified = stringified.replace(/{7b6cc2f7}/g,"MissingHealthHeal");
    stringified = stringified.replace(/{033de552}/g,"AoEDamageReduction");
    //zephyr
    stringified = stringified.replace(/{510fdb6a}/g,"BanishDuration");
    //last whisper
    stringified = stringified.replace(/{5078c7a2}/g,"ArmorReductionPercent");
    stringified = stringified.replace(/{cc8fefa7}/g,"ArmorBreakDuration");
    //jeweled gauntlet
    stringified = stringified.replace(/{353ede36}/g,"CritDamageAmp");
    stringified = stringified.replace(/{5200c406}/g,"TooltipBonusAP");
    //Hoj hande of justice
    stringified = stringified.replace(/{18a98153}/g,"BaseAD");
    stringified = stringified.replace(/{41cb629d}/g,"BaseSP");
    stringified = stringified.replace(/{f2474447}/g,"TooltipBonus");
    
    //QSS Quicksliver
    stringified = stringified.replace(/{a2b76524}/g,"SpellShieldDuration");
    //statick
    stringified = stringified.replace(/{12a15e8e}/g,"1StarBounces");
    var valueCorrected = JSON.parse(stringified);
    return valueCorrected;
}

export function cleanName(name : string) : string{
    return name.replaceAll(' ','').replaceAll('.','').replaceAll('\'','').replaceAll('-','');
}
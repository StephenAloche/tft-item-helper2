  //basé sur la récupération d'information sur le site https://lolchess.gg/en/decks dans item trend
var data = [];
  var fullLine = document.getElementsByClassName('flex flex-col gap-[1px] border');

  for(var i=0; i < fullLine.length;i++)
  {
    var info = {name:'', champions : [] , augments : [], avgPl : 0, top4 : 0 , link :''};

    var header = fullLine[i].querySelectorAll('header');
    var allDeck = fullLine[i].children[1].firstChild.firstChild

    //champions
    var champions= allDeck.firstChild.firstChild.children
    champions = [...champions];

    champions.forEach(div=>{
      var champion = { name:'', isCore:false, itemsName : [] };
      var img = div.querySelector('img')
      champion.name = img.src.split('-').pop().split('.')[0];
        if(div.querySelector('strong')?.innerHTML==='CORE'){
          champion.isCore = true;
        }

        var items = div.firstChild.children[1].querySelectorAll('img');
        champion.itemsName = [...items].map(i=>i.src.split('/').pop().split('_')[0].replace('.png',''));
        info.champions.push(champion);
    });

    //augments
    var augments = allDeck.children[1].firstChild.querySelectorAll('img');
    info.augments = [...augments].map(i=>i.src.split('/').pop().split('.')[0].split('_')[0]);

    //autres
    info.avgPl = allDeck.children[1].children[1].querySelector('.text-white').textContent;
    info.top4 = allDeck.children[1].children[2].querySelector('dd span').textContent;
    info.link = allDeck.querySelector('a').href;

    info.name = header[0].firstChild.querySelector('strong').innerHTML//revoir emplacement


    data.push(info);

}
JSON.stringify(data);

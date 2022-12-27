  //basé sur la récupération d'information sur le site https://lolchess.gg/en/decks dans item trend
  
  var data = [];
  var tr = document.getElementsByClassName('flex flex-col gap-[1px] border');
  
  for(var i=0; i < tr.length;i++)
  {
    var info = {name, championsName : []};
    var header = tr[i].querySelectorAll('header');
    info.name = header[0].firstChild.querySelector('strong').innerHTML//revoir emplacement
    var championsNamesFull = tr[i].children[1].querySelectorAll('img.h-full');
    championsNamesFull.forEach(img=>{
        
        var name = img.src.split('-').pop().split('.')[0];
        info.championsName.push(name);
    }
    );
    
    data.push(info);
    
}
JSON.stringify(data);


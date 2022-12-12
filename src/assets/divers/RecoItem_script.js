
  //basé sur la récupération d'information sur le site https://lolchess.gg/statistics/items dans item trend

var tr = document.querySelectorAll('.table tbody tr');
  var data = [];
  for(var i=0; i < tr.length;i++)
  {
    var info = {champion, items : []};
    var champion = tr[i].querySelector(".champion span").innerHTML;
    var items =  tr[i].querySelectorAll(".items");
      var itemBuild = [];
      for (let index = 0; index < items.length; index++) {
          itemCustom = {name : items[index].querySelector(".combination span.name").innerHTML, ratio : items[index].querySelector(".combination span.ratio").innerHTML };
          itemBuild.push(itemCustom);
      }
    info.champion = champion;
    info.items = itemBuild;
    data.push(info);
    JSON.stringify(data);
  }


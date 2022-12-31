//img champion
//url : https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/
var set = 8;
var as = document.querySelectorAll('#list tbody a')
var listfiltered =  [...as].filter(a=>a.href.includes('tft'+set));
listfiltered = listfiltered.filter(a=>!a.href.includes('square'));
listfiltered.forEach(a=>{
    a.download = a.title;
});

function download_next(i) {
	if (i >= listfiltered.length) {
      return;
    }
var a = listfiltered[i]
    a.click();
    setTimeout(function() {
      download_next(i + 1);
    }, 500);
}

    download_next(0);

    //img items
    //url : https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/
    //img trait spat
    //url :https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set8/
    var as = document.querySelectorAll('#list tbody a')
    var listfiltered =  [...as].filter(a=>a.href.includes('.png'));
    listfiltered.forEach(a=>{
        a.download = a.title;
    });
    function download_next(i) {
        if (i >= listfiltered.length) {
          return;
        }
    var a = listfiltered[i]
        a.click();
        setTimeout(function() {
          download_next(i + 1);
        }, 500);
    }
    
        download_next(0);

    //img traits
    //url : https://raw.communitydragon.org/latest/game/assets/ux/traiticons/
    

    //img augments
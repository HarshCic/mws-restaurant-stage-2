/* Changing Google Maps focus to -1 */
function customfunction(){
  let gdivs = document.getElementById('map').getElementsByTagName("div");
  for(var i=0; i<gdivs.length; i++) {
      gdivs[i].setAttribute("tabindex", "-1");
  }
  var gas = document.getElementById('map').getElementsByTagName("a");
  for(let i=0; i<gas.length; i++) {
      gas[i].setAttribute("tabindex", "-1");
  }
  let gbuttons = document.getElementById('map').getElementsByTagName("button");
  for(let i=0; i<gbuttons.length; i++) {
      gbuttons[i].setAttribute("tabindex", "-1");
  }
  let gmap = document.getElementById('map').getElementsByTagName('iframe');
  gmap[0].setAttribute("tabindex", "-1");
}

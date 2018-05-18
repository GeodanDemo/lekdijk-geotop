var crosssectionDirection;
function init() {
  openNav();
  document.getElementById('slider_depth_factor').oninput = (function() {
    document.getElementById('transform_geotop').setAttribute('scale', '44100 14000 ' +  112.25*this.value);
    var elements = document.getElementsByClassName('transform_text');
    var len = elements.length;
    for (i = 0; i < len; i++) {
      elements[i].setAttribute('scale', '0.005 ' + 0.1*(20/this.value) + ' 0.002');
    }
    document.getElementById('depth_factor').value = this.value;
  });
  document.getElementById('slider_crosssection').oninput = (function() {
    document.getElementById('MPRVolStyle').setAttribute('positionLine', 1 - this.value);
    switch (crosssectionDirection) {
      case 'ns':
        document.getElementById('crosssectionPos').value = Math.round(this.value * 44100) + ' meter';
        break;
      case 'ew':
        document.getElementById('crosssectionPos').value = Math.round(this.value * 14000) + ' meter';
        break;
      case 'hl':
        document.getElementById('crosssectionPos').value = Math.round((this.value * 112.25) -50) + ' meter';
        break;
    }
  });
}
function crosssection(direction) {
  crosssectionDirection = direction;
  switch (direction) {
    case 'ns':
      document.getElementById('MPRVolStyle').setAttribute('originLine','1,1,0');
      document.getElementById('MPRVolStyle').setAttribute('finalLine','0,1,0');
      document.getElementById('MPRVolStyle').setAttribute('positionLine','0.5');
      document.getElementById('crosssectionPos').value = '22050 meter';
      document.getElementById('slider_crosssection').value = 0.5;
      break;
    case 'ew':
      document.getElementById('MPRVolStyle').setAttribute('originLine','0,1,1');
      document.getElementById('MPRVolStyle').setAttribute('finalLine','0,0,1');
      document.getElementById('MPRVolStyle').setAttribute('positionLine','0.5');
      document.getElementById('crosssectionPos').value = '7000 meter';
      document.getElementById('slider_crosssection').value = 0.5;
      break;
    case 'hl':
      document.getElementById('MPRVolStyle').setAttribute('originLine','1,0,1');
      document.getElementById('MPRVolStyle').setAttribute('finalLine','1,0,0');
      document.getElementById('MPRVolStyle').setAttribute('positionLine','0.5708');
      document.getElementById('crosssectionPos').value = '0 meter';
      document.getElementById('slider_crosssection').value = 0.39087;
      break;
  }
}
function toggleRefLayer(el) {
  document.getElementById(el.value).setAttribute('render', el.checked);
}
function toggleViewpoint(el) {
  document.getElementById(el.value).setAttribute('set_bind', el.checked);
}
function showHelp() {
  document.getElementById('help').setAttribute('style', 'display:block;');
}
function closeHelp() {
  document.getElementById('help').setAttribute('style', 'display:none;');
}
function openNav() {
  document.getElementById('side_menu').style.width = '250px';
}
function closeNav() {
  document.getElementById('side_menu').style.width = '0';
}
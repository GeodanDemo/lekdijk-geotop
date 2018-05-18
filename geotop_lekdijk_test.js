function init() {
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
    var crosssectionDirection = getCrossSectionDirection();
    var activeVolume = document.getElementById('volumeSwitcher').getAttribute('whichChoice');
    var volStyleEl = document.getElementById('MPRVolStyle' + activeVolume);
    volStyleEl.setAttribute('positionLine', 1 - this.value);
    switch (crosssectionDirection) {
      case 'ns':
        document.getElementById('crosssectionPos').value = Math.round(this.value * 44100) + ' metres';
        break;
      case 'ew':
        document.getElementById('crosssectionPos').value = Math.round(this.value * 14000) + ' metres';
        break;
      case 'hl':
        document.getElementById('crosssectionPos').value = Math.round((this.value * 112.25) -50) + ' metres';
        break;
    }
  });
}
function getCrossSectionDirection() {
  var radios = document.getElementsByName('crosssectionRadios');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
        return(radios[i].value);
        break;
    }
  }
}
function switch_lithoclass() {
  document.getElementById('control_crosssection').setAttribute('style', 'display:none;');
  document.getElementById('control_brightness').setAttribute('style', 'display:block;');
  var radios = document.getElementsByName('lithoclassRadios');
  var lithoclass;
  for (var i = 0; i < radios.length; i++){
    if(radios[i].checked){
       lithoclass = radios[i].value;
    }
  }
  document.getElementById('volumeSwitcher').setAttribute('whichChoice', '0');
  document.getElementById('control_brightness').setAttribute('style', 'opacity: 1;');
  var maxOpacity = document.getElementById('slider_opacity').getAttribute('max');
  document.getElementById('probabilityAtlas').setAttribute('url', 'data_lekdijk/zatlas_' + lithoclass + '.png');
  document.getElementById('texture_omvs').setAttribute('url', 'transfer_' + lithoclass + '.png');
}
function crosssection(direction) {
  var activeVolume = document.getElementById('volumeSwitcher').getAttribute('whichChoice');
  console.log('active volume: ', activeVolume);
  var volStyleEl = document.getElementById('MPRVolStyle' + activeVolume);
  console.log('volstyleElem: ', volStyleEl);
  switch (direction) {
    case 'ns':
      volStyleEl.setAttribute('originLine','1,1,0');
      volStyleEl.setAttribute('finalLine','0,1,0');
      volStyleEl.setAttribute('positionLine','0.5');
      document.getElementById('crosssectionPos').value = '22050 metres';
      document.getElementById('slider_crosssection').value = 0.5;
      break;
    case 'ew':
      volStyleEl.setAttribute('originLine','0,1,1');
      volStyleEl.setAttribute('finalLine','0,0,1');
      volStyleEl.setAttribute('positionLine','0.5');
      document.getElementById('crosssectionPos').value = '7000 metres';
      document.getElementById('slider_crosssection').value = 0.5;
      break;
    case 'hl':
      volStyleEl.setAttribute('originLine','1,0,1');
      volStyleEl.setAttribute('finalLine','1,0,0');
      volStyleEl.setAttribute('positionLine','0.5708');
      document.getElementById('crosssectionPos').value = '0 metres';
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
function switchVolume(el) {
  document.getElementById('volumeSwitcher').setAttribute('whichChoice', el.value);
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
var btn = document.querySelector('.toggle_btn');
var nav = document.querySelector('.onglet_mobile');

btn.onclick = function(){
  nav.classList.toggle('.onglet_mobile_open');
}

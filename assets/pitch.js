(function(){
var root=document.getElementById('pitch-app');if(!root)return;
var L=root.getAttribute('data-lang')==='en'?'en':'it';
var D=JSON.parse(document.getElementById('pitch-data').textContent);
var ctx='poss',zone='m-c';
root.classList.add('js');
var btns=root.querySelectorAll('[data-zone]'),cbtn=root.querySelectorAll('[data-ctx]');
var title=root.querySelector('.panel-title'),list=root.querySelector('.panel-list');
function render(){
  var t=D.tasks[ctx][zone.split('-')[0]+'-'+(zone.split('-')[1]==='c'?'c':'w')];
  title.textContent=D.zones[zone]+' · '+D.ctx[ctx];
  list.innerHTML='';t.forEach(function(s){var li=document.createElement('li');li.textContent=s;list.appendChild(li);});
  btns.forEach(function(b){var on=b.getAttribute('data-zone')===zone;b.setAttribute('aria-pressed',on);});
  cbtn.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-ctx')===ctx);});
}
btns.forEach(function(b){b.addEventListener('click',function(){zone=b.getAttribute('data-zone');render();});});
cbtn.forEach(function(b){b.addEventListener('click',function(){ctx=b.getAttribute('data-ctx');render();});});
var q=new URLSearchParams(location.search);if(D.tasks[q.get('ctx')])ctx=q.get('ctx');if(D.zones[q.get('zone')])zone=q.get('zone');
render();
})();

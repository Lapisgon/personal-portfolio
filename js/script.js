/* Core: theme, matrix rain, scroll bars, secrets, hacker mode, intro enter/exit */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const store={get(k,d){try{return localStorage.getItem(k)??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};

/* Themes (persist) */
function setTheme(t){if(!['default','violet','matrix'].includes(t))t='default';document.documentElement.dataset.theme=t;store.set('theme',t);$$('[data-theme-btn]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.themeBtn===t))}
$$('[data-theme-btn]').forEach(b=>b.onclick=()=>setTheme(b.dataset.themeBtn));setTheme(store.get('theme','default'));

/* Matrix rain (paused while the 3D intro covers the page) */
const rc=$('#rain'),cx=rc.getContext('2d');let drops=[];
function rs(){rc.width=innerWidth;rc.height=innerHeight;drops=Array.from({length:Math.ceil(rc.width/16)},()=>Math.random()*-40)}
addEventListener('resize',rs);rs();
if(!RM)setInterval(()=>{if(document.hidden||!$('#intro').hidden&&!$('#intro').classList.contains('hide'))return;
 cx.fillStyle='rgba(7,7,13,.12)';cx.fillRect(0,0,rc.width,rc.height);cx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--a');cx.font='14px monospace';
 drops.forEach((y,i)=>{cx.fillText(String.fromCharCode(0x30A0+Math.random()*96),i*16,y*16);drops[i]=y*16>rc.height&&Math.random()>.975?0:y+1})},70);

/* Skill bars fill on scroll */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.querySelector('.fill').style.width=e.target.dataset.v+'%';io.unobserve(e.target)}}),{threshold:.4});
$$('.bar').forEach(b=>io.observe(b));

/* Toast */
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),3500)}

/* Secrets 0/6 */
const NAMES={photo:'Photo tapped 3 times',konami:'Konami code',hidden:'Hidden button',term:'Terminal easter egg',house:'Secret in the house',extra:'Mobile Legends MANIAC'};
let found=[];try{found=JSON.parse(store.get('secrets','[]'))}catch(e){}
function renderSecrets(){$('#cnt').textContent=$('#cnt2').textContent=found.length+'/6';
 $('#secList').innerHTML=Object.keys(NAMES).map((k,i)=>`<li>${found.includes(k)?'✅ '+NAMES[k]:'🔒 Hidden discovery #'+(i+1)}</li>`).join('')}
function party(){toast('🎉 All 6 secrets found! You are a certified explorer.');if(RM)return;
 for(let i=0;i<30;i++){const c=document.createElement('div');c.className='conf';c.textContent=['🎉','✨','🔓','💾'][i%4];c.style.left=Math.random()*100+'vw';c.style.animationDelay=Math.random()*1.2+'s';document.body.appendChild(c);setTimeout(()=>c.remove(),4500)}}
function discover(id){if(found.includes(id))return;found.push(id);store.set('secrets',JSON.stringify(found));renderSecrets();found.length===6?party():toast('🔓 Secret found: '+NAMES[id])}
renderSecrets();

/* Hacker mode: tap photo 3x */
let taps=[],hk=false;
$('#photo').onclick=()=>{const n=Date.now();taps=taps.filter(t=>n-t<1000);taps.push(n);if(taps.length<3)return;taps=[];hk=!hk;
 document.body.classList.toggle('hacker',hk);const m=$('#hk');m.hidden=!hk;
 if(hk){m.textContent='';const s='> ACCESS GRANTED\n> user: james  |  status: rehearsed x3\n> Systems secure. (tap photo 3x to exit)';let i=0;const iv=setInterval(()=>{m.textContent=s.slice(0,++i);if(i>=s.length)clearInterval(iv)},RM?0:25);discover('photo')}}

/* Konami + hidden button */
const KK=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];let ki=0;
addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#intro').hidden)enterSite();
 if(e.target.tagName==='INPUT')return;const k=e.key.length===1?e.key.toLowerCase():e.key;ki=k===KK[ki]?ki+1:(k===KK[0]?1:0);if(ki===KK.length){ki=0;discover('konami')}});
$('#dot').onclick=()=>discover('hidden');

/* Intro enter / replay */
function enterSite(){const i=$('#intro');i.classList.add('hide');if(window.houseStop)houseStop();setTimeout(()=>{if(i.classList.contains('hide'))i.hidden=true},400);$('#main').focus({preventScroll:true})}
function showIntro(){const i=$('#intro');i.hidden=false;requestAnimationFrame(()=>i.classList.remove('hide'));if(window.houseStart)houseStart()}
$('#enter').onclick=enterSite;$('#again').onclick=showIntro;

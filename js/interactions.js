/* Interactive features: flip cards, decrypt, favorites, quiz, terminal */
const HOB=[['🎮','Mobile Legends','Ranked grinds and "just one more match" at 2 AM.'],['📺','Anime','Great stories, better soundtracks, endless watchlist.'],['🌙','Late-night walks','Quiet streets, loud thoughts, best debugging sessions.'],['🍜','Creative instant noodles','Egg, cheese, chili… ramen engineering at its finest.']];
const INT=[['🗣️','Language & culture','Every language is a new way to see the world.'],['♟️','Strategy','Plan three moves ahead, then rehearse them twice more.'],['🧩','Logic puzzles','Satisfying clicks when the pieces finally fit.'],['🛡️','Cybersecurity','Think like an attacker, build like a defender.']];
let mlFlips=0;
function flips(sel,arr){const box=$(sel);box.innerHTML=arr.map(([e,t,d])=>`<button class="flip" aria-pressed="false" aria-label="${t}. Press to flip."><span class="fi"><span class="ff"><i>${e}</i><b>${t}</b><small>tap to flip</small></span><span class="fb">${d}</span></span></button>`).join('');
 $$('.flip',box).forEach(b=>b.onclick=()=>{const on=b.classList.toggle('on');b.setAttribute('aria-pressed',on);
  if(on&&b.textContent.includes('Mobile Legends')&&++mlFlips===3){toast('🔥 MANIAC!');discover('extra')}})}
flips('#hob',HOB);flips('#int',INT);

/* Click-to-decrypt quirks */
const CH='!<>-_\\/[]{}=+*^?#01';const scr=t=>t.replace(/\S/g,()=>CH[Math.random()*CH.length|0]);
$$('.q').forEach(c=>{const p=$('.p',c),full=p.textContent.trim();c.setAttribute('aria-label',$('.h',c).textContent+': '+full);p.textContent=scr(full);
 c.onclick=()=>{if(c.dataset.done)return;c.dataset.done=1;$('small',c).textContent='🔓 Decrypted';if(RM){p.textContent=full;return}
  let n=0;const iv=setInterval(()=>{n+=2;p.textContent=full.slice(0,n)+scr(full.slice(n));if(n>=full.length){clearInterval(iv);p.textContent=full}},25)}});

/* Favorites */
const FF={sisig:'Sizzling plate, calamansi, chili… sisig was popularized in Angeles, Pampanga. 🔥',minecraft:'Creeper? Aw man. One of the best-selling games ever, built block by block. ⛏️',idiots:'“All is well!” Chase excellence, and success follows. 🎬'};
$$('[data-fav]').forEach(b=>b.onclick=()=>{$('.fx',b).textContent=FF[b.dataset.fav];b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')});
$('#eqbtn').onclick=e=>{const on=e.currentTarget.getAttribute('aria-pressed')!=='true';e.currentTarget.setAttribute('aria-pressed',on);e.currentTarget.textContent=on?'⏸ Pause':'▶ Play';$('#eq').classList.toggle('paused',!on)};

/* Quiz */
const QZ=[['What is James’s favorite food?',['Adobo','Sisig','Lechon','Sinigang'],1],['Which game is his favorite?',['Minecraft','Mobile Legends','Valorant','Dota 2'],0],['Who sings his favorite song, “Come Inside of My Heart”?',['Eraserheads','Up Dharma Down','IV of Spades','Ben&Ben'],2],['What is his favorite movie?',['Inception','3 Idiots','Interstellar','Your Name'],1],['Which of his skills is highest (70%)?',['Network Fundamentals & Troubleshooting','SQL & Relational Database Design','Data Normalization & ERD Mapping','Remote Desktop & Terminal Access'],3]];
const TITLES=['Stranger Danger 🕵️','NPC Energy 🤖','Friendly Acquaintance 🙂','Close Ally 🛡️','Almost Telepathic 🔮','Certified Best Friend 🏆'];
let qi=0,sc=0;
function quiz(){const box=$('#qz');if(qi>=QZ.length){box.innerHTML=`<h3>Score: ${sc}/${QZ.length}</h3><p>Title unlocked: <b>${TITLES[sc]}</b></p><button class="btn pri" id="rt">Try again</button>`;$('#rt').onclick=()=>{qi=sc=0;quiz()};return}
 const [q,o,a]=QZ[qi];box.innerHTML=`<p><small>Question ${qi+1} of ${QZ.length} · Score ${sc}</small></p><h3>${q}</h3>`+o.map((t,i)=>`<button class="opt" data-i="${i}">${t}</button>`).join('')+'<p id="fb" role="status"></p>';
 $$('.opt',box).forEach(b=>b.onclick=()=>{const i=+b.dataset.i;$$('.opt',box).forEach(x=>x.disabled=true);$$('.opt',box)[a].classList.add('ok');
  if(i===a){sc++;$('#fb').textContent='✅ Correct!'}else{b.classList.add('no');$('#fb').textContent='❌ Not quite. The answer is highlighted.'}
  const n=document.createElement('button');n.className='btn pri';n.textContent=qi===QZ.length-1?'See result':'Next →';n.onclick=()=>{qi++;quiz()};box.appendChild(n);n.focus()})}
quiz();

/* Terminal */
const log=$('#log'),ti=$('#ti');let hist=[],hi=0;
const out=t=>{const d=document.createElement('div');d.textContent=t;log.appendChild(d);log.scrollTop=log.scrollHeight};
const CMD={
 help:()=>['Commands: help, skills, ping, about, hobbies, goal, clear','Secret hints: some commands are not listed. Try what admins type, a sizzling Filipino dish, or the answer to life, the universe and everything.'],
 skills:()=>$$('.bar').map(b=>{const v=+b.dataset.v,n=v/5;return b.dataset.n.padEnd(38)+' '+'█'.repeat(n)+'░'.repeat(20-n)+' '+v+'%'}),
 ping:()=>['Pinging james.local with 32 bytes of data…','Reply from 127.0.0.1: time<1ms (rehearsed 3 times)'],
 about:()=>['James M. Gabutan | BS Information Technology','"I rehearse the conversation three times so the system never has to."'],
 hobbies:()=>['• Playing Mobile Legends','• Watching anime','• Late-night walks','• Cooking instant noodles in creative ways'],
 goal:()=>['Become a data engineer or work in cybersecurity.'],
 clear:()=>{log.innerHTML='';return[]},
 sudo:()=>{discover('term');return['[sudo] password for james: ********','Nice try. Secret unlocked anyway. 🔓']},
 sisig:()=>{discover('term');return['🍳 Sizzling… extra calamansi, hold the onions. Secret unlocked.']},
 '42':()=>{discover('term');return['The answer to life, the universe and everything. Secret unlocked. 🌌']}};
out('Welcome! Type "help" to begin.');
$('#tf').onsubmit=e=>{e.preventDefault();const raw=ti.value.trim(),c=raw.toLowerCase();ti.value='';if(!raw)return;hist.push(raw);hi=hist.length;out('$ '+raw);
 (CMD[c]?CMD[c]():['Unknown command: "'+raw+'". Type "help" to see what I understand.']).forEach(out)};
ti.onkeydown=e=>{if(e.key==='ArrowUp'&&hist.length){e.preventDefault();hi=Math.max(0,hi-1);ti.value=hist[hi]}else if(e.key==='ArrowDown'){e.preventDefault();hi=Math.min(hist.length,hi+1);ti.value=hist[hi]||''}};

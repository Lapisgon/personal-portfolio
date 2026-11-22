/* 3D house: built from boxes with Three.js; camera moves with GSAP */
(function(){
const intro=$('#intro'),cv=$('#house'),cap=$('#cap');
function fail(m){cv.style.display='none';cap.textContent=m;window.houseStart=window.houseStop=()=>{};setTimeout(enterSite,900)}
if(!window.THREE||!window.gsap)return fail('3D engine unavailable. Opening the 2D portfolio…');
let R;try{R=new THREE.WebGLRenderer({canvas:cv,antialias:true});if(!R.getContext())throw 0}catch(e){return fail('WebGL unavailable. Opening the 2D portfolio…')}
R.setPixelRatio(Math.min(devicePixelRatio,2));R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
const S=new THREE.Scene();S.background=new THREE.Color(0x07070d);S.fog=new THREE.Fog(0x07070d,24,55);
const cam=new THREE.PerspectiveCamera(45,1,.1,100),T={x:0,y:.5,z:0},G=new THREE.Group();S.add(G);
function size(){const w=intro.clientWidth||innerWidth,h=intro.clientHeight||innerHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
addEventListener('resize',size);size();

const mat=(c,e,i)=>new THREE.MeshStandardMaterial({color:c,roughness:.65,metalness:.15,emissive:e||0,emissiveIntensity:i||1});
function bx(w,h,d,x,y,z,c,e,i){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c,e,i));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;G.add(m);return m}
const W=0x1c2030,F=0x2a2f45,CY=0x22d3ee,PU=0xa855f7;
// shell
bx(10.4,.3,10.4,0,-.15,0,0x12141d);
[[-2.5,-2.5,0x1a2233],[2.5,-2.5,0x1c1a33],[-2.5,2.5,0x2a2336],[2.5,2.5,0x1a2a33]].forEach(([x,z,c])=>bx(4.8,.05,4.8,x,.03,z,c));
bx(10.4,3,.2,0,1.5,-5,W);bx(.2,3,10.4,-5,1.5,0,W);
bx(.15,3,2.2,0,1.5,-3.9,W);bx(.15,3,2.2,0,1.5,3.9,W);bx(.15,3,2,0,1.5,0,W);bx(2.2,3,.15,-3.9,1.5,0,W);bx(2.2,3,.15,3.9,1.5,0,W);
bx(10.4,.06,.25,0,3.02,-5,0,CY,2);bx(.25,.06,10.4,-5,3.02,0,0,PU,2);bx(10.4,.05,.05,0,.06,5.2,0,CY,2);bx(.05,.05,10.4,5.2,.06,0,0,PU,2);
// bedroom
bx(2,.5,3,-3.4,.25,-3.2,F);bx(1.9,.25,2.9,-3.4,.62,-3.2,0x3b4266);bx(1.2,.15,.5,-3.4,.82,-4.4,0xdfe6ff);
bx(.6,.6,.6,-1.8,.3,-4.6,F);bx(.2,.3,.2,-1.8,.75,-4.6,0,PU,2);bx(.6,2.4,1.6,-4.6,1.2,-1.6,0x242a40);
// computer room
bx(2.4,.1,1,3,.8,-4.2,0x3a2f25);bx(.1,.8,.9,1.9,.4,-4.2,0x222222);bx(.1,.8,.9,4.1,.4,-4.2,0x222222);
const scr=bx(1.3,.75,.06,3,1.35,-4.55,0x111111,CY,.8);bx(.1,.35,.1,3,.98,-4.55,0x222222);bx(.8,.03,.25,3,.87,-3.9,0x222222,PU,.6);
bx(.7,.1,.7,3,.5,-3.3,0x20232f);bx(.7,.8,.1,3,.95,-2.95,0x20232f);bx(.4,.9,.8,4.4,.45,-4.3,0x15171f,CY,.3);
// living room
bx(3,.03,2.2,-3,.06,2.6,0x2b1d4f,PU,.15);bx(2.4,.5,.9,-3.2,.25,4.2,0x34395a);bx(2.4,.6,.2,-3.2,.7,4.65,0x34395a);
bx(1.6,.9,.06,-4,1.4,.15,0,PU,.5);bx(1,.3,.6,-3.2,.15,2.8,F);
// hobby area
bx(1.6,.5,.7,3.9,.25,.6,0x20232f);bx(1.4,.8,.06,3.9,1.4,.15,0,0xff4fa3,.7);bx(.9,.5,.9,2.2,.25,2.8,PU,0x7c3aed,.3);
bx(.5,2,2.4,4.6,1,3.4,F);[[1.3,CY],[1.7,PU],[.6,0xff4fa3]].forEach(([y,c],i)=>bx(.3,.3,.3,4.5,y,2.7+i*.7,0,c,1.2));
// secret room
bx(1.4,.1,1.4,7.3,.05,6.5,0x14161f);
const sec=new THREE.Mesh(new THREE.OctahedronGeometry(.45),mat(0,PU,2.2));sec.position.set(7.3,.9,6.5);G.add(sec);
// lights
S.add(new THREE.AmbientLight(0x6a7090,.55));
const d=new THREE.DirectionalLight(0xbfd4ff,.7);d.position.set(8,14,10);d.castShadow=true;d.shadow.mapSize.set(1024,1024);Object.assign(d.shadow.camera,{left:-11,right:11,top:11,bottom:-11});S.add(d);
[[3,2.5,-3,CY],[-3,2.5,-3,PU],[-3,2.5,3,0xffd9a0],[3,2.5,3,0xff4fa3],[7.3,1.5,6.5,PU]].forEach(([x,y,z,c])=>{const l=new THREE.PointLight(c,.9,9);l.position.set(x,y,z);S.add(l)});

// camera presets: [position, lookAt]
const P={over:[[13,11,13],[0,.5,0]],rot:[[-11,9,12],[0,.5,0]],appr:[[4,6,9],[0,1,0]],bedroom:[[-3,4,.8],[-2.8,.5,-3]],computer:[[3,2.6,-.5],[3,1,-4.2]],living:[[-3,4,6.8],[-3,.5,3]],hobby:[[3,4,6.8],[3,.8,3.5]],secret:[[8.5,3,10.5],[7.3,.5,6.5]]};
const INFO={bedroom:['Bedroom: About me','#about'],computer:['Computer room: Skills & terminal','#skills'],hobby:['Hobby area: Games, anime & interests','#about'],living:['Living room: Favorites','#favs'],secret:['A strange glow in the garden…','']};
function pos(n){const[p,l]=P[n],m=cam.aspect<1?1.6:1;return{p:{x:l[0]+(p[0]-l[0])*m,y:l[1]+(p[1]-l[1])*m,z:l[2]+(p[2]-l[2])*m},l:{x:l[0],y:l[1],z:l[2]}}}
function say(m,sec,glow){cap.textContent=m;if(sec){const a=document.createElement('a');a.href=sec;a.textContent='Open this section →';a.onclick=enterSite;cap.appendChild(a)}
 if(glow){const b=document.createElement('button');b.textContent='✨ Touch the glow';b.onclick=()=>discover('house');cap.appendChild(b)}}
let tl,raf=0;
function kill(){tl&&tl.kill();gsap.killTweensOf([cam.position,T,G.rotation])}
function fly(n,dur){const o=pos(n);kill();gsap.to(cam.position,{...o.p,duration:dur,ease:'power2.inOut'});gsap.to(T,{...o.l,duration:dur,ease:'power2.inOut'});gsap.to(G.rotation,{y:0,duration:dur})}
function set(n){const o=pos(n);cam.position.set(o.p.x,o.p.y,o.p.z);Object.assign(T,o.l);G.rotation.y=0}
function cinematic(){kill();set('over');tl=gsap.timeline({onComplete:()=>setTimeout(enterSite,400)});
 [['rot','Rotating around the house…'],['appr','Revealing the rooms…'],['computer','Zooming to the computer desk…']].forEach(([n,m],i)=>{const o=pos(n),t=i*3.2;
  tl.call(()=>say(m+'  (skip any time)'),null,t).to(cam.position,{...o.p,duration:3,ease:'power2.inOut'},t).to(T,{...o.l,duration:3,ease:'power2.inOut'},t)})}
$$('[data-room]').forEach(b=>b.onclick=()=>{const n=b.dataset.room;fly(n,RM?0:1.6);say(INFO[n][0],INFO[n][1],n==='secret')});
function loop(t){raf=requestAnimationFrame(loop);scr.material.emissiveIntensity=.8+Math.sin(t/300)*.15;sec.rotation.y=t/700;cam.lookAt(T.x,T.y,T.z);R.render(S,cam)}
window.houseStart=()=>{size();set('over');if(!raf)raf=requestAnimationFrame(loop);RM?say('Pick a room below, or skip to the portfolio.'):cinematic()};
window.houseStop=()=>{kill();cancelAnimationFrame(raf);raf=0};

// drag to rotate + click the glowing secret
let down=null,moved=0;const rc=new THREE.Raycaster();
cv.onpointerdown=e=>{down=e.clientX;moved=0;kill();cap.textContent='Drag to rotate · pick a room below'};
addEventListener('pointermove',e=>{if(down===null)return;const dx=e.clientX-down;down=e.clientX;moved+=Math.abs(dx);G.rotation.y+=dx*.006});
addEventListener('pointerup',e=>{if(down===null)return;down=null;if(moved>5||e.target!==cv)return;const r=cv.getBoundingClientRect();
 rc.setFromCamera({x:((e.clientX-r.left)/r.width)*2-1,y:-((e.clientY-r.top)/r.height)*2+1},cam);if(rc.intersectObject(sec).length){discover('house');gsap.fromTo(sec.scale,{x:1,y:1,z:1},{x:1.8,y:1.8,z:1.8,yoyo:true,repeat:1,duration:.3})}});
houseStart();
})();

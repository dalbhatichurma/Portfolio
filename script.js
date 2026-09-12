const projects = [
  {
    title:"SmartRollback",
    tag:"WORLD MANAGEMENT",
    desc:"Intelligent grief detection and selective rollback built around CoreProtect. Detect, analyze, inspect and safely restore suspicious activity.",
    image:"https://www.spigotmc.org/data/resource_icons/138/138444.jpg",
    spigot:"https://www.spigotmc.org/resources/smartrollback-advanced-rollback-restore-1-21.138444/",
    github:"https://github.com/dalbhatichurma/SmartRollBack..",
    tags:["Java","Spigot","CoreProtect","1.21+"]
  },
  {
    title:"BattlePass",
    tag:"GAMEPLAY SYSTEM",
    desc:"A configurable BattlePass system with daily, weekly and seasonal quests, rewards, Vault, PlaceholderAPI and database support.",
    image:"https://www.spigotmc.org/data/resource_icons/138/138432.jpg",
    spigot:"https://www.spigotmc.org/resources/battlepass.138432/",
    github:"https://github.com/dalbhatichurma/Battlepass",
    tags:["Java","Paper","Vault","MySQL"]
  },
  {
    title:"VillageBucket",
    tag:"CUSTOM MECHANIC",
    desc:"Capture exactly one villager in a bucket and transport it safely — a focused custom mechanic for Minecraft servers.",
    image:"https://www.spigotmc.org/data/resource_icons/138/138400.jpg",
    spigot:"https://www.spigotmc.org/resources/villagebucket.138400/",
    github:"https://github.com/dalbhatichurma/VillagerBucket",
    tags:["Java","Spigot","Mechanics"]
  },
  {
    title:"WelcomeMessage",
    tag:"UTILITY",
    desc:"A configurable join-message experience designed to make a player's first seconds on the server feel better.",
    image:"https://www.spigotmc.org/data/resource_icons/138/138399.jpg",
    spigot:"https://www.spigotmc.org/resources/welcomemessage.138399/",
    github:"https://github.com/dalbhatichurma/WelcomeMessage",
    tags:["Java","Spigot","YAML"]
  },
  {
    title:"UltimateCore AntiCheat",
    tag:"SECURITY",
    desc:"A lightweight anti-cheat project with configurable speed, fly, reach and autoclicker checks, alerts and thresholds.",
    image:"https://raw.githubusercontent.com/dalbhatichurma/UltimateCoreAnticheat/main/.github/assets/preview.png",
    spigot:"https://github.com/dalbhatichurma/UltimateCoreAnticheat",
    github:"https://github.com/dalbhatichurma/UltimateCoreAnticheat",
    tags:["Java","AntiCheat","Checks"]
  },
  {
    title:"KillStreakAbilities",
    tag:"GAMEPLAY",
    desc:"Custom ability-based gameplay systems designed around player kill streak progression.",
    image:"https://opengraph.githubassets.com/1/dalbhatichurma/KillStreakAbilities",
    spigot:"https://github.com/dalbhatichurma/KillStreakAbilities",
    github:"https://github.com/dalbhatichurma/KillStreakAbilities",
    tags:["Java","Abilities","PvP"]
  }
];

const grid = document.querySelector("#projectGrid");
grid.innerHTML = projects.map(p => `
  <article class="project tilt reveal">
    <div class="project-media">
      <img src="${p.image}" alt="${p.title} preview" loading="lazy" onerror="this.src='https://opengraph.githubassets.com/1/dalbhatichurma/${p.title.replaceAll(' ','')}'">
      <span class="project-tag">${p.tag}</span>
    </div>
    <div class="project-body">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      <div class="project-actions">
        <a href="${p.spigot}" target="_blank" rel="noopener">View Resource ↗</a>
        <a href="${p.github}" target="_blank" rel="noopener">GitHub ↗</a>
      </div>
    </div>
  </article>
`).join("");

const typing = document.querySelector("#typingText");
const words = ["Java Developer","Minecraft Plugin Developer","Spigot / Paper Developer","Server Systems Developer","Plugin Optimizer"];
let wi=0, ci=0, deleting=false;
function typeLoop(){
  const word=words[wi];
  typing.textContent=word.slice(0,ci);
  if(!deleting && ci<word.length){ci++;setTimeout(typeLoop,70);return}
  if(!deleting && ci===word.length){deleting=true;setTimeout(typeLoop,1300);return}
  if(deleting && ci>0){ci--;setTimeout(typeLoop,35);return}
  deleting=false;wi=(wi+1)%words.length;setTimeout(typeLoop,300);
}
typeLoop();

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.querySelectorAll("[data-count]").forEach(el=>{
  const target=Number(el.dataset.count);
  const run=()=>{
    const start=performance.now(), duration=1000;
    const tick=now=>{
      const p=Math.min((now-start)/duration,1);
      el.textContent=Math.floor(p*target);
      if(p<1)requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const o=new IntersectionObserver(es=>{if(es[0].isIntersecting){run();o.disconnect()}});
  o.observe(el);
});

document.querySelector(".menu-toggle").addEventListener("click",()=>document.querySelector(".nav").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav").classList.remove("open")));

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"},{passive:true});

document.querySelectorAll(".tilt").forEach(card=>{
  card.addEventListener("pointermove",e=>{
    if(innerWidth<900)return;
    const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${y*-4}deg) rotateY(${x*5}deg) translateY(-4px)`;
  });
  card.addEventListener("pointerleave",()=>card.style.transform="");
});

const canvas=document.querySelector("#particles"),ctx=canvas.getContext("2d");
let dots=[];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
function seed(){dots=Array.from({length:Math.min(90,Math.floor(innerWidth/16))},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.4+.2,v:Math.random()*.25+.05,a:Math.random()*.45+.1}))}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  dots.forEach(d=>{d.y-=d.v;if(d.y<0)d.y=canvas.height;ctx.globalAlpha=d.a;ctx.fillStyle="#7dffa9";ctx.fillRect(d.x,d.y,d.r,d.r)});
  requestAnimationFrame(animate);
}
resize();seed();animate();addEventListener("resize",()=>{resize();seed()});
document.querySelector("#year").textContent=new Date().getFullYear();

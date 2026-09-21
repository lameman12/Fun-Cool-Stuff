(() => {
  if (window.__FCS_loaded) return;
  window.__FCS_loaded = true;

  const style = document.createElement("style");
  style.textContent = `
  #fcs-gui{
    position:fixed;
    top:120px;
    left:120px;
    width:340px;
    background:#0f0f0f;
    color:#fff;
    border:1px solid #2a2a2a;
    border-radius:14px;
    z-index:999999;
    font-family:Arial;
    box-shadow:0 10px 25px rgba(0,0,0,0.6);
    animation:fadeIn .2s ease-out;
    user-select:none;
  }

  @keyframes fadeIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
  @keyframes fadeOut{from{opacity:1}to{opacity:0;transform:scale(.95)}}

  .fcs-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:10px;
    background:#1a1a1a;
    border-radius:14px 14px 0 0;
    cursor:move;
  }

  .fcs-title{font-weight:bold}

  .fcs-btn{
    margin-left:6px;
    background:#2b2b2b;
    color:#fff;
    border:none;
    border-radius:6px;
    padding:2px 6px;
    cursor:pointer;
  }

  .fcs-main{
    padding:16px;
    display:flex;
    flex-direction:column;
    gap:12px;
  }

  .fcs-status{font-size:12px;color:#aaa}

  .fcs-box{
    display:flex;
    flex-direction:column;
    gap:10px;
  }

  .fcs-scriptbtn{
    width:100%;
    padding:10px;
    background:#1b1b1b;
    color:#fff;
    border:1px solid #333;
    border-radius:10px;
    cursor:pointer;
  }

  .fcs-open{
    width:100%;
    background:#2a2a2a;
    color:#fff;
    border:none;
    border-radius:8px;
    padding:10px;
    cursor:pointer;
  }

  .fcs-guidebtn{
    width:100%;
    background:#1c1c1c;
    color:#fff;
    border:1px solid #333;
    border-radius:8px;
    padding:10px;
    cursor:pointer;
  }

  .fcs-guide{
    display:none;
    font-size:12px;
    color:#bbb;
    line-height:1.5;
    padding:10px;
    background:#141414;
    border:1px solid #2a2a2a;
    border-radius:10px;
  }

  .fcs-red{
    color:red;
    font-weight:bold;
    font-size:11px;
    text-align:center;
    margin-top:4px;
  }
  `;
  document.head.appendChild(style);

  const scripts = [
    {name:"Ed-Shed Cheats",url:"https://raw.githubusercontent.com/lameman12/Fun-Cool-Stuff/refs/heads/main/spellingshed"},
    {name:"Robux Spoofer",url:"https://raw.githubusercontent.com/lameman12/Fun-Cool-Stuff/refs/heads/main/robuxspoofer"},
    {name:"Html Page Downloader",url:"https://raw.githubusercontent.com/lameman12/Fun-Cool-Stuff/refs/heads/main/pagedownloader"},
    {name:"Language Nut Completer",url:"https://raw.githubusercontent.com/lameman12/Fun-Cool-Stuff/refs/heads/main/languagenutcheat"},
    {name:"Roblox Profile Troll",url:"https://raw.githubusercontent.com/lameman12/Fun-Cool-Stuff/refs/heads/main/stupidprofileshowerthingy"}
  ];

  const gui=document.createElement("div");
  gui.id="fcs-gui";

  const header=document.createElement("div");
  header.className="fcs-header";

  const title=document.createElement("div");
  title.className="fcs-title";
  title.textContent="Client-Side Cheat Tool";

  const controls=document.createElement("div");

  const minBtn=document.createElement("button");
  const closeBtn=document.createElement("button");
  minBtn.className="fcs-btn";
  closeBtn.className="fcs-btn";
  minBtn.textContent="—";
  closeBtn.textContent="✕";

  controls.appendChild(minBtn);
  controls.appendChild(closeBtn);
  header.appendChild(title);
  header.appendChild(controls);

  const main=document.createElement("div");
  main.className="fcs-main";

  const status=document.createElement("div");
  status.className="fcs-status";
  status.textContent="Select a script";

  const box=document.createElement("div");
  box.className="fcs-box";

  const openBtn=document.createElement("button");
  openBtn.className="fcs-open";
  openBtn.textContent="Open Script";

  const guideBtn=document.createElement("button");
  guideBtn.className="fcs-guidebtn";
  guideBtn.textContent="DevTools Guide";

  const guide=document.createElement("div");
  guide.className="fcs-guide";
  guide.innerHTML=
  "<b>IMPORTANT:</b><br>"+
  "1. Select the script you want<br>"+
  "2. Open the script you selected<br>"+
  "3. Copy all (Ctrl+A Ctrl+C)<br>"+
  "4. Go back to page you want to inject the script into<br>"+
  "5. Open DevTools (Ctrl + Shift + I or F12)<br>"+
  "6. Paste in console<br><br>"+
  "<b>If blocked:</b> type 'allow pasting'";

  let guideOpen=false;
  guideBtn.onclick=()=>{
    guideOpen=!guideOpen;
    guide.style.display=guideOpen?"block":"none";
  };

  box.appendChild(openBtn);
  box.appendChild(guideBtn);
  box.appendChild(guide);

  main.appendChild(status);
  main.appendChild(box);

  const disclaimer=document.createElement("div");
  disclaimer.className="fcs-red";
  disclaimer.textContent="Client-Side Only";

  main.appendChild(disclaimer);

  gui.appendChild(header);
  gui.appendChild(main);
  document.body.appendChild(gui);

  let selected=null;

  scripts.forEach(s=>{
    const b=document.createElement("button");
    b.className="fcs-scriptbtn";
    b.textContent=s.name;

    b.onclick=()=>{
      if(selected===s){
        selected=null;
        status.textContent="Selection cleared";
        openBtn.onclick=null;
        return;
      }

      selected=s;
      status.textContent="Selected: "+s.name;
      openBtn.onclick=()=>window.open(s.url,"_blank");
    };

    box.appendChild(b);
  });

  let minimized=false;

  minBtn.onclick=()=>{
    minimized=!minimized;
    main.style.display=minimized?"none":"flex";
  };

  closeBtn.onclick=()=>{
    gui.style.animation="fadeOut .2s forwards";
    setTimeout(()=>gui.remove(),200);
    window.__FCS_loaded=false;
  };

  let drag=false,ox=0,oy=0;

  header.onmousedown=e=>{
    drag=true;
    ox=e.clientX-gui.offsetLeft;
    oy=e.clientY-gui.offsetTop;
  };

  document.onmousemove=e=>{
    if(drag){
      gui.style.left=e.clientX-ox+"px";
      gui.style.top=e.clientY-oy+"px";
    }
  };

  document.onmouseup=()=>drag=false;
})();

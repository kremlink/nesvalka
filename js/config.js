export let config={
 metrika:{name:1},
 ls:{
  name:'la-vid3',
  url:'php.php?data='
 },
 'index':{
  preload:{
   'shared':{
    'images/':{imgs:['achiv-bg.svg']},
    'images/info-pop/':{imgs:['Leshiy.jpg','Sashka.jpg','Bob.jpg','Kartoshka.jpg','Lisa.jpg','Max.jpg','Artyom.jpg','Andrey.jpg','Irina.jpg','Valya.jpg']}
   },
   '1':{
    'images/learn/':{
     imgs:['study-arrow.svg','study-save.png'],
     j:[4],
     tmpl:['study-bg[j].jpg']
    }
   },
   '2':{

   },
   '3':{

   },
   '4':{

   }
  }
 },
 sound:{
  //template:'<audio src="../sounds/<%= src %>.mp3" preload="auto" <%= loop?"loop":"" %>></audio>'
  template:'<audio src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/season2/base-mp3/<%= src %>.mp3" preload="auto" <%= loop?"loop":"" %>></audio>'//TODO:this
 },
 redirect:{
  '1':'end1.php',
  '2':'end2.php',
  '3':'end3.php',
  '4':'end4.php'
 },
 'player':{
  quality:[
   {
    width:'(min-width:1600px)',
    label:'1080P'
   },
   {
    width:'(min-width:1280px) and (max-width:1599px)',
    label:'720P'
   },
   {
    width:'(max-width:1279px)',
    label:'480P'
   }
  ],
  srcData:{
   spec:['1080p','720p','480p'],
   tmpl:'../<%= src %>.mp4'
   //tmpl:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/season2/episode<%= src %>/mp4/ng2_master_<%= src %>ser<%= spec %>.mp4'//TODO:this
  },
  data:{
   '1':{
    //src:'1',
    src:'oceans',
    neededDur:'1865',
    timecodes:[
     //{start:1,back:.9,invoked:false,checkpoint:true,data:{interactive:'checkpoint1',achievement:'Ачивка1 прокнула с чекпоинта'}},
     /*{start:1,back:1,invoked:false,data:{interactive:'Learn'}},
     {start:2,end:2,back:2,invoked:false,data:{interactive:'Fork',alt:2,bg:'trevoga',real:'1-23'}},
     {start:3,end:3,back:3,invoked:false,data:{interactive:'Packing',bg:'trevoga'}},
     {start:4,end:4,back:4,invoked:false,data:{interactive:'Team',bg:'action'}}*/
     /*{start:1043.44,end:1044.44,noBg:true,back:1043,invoked:false,data:{interactive:'Fork',alt:1095.88,bg:'trevoga',real:'1-23'}},
     {start:1412.6,end:1413.6,back:1412,invoked:false,data:{interactive:'Packing',bg:'trevoga'}},
     {start:1645.92,end:1646.92,back:1645.5,invoked:false,data:{interactive:'Team',bg:'action'}}*/
    ]
   },//[noAutoClose:true|repeatable:true|delayedPause:-1|noVidAutoPlay:true|]checkpoint:true|iniTimer:true
   '2':{
    //src:'2',
    src:'oceans',
    neededDur:'2335',
    timecodes:[
     {start:1,end:1,back:1,invoked:false,data:{interactive:'Ring',bg:'trevoga'}},
     {start:2,end:2,back:2,invoked:false,data:{interactive:'Qs',bg:'trevoga',real:'2-25'}},
     {start:3,end:3,back:3,invoked:false,data:{interactive:'Labyrinth',bg:'trevoga'}},
     {start:4,end:4,back:4,invoked:false,data:{interactive:'Fix',bg:'huliganskaya'}}
     /*{start:461.52,end:462.52,back:461,invoked:false,data:{interactive:'Ring',bg:'trevoga'}},
     {start:1185.4,end:1186.4,back:1185,invoked:false,data:{interactive:'Qs',bg:'trevoga',real:'2-25'}},
     {start:1356.52,end:1357.52,back:1356,invoked:false,data:{interactive:'Labyrinth',bg:'trevoga'}},
     {start:1770.96,end:1771.96,back:1770.5,invoked:false,data:{interactive:'Fix',bg:'huliganskaya'}}*/
    ]
   },
   '3':{
    //src:'3',
    src:'oceans',
    neededDur:'1805',
    timecodes:[
     {start:1,end:1,back:1,invoked:false,data:{interactive:'Loop',bg:'action'}},
     {start:2,end:2,back:2,invoked:false,data:{interactive:'Browser',bg:'action'}},
     {start:3,end:3,back:3,invoked:false,data:{interactive:'Qs1',bg:'liric'}}
     /*{start:800.32,end:801.32,back:800,invoked:false,data:{interactive:'Loop',bg:'action'}},
     {start:802.76,end:803.76,back:802.2,invoked:false,data:{interactive:'Browser',bg:'action'}},
     {start:1334.88,end:1335.88,back:1334.4,invoked:false,data:{interactive:'Qs1',bg:'liric'}}*/
    ]
   },
   '4':{
    //src:'4',
    src:'oceans',
    neededDur:'2059',
    timecodes:[
     {start:1,end:1,back:1,invoked:false,data:{interactive:'Qs',bg:'trevoga',real:'4-31',item:{h:'Пешие поисковики осмотрели реку.<br />к счастью, тело не найдено.<br /><br />Продолжай поиски.',text:''}}},
     {start:2,end:2,back:2,invoked:false,data:{interactive:'Fork',alt:2,diff:true,real:'4-6',bg:'huliganskaya'}},
     {start:3,end:3,back:3,invoked:false,data:{interactive:'Tablets',bg:'trevoga'}}
     /*{start:335.6,end:336.6,back:335.1,invoked:false,data:{interactive:'Tablets',bg:'trevoga'}},
     {start:393.2,end:394.2,back:392.7,invoked:false,data:{interactive:'Fork',alt:404.12,diff:true,real:'4-6',bg:'huliganskaya'}},
     {start:1617.28,end:1618.28,back:1616.9,invoked:false,data:{interactive:'Qs',bg:'trevoga',real:'4-31',item:{h:'Пешие поисковики осмотрели реку.<br />к счастью, тело не найдено.<br /><br />Продолжай поиски.',text:''}}}*/
    ]
   }
  }
 }
};
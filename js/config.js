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
    'images/info-pop/':{imgs:['btn.svg','btn-h.svg','icon-save.svg']}
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
  template:'<audio src="../sounds/<%= src %>.mp3" preload="auto" <%= loop?"loop":"" %>></audio>'
  //template:'<audio src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/season2/base-mp3/<%= src %>.mp3" preload="auto" <%= loop?"loop":"" %>></audio>'//TODO:this
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
    title:'#НЕСВАЛКА - 1 серия',
    timecodes:[
     {start:1,back:.9,invoked:false,checkpoint:true,data:{interactive:'achievement11'}},
     {start:2,back:1.9,invoked:false,checkpoint:true,data:{interactive:'article1'}}
    ]
   },//[noAutoClose:true|repeatable:true|delayedPause:-1|noVidAutoPlay:true|]checkpoint:true|iniTimer:true
   '2':{
    //src:'2',
    src:'oceans',
    neededDur:'2335',
    title:'#НЕСВАЛКА - 2 серия',
    timecodes:[

    ]
   },
   '3':{
    //src:'3',
    src:'oceans',
    neededDur:'1805',
    title:'#НЕСВАЛКА - 3 серия',
    timecodes:[

    ]
   },
   '4':{
    //src:'4',
    src:'oceans',
    neededDur:'2059',
    title:'#НЕСВАЛКА - 4 серия',
    timecodes:[

    ]
   }
  }
 }
};
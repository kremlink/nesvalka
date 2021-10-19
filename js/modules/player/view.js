import {data as dat} from './data.js';

let app,
    data=dat,
    epIndex,
    events={},
    lsMgr;

events[`click ${data.events.toInt}`]='toInt';
events[`click ${data.events.backward}`]='backwardClick';
events[`click ${data.events.forward}`]='forwardClick';

let sToMS=(rem)=>{
 let ss=Math.floor(rem)%60;

 return (rem>.25?'-':'')+Math.floor(rem/60)+':'+(ss<10?'0':'')+ss;
};

export let PlayerView=Backbone.View.extend({
 events:events,
 el:data.view.el,
 stepsTemplate:null,
 pData:null,
 qual:null,
 pausable:{noInteractive:true,noInfoPop:true},
 firstTime:true,
 goOn:false,
 initialize:function(opts){
  app=opts.app;
  data=app.configure({player:dat}).player;

  epIndex=app.get('epIndex');
  lsMgr=opts.lsMgr;

  this.$steps=$(data.view.steps.item).on('click',data.view.steps.step,(e)=>this.toInt.call(this,e));//TODO:maybe separate module for steps?

  this.stepsTemplate=$(data.view.steps.tmpl).length?_.template($(data.view.steps.tmpl).html()):()=>{};
  this.pData=$.extend(true,{},data.data[epIndex]);
  this.qual=[...data.quality];
  this.player=videojs(this.el,{
   controlBar:{
    children:{
     playToggle:{},
     volumePanel:{inline:false},
     progressControl:{},
     currentTimeDisplay:{},
     timeDivider:{},
     durationDisplay:{},
     remainingTimeDisplay:{}
    }
   },
   plugins:{

   }
  },()=>{
   this.prepare();
  });
  this.listenTo(app.get('aggregator'),'main:toggle',(f)=>this.setPausable('noInteractive',f));
  this.listenTo(app.get('aggregator'),'info:toggle',(f)=>this.setPausable('noInfoPop',!f));
  this.listenTo(app.get('aggregator'),'page:state',this.freeze);
  this.listenTo(app.get('aggregator'),'achieve:hide',()=>{if(this.pausable.noInteractive&&this.pausable.noInfoPop&&this.player.paused())this.player.play();});
  this.listenTo(app.get('aggregator'),'player:pause',()=>{this.player.pause();});
 },
 freeze:function(){
  if(document.visibilityState==='hidden')
   this.pause();
 },
 setPausable:function(what,f){
  this.pausable[what]=f;
 },
 changeSrc:function(src){
  let ind=this.qual.findIndex((o)=>matchMedia(o.width).matches);

  for(let i=0;i<this.qual.length;i++)
  {
   this.qual[i].src=_.template(data.srcData.tmpl)({spec:data.srcData.spec[i],src:src});
   if(i===ind)
    this.qual[i].selected=true;
  }

  this.player.src(this.qual);
 },
 getData:function(){
  return this.pData;
 },
 setStepsChoose:function(ind){
  let choose=(()=>{
   let arr=[];

   if(~ind)
    for (let i=0;i<this.pData.timecodes.length;i++)
     arr[i]=ind>=i;

   return arr;
  })();

  this.$steps.html(choose.length?this.stepsTemplate({choose:choose}):'');
 },
 setGoOn:function(){
  this.goOn=true;
  //app.get('aggregator').trigger('player:goOn');
 },
 toInt:function(e){
  let index=$(e.currentTarget).index();

  app.get('aggregator').trigger('sound','btn');
  this.pData.timecodes.forEach((o,i)=>{
   if(index<=i)
    o.invoked=false;
  });
  app.get('aggregator').trigger('player:back');
  this.setPausable('noInteractive',true);

  this.setStepsChoose(index-1);

  this.play({time:this.pData.timecodes[index].back});
 },
 backwardClick:function(){
  let curr=this.player.currentTime(),
   futur=curr-data.view.go[0]>0?curr-data.view.go[0]:0,
   f=false,
   index=-1;

  if(!this.player.seeking())
  {
   app.get('aggregator').trigger('sound','btn');
   if(this.pData.timecodes[0].start<=curr)
   {
    this.pData.timecodes.forEach((o,i)=>{
     if(o.start<futur)
     {
      if(!f)
      {
       f=true;
       index=i;
      }
     }else
     {
      o.invoked=false;
     }
    });
   }

   this.setStepsChoose(index);

   this.play({time:futur});
  }
 },
 forwardClick:function(){
  let curr=this.player.currentTime(),
   dur=this.player.duration(),
   futur=curr+data.view.go[1]<dur?curr+data.view.go[1]:dur,
   index=-1;

  if(!this.player.seeking())
  {
   app.get('aggregator').trigger('sound','btn');
   this.pData.timecodes.forEach((o,i)=>{
    if(o.start>curr&&o.start<futur)
    {
     index=i;
    }
   });

   this.play({time:~index?this.pData.timecodes[index].start:futur});
  }
 },
 prepare:function(){
  let touched={};

  this.setElement(data.view.el);
  this.changeSrc(this.pData.src);

  this.player.controlBar.addChild('QualitySelector');
  this.player.controlBar.addChild('Button').el().classList.add('b-b');
  this.player.controlBar.addChild('Button').el().classList.add('f-b');
  this.player.controlBar.addChild('Button').el().classList.add('rem');

  this.$rem=this.$(data.view.rem);

  if(app.get('_dev-player'))
   this.player.muted(true);

  this.player.on('play',()=>{
   if(!app.get('_dev-player')&&!document.fullscreenElement&&document.documentElement.requestFullscreen)
    document.documentElement.requestFullscreen();
   if(!this.pausable.noInteractive&&!this.pausable.noInfoPop)
    this.pause();
  });

  this.player.on('touchstart',e=>{
   touched.x=e.touches[0].pageX;
   touched.y=e.touches[0].pageY;
  });
  this.player.on('touchend',e=>{
   if(Math.sqrt((touched.x-e.changedTouches[0].pageX)*(touched.x-e.changedTouches[0].pageX)+
       (touched.y-e.changedTouches[0].pageY)*(touched.y-e.changedTouches[0].pageY))<data.touchPlayRadius)
   {
    if(e.target.nodeName==='VIDEO')
     this.playPauseByCtrls();
   }
  });

  this.player.on('timeupdate',()=>{
   let curr=this.player.currentTime(),
       rem=this.player.remainingTime(),
       dur=this.player.duration();

   app.get('aggregator').trigger('player:timeupdate',curr);
   this.pData.timecodes.forEach((o,i)=>{
    if((o.start<0?curr>dur+o.start:curr>o.start)&&!o.invoked)
    {
     app.get('aggregator').trigger('player:interactive',{data:o,index:i});
     o.invoked=true;
     this.setStepsChoose(i);
    }
   });

   this.$rem.text(data.data[epIndex].neededDur?sToMS(data.data[epIndex].neededDur-(dur-rem)*data.data[epIndex].neededDur/dur):sToMS(rem));
  });

  this.player.on('ended',()=>{
   app.get('aggregator').trigger('player:ended',{cb:()=>location.href=data.redirect[epIndex]});
  });

  this.player.on('loadedmetadata',()=>{
   if(this.firstTime)
    app.get('aggregator').trigger('player:ready');
   this.firstTime=false;
  });

  this.player.on('qualitySelected',(e,n)=>{
   app.set({dest:'objects.playerQ',object:n.label,lib:false,notify:false});
  });

  $(document).on('keypress',(e)=>{
   if(this.player.controlBar.playToggle.el()!==document.activeElement&&e.which===32&&this.pausable.noInteractive&&this.pausable.noInfoPop)
    this.playPauseByCtrls();
  });
 },
 playPauseByCtrls:function(){
  if(this.player.paused())
   this.play();else
   this.pause();
 },
 play:function({time=-1,interactive=-1}={}){
  let goOnInd=-1;

  if(~time)
  {
   this.player.currentTime(time);
   this.pData.timecodes.forEach((o,i)=>{
    if(this.goOn)
    {
     if(~interactive)
      time=this.pData.timecodes[interactive].start;
     this.player.currentTime(time);

     if(time>o.start)
     {
      o.invoked=true;
      goOnInd=i;
     }
    }else
    {
     if(time<o.start&&o.repeatable)
      o.invoked=false;
    }
   });

   if(this.goOn&&~goOnInd)
    this.setStepsChoose(goOnInd);
  }
  if(this.player.paused())
  {
   app.get('aggregator').trigger('player:play');
   this.player.play();
  }
 },
 pause:function(){
  if(!this.player.seeking())
   this.player.pause();
 }
});
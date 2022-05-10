import {data as dat} from './data.js';

let app,
 data=dat,
 epIndex;

const Interval=function(){
 this.step=-1;
 this.index=-1;
 this.ts=0;
 this.end=false;
}

Interval.prototype.go=function(fn,time){
 setTimeout(()=>fn(),time);
 this.step++;
}


let events={};
events[`click ${data.events.caller}`]='toggle';
events[`click ${data.events.choose}`]='choose';
events[`click ${data.events.ctrl}`]='ctrl';
events[`click ${data.events.again}`]='again';

export let Game=Backbone.View.extend({
 events:events,
 el:data.view.el,
 template:null,
 step:0,
 score:0,
 garbage:{$items:null,length:null},
 timer:null,
 current:null,
 failed:0,
 max:3,
 ints:[],
 chIndex:-1,
 //trying:-1,
 initialize:function(opts){
  app=opts.app;

  //this.template=_.template($(opts.template).html());
  this.$block=this.$(data.view.block);
  this.$ctrl=this.$(data.events.ctrl);
  this.$score=this.$(data.view.score);
  this.$topScore=this.$(data.view.topScore);
  this.$lives=this.$(data.view.lives);
  this.garbage.$items=this.$(data.view.garbage);
  data.view.typeCls.forEach((o)=>this.garbage[o]=this.garbage.$items.filter('.'+o));
  this.garbage.length=this.garbage[data.view.typeCls[0]].length;
  //this.listenTo(app.get('aggregator'),'achieve:show',this.achieve);
  
  $(document).on('keydown',(e)=>{
   if(this.shown)
   {
    switch(e.which)
    {
     case 65:
      this.ctrl(0);
      break;
     case 75:
      this.ctrl(1);
      break;
     case 77:
      this.ctrl(2);
      break;
     case 90:
      this.ctrl(3);
      break;
     /*case 32:
      if(this.timer)
      {
       clearTimeout(this.timer);
       this.timer=null;
      }else
      {
       this.start();
      }
      console.log(this.ints);*/
    }
   }
  }).on('keyup',()=>{
   if(this.shown)
    this.$ctrl.eq(this.current).removeClass(data.view.activeCls);
  });

  this.listenTo(app.get('aggregator'),'info:populate',this.setTopScore);
 },
 setTopScore:function(r){
  this.$topScore.text(r.topScore);
 },
 can:function(){
  let d=0;

  if(this.score>=10)
   d=!Math.floor(Math.random()*3);
  if(this.score>=100)
   d=!Math.floor(Math.random()*2);
  if(this.score>=140)
   d=0;
  if(this.score>=200)
   d=!Math.floor(Math.random());

  return !this.ints.length||d;
 },
 duration:function(){
  let d=data.interval/(this.score/10+1);

  if(this.score>=10)
   d=data.interval;
  if(this.score>=30)
   d=data.interval/((this.score-30)/40+1);
  if(this.score>=70)
   d=data.interval/((this.score+30)/100+1);
  if(this.score>=140)
   d=data.interval/((this.score-140)/5+1);
  if(this.score>=200)
   d=data.interval/((this.score-200)/100+1);

  return d;
 },
 cycle:function(int){
  if(int.step)
   this.garbage[data.view.typeCls[int.index]].eq(int.step-1).removeClass(data.view.shownCls);
  if(int.step<this.garbage.length)
   this.garbage[data.view.typeCls[int.index]].eq(int.step).addClass(data.view.shownCls);

  int.step++;

  if(int.step===this.garbage.length+1)
  {
   if(this.current===int.index)
   {
    this.score++;
    this.$score.text(this.score);
    app.get('aggregator').trigger('sound','catch');
   }else
   {
    app.get('aggregator').trigger('sound','drop');
    this.failed++;
    this.$lives.eq(this.max-this.failed).addClass(data.view.shownCls);
    if(this.failed===this.max)
    {
     this.next(2);
     app.get('aggregator').trigger('unsound','game-bg');
     this.$el.removeClass(data.view.gameCls);
     app.get('aggregator').trigger('ls:save',{interactive:'0-3',value:this.score});
    }
   }
   this.ints=this.ints.filter((o)=>o!==int);
   int=null;
  }else
  {
   app.get('aggregator').trigger('sound','roll'+(int.index+1));
  }
 },
 start:function(){
  let index=Math.floor(Math.random()*4),
      int;

  this.ints.forEach((o)=>{
   this.cycle(o);
  });

  if(this.failed!==this.max)
  {
   this.timer=setTimeout(()=>{
    if(this.can())
    {
     int={step:0,index:index};
     this.ints.push(int);
    }

    clearTimeout(this.timer);
    this.start();
   },this.duration());
  }
 },
 /*cycle:function(int,res){
  if(int.step)
   this.garbage[data.view.typeCls[int.index]].eq(int.step-1).removeClass(data.view.shownCls);
  if(int.step<this.garbage.length)
   this.garbage[data.view.typeCls[int.index]].eq(int.step).addClass(data.view.shownCls);

  if(int.step===this.garbage.length)
  {
   if(this.current===int.index)
   {
    this.score++;
    this.$score.text(this.score);
   }else
   {
    this.failed++;
    this.$lives.eq(this.max-this.failed).addClass(data.view.shownCls);
    if(this.failed===this.max)
     console.log('gameover');
   }
   int=null;
   this.ints.shift();
   this.start();
  }else
  {
   this.start();
  }

  res();
 },
 start:function(){
  let index=Math.floor(Math.random()*4),
      int,
      arr=[],
      last=this.ints.length?this.ints[this.ints.length-1]:null;

  if(this.can(index))
  {
   int=new Interval();
   int.index=index;
   int.ts=performance.now();

   if(!this.ints.length||((int.ts-last.ts>=this.duration()*1.5)&&last.index===int.index||(int.ts-last.ts>=this.duration())&&last.index!==int.index))
   {
    this.ints.push(int);

    for(let i=0;i<this.garbage.length+1;i++)
     arr.push(0);
    arr.reduce((prev,cur)=>{
     return prev.then(()=>{
      return new Promise((res,rej)=>int.go(()=>this.cycle(int,res),this.duration()));
     })
    },Promise.resolve());
   }else
   {
    int=null;
    if(!~this.trying&&this.score>50)
     this.addGarbage();
   }
  }
 },
 addGarbage:function(){
  this.trying=setTimeout(()=>{
   this.start();
   this.trying=-1;
  },this.duration());
 },*/
 ctrl:function(e){
  let isNum=typeof e==='number',
   targ=isNum?null:$(e.currentTarget);

  app.get('aggregator').trigger('sound','game-btn');
  this.current=isNum?e:data.view.typeCls.reduce((arr,o,i)=>(targ.hasClass(o)&&arr.push(i),arr),[])[0];

  /*//check in cycle if this.currentPack.includes(int.index)
  if(this.currentPack===this.$ctrl.length)
  {
   this.currentPack.shift();
   clearTimeout(this.packTimers[0]);
   this.packTimers.shift();
  }
  this.currentPack.push(this.current);
  this.packTimers.push(setTimeout(()=>{
   if(this.currentPack<2)
    this.currentPack.shift();
   this.packTimers.shift();
  },this.duraton()/5));*/

  this.$ctrl.removeClass(data.view.shownCls);
  this.$ctrl.eq(this.current).addClass(data.view.shownCls);
  if(!targ)
   this.$ctrl.eq(this.current).addClass(data.view.activeCls);
 },
 again:function(){
  this.next(1);
  this.$el.addClass(data.view.gameCls);
 },
 clr:function(){
  clearTimeout(this.timer);
  this.ints=[];
  this.failed=0;
  this.score=0;
  this.$lives.removeClass(data.view.shownCls);
  this.$score.text(0);
  this.$ctrl.removeClass(data.view.shownCls);
  data.view.typeCls.forEach((o)=>{
   this.garbage[o].removeClass(data.view.shownCls);
  });
 },
 next:function(ind){
  if(ind===1)
  {
   this.clr();//this.score=350;
   this.start();
   app.get('aggregator').trigger('sound','game-bg',data.volume);
  }
  this.step=ind;
  this.$block.removeClass(data.view.shownCls).eq(ind).addClass(data.view.shownCls);
 },
 toggle:function(){
  this.$el.toggleClass(data.view.shownCls,this.shown=!this.shown);
  app.get('aggregator').trigger('sound',this.shown?'open':'close');
  if(this.shown)
  {
   this.next(0);
   app.get('aggregator').trigger('player:pause');
  }else
  {
   this.clr();
   app.get('aggregator').trigger('unsound','game-bg');
   this.$el.removeClass(data.view.charCls[0]+' '+data.view.charCls[1]+' '+data.view.charCls[2]+' '+data.view.gameCls);
  }

  app.get('aggregator').trigger('game:toggle',this.shown);
 },
 choose:function(e){
  this.chIndex=$(e.currentTarget).index();
  app.get('aggregator').trigger('sound','start-click');
  this.$el.addClass(data.view.charCls[this.chIndex]+' '+data.view.gameCls);
  this.next(1);
 }
});
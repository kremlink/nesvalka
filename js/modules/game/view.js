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
 started:false,
 garbage:{$items:null,length:null},
 timer:null,
 current:null,
 failed:0,
 max:3,
 ints:[],
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
  
  $(document).on('keydown',(e)=>{//65,75,77,90
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
  });
 },
 can:function(){//don't generate simultaneously; don't generate more than 2 active on one side
  let d=0;

  if(this.score>=10)
   d=!Math.floor(Math.random()*4);

  if(this.score>=70)
   d=!Math.floor(Math.random()*2);

  if(this.score>=95)
   d=0;

  if(this.score>=160)
   d=!Math.floor(Math.random());

  return !this.ints.length||d;
 },
 duration:function(){
  let d=data.interval/(this.score/10+1);

  if(this.score>=10)
   d=data.interval;

  if(this.score>=30)
   d=data.interval/((this.score-30)/40+1);

  if(this.score>=50)
   d=data.interval/(this.score/200+1);

  if(this.score>=70)
   d=data.interval;

  if(this.score>=100)
   d=data.interval/((this.score-100)/5+1);

  if(this.score>=160)
   d=data.interval/((this.score-160)/60+1);

  if(this.score>=210)
   d=data.interval;

  if(this.score>=250)
   d=data.interval/((this.score-250)/100+1);

  return d;
 },
 cycle:function(int){
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
   this.ints=this.ints.filter((o)=>o!==int);
  }

  int.step++;
 },
 start:function(){
  let index=Math.floor(Math.random()*4),
      int;

  this.ints.forEach((o)=>{
   this.cycle(o);
  });

  this.timer=setTimeout(()=>{
   if(this.can())
   {
    int={step:0,index:index};
    this.ints.push(int);
   }

   clearTimeout(this.timer);
   this.start();
  },this.duration());
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

  this.current=isNum?e:data.view.typeCls.reduce((arr,o,i)=>(targ.hasClass(o)&&arr.push(i),arr),[])[0];
  this.$ctrl.removeClass(data.view.shownCls);
  this.$ctrl.eq(this.current).addClass(data.view.shownCls);
  if(!this.started)
  {
   this.started=true;
   this.start();
  }
  //this.next(2);
 },
 again:function(){
  this.clr();
  //TODO: reconstruct game
 },
 clr:function(){
  this.failed=0;
  this.$lives.removeClass(data.view.shownCls);
  this.next(0);
  this.$score.text(0);
  this.$ctrl.removeClass(data.view.shownCls);
  this.$el.removeClass(data.view.otherCls+' '+data.view.gameCls);
 },
 next:function(ind){
  this.step=ind;
  this.$block.removeClass(data.view.shownCls).eq(ind).addClass(data.view.shownCls);
 },
 toggle:function(){
  this.$el.toggleClass(data.view.shownCls,this.shown=!this.shown);
  this.clr();
  app.get('aggregator').trigger('sound','btn');
  if(this.shown)
   app.get('aggregator').trigger('player:pause');
  app.get('aggregator').trigger('game:toggle',this.shown);
 },
 choose:function(e){
  if($(e.currentTarget).index()===1)
   this.$el.addClass(data.view.otherCls);
  this.$el.addClass(data.view.gameCls);
  this.next(1);
  //app.get('aggregator').trigger('ls:save',{interactive:this.opts.data.data.real,value:curr.index()});
 }
});
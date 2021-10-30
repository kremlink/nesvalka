import {data as dat} from './data.js';

let app,
 data=dat,
 epIndex;

const Interval=function(fn,interval){
 this.step=0;
 this.index=-1;
 //fn(this);
 this.id=setInterval(()=>fn(this),interval);

 this.clr=function(){
  clearInterval(this.id);
 }
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
 timer:[],
 current:null,
 failed:0,
 ints:[],
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

  this.score=69;
 },
 can:function(){//don't generate simultaneously; don't generate more than 2 active on one side
  let d=0,
      little;

  if(this.score>10)
   d=!Math.floor(Math.random()*3);

  if(this.score>30)
   d=!Math.floor(Math.random()*20/Math.sqrt(this.score));

  if(this.score>50)
   d=!Math.floor(Math.random()*3);

  if(this.score>70)
   d=!Math.floor(Math.random()*2);

  if(this.score>200)
   d=!Math.floor(Math.random()*45/Math.sqrt(this.score));

  little=true;

  return (!this.ints.length||d)&&little;

  //return !Math.floor(Math.random()*5)||!this.ints.length;
 },
 duration:function(){
  let d=data.interval/(this.score/10+1);

  if(this.score>10)
   d=data.interval;

  if(this.score>30)
   d=data.interval/((this.score-30)/30+1);

  if(this.score>50)
   d=data.interval/(this.score/200+1);

  if(this.score>70)
   d=data.interval;

  if(this.score>200)
   d=data.interval/((this.score-200)/200+1);

  return d;
 },
 start:function(){
  if(this.starter)
  {
   this.starter();
  }else
  {
   this.starter=_.throttle(()=>{
    let index=Math.floor(Math.random()*4);

    if(this.can())
    {
     this.ints.push(new Interval((int)=>{
      if(int.step)
       this.garbage[data.view.typeCls[index]].eq(int.step-1).removeClass(data.view.shownCls);
      this.garbage[data.view.typeCls[index]].eq(int.step).addClass(data.view.shownCls);
      int.step++;
      if(int.step===this.garbage.length+1)
      {
       if(this.current===index)
       {
        this.score++;
        this.$score.text(this.score);
       }
       this.garbage[data.view.typeCls[index]].eq(int.step).removeClass(data.view.shownCls);
       int.clr();
       this.ints.shift();
       this.start();
      }else
      {
       this.start();
      }
     },this.duration()));

     this.ints[this.ints.length-1].index=index;
    }
   },100,{leading:true,trailing:false});
   this.starter();
  }
 },
 /*start:function(){
  let index=Math.floor(Math.random()*4);

  if(this.can(index))
  {
   this.ints.push(new Interval((int)=>{
    if(int.step)
     this.garbage[data.view.typeCls[index]].eq(int.step-1).removeClass(data.view.shownCls);
    this.garbage[data.view.typeCls[index]].eq(int.step).addClass(data.view.shownCls);
    int.step++;
    if(int.step===this.garbage.length+1)
    {
     if(this.current===index)
     {
      this.score++;
      this.$score.text(this.score);
     }
     this.garbage[data.view.typeCls[index]].eq(int.step).removeClass(data.view.shownCls);
     int.clr();
     this.ints.shift();
     this.start();
    }else
    {
     this.start();
    }
   },this.duration()));

   this.ints[this.ints.length-1].index=index;
  }
 },*/
 /*start1:function(){
  setInterval(()=>{
   let index=Math.floor(Math.random()*4);

   if(this.can())
   {
    this.ints.push(new Interval((int)=>{
     if(int.step)
      this.garbage[data.view.typeCls[index]].eq(int.step-1).removeClass(data.view.shownCls);
     this.garbage[data.view.typeCls[index]].eq(int.step).addClass(data.view.shownCls);
     int.step++;
     if(int.step===this.garbage.length+1)
     {
      if(this.current===index)
      {
       this.score++;
       this.$score.text(this.score);
      }
      this.garbage[data.view.typeCls[index]].eq(int.step).removeClass(data.view.shownCls);
      int.clr();
      this.ints.shift();
     }
    },this.duration()));

    this.ints[this.ints.length-1].index=index;
   }
  },this.duration());
 },*/
 ctrl:function(e){
  let targ=$(e.currentTarget);

  this.current=data.view.typeCls.reduce((arr,o,i)=>(targ.hasClass(o)&&arr.push(i),arr),[])[0];
  this.$ctrl.removeClass(data.view.shownCls);
  targ.addClass(data.view.shownCls);
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
 },
 choose:function(e){
  if($(e.currentTarget).index()===1)
   this.$el.addClass(data.view.otherCls);
  this.$el.addClass(data.view.gameCls);
  this.next(1);
  //app.get('aggregator').trigger('ls:save',{interactive:this.opts.data.data.real,value:curr.index()});
 }
});
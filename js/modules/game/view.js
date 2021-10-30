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
 wait:false,
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
    }
   }
  });

  this.score=150;
 },
 can:function(index){//don't generate simultaneously; don't generate more than 2 active on one side
  let d=0;

  if(this.score>10)
   d=!Math.floor(Math.random()*3);

  if(this.score>30)
   d=!Math.floor(Math.random()*20/Math.sqrt(this.score));

  if(this.score>50)
   d=!Math.floor(Math.random()*3);

  if(this.score>70)
   d=!Math.floor(Math.random());

  if(this.score>100)
   d=!Math.floor(Math.random()*(this.score>200?1:220/this.score));

  if(!this.ints.length)
   this.wait=false;

  return !this.ints.length||d&&this.ints[this.ints.length-1].index!==index&&!this.wait;
 },
 duration:function(){
  let d=data.interval/(this.score/10+1);

  if(this.score===10)
   this.wait=true;

  if(this.score>10)
   d=data.interval;

  if(this.score>30)
   d=data.interval/((this.score-30)/30+1);

  if(this.score===50)
   this.wait=true;

  if(this.score>50)
   d=data.interval/(this.score/200+1);

  if(this.score===70)
   this.wait=true;

  if(this.score>70)
   d=data.interval;

  if(this.score>100)
   d=data.interval/((this.score-100)/100+1);

  if(this.score===200)
   this.wait=true;

  if(this.score>200)
   d=data.interval;

  if(this.score>250)
   d=data.interval/((this.score-250)/100+1);

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
   },300,{leading:true,trailing:false});
   //TODO:REMOVE throttle. add timestamp to this.ints[this.ints.length-1].tmstmp and compare it with prev and cut! maybe even tgis.wait is not needed
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
import {data as dat} from './data.js';

let app,
 data=dat,
 epIndex;

const Interval=function(fn,interval){
 this.id=setInterval(fn,interval);

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
 active:[],
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
 },
 start:function(){
  let index=Math.floor(Math.random()*4),
      step=0;

  this.active.push(index);

  if(1)
  //if(!this.timer[index]&&!this.garbage.step[index])
  {
   /*this.timer[index]=setInterval(()=>{
    this.garbage[data.view.typeCls[index]].removeClass(data.view.shownCls).eq(this.garbage.step[index]).addClass(data.view.shownCls);
    this.garbage.step[index]++;
    if(this.garbage.step[index]===this.garbage.length+1)
    {
     if(this.current===index)
     {
      this.score++;
      this.$score.text(this.score);
     }
     this.garbage.step[index]=0;
     clearInterval(this.timer[index]);
     this.timer[index]=0;
     this.start();
    }else
    {
     //if(!Math.floor(Math.random()*4))//TODO: for hard mode - enable after some score
      this.start();
    }
   },data.interval/(this.score/200+1));//TODO: enable multiplier after some score*/

   let int=new Interval(()=>{
    if(step)
     this.garbage[data.view.typeCls[index]].eq(step-1).removeClass(data.view.shownCls);
    this.garbage[data.view.typeCls[index]].eq(step).addClass(data.view.shownCls);
    step++;
    if(step===this.garbage.length+1)
    {
     if(this.current===index)
     {
      this.score++;
      this.$score.text(this.score);
     }
     this.garbage[data.view.typeCls[index]].eq(step).removeClass(data.view.shownCls);
     step=0;
     this.active.pop();
     int.clr();
     this.start();
    }else
    {
     if(!Math.floor(Math.random()*4))//TODO: for hard mode - enable after some score
     //if(!this.tmp)
      this.start();
     this.tmp=true;
    }
   },data.interval);
  }
 },
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
 }
});
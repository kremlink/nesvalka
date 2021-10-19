import {data as dat} from './data.js';
import {lottie as lData} from './lottie.js';

let app,
    events={},
    data=dat;

events[`click.base ${data.events.click}`]='btnClick';
events[`mouseenter.base ${data.events.click}`]='btnHover';

export let BaseIntView=Backbone.View.extend({
 events:events,
 phase:0,
 data:{},
 lastPhase:0,
 shownCls:data.view.shownCls,
 theProg:{
  $prog:null,
  $blood:null,
  outerWidth:0,
  value:0,
  pulse:false
 },
 initialize:function(opts){
  app=opts.app;

  this.$block=this.$(data.view.block);
  this.lastPhase=this.$block.length-1;

  this.resetProgEl();

  if(this.theProg.$prog)
  {
   let c=data.prog.time[0],
   dur=data.prog.time[0];

   setInterval(()=>{
    if(this.theProg.pulse&&this.theProg.$prog)
    {
     this.theProg.value=this.theProg.$prog.width()/this.theProg.outerWidth;
     c=this.theProg.value*this.theProg.value+data.prog.thr*data.prog.thr/(1-data.prog.thr)*(this.theProg.value-1);
     c=c<0?0:c;
     dur=data.prog.time[0]*c+data.prog.time[1]*(1-c);
     app.get('aggregator').trigger('sound','pulse',1-c);
     this.theProg.$blood.css({opacity:(1-c)*data.prog.op,animationDuration:dur+'s'});
    }
   },dur*1000);
  }

  this.toggle(true);
  this.$(data.view.$lottie).each(function(){
   lottie.loadAnimation({
    container:this,
    renderer:'svg',
    loop:true,
    autoplay:true,
    animationData:lData
   });
  });
 },
 resetProgEl:function(){
  this.theProg.$prog=this.$(data.view.$prog);
  if(!this.theProg.$prog.length)
  {
   this.theProg.$prog=null;
  }else
  {
   this.theProg.outerWidth=this.theProg.$prog.parent().width();
  }
  this.theProg.$blood=this.$(data.view.$blood);
 },
 setData:function(k,v){
  this.data[k]=v;
 },
 next:function(){
  this.$block.eq(this.phase).removeClass(this.shownCls);
  this.phase++;
  this.$block.eq(this.phase).addClass(this.shownCls);
  if(this.phase===1)
  {
   this.resetProgEl();
   this.theProg.pulse=true;
   if(this.theProg.$prog)
    this.theProg.$prog.addClass(this.shownCls);
  }
  if(this.phase===2)
  {
   this.clrProg();
  }
 },
 clrProg:function(){
  if(this.theProg.$prog)
  {
   this.theProg.pulse=false;
   this.theProg.$blood.css({opacity:0,animationDuration:'0s'});
   this.theProg.$prog.removeClass(this.shownCls).css('transition-duration','0s');
  }
 },
 btnClick:function(){
  app.get('aggregator').trigger('sound','btn');
  if(this.phase===this.lastPhase)
   this.away();else
   this.next();
 },
 btnHover:function(){
  app.get('aggregator').trigger('sound','btn-h');
 },
 away:function(){
  this.clrProg();
  app.get('aggregator').trigger('interactive:toggle',{show:false,opts:this.data});
  this.toggle(false);
 },
 toggle:function(f){
  if(f)
  {
   this.$block.removeClass(this.shownCls).eq(this.phase).addClass(this.shownCls);
   this.data={};
  }else
  {
   this.clrProg();
  }

  this.phase=0;
  this.$el.toggleClass(this.shownCls,f);
  if(this.opts.data.data.bg)
   app.get('aggregator').trigger(f?'sound':'unsound',this.opts.data.data.bg);
 }
});
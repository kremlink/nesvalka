import {data as dat} from './data.js';

let app,
 data=dat,
 epIndex;

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
 initialize:function(opts){
  app=opts.app;

  //this.template=_.template($(opts.template).html());
  this.$block=this.$(data.view.block);
  this.$ctrl=this.$(data.events.ctrl);
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
 ctrl:function(e){
  let targ=$(e.currentTarget),
      ind=data.view.ctrlCls.reduce((arr,o,i)=>(targ.hasClass(o)&&arr.push(i),arr),[])[0];

  this.$ctrl.removeClass(data.view.shownCls);
  targ.addClass(data.view.shownCls);
  //this.next(2);
 },
 again:function(){
  this.clr();
  //TODO: reconstruct game
 },
 clr:function(){
  this.next(0);
  this.$ctrl.removeClass(data.view.shownCls);
  this.$el.removeClass(data.view.otherCls+' '+data.view.gameCls);
 }
});
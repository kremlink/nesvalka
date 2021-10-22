import {data as dat} from './data.js';

let app,
    data=dat,
    epIndex;

let events={};
events[`click ${data.events.article}`]='article';

export let AchievePop=Backbone.View.extend({
 events:events,
 template:null,
 type:'',
 fullArtPop:null,
 r:null,
 initialize:function(opts){
  app=opts.app;

  this.fullArtPop=opts.fullArtPop;

  this.type=opts.type;
  this.setElement(opts.el);
  this.template=_.template($(opts.template).html());
  this.$into=this.$(data.view.into);
  this.listenTo(app.get('aggregator'),'achieve:show',this.achieve);
 },
 achieve:function(r){
  this.r=r;
  if(r[this.type])
  {
   this.$el.removeClass(data.view.shownCls);
   this.$into.html(this.template(r[this.type]));
   setTimeout(()=>this.$el.addClass(data.view.shownCls),100);
  }
 },
 article:function(){
  this.fullArtPop.render(this.r,-1);
  app.get('aggregator').trigger('player:pause');
 }
});
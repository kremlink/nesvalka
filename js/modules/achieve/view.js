import {data as dat} from './data.js';

let app,
    data=dat,
    epIndex;

let events={};
events[`click ${data.events.hide}`]='hide';

export let AchievePop=Backbone.View.extend({
 events:events,
 el:data.view.el,
 template:null,
 initialize:function(opts){
  app=opts.app;

  this.template=_.template($(data.view.template).html());
  this.$into=this.$(data.view.into);
  this.listenTo(app.get('aggregator'),'achieve:show',this.achieve);
 },
 achieve:function(r){
  this.$el.removeClass(data.view.shownCls);
  this.$into.html(this.template(r));
  setTimeout(()=>this.$el.addClass(data.view.shownCls),100);
 },
 hide:function(){
  this.$el.removeClass(data.view.shownCls);
  app.get('aggregator').trigger('achieve:hide');
  app.get('aggregator').trigger('sound','btn');
 }
});
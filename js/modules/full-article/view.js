import {data as dat} from './data.js';

let app,
    data=dat,
    epIndex;

let events={};
events[`click ${data.events.hide}`]='hide';

export let FullArticlePop=Backbone.View.extend({
 events:events,
 el:data.view.el,
 template:null,
 initialize:function(opts){
  app=opts.app;

  this.type=opts.type;
  this.template=_.template($(data.view.template).html());
  this.$into=this.$(data.view.into);
  this.listenTo(app.get('aggregator'),'full-article:show',this.render);
 },
 render:function(r,index){
  this.toggle(true);
  this.$into.html(this.template(~index?r['articles'][index].pop:r['article'].pop));
  //setTimeout(()=>this.scrollBar.resize(),0);//TODO:add it
 },
 toggle:function(f){
  this.$el.toggleClass(data.view.shownCls,f);
  app.get('aggregator').trigger('sound','btn');
 },
 hide:function(){
  this.toggle(false);
 }
});
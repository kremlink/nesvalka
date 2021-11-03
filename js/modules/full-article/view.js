import {Scroll} from '../scroll/view.js';
import {data as scrollData} from '../scroll/data.js';

import {data as dat} from './data.js';

let app,
    data=dat,
    epIndex;

let events={};
events[`click ${data.events.hide}`]='hide';
events[`click ${data.events.more}`]='more';

export let FullArticlePop=Backbone.View.extend({
 events:events,
 el:data.view.el,
 template:null,
 scrollBar:null,
 initialize:function(opts){
  app=opts.app;

  this.type=opts.type;
  this.template=_.template($(data.view.template).html());
  this.$into=this.$(data.view.into);

  this.setScroll();

  this.listenTo(app.get('aggregator'),'full-article:show',this.render);
  this.listenTo(app.get('aggregator'),'scroll:resize',this.scrollResize);
 },
 setScroll:function(){
  let $wrap=this.$el.find(scrollData.extra.$wrap).css('margin-right',app.get('scrollDim')+'px').scrollTop(0),
   $block=this.$el.find(scrollData.extra.$block);

  this.scrollBar=app.set({
   object:'Bar',
   on:Scroll.events(),
   add:$.extend(true,{},scrollData,{
    holder:this.$el.find(scrollData.holder),
    bar:this.$el.find(scrollData.bar),
    options:{helpers:{drag:app.get('lib.utils').drag}},
    extra:{$wrap:$wrap,$block:$block}
   }),
   set:false
  });
 },
 scrollResize:function(){
  this.scrollBar.resize();
 },
 render:function(r,index){
  this.toggle(true);
  this.$into.html(this.template(~index?r['articles'][index]:r['article']));
  setTimeout(()=>this.scrollBar.resize(),50);
 },
 toggle:function(f){
  this.$el.toggleClass(data.view.shownCls,f);
  app.get('aggregator').trigger('sound','btn');
 },
 hide:function(){
  this.toggle(false);
 },
 more:function(){
  this.toggle(false);
  app.get('aggregator').trigger('full:more',4);
 }
});
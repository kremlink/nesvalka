import {data as dat} from './data.js';
import {lottie as lData} from './lottie.js';

let app,
    data=dat,
    events={};

events[`click ${data.events.click}`]='click';

export let NuPog=Backbone.View.extend({
 events:events,
 el:data.view.el,
 initialize:function(opts){
  let self=this;

  app=opts.app;
  //data=app.configure({start:dat}).start;

  this.opts=opts;

  this.$(data.view.$lottie).each(function(i){
   lottie.loadAnimation({
    container:this,
    renderer:'svg',
    loop:true,
    autoplay:true,
    animationData:!self.opts.data.data.diff?lData.btn:lData.btns[i]
   });
  });
 },
 click:function(e){
  let curr=$(e.currentTarget);

  app.get('aggregator').trigger('sound','btn');
  app.get('aggregator').trigger('ls:save',{interactive:this.opts.data.data.real,value:curr.index()});
 }
});
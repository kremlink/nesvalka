import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';

let app,
    data=dat,
    events={};

events[`click ${data.events.start}`]='start';
events[`click ${data.events.skip}`]='skip';

export let LearnView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 el:data.view.el,
 initialize:function(opts){
  app=opts.app;
  //data=app.configure({start:dat}).start;

  this.opts=opts;

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  //this.setLastPhase(3);

  //this.next();//TODO:remove
 },
 start:function(){
  this.next();
 },
 skip:function(){
  this.away();
 },
 toggle:function(f){
  BaseIntView.prototype.toggle.apply(this,arguments);
  if(f)
  {

  }
 },
});
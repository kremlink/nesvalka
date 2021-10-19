import {data as dat} from './data.js';

import {Scroll} from '../scroll/view.js';
import {data as scrollData} from '../scroll/data.js';

let app,
    data=dat,
    epIndex;

let events={};
events[`click ${data.events.caller}`]='toggle';
events[`click ${data.events.tab}`]='tab';
events[`click ${data.events.copy}`]='copy';
events[`click ${data.events.go}`]='go';
events[`click ${data.events.mail}`]='mail';
events[`focus ${data.events.mailInput}`]='mailFocus';

export let InfoPop=Backbone.View.extend({
 events:events,
 el:data.view.el,
 tabLen:0,
 scrollBar:null,
 shown:false,
 code:'',
 achTemplate:null,
 mailTmpl:_.template(data.view.save.body),
 initialize:function(opts){
  app=opts.app;

  this.achTemplate=_.template($(data.view.ach.tmpl).html());

  this.listenTo(app.get('aggregator'),'info:populate',this.populate);

  this.$tabs=this.$(data.events.tab);
  this.$blocks=this.$(data.view.block);

  this.$ach=this.$(data.view.ach.item);
  this.$achCtr=this.$(data.view.ach.ctr);

  this.$code=this.$(data.view.code);
  this.$qr=this.$(data.view.save.qr);
  this.$codeInput=this.$(data.view.codeInput);
  this.$codeHidden=this.$(data.view.save.codeHidden);
  this.$mail=this.$(data.events.mail);
  this.$save=this.$(data.view.save.saveBtn);

  this.$mailInput=this.$(data.events.mailInput);

  //this.$errText=this.$(data.view.errText);

  this.tabLen=this.$tabs.length;

  this.setScroll();

  this.tab();

  this.listenTo(app.get('aggregator'),'scroll:resize',this.scrollResize);
 },
 mailFocus:function(){
  this.$mailInput.removeClass(data.view.errCls);
 },
 mail:function(e){
  if(app.get('lib.utils.form.validate')({check:this.$mailInput,data:data.view.save.vData}))
  {
   this.$mail.attr('href',`mailto:${this.$mailInput.val()}?subject=${escape(data.view.save.subj)}&body=${escape(this.mailTmpl({code:this.r.user.code,ref:this.ref()}))}`);
  }else
  {
   this.$mailInput.addClass(data.view.errCls);
   e.preventDefault();
  }
 },
 copy:function(){
  this.$codeHidden.select();
  document.execCommand('copy');
 },
 clrHref:function(){
  return location.href.replace(/\?.*/,'').replace(/#.*/,'');
 },
 ref:function(){
  return this.clrHref()+`?${data.view.param}=`+this.r.user.code;
 },
 go:function(){
  //this.$errText.html(r.errCodeText);//on request
   location.href=this.clrHref()+`?${data.view.param}=`+this.$codeInput.val();
 },
 setCode:function(){
  this.$code.text(this.r.user.code);
  this.$codeHidden.val(this.r.user.code);

  this.$qr.html('').qrcode({text:this.ref()});
  this.$save.attr('download',data.view.save.qrFileName).attr('href',this.$qr.find('canvas')[0].toDataURL("image/png").replace("image/png","image/octet-stream"));
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
 toggle:function(){
  this.$el.toggleClass(data.view.shownCls,this.shown=!this.shown);
  app.get('aggregator').trigger('sound','btn');
  if(this.shown)
   app.get('aggregator').trigger('player:pause');
  app.get('aggregator').trigger('info:toggle',this.shown);
 },
 tab:function(e,ext=-1){
  let tab=~ext?this.$tabs.eq(ext):(e?$(e.currentTarget):this.$tabs.eq(0)),
      ind=this.$tabs.index(tab);

  if(!tab.hasClass(data.view.shownCls))
  {
   if(e&&!~ext)
    app.get('aggregator').trigger('sound','btn');
   this.$tabs.removeClass(data.view.shownCls);
   this.$blocks.removeClass(data.view.shownCls);
   tab.addClass(data.view.shownCls);
   this.$blocks.eq(ind).addClass(data.view.shownCls);
   this.$blocks.eq(this.tabLen+ind).addClass(data.view.shownCls);
   setTimeout(()=>this.scrollResize(),0);
  }
 },
 scrollResize:function(){
  this.scrollBar.resize();
 },
 populate:function(r){
  this.$ach.html(this.achTemplate(r));
  setTimeout(()=>this.scrollBar.resize(),0);
  this.$achCtr.text(`${r.achievements.filter((o)=>!o.disabled).length}/${r.achievements.length}`);

  this.r=r;
  this.setCode();
 }
});
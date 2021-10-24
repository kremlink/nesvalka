let toggler=function(u){
 let wrapDim=u.$wrap.height(),
  blockDim=u.$block.height(),
  hide=blockDim<=wrapDim;

 if(!hide)
  this.get('setBarDim',[wrapDim/blockDim*this.get('getData').holderDim]);
 this.get('getData').container[(hide?'add':'remove')+'Class'](u.cls);
 u.$wrap[(hide?'add':'remove')+'Class'](u.cls);

 return {wrapDim:wrapDim,blockDim:blockDim};
};

export let Scroll={
 events:function(){
  let dims;

  return {
   init:function(){
    let u=this.get('data').extra;

    dims=toggler.call(this,u);

    u.$wrap.on('scroll',()=>{
     this.get('setPosition',{
      value:[u.$wrap.scrollTop()*this.get('getData').bounds[1]/(dims.blockDim-dims.wrapDim)],
      external:true
     });
    });
   },
   change:function(e,opts){
    let u=this.get('data').extra;

    if(opts.resize)
     dims=toggler.call(this,u);

    if(opts.resize)
     u.$wrap.scrollTop(0);else
     if(!opts.external)
      u.$wrap.scrollTop(opts.value[0]*(dims.blockDim-dims.wrapDim)/opts.bounds[1]);
   }
  }
 }
};

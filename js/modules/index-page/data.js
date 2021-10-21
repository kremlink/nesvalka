export const data={
 preload:{},
 waitBtn:1500,
 events:{
  'start':'.start-pop .play',
  'load':'.start-pop .load',
  'clr':'.clr'
 },
 view:{
  el:'#wrap',
  loadedCls:'loaded',
  tooSmallCls:'too-small',
  startCls:'start',
  fromLoadCls:'fromLoad',
  //fsCls:'fs',
  timerCls:'timer',
  pauseCls:'paused',
  nopeCls:'nope',
  goOnCls:'goOn'
 },
 minViewport:600,
 orient:'(orientation:portrait)',
 pcViewport:'(min-width:1024px)'
};
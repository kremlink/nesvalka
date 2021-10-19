export const data={
 events:{
  'caller':'.caller',
  'tab':'.tabs div',
  'copy':'.copy',
  'go':'.go',
  'mail':'.mail',
  'mailInput':'.mail-input'
 },
 view:{
  el:'.info-pop',
  block:'.block',
  shownCls:'shown',
  code:'.code span',
  codeInput:'.code-input',
  //errText:'.err-text',
  param:'code',
  errCls:'err',
  save:{
   codeHidden:'.code-hidden',
   vData:'valid',
   saveBtn:'.save',
   qr:'.qr',
   qrFileName:'niaden-jiv-qr.png',
   subj:'Код найден-жив',
   body:'Ваш код: <%= code %>\r\nСсылка: <%= ref %>'
  },
  ach:{
   item:'.achievements',
   tmpl:'#info-ach-template',
   ctr:'.ach-ctr'
  }
 }
};
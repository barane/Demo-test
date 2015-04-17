define(['jquery', 'knockout', 'plugins/router','./step2', './model'], function ($, ko, router, step2, model ){

 var Ctor = function () {
    self.showHelp = ko.observable(false);
    self.userName = ko.observable();

 this.help= function(){
 	self.showHelp(!self.showHelp())
 }   
  
 this.sendSMS = function(){
  router.navigate('#step2/');
  model.userName = self.userName();
 };

}

Ctor.prototype.activate = function () {
  $("#progressbar li").eq(0).addClass('active');
  $("#progressbar li").eq(1).removeClass('active');
  $("#progressbar li").eq(2).removeClass('active');
}
return Ctor;

})
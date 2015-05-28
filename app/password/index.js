define(['jquery', 'knockout', 'plugins/router','./step2', './model'], function ($, ko, router, step2, model ){

 var Ctor = function () {
 	var self = this;
    self.showHelp = ko.observable(false);
    self.userName = ko.observable();
    self.selectedLang = ko.observable('Swedish');

	this.help= function(){
	 	self.showHelp(!self.showHelp())
	} 
	  
	this.next = function(){
	  router.navigate('#step2/');
	  model.userName = self.userName();
	  model.selectedLang = self.selectedLang();
	};
 
}

Ctor.prototype.activate = function () {
  $("#progressbar li").eq(0).addClass('active');
  $("#progressbar li").eq(1).removeClass('active');
  $("#progressbar li").eq(2).removeClass('active');
}
return Ctor;

})

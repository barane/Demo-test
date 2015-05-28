define(['knockout'], function(ko){
	var model = {};
	   model.userName = ko.observable();
	   model.passWord = ko.observable();
	   model.selectedLang = ko.observable();		  
	return model;
})

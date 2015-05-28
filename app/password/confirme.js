define(['jquery', 'knockout', 'plugins/router','./step2', "./model"], function ($, ko, router, step2, model ){

 var Ctor = function () {
 	var self = this;
 	self.passWord = model.passWord.complete;
 	self.enteredValue = ko.observable();
 	this.submit = function(){
 		if(!self.enteredValue()){
 			window.alert("Please enter your password first!");
 		} else if(self.enteredValue() == self.passWord){
 		 self.enteredValue("");
 			window.alert("CORRECT!");
 		} else {
 			window.alert("WRONG, your password is: "+ self.passWord)
 		}
 	}
 
}

return Ctor;

})

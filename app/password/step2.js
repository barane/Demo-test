define(['jquery', 'knockout', 'plugins/router'], function ($, ko, router) {

   var Ctor = function () {
      var self = this;
       self.showHelp = ko.observable(false);
       self.pinCode= ko.observable();

       this.help= function(){
       self.showHelp(!self.showHelp())
      }  
      
      this.save = function(){
        console.log('code', self.pinCode());
        if(self.pinCode() == 3903){
          router.navigate('#step3/');
        } else { window.alert('Your pin code is not correct')}
       
      }

      this.cancel = function () {
       router.navigate('#password/');
      }
  }

  Ctor.prototype.compositionComplete = function () {
        $('input[autofocus=true]').focus();
    }

  Ctor.prototype.activate = function () {
      $("#progressbar li").eq(0).addClass('active');
      $("#progressbar li").eq(1).addClass('active');
      $("#progressbar li").eq(2).removeClass('active');
    }

   return Ctor;

})

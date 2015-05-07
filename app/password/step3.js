
define(['jquery', 'knockout', 'plugins/router', 'api/wordList', './model'], function ($, ko, router, wordList, model) {

 var Ctor = function () {
    
    var self = this;
    self.symbol1 = ko.observable();
    self.symbol2 = ko.observable();
    self.passPhrases = ko.observableArray();
    self.selectedPass = ko.observable();
    self.isSelected = ko.observable(false);
    self.isFirstAttempt = ko.observable(true);
    self.noRemainingAttempts = ko.observable(false);
    self.counter= 3; 
    self.remaningAttempts = ko.observable();
    self.showHelp = ko.observable(false);

    var modifiedWordList = [];
    ko.utils.arrayForEach(wordList, function(item){
        if(item.indexOf('ä') !== -1) {
           item = replaceSwedishChar(item, "ä", "a");
        }
        if(item.indexOf('å') !== -1) {
           item = replaceSwedishChar(item, "å", "a");
        }
        if(item.indexOf('ö') !== -1) {
            item = replaceSwedishChar(item, "ö", "o");
        }
        modifiedWordList.push(item);
    });

    init();
    var firebaseRef = new Firebase("https://blistering-inferno-350.firebaseIO.com/");


    function init(){
      if(self.passPhrases()){self.passPhrases([])}
      var generatedWord = [],
          wordFromDict = [],
          phrase = [];
      for (var j=0; j<5; j++){
        for(var i=0; i<3 ; i++){
            generatedWord[i] = Math.floor(Math.random()*475)+1;
            wordFromDict[i] = modifiedWordList[generatedWord[i]];         
        }
        if(self.symbol1() && self.symbol2()){             
        phrase[j] =wordFromDict[0] + self.symbol1()  + wordFromDict[1] + self.symbol2() + wordFromDict[2];
        self.passPhrases.push(phrase[j]);
        }    
      }
    }

    this.refresh = function(){   
        self.isFirstAttempt(false);
        self.counter --;
        if(self.counter > 0){            
            self.remaningAttempts(self.counter);         
            init();
        } else if(self.counter == 0){
            self.noRemainingAttempts(true);
            init(); 
        }
    }

    this.confirm = function(){
      if(self.selectedPass()){

      firebaseRef.push({
        userName: model.userName,
        password: self.selectedPass()
      });
        router.navigate("#confirme")
        self.isSelected(false)
      } else {
        self.isSelected(true);
      }      
    }

    this.help = function(){
      self.showHelp(!self.showHelp())
    }

    this.back = function () {
       router.navigate('#step2/');
    }

    function replaceSwedishChar (word, swedChar, engChar){
      var swedishCharIndex = word.indexOf(swedChar);
      var lastIndex = word.length;
      return word = word.slice(0, swedishCharIndex) +  engChar + word.slice(swedishCharIndex+1, lastIndex);  
    }

    // function capitalizeFirstLetter(string) {
    // return string.charAt(0).toUpperCase() + string.slice(1);
    // }
}
  Ctor.prototype.activate = function () {
    $("#progressbar li").eq(0).addClass('active');
    $("#progressbar li").eq(1).addClass('active');
    $("#progressbar li").eq(2).addClass('active');
  }
  return Ctor;
})

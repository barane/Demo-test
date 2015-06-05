
define(['jquery', 'knockout', 'plugins/router', 'api/swedWordList', 'api/engWordlist', 'api/danishWordlist', './model'], function ($, ko, router, swedWordList, engWordlist, danishWordlist, model) {

 var Ctor = function () {
    
    var self = this;
    self.padding1 = ko.observable();
    self.padding2 = ko.observable();
    self.passPhrases = ko.observableArray();
    self.selectedPass = ko.observable();
    self.noPassSelected = ko.observable(false);
    self.noPadding = ko.observable(false);
    self.isFirstAttempt = ko.observable(true);
    self.noRemainingAttempts = ko.observable(false);
    self.counter= 3; 
    self.remaningAttempts = ko.observable();
    self.showHelp = ko.observable(false);
    self.isBeforeChanging = ko.observable(true);
    self.selectedWordToChange = ko.observable();
    self.passwordBeforeChange = ko.observable();
    self.showFinalPass = ko.observable(false);

    var modifiedWordList = [];
    var wordList = swedWordList;
    
    if(model.selectedLang == "Swedish"){
      wordList = swedWordList;
    }
    if(model.selectedLang == "Danish"){
      wordList = danishWordlist;
    } else{
      wordList = engWordlist
    } 

    if( model.selectedLang == "Swedish"){ 
      ko.utils.arrayForEach(wordList, function(item){
          while (item.indexOf('ä') !== -1) {    
             item = replaceSwedishChar(item, "ä", "a");
          }
          while (item.indexOf('å') !== -1) {
             item = replaceSwedishChar(item, "å", "a");
          }
          while (item.indexOf('ö') !== -1) {
              item = replaceSwedishChar(item, "ö", "o");
          }
          modifiedWordList.push(item);
      });
    } else if( model.selectedLang == "Danish"){
        ko.utils.arrayForEach(wordList, function(item){
            while (item.indexOf('å') !== -1) {
               item = replaceSwedishChar(item, "å", "aa");
            }
            while (item.indexOf('ø') !== -1) {
               item = replaceSwedishChar(item, "ø", "oe");
            }
            while (item.indexOf('æ') !== -1) {
                item = replaceSwedishChar(item, "æ", "ae");
            }
            modifiedWordList.push(item);
        });
    } else { modifiedWordList = wordList;}

    init();
    // var firebaseRef = new Firebase("https://blistering-inferno-350.firebaseIO.com/");


    function init(){
      if(self.passPhrases()){self.passPhrases([])}
      var wordFromDict = [];
      for (var j=0; j<5 ; j++){
        for(var i=0; i<3 ; i++){
            var randomIndex = [];
            randomIndex[i] = Math.floor(Math.random()*475)+1;
            wordFromDict[i] = modifiedWordList[randomIndex[i]];         
        }
        if(self.padding1() && self.padding2()){   
          var word0 = lowercaseFirstLetter(wordFromDict[0]),
              word1 = lowercaseFirstLetter(wordFromDict[1]),
              word2 = lowercaseFirstLetter(wordFromDict[2]),       
              phrase = word0 + self.padding1()  + word1 + self.padding2() + word2;
              self.passPhrases.push({"complete" : phrase, "word0": word0, "word1": word1, "word2": word2 });
              console.log(self.passPhrases())
        }     
      }
    }

    this.refresh = function(){   
      if(!self.padding1() || !self.padding2()) {
        self.noPadding(true);
      } else {
        self.noPadding(false);
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
    }

    this.confirm = function(){
      if(self.selectedPass()){
        model.passWord = self.selectedPass();
          $.ajax({
           type: "POST",
           url: "api/password",
           dataType: "json",
           data: {"user": model.userName, "password" : self.selectedPass () },
           success: function () { console.log("email sent")}
         })

      // firebaseRef.push({
      //   userName: model.userName,
      //   password: self.selectedPass()
      // });
        self.noPassSelected(false);
        router.navigate("#confirme")
        
      } else {
        self.noPassSelected(true);
      }      
    }

    this.help = function(){
      self.showHelp(!self.showHelp())
    }

    this.changeOneWord = function(){
      self.noPassSelected(false);
      self.passPhrases([]);
      self.isBeforeChanging(false);
    }

    this.toChange = function(){
      self.noPassSelected(false);
      if(self.selectedWordToChange()){
      if( self.selectedWordToChange().indexOf('ä') !== -1 || self.selectedWordToChange().indexOf('å') !== -1 || self.selectedWordToChange().indexOf('ö') !== -1 ){
        window.alert("Please use only Swedish alphabet.");
        self.selectedWordToChange("");
        return;
      } 
      if(isNaN(self.selectedWordToChange()) && self.selectedWordToChange().length < 3){
        window.alert("The length of the word must be more than 3 letters.");
        return
      }
      
      if(!isNaN(self.selectedWordToChange()) && self.selectedWordToChange().length < 2){
          window.alert("If you would like to choose a number, it must at least 2 charecters.");
      }
      for(key in self.selectedPass()){
        if (self.selectedPass()[key]==self.passwordBeforeChange()){
          self.selectedPass()[key] = self.selectedWordToChange();
        }
      }
      self.selectedPass()["complete"] = self.selectedPass()["word0"] +self.padding1() + self.selectedPass()["word1"] +self.padding2() + self.selectedPass()["word2"]
      self.showFinalPass(true);
      console.log(self.selectedPass())
    } else { window.alert("Please click on of the words in your chosen password")}
  }

    this.back = function () {
       router.navigate('#step2/');
    }

    function replaceSwedishChar (word, swedChar, engChar){
        var swedishCharIndex = word.indexOf(swedChar);
        var lastIndex = word.length;
        return word = word.slice(0, swedishCharIndex) +  engChar + word.slice(swedishCharIndex + 1, lastIndex);  
    }

    function lowercaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
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

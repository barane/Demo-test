requirejs.config({
   paths: {
      'text': '../lib/require/text',
      'durandal': '../lib/durandal/js',
      'plugins': '../lib/durandal/js/plugins',
      'transitions': '../lib/durandal/js/transitions',
      'knockout': '../lib/knockout/knockout',
      'bootstrap': '../lib/bootstrap/js/bootstrap',
      'jquery': '../lib/jquery/jquery-1.9.1',
      'validation' : '../lib/Knockout-Validation-master/Dist/knockout.validation',
      'tooltip' : '../lib/tooltip',
   },
   urlArgs: 't' + (new Date).getTime(),
   shim: {
      'bootstrap': {
         deps: ['jquery'],
         exports: 'jQuery'
      },
      'tooltip' : {
         deps: ['bootstrap'],
         exports: 'bootstrap'

      }
   }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],
function (system, app, viewLocator, feed,ko) {

   system.debug(true);


   app.title = 'Passphrase';
 
   app.configurePlugins({
      router: true,
      dialog: true,
      widget: {
         kinds: ['expander']
      }
   });

   app.start().then(function () {

      viewLocator.useConvention();

      app.setRoot('shell');
   });

   window.app = app;
});
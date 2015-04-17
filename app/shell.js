define(['plugins/router', 'durandal/app'], function (router, app) {
   return {
      router: router,
      logOut: function(){router.navigate("#password")},
      activate: function () {
         return router.map([
             { route: ['', 'password'], moduleId: 'password/index' },
             { route: 'step2', moduleId: 'password/step2' },
             { route: 'step3', moduleId: 'password/step3' },
             { route: 'confirme', moduleId: 'password/confirme' }
         ]).buildNavigationModel()
           .mapUnknownRoutes('password/index', 'not-found')
           .activate();
      }
   };
});
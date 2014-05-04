define([
    'app', 'views',
    'base/module'
], function (app) {
    angular.bootstrap(document.documentElement, [app.name]);

    // for ngScenario
//    var html = document.getElementsByTagName('html')[0];
//
//    html.setAttribute('ng-app', 'app');
//    html.dataset.ngApp = 'app';
//
//    if (top !== window) {
//        top.postMessage({
//            type: 'loadamd'
//        }, '*');
//    }
});
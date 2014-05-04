require.config({
    baseUrl: '/app',

    packages: [
        {
            name: 'bz',
            location: '../bower_components/bazalt/build',
            main: 'bz-lite.src'
        }
    ],

    paths: {
        'jquery': '../bower_components/jquery/jquery',

        'angular': '../bower_components/angular/angular',
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'angular-route': '../bower_components/angular-route/angular-route',
        'angular-animate': '../bower_components/angular-animate/angular-animate',
        'angular-touch': '../bower_components/angular-touch/angular-touch',
        'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
        'angular-route-segment': '../bower_components/angular-route-segment/build/angular-route-segment',
//        'angular-smoothscroll': '../bower_components/angular-smoothscroll/dist/scripts/c8742280.scripts',
//        'ngSocial': '../bower_components/angular-social/angular-social.src',
//        'angular-analytics': '../bower_components/angular-analytics/dist/angular-analytics',
//
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
        'ui-bootstrap': '../bower_components/angular-ui-bootstrap3/ui-bootstrap',
        'ui-bootstrap-tpls': '../bower_components/angular-ui-bootstrap3/ui-bootstrap-tpls',
//
//        'jquery-ui': '../bower_components/jquery-ui/ui',
//
        'ngTable': '../bower_components/ng-table/ng-table',
        'ngTableExport': '../bower_components/ng-table-export/ng-table-export.src',
//
//        'angular-file-upload': '../bower_components/angular-file-upload/angular-file-upload',
//        'bz-uploader': '../bower_components/bz-uploader/bz-uploader.src',
//        'ng-editable-tree': '../bower_components/ng-editable-tree/ng-editable-tree',
//
//        'bz-nested-model': '../bower_components/bz-nested-model/bz-nested-model',
//
        'moment-lang': '../bower_components/momentjs/lang',
        'moment': '../bower_components/momentjs/moment',
//
//        'storejs': '../bower_components/store.js/store',
//
        'bootstrap-datepicker': '../bower_components/bootstrap-datepicker/js/bootstrap-datepicker',
        'bootstrap-datepicker.ru': '../bower_components/bootstrap-datepicker/js/locales/bootstrap-datepicker.ru',
        'bootstrap-daterangepicker': '../bower_components/bootstrap-daterangepicker/daterangepicker',
        'ng-bs-daterangepicker': '../bower_components/ng-bs-daterangepicker/src/ng-bs-daterangepicker',
//        'introJs': '../bower_components/intro.js/intro',
//
//        'ckeditor': '../vendors/ckeditor/ckeditor',
//        'ng-ckeditor': '../bower_components/ng-ckeditor/ng-ckeditor.src',
//        'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize',
        'angular-notify': '../bower_components/angular-notify/angular-notify',
//
//        'jme': '../vendors/jme/jme',
//        'jme-embed': '../vendors/jme/jme.embed',
//        'jme-fullscreen': '../vendors/jme/jme.fullscreen',
//        'modernizr': '../vendors/jme/modernizr.custom.46447',
//        'jme-polyfiller': '../vendors/jme/jme-polyfiller',
//
//        'swfobject': '../bower_components/swfobject/swfobject/src/swfobject',
//        'videojs': '../bower_components/video.js/video',
//
//        'select2': '../bower_components/select2/select2',
//        'select2_locale_ua': '../bower_components/select2/select2_locale_ua',
//
//        'angular-ui-select2': '../bower_components/angular-ui-select2/src/select2'
    },

    shim: {
        'angular': { exports: 'angular', deps: ['jquery'] },
        'angular-locale': { deps: ['angular'] },
        'angular-analytics': { deps: ['angular'] },
        'angular-resource': { deps: ['angular'] },
        'angular-route': { deps: ['angular'] },
        'angular-animate': { deps: ['angular'] },
        'angular-cookies': { deps: ['angular'] },
        'angular-touch': { deps: ['angular'] },
//        'ngSocial': { deps: ['angular'] },
        'angular-route-segment': { deps: ['angular'] },
//        'angular-smoothscroll': { deps: ['angular'] },
        'app': { deps: [] },
//
//        'jme': { deps: ['jme-embed', 'jme-fullscreen', 'modernizr', 'jme-polyfiller'] },
//
//        'ng-editable-tree': { deps: ['angular', 'jquery-ui/jquery.ui.draggable', 'jquery-ui/jquery.ui.droppable', 'jquery-ui/jquery.ui.sortable'] },
        'ngTable': { deps: ['angular'] },
        'ngTableExport': { deps: ['ngTable'] },
//        'angular-file-upload': { deps: ['angular'] },
//        'bz-uploader': { deps: ['angular-file-upload'] },
//
//        // jquery ui for sortable
//        'jquery-ui/jquery.ui.core': { deps: ['jquery'] },
//        'jquery-ui/jquery.ui.widget': { deps: ['jquery-ui/jquery.ui.core'] },
//        'jquery-ui/jquery.ui.mouse': { deps: ['jquery-ui/jquery.ui.widget'] },
//        'jquery-ui/jquery.ui.draggable': { deps: ['jquery-ui/jquery.ui.mouse'] },
//        'jquery-ui/jquery.ui.droppable': { deps: ['jquery-ui/jquery.ui.mouse'] },
//        'jquery-ui/jquery.ui.selectable': { deps: ['jquery-ui/jquery.ui.mouse'] },
//        'jquery-ui/jquery.ui.sortable': { deps: ['jquery-ui/jquery.ui.mouse'] },
//        'bz-nested-model': { deps: ['angular'] },
//
//        'storeJs': { deps: ['jquery'] },
//        'storejs': { deps: ['jquery'] },
        'bootstrap': { deps: ['jquery'] },
        'ui-bootstrap': { deps: ['angular', 'bootstrap', 'ui-bootstrap-tpls'] },
        'ui-bootstrap-tpls': { deps: ['angular'] },
//
        'bootstrap-datepicker': {deps: ['moment-lang/ru', 'bootstrap', 'jquery']},
        'bootstrap-datepicker.ru': {deps: ['bootstrap-datepicker']},
        'bootstrap-daterangepicker': {deps: ['moment-lang/ru', 'bootstrap', 'jquery']},
        'ng-bs-daterangepicker': {deps: ['angular', 'bootstrap-daterangepicker']},
//        'ng-ckeditor': { deps: ['angular', 'ckeditor'] },
//        'angular-sanitize': { deps: ['angular', 'angular-route'] },
        'angular-notify': { deps: ['angular'] },
//
//        'select2': { deps: ['jquery'] },
//        'angular-ui-select2': { deps: [ 'jquery', 'select2', 'angular' ] }
    }
});
require(['main']);
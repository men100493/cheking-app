require.config({
    paths: {
        jquery: 'vendor/jquery/jquery', // -> vendor/jquery/jquery.js
        underscore : 'vendor/underscore/underscore', // -> vendor/underscore/underscore/js
        backbone: 'vendor/backbone/backbone', // -> vendor/backbone/backbone.js
        text: 'vendor/require/text', // -> vendor/backbone/backbone.js
    },
    shim: {
        'backbone': {
            deps: ['underscore','jquery'],
            export: 'Backbone'
        },
        'underscore': {
            export: '_'
        },
        'jquery': {
            export: '$'
        }
    }
    
    urlArgs: "_=" + (new Date()).getTime()
});


require(
[
    'app'
] , function(App){
    // console.log(app);
    App.initialize();
});

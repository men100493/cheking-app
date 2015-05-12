define(
    [
        'jquery',
        'underscore',
        'backbone',
        'router' // -> router.js
    ], function($,_,Backbone,Router){
        var initialize = function(){
            Router.initialize();
        }

        return {
            initialize: initialize
        };
});

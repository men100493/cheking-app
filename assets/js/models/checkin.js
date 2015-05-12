define(
    [
        'underscore',
        'backbone'
    ], function(_,Backbone){

        var CheckInModel = Backbone.Model.extend({
            urlRoot: '/checkin'
        });

        return CheckInModel;
});

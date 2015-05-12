define(
    [
        'jquery',
        'underscore',
        'backbone',
        'models/checkin',
        'text!./../../../templates/checkin/details.html' // le plugin text permet de récupérer le template
    ], function($,_,Backbone,CheckInModel,CheckInDetailsTemplate){
        
        var CheckInDetailsView = Backbone.View.extend({
            el: '#content',
            template : _.template(CheckInDetailsTemplate),

            render: function(options){
                console.log('CheckInDetailsView Render ' + options.id);
                var self = this;
                if(options.id){
                    self.checkIn = new CheckInModel({id: options.id});
                    self.checkIn.fetch({
                        success: function(checkin){
                            console.log(checkin);
                            //console.log(checkin.models);

                        self.$el.html(self.template({
                            checkInDetails: checkin.models
                        }));
                           
                        }
                    });
                }
            }

        });

        return CheckInDetailsView;

});

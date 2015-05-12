define(
    [
        'jquery',
        'underscore',
        'backbone',
        'collections/checkins',
        'text!./../../../templates/checkin/list.html', // le plugin text permet de récupérer le template
        'async!http://maps.google.com/maps/api/js?sensor=false'
    ], function($,_,Backbone,CheckInCollection, checkinListTemplate){

        var CheckInListView = Backbone.View.extend({
            el: '#content',
            template : _.template(checkinListTemplate),

            render: function(){
                console.log('CheckInListView Render');
                var self = this;
                var map = null;
                var myLatlng = null;
                var mapOptions = null;
                var markers = [];
                var marker = null;
                checkInCollection = new CheckInCollection();
                checkInCollection.fetch({
                    success: function (checkins){
                        console.log(self.$el);
                        console.log(checkins.models);

                        self.$el.html(self.template({
                            checkInList: checkins.models
                        })); 

                        //////////////////////////////////////////////////////////////////
                        // FONCTION DE GEOLOCALISATION //
                        var options = {
                          enableHighAccuracy: true,
                          maximumAge: 0
                        };
                        // Fonction de callback en cas de succès
                        function successPos(pos) {
                            console.log("debut getCurrentPosition");
                            var crd = pos.coords;

                            console.log('Your current position is:');
                            console.log('Latitude : ' + crd.latitude);
                            console.log('Longitude: ' + crd.longitude);
                            console.log('More or less ' + crd.accuracy + ' meters.');

                            // Un nouvel objet LatLng pour Google Maps avec les paramètres de position
                            myLatlng = new google.maps.LatLng(crd.latitude, crd.longitude);
                            console.log(myLatlng);
                            createMap();    


                            // Ajout d'un marqueur à la position trouvée
                            marker = new google.maps.Marker({
                              position: myLatlng,
                              map: map,
                              title:"Vous êtes ici"
                            });
                                markers.push(marker);

                            console.log("Fin getCurrentPosition");
                        };

                        function error(err) {
                          console.warn('ERROR(' + err.code + '): ' + err.message);
                        };
                        //////////////////////////////////////////////////////////////////
                        // FONCTION DE CREATION DE LA MAP avec les markers des checkins //
                        // Définition des paramètres par défaut d'affichage de la carte //
                        function createMap() {
                        $('#loading').hide(); 

                            mapOptions = {
                                zoom: 11,
                                center: myLatlng
                            }                        

                            // Génération de la carte dans la view
                            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                            // Parcours de l'ensemble des checkins et création des markers
                            _.each(checkins.models, function (checkin){
                                checkinLatlng = new google.maps.LatLng(checkin.get('lat'),checkin.get('lng')); 

                                marker = new google.maps.Marker({
                                    position: checkinLatlng,
                                    map: map,
                                    title: 'MyCheckin with id='+checkin.get('id')
                                });
                                markers.push(marker);
                                console.log(marker);
                                console.log(markers);

                            }); 
                            // Fin de la génération de la carte
                        };
                        //////////////////////////////////////////////////////////////////

                        if(navigator.geolocation) {
                        // L'API est disponible 
                            $('#loading').show();
                            navigator.geolocation.getCurrentPosition(successPos, error, options);                            
                        }
                        else {
                            myLatlng = new google.maps.LatLng(45.1747598,5.7071189);
                            console.log('default'); console.log(myLatlng);
                            createMap();                           
                        } 
                        

                    }


                })
            }

        });

        return CheckInListView;

});

define(
    [
        'jquery',
        'underscore',
        'backbone',
        'models/checkin',
        'text!./../../../templates/checkin/add.html' // le plugin text permet de récupérer le template
    ], function($,_,Backbone,CheckInModel, checkinAddTemplate){
        
        var CheckInAddView = Backbone.View.extend({
            el: '#chekinadd',
            template : _.template(checkinAddTemplate),

            render: function(options){
                console.log('CheckInAddView Render');
                var map = null;
                var myLatlng = null;
                var mapOptions = null;
                var markers = [];
                var marker = null;

                this.$el.html(this.template());
                console.log(' / CheckInAddView Render');

                //////////////////////////////////////////////////////////////////
                        // FONCTION DE GEOLOCALISATION //
                        var options = {
                          enableHighAccuracy: true,
                          maximumAge: 0
                        };

                        // Delete markers
                        function clearMarkers() {
                          setAllMap(null);
                        }
                        function deleteMarkers() {
                          clearMarkers();
                          markers = [];
                        }
                        
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

                            deleteMarkers();    


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
                        
                    };

            },
            
            events: {
                 "submit #checkinform": "saveCheckIn"
            },

            saveCheckIn: function(event){
                event.preventDefault();

                checkin = new CheckInModel();

                serializeArray = $(event.currentTarget).serializeArray();


                $.each(serializeArray, function(i, o){
                    // console.log(i);
                    // console.log(o);
                    // console.log(o.name);
                    // console.log(o.value);
                    checkin.set(o.name, o.value)

                });
                console.log(checkin);

            
                checkin.save();
                
            }




        });

        return CheckInAddView;

});

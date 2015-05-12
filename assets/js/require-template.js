define(
    [
        // definition des dépendances
        'jquery', // Chargement de lib/jquery/jquery
        'underscore',
        'backbone',
    ], function($,_,Backbone){
        /*
        * On passe jQuery en paramètre de la fonction
        * ce qui permet de l'utiliser par la suite.
        *
        * exemple : $('.example').hide();
        */
        var initialize = function(){

        }

        return {
            initialize: initialize
        };
        /*
        * Ici on retourne ce qu'on veut pouvoir utiliser
        * dans d'autres modules
        */
});

var pokemonDataManager = function(){

    var pokemonData = null;

    firebase.database().ref("/-KZ2LnrwE_FORd78bIXx/monsters").once('value').then(function(snapshot) {
        pokemonData = snapshot.val();
    });

    return {
        get : function(no) {
            return pokemonData[no-1];
        }
    }
}();
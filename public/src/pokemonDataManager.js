var pokemonDataManager = function(){

    var pokemonData = null;
    var unshowList = Array.from(new Array(15)).map((v,i)=> i + 1); // まだ表示していないポケモン番号

    firebase.database().ref("/-KZ2LnrwE_FORd78bIXx/monsters").once('value').then(function(snapshot) {
        pokemonData = snapshot.val();
    });

    return {
        get : function(no) {
            return pokemonData[no-1];
        },
        getNextPokemon : function() { // ------ ランダムで次のポケモンを取得
            if(unshowList.length == 0) { // ------ 全問題終了
                return null;
            }
            var rand = Math.floor(Math.random() * unshowList.length);
            var index = unshowList[rand];
            unshowList.splice(rand,1);
            console.log(index);
            return pokemonData[index];
        }
    }
}();
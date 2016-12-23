var pokemonDataManager = function(){

    var pokemonData = null;
    var unshowList = Array.from(new Array(151)).map((v,i)=> i + 1); // まだ表示していないポケモン番号

    var answerItem = {"location": "生息地", "height_m": "体長", "weight_kg": "体重", "type1": "タイプ", "evolution": "進化条件"};

    firebase.database().ref("/-KZ2LnrwE_FORd78bIXx/monsters").once('value').then(function(snapshot) {
        pokemonData = snapshot.val();
    });

    // 回答する項目を取得
    var getAnswerChoices = function(_data) {
        var answerChoices = [];
        for(var key in answerItem) {
            if(key in _data) {
                if(key === "location") {
                    answerChoices.push(String(_data[key].length) + " " + answerItem[key]);
                }else {
                    answerChoices.push(answerItem[key]);
                }
            }
        }
        return answerChoices;
    }

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
            pokemonData[index]["answerChoices"] = getAnswerChoices(pokemonData[index]);
            return pokemonData[index];
        }
    }
}();
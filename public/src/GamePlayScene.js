var GameBaseLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.director.getWinSize();

        // ----- ポケモンデータを取得して表示
        this.addChild(new PokemonCardlayer(pokemonDataManager.getNextPokemon()), 1, 151);
        this.addChild(new PokemonCardCaseLayer(cc.color.BLACK), 2);

        var nextBtn = new cc.MenuItemImage.create(res.nextbtn_png, null, null, this.onTouchNextBtn, this);
//        spriteNextBtn.setPosition(cc.p(size.width / 2, size.height / 2));
//        spriteNextBtn.setScale(1);
//         var nextBtn = new cc.MenuItemFont("次のポケモンへ", this.onTouchNextBtn, this);
//         nextBtn.setColor(cc.color.WHITE);
        nextBtn.setScale(0.5);
        var menu = new cc.Menu(nextBtn);
        menu.alignItemsVertically(); //自動整列
        menu.setPosition(cc.p(size.width-50, size.height-30));

        this.addChild(menu, 4);

        return true;
    },

    // ----- 次の問題へ
    onTouchNextBtn:function (sender) {
        cc.log("Touch NextBtn");
        this.removeChildByTag(151);
        this.addChild(new PokemonCardlayer(pokemonDataManager.getNextPokemon()), 1, 151);
    },
});

var GamePlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameBaseLayer();
        this.addChild(layer);
    }
});

// -----

/*
 * ポケモンカード用レイヤー
 */
var PokemonCardlayer = cc.Layer.extend({
    ctor:function(pokemonData) {
        this._super();
        var size = cc.director.getWinSize();

        // ----- 全問完了
        cc.log(pokemonData);
        if(pokemonData == null) {
            cc.log("game end");
            return true;
        }

        // ----- 背景設置
        var spriteBGImage = cc.Sprite.create(res.cardbackground_png);
        spriteBGImage.setPosition(cc.p(size.width / 2, size.height / 2));  //画面の中心に
        spriteBGImage.setScale(1);
        this.addChild(spriteBGImage);

        // ----- ポケモン名
        var labelPokemonName = cc.LabelTTF.create(pokemonData.name, "Meiryo", 25);
        labelPokemonName.setPosition(cc.p(labelPokemonName.width/2 + 10, size.height - labelPokemonName.height/2 - 5));
        labelPokemonName.setColor(cc.color.WHITE);
        var labelPokemonNameShadow = cc.LabelTTF.create(pokemonData.name, "Meiryo", 25);
        labelPokemonNameShadow.setPosition(cc.p(labelPokemonName.width/2 + 11, size.height - labelPokemonName.height/2 - 6));
        labelPokemonNameShadow.setColor(cc.color.BLACK);
        this.addChild(labelPokemonNameShadow, 1);
        this.addChild(labelPokemonName, 2);

        // ----- ポケモン画像
        var spritePokemonImage = cc.Sprite.create(res.p27_png);
        spritePokemonImage.setPosition(cc.p(size.width / 2, size.height - 200));
        spritePokemonImage.setScale(0.7);
        this.addChild(spritePokemonImage, 2);

        // ----- ポケモン回答種類
        var labelPokemonAnswerChoices = cc.LabelTTF.create(pokemonData.answerChoices.join("、 "), "Meiryo", 15);
        labelPokemonAnswerChoices.setPosition(cc.p(labelPokemonAnswerChoices.width / 2 + 5, size.height / 2 + 15));
        labelPokemonAnswerChoices.setColor(cc.color.WHITE);
        var labelPokemonAnswerChoicesShadow = cc.LabelTTF.create(pokemonData.answerChoices.join("、 "), "Meiryo", 15);
        labelPokemonAnswerChoicesShadow.setPosition(cc.p(labelPokemonAnswerChoices.width / 2 + 6, size.height / 2 + 14));
        labelPokemonAnswerChoicesShadow.setColor(cc.color.BLACK);
        this.addChild(labelPokemonAnswerChoicesShadow, 1);
        this.addChild(labelPokemonAnswerChoices, 2);

        // ----- ポケモン詳細データ
        // 図鑑番号
        var labelPokemonID = cc.LabelTTF.create("No. " + pokemonData.id, "Meiryo", 15);
        labelPokemonID.setPosition(cc.p(labelPokemonID.width / 2 + 5, size.height / 2 - 100));
        labelPokemonID.setColor(cc.color.BLACK);
        this.addChild(labelPokemonID, 1);

        // 説明(27文字で改行する)
        var lineLength = 1;
        for(var i=0; i < pokemonData.comment.length/27; i++) {
            var start = i * 27;
            var labelPokemonComment = cc.LabelTTF.create(pokemonData.comment.substr(start, 27), "Meiryo", 15);
            labelPokemonComment.setPosition(cc.p(labelPokemonComment.width / 2 + 5, size.height / 2 - 120 - 20*i));
            labelPokemonComment.setColor(cc.color.BLACK);
            this.addChild(labelPokemonComment, 1);
            lineLength = i;
        }

        // 体長
        var labelPokemonHeight = cc.LabelTTF.create("体長: " + pokemonData.height_m + "m", "Meiryo", 15);
        labelPokemonHeight.setPosition(cc.p(labelPokemonHeight.width / 2 + 5, size.height / 2 - 160 - 20*lineLength));
        labelPokemonHeight.setColor(cc.color.BLACK);
        this.addChild(labelPokemonHeight, 1);

        // 体重
        var labelPokemonWeight = cc.LabelTTF.create("体重: " + pokemonData.weight_kg + "kg", "Meiryo", 15);
        labelPokemonWeight.setPosition(cc.p(labelPokemonWeight.width / 2 + 5, size.height / 2 - 180 - 20*lineLength));
        labelPokemonWeight.setColor(cc.color.BLACK);
        this.addChild(labelPokemonWeight, 1);

        // タイプ
        var typeStr = pokemonData.type1;
        if(pokemonData.type2) {
            typeStr = typeStr + " " + pokemonData.type2;
        }
        var labelPokemonType = cc.LabelTTF.create("タイプ: " + typeStr, "Meiryo", 15);
        labelPokemonType.setPosition(cc.p(labelPokemonType.width / 2 + 5, size.height / 2 - 220 - 20*lineLength));
        labelPokemonType.setColor(cc.color.BLACK);
        this.addChild(labelPokemonType, 1);

        // 進化条件
        if(pokemonData.evolution) {
            var labelPokemonEvolution = cc.LabelTTF.create("進化条件: " + pokemonData.evolution, "Meiryo", 15);
            labelPokemonEvolution.setPosition(cc.p(labelPokemonEvolution.width / 2 + 5, size.height / 2 - 260 - 20*lineLength));
            labelPokemonEvolution.setColor(cc.color.BLACK);
            this.addChild(labelPokemonEvolution, 1);
        }

        // 生息地
        if(pokemonData.location) {

            // DBの整理で飛び番になる可能性あり。
            var keys = [];
            for(var key in pokemonData.location) {
                keys.push(key);
             }

            var labelPokemonLocation = cc.LabelTTF.create("生息地: ", "Meiryo", 15);
            labelPokemonLocation.setPosition(cc.p(labelPokemonLocation.width / 2 + 5, size.height / 2 - 300 - 20*lineLength));
            labelPokemonLocation.setColor(cc.color.BLACK);
            this.addChild(labelPokemonLocation, 1);
            for(var i=0; i < keys.length; i=i+2) {
                var str = pokemonData.location[keys[i]];
                // 生息地数が奇数の場合にundefinedが表示されるのを防ぐ
                if( pokemonData.location[keys[i+1]] ){
                    str+= "、 " + pokemonData.location[keys[i+1]];
                }
                var labelPokemonLocationN = cc.LabelTTF.create(str, "Meiryo", 15);
                labelPokemonLocationN.setPosition(cc.p(labelPokemonLocationN.width / 2 + 5, size.height / 2 - 320 - 20*lineLength - 20*i/2));
                labelPokemonLocationN.setColor(cc.color.BLACK);
                this.addChild(labelPokemonLocationN, 1);
            }
        }


        // レイヤーにタッチイベントリスナーを登録
        cc.eventManager.addListener(pokemonCardLayerEventListener, this);
    },
});

/*
 * ポケモンカードケース用レイヤー
 * 答え部分を隠す
 */
var PokemonCardCaseLayer = cc.LayerColor.extend({
    ctor: function(color) {
        this._super(color);

        // ----- サイズは画面下半分
        var size = cc.director.getWinSize();
        this.setContentSize(size.width, size.height/2);
    },
});

/*
 * 「ポケモンカードレイヤー」用のイベントリスナー
 */
var pokemonCardLayerEventListener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true, // don't pass to lower layer.

    onTouchBegan: function (touch, event) {
        cc.log("onTouchBegan");
        var target = event.getCurrentTarget();

        // ----- 画面上部だけタッチイベントを受け付ける。
        var size = cc.director.getWinSize();
        // todo:画面サイズからとっているが、PokemonCardCaseLayerのインスタンスからとるべき。
        var cardCaseRect = cc.rect(0, 0, size.width, size.height/2);

        if ( target.getLocalZOrder() == 1 && cc.rectContainsPoint(cardCaseRect, touch.getLocation())) {
            return false;
        }

        // ---- カードに触れたときだけタッチイベントを受け付ける。
        var location = target.convertToNodeSpace(touch.getLocation());
        var cardSize = target.getContentSize();
        var cardRect = cc.rect(0, 0, cardSize.width, cardSize.height);

        if( !cc.rectContainsPoint(cardRect, location) ){
            return false;
        }

        return true;
    },

    onTouchMoved: function (touch, event) {
        cc.log("onTouchMoved");

        // ------ 答えを見るために↑に動かす
        var target = event.getCurrentTarget();
        var delta = touch.getDelta();
        var moveDistance = cc.pAdd(target.getPosition(), delta).y;
        if(moveDistance > 0) {
            target.setPositionY(moveDistance);
        }

        var size = cc.director.getWinSize();
        // todo:画面サイズからとっているが、PokemonCardCaseLayerのインスタンスからとるべき。
        var lowerEndPointY = target.convertToWorldSpace(cc.Point(0,0)).y;
        if( target.getLocalZOrder() == 1 && lowerEndPointY >  size.height/2 ){
            target.setLocalZOrder(3);
        }
    },

    onTouchEnded: function (touch, event) {
        cc.log("onTouchEnded");
    },

    onTouchCancelled: function (touch, event) {
        cc.log("onTouchCancelled");
    }
});
var GameBaseLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.director.getWinSize();

        // ----- ポケモンデータを取得して表示
        this.addChild(new PokemonCardlayer(cc.color.RED, pokemonDataManager.get(1)), 1);
        this.addChild(new PokemonCardCaseLayer(cc.color.BLACK), 2);

         var nextBtn = new cc.MenuItemFont("次のポケモンへ", this.onTouchNextBtn, this);
         nextBtn.setColor(cc.color.WHITE);
         var menu = new cc.Menu(nextBtn);
         menu.alignItemsVertically(); //自動整列
         menu.setPosition(cc.p(size.width-50, size.height-20)); //画面中央に配置

        this.addChild(menu, 4);

        return true;
    },

    // ----- 次の問題へ
    onTouchNextBtn:function (sender) {
        cc.log("Touch NextBtn");
        // 0〜150の乱数を発生 ([10+1]を指定する)
        var rand = Math.floor( Math.random() * 151) - 1;
        this.addChild(new PokemonCardlayer(cc.color.RED, pokemonDataManager.get(rand)), 1);
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
var PokemonCardlayer = cc.LayerColor.extend({
    ctor:function(color, pokemonData) {
        this._super(color);
        var size = cc.director.getWinSize();

        // ----- ポケモン名
        var labelPokemonName = cc.LabelTTF.create(pokemonData.name, "Arial", 20);
        console.log(labelPokemonName.height);
        labelPokemonName.setPosition(cc.p(labelPokemonName.width/2, size.height - labelPokemonName.height/2));
        labelPokemonName.setColor(cc.color("#123456"));
        this.addChild(labelPokemonName, 1);

        // ----- ポケモン画像
        var spritePokemonImage = cc.Sprite.create(res.cat_jpg);
        spritePokemonImage.setPosition(cc.p(size.width / 2, size.height - labelPokemonName.height - spritePokemonImage.height/2));
        spritePokemonImage.setScale(1);
        this.addChild(spritePokemonImage);

        // ----- ポケモン回答種類

        // ----- ポケモン詳細データ

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
            cc.log("カードケースがタッチされた。");
            return false;
        }

        // ---- カードに触れたときだけタッチイベントを受け付ける。
        var location = target.convertToNodeSpace(touch.getLocation());
        var cardSize = target.getContentSize();
        var cardRect = cc.rect(0, 0, cardSize.width, cardSize.height);

        if( !cc.rectContainsPoint(cardRect, location) ){
            cc.log("カードの範囲外がタッチされた。");
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

        // ----- 答えを表示する
        if(moveDistance > 200) {
            //this.removeChildByTag(151);
            console.log(target);

        }
    },

    onTouchEnded: function (touch, event) {
        cc.log("onTouchEnded");
    },

    onTouchCancelled: function (touch, event) {
        cc.log("onTouchCancelled");
    }
});
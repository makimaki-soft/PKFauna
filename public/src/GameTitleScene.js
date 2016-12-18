var GameTitleLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.director.getWinSize();

        // ----- ゲームロゴを作成
        var sprite = cc.Sprite.create(res.cat_jpg);
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));  //画面の中心に
        sprite.setOpacity(0);   //透明度を0にして透明に [ 0 〜 255 ]
        sprite.setScale(1);
        this.addChild(sprite, 0);

        // ----- ゲームロゴをフェードインで表示
        var fadeIn = cc.FadeIn.create(1);
        sprite.runAction(cc.Sequence.create(fadeIn));


        // ----- ゲームスタートラベル
        var label = cc.LabelTTF.create("START", "Arial", 40);
        label.setPosition(cc.p(size.width / 2, 150));
        label.setColor(cc.color("#123456"));
        this.addChild(label, 1);

        // ----- タッチイベントリスナー登録
        cc.eventManager.addListener(labelEventListener, label);

        return true;
    },
});

var GameTitleScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameTitleLayer();
        this.addChild(layer);
    }
});

/*
 * 「ゲームスタート」用のイベントリスナー
 */
var labelEventListener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,

    onTouchBegan: function (touch, event) {
        cc.log("onTouchBegan");
        return true;
    },

    onTouchMoved: function (touch, event) {
        cc.log("onTouchMoved");
    },

    onTouchEnded: function (touch, event) {
        cc.log("onTouchEnded");
        cc.director.runScene(new GamePlayScene());
    },

    onTouchCancelled: function (touch, event) {
        cc.log("onTouchCancelled");
    }
});
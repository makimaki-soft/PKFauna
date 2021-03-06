var GameTitleLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.director.getWinSize();

        // ----- ゲームロゴ背景を作成
        var gamebg = cc.Sprite.create(res.gamebg_jpg);
        gamebg.setPosition(cc.p(size.width / 2, size.height / 2 - 30));
        gamebg.setOpacity(0);   //透明度を0にして透明に [ 0 〜 255 ]
        gamebg.setScale(0.5);
        this.addChild(gamebg, 0);

        // ----- フェードインで表示
        var fadeIn = cc.FadeIn.create(1);
        gamebg.runAction(cc.Sequence.create(fadeIn));


        // ----- ゲームロゴを作成
        var sprite = cc.Sprite.create(res.gamelog_png);
        sprite.setPosition(cc.p(size.width / 2, size.height-130));
        sprite.setOpacity(0);   //透明度を0にして透明に [ 0 〜 255 ]
        sprite.setScale(0.5);
        this.addChild(sprite, 0);

        // ----- ゲームロゴをフェードインで表示
        var fadeIn = cc.FadeIn.create(2);
        sprite.runAction(cc.Sequence.create(fadeIn));


        // ----- ゲームスタートラベル
        var label = cc.LabelTTF.create("START", "Arial", 40);
        label.setPosition(cc.p(size.width / 2, 100));
        label.setColor(cc.color.BLACK);
        this.addChild(label, 1);

        // ----- タッチイベントリスナー登録
        cc.eventManager.addListener(labelEventListener, label);

        var howtoplayBtn = new cc.MenuItemImage.create(res.howtoplay_png, null, null, this.onTouchHowtoplayButton, this);
        howtoplayBtn.setScale(0.3);

        var menu = new cc.Menu(howtoplayBtn);
        menu.alignItemsVertically(); //自動整列
        menu.setPosition(cc.p(size.width-50, 50));

        this.addChild(menu, 4);

        return true;
    },
    onTouchHowtoplayButton:function(sender){
        cc.log("onTouchHowtoplayButton");
        location.href = "howtoplay.html";
    }
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
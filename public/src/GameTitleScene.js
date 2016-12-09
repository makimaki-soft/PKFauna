var GameTitleLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.director.getWinSize();

        var sprite = cc.Sprite.create(res.fushigibana_jpg);
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));  //画面の中心に
        sprite.setOpacity(0);   //透明度を0にして透明に [ 0 〜 255 ]
        sprite.setScale(0.5);
        this.addChild(sprite, 0);

        // ----- 1秒かけてfadein -> 1秒表示 -> 次のシーンへ
        var fadeIn = cc.FadeIn.create(1);
        var animationEnd = cc.callFunc(function(){
            cc.director.runScene(new GamePlayScene());
        }, this);
        sprite.runAction(cc.Sequence.create(fadeIn, cc.delayTime(1), animationEnd));

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
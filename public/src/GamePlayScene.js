var GameBaseLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.director.getWinSize();

        var label = cc.LabelTTF.create("ゲーム画面", "Arial", 40);
        label.setPosition(size.width / 2, size.height / 2);
        label.setColor(cc.color("#123456"));
        this.addChild(label, 1);

        return true;
    },
});

var GamePlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameBaseLayer();
        this.addChild(layer);
    }
});
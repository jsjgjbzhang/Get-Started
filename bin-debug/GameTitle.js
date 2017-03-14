var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameTitle = (function (_super) {
    __extends(GameTitle, _super);
    function GameTitle() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageHandler, _this);
        return _this;
    }
    GameTitle.prototype.onAddToStageHandler = function () {
        this.bFind = false;
        this.gpoint = new egret.Point(0, 0);
        this.drawTitle();
        this.touchEnabled = true;
    };
    GameTitle.prototype.drawTitle = function () {
        this.type = Math.floor(Math.random() * GameConfig.COLOR.length);
        console.log(this.type, GameConfig.COLOR[this.type]);
        this.graphics.beginFill(GameConfig.COLOR[this.type]);
        this.graphics.drawRect(0, 0, GameConfig.TITLE_SIZE, GameConfig.TITLE_SIZE);
        this.graphics.endFill();
    };
    return GameTitle;
}(egret.Sprite));
__reflect(GameTitle.prototype, "GameTitle");
//# sourceMappingURL=GameTitle.js.map
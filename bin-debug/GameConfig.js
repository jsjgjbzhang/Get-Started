var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConfig = (function () {
    function GameConfig() {
    }
    return GameConfig;
}());
//enum TITLE_TYPE {RED,GREEN,BLUE};
GameConfig.COLOR = [0xacdbc9, 0xdbebc2, 0xfdd2b5, 0xf7a7a6, 0xf48894];
GameConfig.TYPE = [0, 1, 2, 3, 4];
GameConfig.MAP_WIDTH = 7;
GameConfig.MAP_HEIGHT = 12;
GameConfig.TITLE_SIZE = 90;
GameConfig.TITLE_GAP = 5;
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map
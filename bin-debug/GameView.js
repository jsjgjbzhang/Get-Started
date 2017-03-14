var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.titleMap = [];
        _this.aFindTitle = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageHandler, _this);
        return _this;
    }
    GameView.prototype.onAddToStageHandler = function (e) {
        //this.drawBackGround();
        this.drawTitle();
        this.initTouchEvent();
    };
    GameView.prototype.drawBackGround = function () {
        this.graphics.beginFill(Math.random() * 0xffffff);
        this.graphics.drawRect(0, 0, 500, 400);
        this.graphics.endFill();
    };
    GameView.prototype.initTouchEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
    };
    GameView.prototype.onTapHandler = function (e) {
        //(e.target as GameTitle).alpha = 0;
        //console.log(e.target);
        var title = e.target;
        console.log(title.type);
        this.checkMap(title.gpoint);
        this.fallTitle();
    };
    GameView.prototype.checkOneStarFourSide = function (p) {
        var checkArr = [];
        var oTitle = this.titleMap[p.x][p.y];
        //oTitle.bFind = true;
        var cTitle;
        var left = Math.max(0, p.x - 1);
        if (p.x != left) {
            cTitle = this.titleMap[left][p.y];
            if (cTitle && cTitle.type == oTitle.type) {
                checkArr.push(new egret.Point(left, p.y));
            }
        }
        var right = Math.min(GameConfig.MAP_WIDTH - 1, p.x + 1);
        if (p.x != right) {
            cTitle = this.titleMap[right][p.y];
            if (cTitle && cTitle.type == oTitle.type) {
                checkArr.push(new egret.Point(right, p.y));
            }
        }
        var up = Math.max(0, p.y - 1);
        if (p.y != up) {
            cTitle = this.titleMap[p.x][up];
            if (cTitle && cTitle.type == oTitle.type) {
                checkArr.push(new egret.Point(p.x, up));
            }
        }
        var down = Math.min(GameConfig.MAP_HEIGHT - 1, p.y + 1);
        if (p.y != down) {
            cTitle = this.titleMap[p.x][down];
            if (cTitle && cTitle.type == oTitle.type) {
                checkArr.push(new egret.Point(p.x, down));
            }
        }
        return checkArr;
    };
    GameView.prototype.checkMap = function (p) {
        var checkArr = [];
        var oTitle = this.titleMap[p.x][p.y];
        oTitle.bFind = true;
        var cTitle;
        var i = 0;
        var j = 0;
        var k = 0;
        var newSameColorList = [p];
        this.aFindTitle = [p];
        while (newSameColorList.length > 0) {
            for (i = 0; i < newSameColorList.length; i++) {
                checkArr = this.checkOneStarFourSide(newSameColorList[i]);
                if (checkArr.length > 0) {
                    for (j = 0; j < checkArr.length; j++) {
                        cTitle = this.titleMap[checkArr[j].x][checkArr[j].y];
                        if (!cTitle.bFind) {
                            this.aFindTitle.push(checkArr[j]);
                            newSameColorList.push(checkArr[j]);
                            cTitle.bFind = true;
                        }
                    }
                }
                newSameColorList.splice(i, 1);
            }
        }
        var bp;
        if (this.aFindTitle.length > 1) {
            for (k = 0; k < this.aFindTitle.length; k++) {
                bp = this.aFindTitle[k];
                cTitle = this.titleMap[bp.x][bp.y];
                this.removeChild(cTitle);
                this.titleMap[bp.x][bp.y] = null;
                cTitle = null;
                console.log(bp, this.titleMap[bp.x][bp.y]);
            }
        }
        else {
            oTitle.bFind = false;
        }
    };
    GameView.prototype.fallTitle = function () {
        var i, j, k;
        var title;
        for (i = 0; i < GameConfig.MAP_WIDTH; i++) {
            for (j = GameConfig.MAP_HEIGHT - 1; j >= 0; j--) {
                if (this.titleMap[i][j] == null) {
                    k = j - 1;
                    while (k >= 0) {
                        if (this.titleMap[i][k] == null) {
                            k--;
                        }
                        else {
                            title = this.titleMap[i][k];
                            this.titleMap[i][j] = title;
                            this.titleMap[i][k] = null;
                            title.gpoint.x = i;
                            title.gpoint.y = j;
                            egret.Tween.get(title).to({ y: j * GameConfig.TITLE_SIZE + j * GameConfig.TITLE_GAP }, 200);
                            //title.x = i * GameConfig.TITLE_SIZE + i * GameConfig.TITLE_GAP;
                            //title.y = j * GameConfig.TITLE_SIZE + j * GameConfig.TITLE_GAP;
                            k = -1;
                        }
                    }
                }
            }
        }
    };
    GameView.prototype.drawTitle = function () {
        var i = 0;
        var j = 0;
        var title;
        var map;
        for (i = 0; i < GameConfig.MAP_WIDTH; i++) {
            map = [];
            for (j = 0; j < GameConfig.MAP_HEIGHT; j++) {
                title = new GameTitle();
                title.x = i * GameConfig.TITLE_SIZE + i * GameConfig.TITLE_GAP;
                title.y = j * GameConfig.TITLE_SIZE + j * GameConfig.TITLE_GAP;
                this.addChild(title);
                map.push(title);
                //?
                title.gpoint = new egret.Point(i, j);
            }
            this.titleMap.push(map);
        }
        //console.log(this.titleMap);
    };
    return GameView;
}(egret.Sprite));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map
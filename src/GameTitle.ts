class GameTitle extends egret.Sprite{
	public type:number;
	public gpoint:egret.Point;
	public bFind:boolean;
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHandler,this);
	}

	private onAddToStageHandler()
	{
		this.bFind = false;
		this.gpoint = new egret.Point(0,0);
		this.drawTitle();
		this.touchEnabled = true;
	}

	private drawTitle()
	{
		this.type = Math.floor(Math.random()*GameConfig.COLOR.length);
		console.log(this.type,GameConfig.COLOR[this.type]);
		this.graphics.beginFill(GameConfig.COLOR[this.type]);
		this.graphics.drawRect(0,0,GameConfig.TITLE_SIZE,GameConfig.TITLE_SIZE);
		this.graphics.endFill();
	}


}
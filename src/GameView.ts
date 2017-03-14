class GameView extends egret.Sprite {

	private titleMap = [];

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStageHandler,this);

	}
	private onAddToStageHandler(e:egret.Event)
	{
		//this.drawBackGround();
		this.drawTitle();
		this.initTouchEvent();
	}

	private drawBackGround()
	{
		this.graphics.beginFill(Math.random() * 0xffffff);
		this.graphics.drawRect(0,0,500,400);
		this.graphics.endFill();
	}

	private initTouchEvent()
	{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTapHandler,this);
	}

	private onTapHandler(e:egret.TouchEvent)
	{
		//(e.target as GameTitle).alpha = 0;
		//console.log(e.target);
		let title:GameTitle = e.target as GameTitle;
		console.log(title.type);
		
		this.checkMap(title.gpoint);
		this.fallTitle();
	}
	private aFindTitle = [];

	private checkOneStarFourSide(p:egret.Point):Array<any>
	{

		let checkArr = [];
		let oTitle = this.titleMap[p.x][p.y];
		//oTitle.bFind = true;
		let cTitle:GameTitle;
		let left = Math.max(0, p.x-1);
		if(p.x != left)
		{
			cTitle = this.titleMap[left][p.y];
			if(cTitle && cTitle.type == oTitle.type)
			{
				checkArr.push(new egret.Point(left,p.y));
				//checkArr.push([left,p.y]);
			}
		}
		
		let right = Math.min(GameConfig.MAP_WIDTH-1, p.x+1);
		if(p.x != right)
		{
			cTitle = this.titleMap[right][p.y];
			if(cTitle && cTitle.type == oTitle.type)
			{
				checkArr.push(new egret.Point(right,p.y));
				//checkArr.push([right,p.y]);
			}
			//checkArr.push([right,p.y]);
		}

		let up = Math.max(0, p.y-1);
		if(p.y != up)
		{
			cTitle = this.titleMap[p.x][up];
			if(cTitle && cTitle.type == oTitle.type)
			{
				checkArr.push(new egret.Point(p.x,up));
				//checkArr.push([p.x,up]);
			}
			//checkArr.push([p.x,up]);
		}
		
		let down = Math.min(GameConfig.MAP_HEIGHT-1, p.y+1);
		if(p.y != down)
		{
			cTitle = this.titleMap[p.x][down];
			if(cTitle && cTitle.type == oTitle.type)
			{
				checkArr.push(new egret.Point(p.x,down));
				//checkArr.push([p.x,down]);
			}
			//checkArr.push([p.x,down]);
		}



		return checkArr;
	}

	private checkMap(p:egret.Point)
	{
		let checkArr = [];
		let oTitle = this.titleMap[p.x][p.y];
		oTitle.bFind = true;
		let cTitle:GameTitle;
		let i = 0;
		let j = 0;
		let k = 0;
		let newSameColorList = [p];
		this.aFindTitle = [p];
		while(newSameColorList.length > 0)
		{
			for(i = 0; i < newSameColorList.length; i++)
			{
				checkArr = this.checkOneStarFourSide(newSameColorList[i]);
				if(checkArr.length > 0)
				{
					for(j = 0; j < checkArr.length; j++)
					{
						cTitle = this.titleMap[checkArr[j].x][checkArr[j].y];
						if(!cTitle.bFind)
						{
							this.aFindTitle.push(checkArr[j]);
							newSameColorList.push(checkArr[j]);
							cTitle.bFind = true;
						}
					}
				}
				newSameColorList.splice(i, 1);
			}
		}

		
		let bp:egret.Point;
		if (this.aFindTitle.length > 1) 
		{  
			for (k = 0; k < this.aFindTitle.length; k++) 
			{  
				bp = this.aFindTitle[k] as egret.Point;
				cTitle = this.titleMap[bp.x][bp.y];
				this.removeChild(cTitle);
				this.titleMap[bp.x][bp.y] = null;
				cTitle = null;
				console.log(bp,this.titleMap[bp.x][bp.y]);
			}  
    	}
		else
		{
			oTitle.bFind = false;
		}
	}


	private fallTitle()
	{
		let i, j, k;
		let title:GameTitle;
		for(i = 0; i < GameConfig.MAP_WIDTH; i++)
		{
			for(j = GameConfig.MAP_HEIGHT - 1; j >=0; j--)
			{
				if(this.titleMap[i][j] == null)
				{
					k = j - 1;	
					while(k >= 0)
					{
						if(this.titleMap[i][k] == null)
						{
							k--;
						}
						else
						{
							title = this.titleMap[i][k];
							this.titleMap[i][j] = title;
							this.titleMap[i][k] = null;
							title.gpoint.x = i;
							title.gpoint.y = j;
							egret.Tween.get(title).to( {y:j * GameConfig.TITLE_SIZE + j * GameConfig.TITLE_GAP}, 200);

							//title.x = i * GameConfig.TITLE_SIZE + i * GameConfig.TITLE_GAP;
							//title.y = j * GameConfig.TITLE_SIZE + j * GameConfig.TITLE_GAP;
							k = -1;
						}
					}	
				}
			}
		}
	}

	private drawTitle()
	{
		var i = 0;
		var j = 0;
		var title:GameTitle;
		let map:GameTitle[];
		for(i = 0;i<GameConfig.MAP_WIDTH;i++)
		{
			map = [];
			for(j = 0;j<GameConfig.MAP_HEIGHT;j++)
			{
				title = new GameTitle();
				title.x = i * GameConfig.TITLE_SIZE + i * GameConfig.TITLE_GAP;
				title.y = j * GameConfig.TITLE_SIZE + j * GameConfig.TITLE_GAP;
				
				this.addChild(title);
				map.push(title);
				//?
				title.gpoint = new egret.Point(i,j);
				
			}
			this.titleMap.push(map);
		}

		//console.log(this.titleMap);
		
	}
}
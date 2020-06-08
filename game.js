let prize_config={
    count:8,
    prize:["purple","red","orange","yellow","black","green","blue","violet"]
}


let config = {
    type: Phaser.CANVAS,
    width:800,
    height:400,
    backgroundColor:0xffcc00,
    
    scene:{
        preload: preload,
        create: create,
        update:update,
    }
};

let game=new Phaser.Game(config);

function preload(){
    console.log("in preload");
    this.load.image('background','/images/back.jpg');
    this.load.image('pin','/images/pin.png');
    this.load.image('stand','/images/stand.png');
    this.load.image('wheel','/images/wheely.png');
}

function create(){
    console.log("in create");
    let w=game.config.width;
    let h=game.config.height;
    let background =this.add.sprite(0,0,'background');
    
    background.setPosition(w/2,h/2);
    background.setScale(0.2);
    
    
    
    let pin=this.add.sprite(w/2,h/2-150,'pin');
    pin.setScale(0.15);
    pin.depth=1;
    
    let stand=this.add.sprite(w/2,h/2+150,'stand');
    stand.setScale(0.15);
    
    this.wheel=this.add.sprite(w/2,h/2,'wheel');
    this.wheel.setScale(0.73);
    
    this.input.on("pointerdown",spinwheel,this);
    
    font_style={
        font: "bold 30px arial",
        allign: "center",
        color: "red",        
    }
    this.game_text=this.add.text(10,10,"welcome folk",font_style);
    
    
    
    
    
}

function update(){
    console.log("in update");
    //this.wheel.angle+=1;
}




function spinwheel(){
    console.log("pressed");
    
    
    
    let rounds=Phaser.Math.Between(2,4);
    let degrees=Phaser.Math.Between(0,7)*30;
    let total_angle=rounds*360+degrees;
    console.log(total_angle);
    let idx=Math.floor(degrees/(360/prize_config.count));
    
    tween=this.tweens.add({
       targets: this.wheel,
        angle: total_angle,
        ease:"Cubic.easeOut",
        callbackScope:this,
        duration: 3000,
        onComplete:function(){this.game_text.setText(prize_config.prize[idx]);}
    });
    
    
}
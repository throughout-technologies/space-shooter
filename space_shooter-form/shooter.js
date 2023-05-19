
const inputs = [{id:"1",name:"First Name",type:"text",placeholder:"john"},{id:"2",name:"Last Name",type:"text",placeholder:"deo"},{id:"3",name:"Email",type:"email",placeholder:"example@gmail.com"},{id:"4",name:"Designation",type:"text",placeholder:"Manager"},{id:"5",name:"Mobile",type:"number",placeholder:"000 000 0000"},{id:"6",name:"Organisation",type:"text",placeholder:"Throughout Technology"}]
t=31,progress=0;
str="",id=0;
win=false
exist=[];

// ========================== show input fields =================================== //
for(let i=0;i<inputs.length;i++){
	str+=`<div class="form-group col-lg-4 form-floating col-md-5 mt-2">
	<input type="${inputs[i].type}" class="form-control" name="${inputs[i].name}" id="${inputs[i].id}" placeholder="${inputs[i].name}" style="height:70%;" disabled>
	<label for="${inputs[i].name}" class="form-label " style="margin-left: 2%;  font-size:14px;">${inputs[i].name}</label>
	  </div>`;
	document.getElementById("contact-info").innerHTML=str
}// =============================================================================== //

// =================================== Timer  [ 30-sec ] =========================== //
var clock=setInterval(()=>{
	t=t-1
	progress+=3.33;
	if((t==0)||(win)){
		if(!win){ 
			alert("game over");
		}
		
		document.getElementById("btn-submit").classList.remove("invisible");
		inputs.forEach(inputvalue => {
				progress=100;
				if(!exist.includes(`${inputvalue.id}`)){
					document.getElementById(`${inputvalue.id}`).disabled=false;
					exist.push(`${inputvalue.id}`);		
				}	
				else{
					console.log("Already Exist")
				}})			
				clearInterval(clock);
			}
		document.getElementById("progressing").style.width = `${progress}%`;
},1000)
//  ================================================================================ //

function loadImages(){
	// To load custom images as enemy and ship
	enemyImage = new Image();
	shipImage = new Image();
	bulletImage = new Image();

	enemyImage.src = "Images/enemy.png";
	shipImage.src = "Images/player.png"
	bulletImage.src = "Images/bullet.png"
}


function init(){
// document.getElementById('mycanvas') retrieves the canvas element defined in the html file by using its id.
canvas = document.getElementById('mycanvas');
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;
console.log(canvas);
gameover = false;

// pen is an object created using the getContext() function.
pen = canvas.getContext('2d'); // 2d is passed to make 2d games in html

W = canvas.width;
H = canvas.height;
prev_counter = 0;
counter = 0;

loadImages();

// ship is the spaceship that player is using.
ship = {
	x : 300,
	y : H-50,
	w : 30,
	h : 30,
	speed : 10,
	bullets : [],

	update : function(){
		// this.x = this.x + this.speed // to check boundry
		// if(this.x >= W-this.w || this.x<=0){
		// 	this.speed *= -1;
		// }
	},

	draw : function(){
		pen.drawImage(shipImage,ship.x,ship.y,ship.w,ship.h)
	},

	shoot : function(){

		if(counter-prev_counter>=1){
			console.log("Shooting a bullet");
			var b = new bullet(this.x + (this.w)/2, this.y,10);
			this.bullets.push(b);
			prev_counter = counter;
		}		
	}
};




// === Listener for events ===========
function buttonGotPressed(e){
	if(e.key==" "){
		ship.shoot();
	}
	if(e.key=="ArrowLeft"){
		ship.x = ship.x - ship.speed;
		if(ship.x<=0){
			ship.x= 0;
		}
	}
	if(e.key=="ArrowRight"){
		ship.x = ship.x + ship.speed;
		if(ship.x >= W-ship.w){
			ship.x = W-ship.w;
		}
	}
} // ===================================

document.addEventListener('keydown', buttonGotPressed);   // When spacebar is pressed, then the ship shoots the bullet
enemies = [];
var e = new enemy(10,20,5);
enemies.push(e);

}

// Class defined for a bullet
function bullet(x,y,speed){
	this.x = x; 
	this.y = y;
	this.w = 4;
	this.h = 14;
	this.state = "active"
	this.speed = speed;

	this.draw = function(){
        pen.drawImage(bulletImage,this.x,this.y,this.w,this.h);
	}

	this.update = function(){
		this.y -= this.speed;
		if(this.y<=0){
			this.state = "inactive"
		}
	}
}

// Class defined for an enemy
function enemy(x,y,speed){
	this.x = x;
	this.y = y;
	this.w = 25;
	this.h = 25;
	this.state = "active"
	this.speed = speed;

	this.draw = function(){
		pen.drawImage(enemyImage,this.x,this.y,this.w,this.h);
	}

	this.update = function(){

		this.x = this.x ;
		if(this.x >= W-this.w || this.x<=0){
			this.speed *= -1;
		}

		this.y++;
		if(this.y<=0){
			this.state = "inactive"
		}
	}
}


function draw(){
	// In the canvas, towards the right, it is +ve x axis and towards bottom, it is +ve y axis.

	//pen.fillStyle = "green" // to fill with green color.
	//pen.fillRect(10,10,50,50) // (10,10) is the co-ordinate of the upper left vertex of rectange. (50,50) = (width,height)

	//to erase the old screen. Here, we erase the whole screen and redraw it again.
	pen.clearRect(0,0,W,H);

	pen.fillStyle = "red"  // to fill with red color.
	//Drawing the ship
	ship.draw()

	//Drawing the bullets
	ship.bullets.forEach(function(bullet){
		bullet.draw();
	});

	//Drawing the enemy
	enemies.forEach(function(enemy){
		enemy.draw();

	});

}

function update(){
	
	if(win||t==0) {
		return -1
	}

	
	ship.update()

	ship.bullets.forEach(function(bullet){
		bullet.update();
		enemies.forEach(function(enemy){
				if(isCollidingWithBullet(bullet,enemy)){
					this.state = "inactive";
					console.log("enemy died");
					var index = enemies.indexOf(enemy);
					enemies.splice(index,1);
				for(let i=0;i<inputs.length;i++){
					if(!exist.includes(`${inputs[i].id}`)){
						document.getElementById(`${inputs[i].id}`).disabled=false;
						document.getElementById("trofy").innerText = `${inputs[i].id}/6`;
						exist.push(`${inputs[i].id}`);	
						break
					}	
					else{
						console.log("Already Exist")
					}
					}}
			});

	});

	enemies.forEach(function(enemy){
		enemy.update();
	});
	
    // Math.random() generates a random number between 0 and 1.
	var no =  Math.random();
	if(no<0.01){
		// Math.floor(Math.random()*(W-50))
		var x =Math.floor(Math.random()*(W-50)) ;
		// multiplied by 100 to generate enemies in the region from 0 to 100px.
		var y =0;

		var speed = Math.random()*10 +2;
		var negative = Math.random();
		if(negative<0.5){
			speed = -speed;
		}

		var e = new enemy(x,y,speed);
		enemies.push(e);
	}

	if(exist.length==6){
		alert("Congratulations !!!  you won the game.");
		win=true;
		progress=100
	}

	enemies.forEach(function(enemy){
		if(isColliding(ship,enemy)){
			pen.clearRect(0,0,W,H);
			init()
		}
	});
	
} 

function isColliding(r1,r2){
	var x_axis = Math.abs(r1.x - r2.x)<= Math.max(r1.w,r2.w);
	var y_axis = Math.abs(r1.y - r2.y)<= Math.max(r1.h,r2.h);

	return x_axis && y_axis;
}

function isCollidingWithBullet(r1,r2){
	var x_axis = Math.abs(r1.x - r2.x)<= Math.max(r1.w,r2.w);
	var y_axis = Math.abs((r1.y+20) - r2.y)<= Math.max(r1.h,r2.h);
	return x_axis & y_axis ;
}

// a function to call update() and draw()
function render(){
	draw();
	update();
	console.log("in render");
	counter++;
	
	if( win || t==0){
	  pen.clearRect(0,0,W,H);
	  return 0
	}
	window.requestAnimationFrame(render);
}
	
function startGame(){ 
	init();
	render();
}

startGame();

function showInput(e){
	e.preventDefault()
	let obj={}

	inputs.forEach(inputValue => {
		obj[`${inputValue.name}`] = document.getElementById(`${inputValue.id}`).value;
		document.getElementById(`${inputValue.id}`).value="";
	});

	// var formdata = new FormData()
	// for(let i=0;i<inputs.length;i++){
	// 	let value = document.getElementById(`${inputs[i].id}`).value
	// 	formdata.append(inputs[i].name,value)
	// }
	console.log(obj)
}

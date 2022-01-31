
function init_game() {

	// Set the canvas size
	game_canvas = document.getElementById("game_canvas");
	game_canvas.width = window.innerHeight * 0.9;
	game_canvas.height = window.innerHeight * 0.9;

	// Create a Pen to draw on Canvas
	pen = game_canvas.getContext('2d');

	// Set background color of Canvas
	pen.fillStyle = "black";
	pen.fillRect(0, 0, game_canvas.width, game_canvas.height);




	// Initialize the Snake
	init_snake()

}


function init_snake() {

	// Snake Class
	snake = {

		start_length: 5,
		color: "white",
		body_coord: [], 
		start_direction: "r",
		cell_size: 60,

		init_body: function () {
			// Function to push (x, y) coordinates of each cell of the snake_body_coord array.
			for(var i = this.start_length - 1; i >= 0; i--){
				this.body_coord.push({x: i, y: 0});
			}

		},

		draw: function () {
			// Function to draw snake
			for(var i = 0; i < this.body_coord.length; i++){
				pen.fillStyle = this.color;

				pen.fillRect(this.body_coord[i].x * this.cell_size + 5, this.body_coord[i].y * this.cell_size + 5, 
					this.cell_size - 3, this.cell_size - 3);
			}
		},


		update: function () {

			var head_x = this.body_coord[0].x;
			var head_y = this.body_coord[0].y;

			// Add new cell to the snake based on the
			// key pressed
			if(this.direction=="u"){
				new_x = head_x;
				new_y = head_y - 1;
			}
			else if(this.direction=="d"){
				new_x = head_x;
				new_y = head_y + 1;
			}
			else if(this.direction=="l"){
				new_x = head_x - 1;
				new_y = head_y;
			}
			else{
				new_x = head_x + 1;
				new_y = head_y;
			}

			this.body_coord.unshift({x: new_x, y: new_y});
			this.body_coord.pop();

		},

		clear: function() {
			pen.clearRect(0, 0, game_canvas.width, game_canvas.height);
			
			// Set background color of Canvas
			pen.fillStyle = "black";
			pen.fillRect(0, 0, game_canvas.width, game_canvas.height);
		}

	}

	snake.init_body()

}


function keyboard_control(button_pressed){
	if(button_pressed.key=="ArrowUp"){
		snake.direction = "u";
	}
	else if(button_pressed.key=="ArrowDown"){
		snake.direction = "d";
	}
	else if(button_pressed.key=="ArrowLeft"){
		snake.direction = "l";
	}
	else{
		snake.direction = "r";
	}

	console.log(button_pressed.key)
}



function draw_screen(){
	snake.clear()
	snake.draw()
}

function update_screen(){
	snake.update()
}

function game_loop(){
	draw_screen()
	update_screen()
}


// ** Main **
init_game();
setInterval(game_loop, 100);

document.addEventListener('keydown', keyboard_control)
const canvas = document.querySelector("canvas#snake");
const canvasDiv = document.querySelector(".canvas-div");

// Detecta a tecla pressionada
document.addEventListener("keydown", play);

const body = document.querySelector("body");

// Variáveis relacionadas à pontuação
const score = document.querySelector(".score");
const scoreDiv = document.querySelector(".score-div");
const recordDiv = document.querySelector(".record");
let record = 0;

let start = document.querySelector(".start");
const options = document.querySelector(".game-div");

// Cores padrão
let bgColor = "#52ff01";
let snColor = "#0e7505";
let fdColor = "#ffffff";

const blueTheme = document.querySelector(".blue");
const purpleTheme = document.querySelector(".purple");
const greenTheme = document.querySelector(".green");

// Mecanismo de mudança de tema
blueTheme.addEventListener("click", () => {
    bgColor = "#099dff";
    snColor = "#1d21fd";
    body.style.backgroundColor = "#099dff6b";
})

purpleTheme.addEventListener("click", ()=>{
    bgColor="#0f0326";
    snColor = "#ac7ff3";
    body.style.backgroundColor = "#ac7ff3";
})

greenTheme.addEventListener("click", ()=>{
    bgColor = "#52ff01";
    snColor = "#0e7505";
    body.style.backgroundColor = "#51ff016c";
})

// O mecanismo de active evita que o usuário cause erros pressionando a
// barra de espaço

var active = false;

function play(event) {

    // Mecanismo para iniciar com a tecla de espaço
    if(event.keyCode == 32 && active == false) {
        let points = 0;
        score.innerHTML = "SCORE: " + points;
        
        active = true;

        // Removendo menu de opções

        options.classList.add("disabled");
        options.classList.remove("active");

        // Adicionando div com pontuação e recorde

        scoreDiv.classList.remove("disabled");
        scoreDiv.classList.add("active");

        // Mostra o canvas
        canvasDiv.classList.remove("disabled");

        let context = canvas.getContext("2d");
        let box = 32;
        let snake = [];
        snake[0] = {
            x: 8*box,
            y: 8*box
        }

        let food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        }

        let direction = "right";

        function criarBG() {
            context.fillStyle = bgColor;
            context.fillRect(0, 0, 16 * box, 16 * box);
        }

        function criarCobrinha() {
            for(var i = 0 ; i < snake.length ; i++) {
                context.fillStyle = snColor;
                context.fillRect(snake[i].x, snake[i].y, box, box);
            }
        }

        function drawFood() {
            context.fillStyle = fdColor;
            context.fillRect(food.x, food.y, box, box);
        }

        document.addEventListener("keydown", update);

        /*
            37 - Left
            38 - Up
            39 - Right
            40 - Down
        */

        function update(event) {
            if(event.keyCode == 37 && direction != "right") direction = "left";
            if(event.keyCode == 38 && direction != "down") direction = "up";
            if(event.keyCode == 39 && direction != "left") direction = "right";
            if(event.keyCode == 40 && direction != "up") direction = "down";
        }

        function iniciarJogo() {
        
            // Para impedir bugs nas bordas da tela, o código foi alterado nesta parte
        
            /*
            if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
            if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
            if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
            if(snake[0].y < 0 && direction == "up") snake[0].y = 16*box;*/
        
            if(snake[0].x > 15*box) snake[0].x = 0;
            if(snake[0].x < 0) snake[0].x = 16 * box;
            if(snake[0].y > 15*box) snake[0].y = 0;
            if(snake[0].y < 0) snake[0].y = 16*box;
        
            // Controle de fim de jogo
        
            for(var c = 1; c < snake.length ; c++) {
                if(snake[0].x == snake[c].x && snake[0].y == snake[c].y) {
                    clearInterval(jogo);
                    alert("Game Over (X - X)");
                    options.classList.remove("disabled");
                    options.classList.add("active");
                    canvasDiv.classList.add("disabled");
                    active = false;

                    if(points>record) {
                        record = points;
                        recordDiv.innerHTML = "BEST SCORE: " + record;
                    }

                }
            }
        
            // Criando elementos
        
            criarBG();
            criarCobrinha();
            drawFood();
        
            let snakeX = snake[0].x;
            let snakeY = snake[0].y;
        
            if(direction == "right") snakeX += box;
            if(direction == "left") snakeX -= box;
            if(direction == "up") snakeY -= box;
            if(direction == "down") snakeY += box;
        
            if(snakeX != food.x || snakeY != food.y) {
                snake.pop();
            } else {
                food.x = Math.floor(Math.random() * 15 + 1) * box;
                food.y = Math.floor(Math.random() * 15 + 1) * box;
                points += 50;
                score.innerHTML = "SCORE: " + points;
            }
        
            let newHead = {
                x: snakeX,
                y: snakeY
            }
        
            snake.unshift(newHead);
        
        }

        let jogo = setInterval(iniciarJogo, 100); // Milisegundos

    }    
}


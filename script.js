/* CANVAS */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let WIDTH;
let HEIGHT;


/* =========================================
   KONFIGURASI
   ========================================= */

const GRID_SIZE = 20;
const JUMLAH_MAKANAN = 5;


/* =========================================
   WARNA
   ========================================= */

const COLORS = {

    white: "#ffffff",
    black: "#232837",
    darkBlue: "#4169b4",
    lightBlue: "#b4e1ff",
    pink: "#ff91b9",
    lightPink: "#ffd2e1",
    red: "#eb4655",
    shadow: "#c3d2e6",
    eyeBlack: "#1e232d"

};


/* =========================================
   WARNA ULAR
   ========================================= */

const SNAKE_COLORS = [

    [
        "#3c8cd2",
        "#64b4f0",
        "#8cc8fa"
    ],

    [
        "#50b464",
        "#78dc8c",
        "#a0f0aa"
    ],

    [
        "#965ada",
        "#b482e6",
        "#d2aaf5"
    ],

    [
        "#f09632",
        "#fab45a",
        "#ffd282"
    ],

    [
        "#dc465a",
        "#f06e78",
        "#fa96a0"
    ]

];


/* =========================================
   GAME STATE
   ========================================= */

let page = "home";

let snake = [];

let direction = {
    x: 1,
    y: 0
};


/* 
   MAKANAN SEKARANG BERJUMLAH 5
*/

let foods = [];

let score = 0;

let colorIndex = 0;

let gameOver = false;

let lastMove = 0;


/* =========================================
   RESIZE CANVAS
   ========================================= */

function resizeCanvas() {

    WIDTH = window.innerWidth;

    HEIGHT = window.innerHeight;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();


/* =========================================
   BUAT SATU MAKANAN
   ========================================= */

function createFood() {

    const columns =
        Math.floor(
            WIDTH / GRID_SIZE
        );


    const rows =
        Math.floor(
            HEIGHT / GRID_SIZE
        );


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const x =
            Math.floor(
                Math.random() * columns
            ) * GRID_SIZE;


        const y =
            Math.floor(
                Math.random() * rows
            ) * GRID_SIZE;


        /* Cek makanan tidak berada
           di tubuh ular */

        const kenaUlar =
            snake.some(
                part =>
                    part.x === x &&
                    part.y === y
            );


        /* Cek makanan tidak bertumpuk
           dengan makanan lain */

        const kenaMakanan =
            foods.some(
                food =>
                    food.x === x &&
                    food.y === y
            );


        if (
            !kenaUlar &&
            !kenaMakanan
        ) {

            return {

                x: x,
                y: y

            };

        }

    }


    return {

        x: GRID_SIZE,
        y: GRID_SIZE

    };

}


/* =========================================
   BUAT 5 MAKANAN SEKALIGUS
   ========================================= */

function createAllFoods() {

    foods = [];


    for (
        let i = 0;
        i < JUMLAH_MAKANAN;
        i++
    ) {

        const makanan =
            createFood();


        foods.push(
            makanan
        );

    }

}


/* =========================================
   RESET GAME
   ========================================= */

function resetGame() {

    const startX =
        Math.floor(
            WIDTH / 2 / GRID_SIZE
        ) * GRID_SIZE;


    const startY =
        Math.floor(
            HEIGHT / 2 / GRID_SIZE
        ) * GRID_SIZE;


    snake = [

        {
            x: startX,
            y: startY
        },

        {
            x:
                startX - GRID_SIZE,

            y: startY
        },

        {
            x:
                startX -
                GRID_SIZE * 2,

            y: startY
        }

    ];


    direction = {

        x: 1,
        y: 0

    };


    score = 0;

    colorIndex = 0;

    gameOver = false;

    lastMove = 0;


    /* 
       LANGSUNG BUAT 5 MAKANAN
    */

    createAllFoods();


    document
        .getElementById("gameOver")
        .classList
        .remove("show");

}


/* =========================================
   UBAH ARAH
   ========================================= */

function changeDirection(x, y) {

    /* Mencegah ular
       berbalik 180 derajat */

    if (
        x === -direction.x &&
        y === -direction.y
    ) {

        return;

    }


    direction.x = x;

    direction.y = y;

}


/* =========================================
   START GAME
   ========================================= */

function startGame() {

    resetGame();

    page = "game";


    document
        .getElementById("homeButtons")
        .style.display = "none";

}


/* =========================================
   HOME
   ========================================= */

function goHome() {

    page = "home";

    gameOver = false;


    document
        .getElementById("homeButtons")
        .style.display = "flex";


    document
        .getElementById("gameOver")
        .classList
        .remove("show");

}


/* =========================================
   GAME OVER
   ========================================= */

function triggerGameOver() {

    gameOver = true;


    document
        .getElementById("finalScore")
        .textContent = score;


    document
        .getElementById("gameOver")
        .classList
        .add("show");

}


/* =========================================
   KEYBOARD
   ========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key.toLowerCase();


        /* HOME */

        if (page === "home") {

            if (
                key === "enter" ||
                key === " "
            ) {

                startGame();

            }

            return;

        }


        /* GAME */

        if (page === "game") {

            if (!gameOver) {


                /* ATAS */

                if (
                    key === "arrowup" ||
                    key === "w"
                ) {

                    changeDirection(
                        0,
                        -1
                    );

                }


                /* BAWAH */

                else if (
                    key === "arrowdown" ||
                    key === "s"
                ) {

                    changeDirection(
                        0,
                        1
                    );

                }


                /* KIRI */

                else if (
                    key === "arrowleft" ||
                    key === "a"
                ) {

                    changeDirection(
                        -1,
                        0
                    );

                }


                /* KANAN */

                else if (
                    key === "arrowright" ||
                    key === "d"
                ) {

                    changeDirection(
                        1,
                        0
                    );

                }


                /* KELUAR */

                else if (
                    key === "escape"
                ) {

                    goHome();

                }

            }


            else {

                /* RESTART */

                if (
                    key === "r"
                ) {

                    resetGame();

                }


                /* HOME */

                else if (
                    key === "escape"
                ) {

                    goHome();

                }

            }

        }

    }
);


/* =========================================
   TOUCH / MOBILE CONTROL
   ========================================= */

document
    .querySelectorAll(".control")
    .forEach(button => {

        button.addEventListener(
            "pointerdown",
            function(event) {

                event.preventDefault();


                /* Jangan aktif ketika
                   Game Over */

                if (gameOver) {

                    return;

                }


                const dir =
                    button.dataset.dir;


                if (
                    dir === "up"
                ) {

                    changeDirection(
                        0,
                        -1
                    );

                }


                else if (
                    dir === "down"
                ) {

                    changeDirection(
                        0,
                        1
                    );

                }


                else if (
                    dir === "left"
                ) {

                    changeDirection(
                        -1,
                        0
                    );

                }


                else if (
                    dir === "right"
                ) {

                    changeDirection(
                        1,
                        0
                    );

                }

            }

        );

    });


/* =========================================
   TOMBOL GAME OVER UNTUK HP
   ========================================= */


/* MAIN LAGI */

const restartButton =
    document.getElementById(
        "restartBtn"
    );


if (restartButton) {

    restartButton.addEventListener(
        "pointerdown",
        function(event) {

            event.preventDefault();


            resetGame();

            page = "game";

        }

    );

}


/* HOME */

const gameOverHomeButton =
    document.getElementById(
        "gameOverHomeBtn"
    );


if (gameOverHomeButton) {

    gameOverHomeButton.addEventListener(
        "pointerdown",
        function(event) {

            event.preventDefault();


            goHome();

        }

    );

}


/* =========================================
   BUTTON START
   ========================================= */

document
    .getElementById("startBtn")
    .addEventListener(
        "click",
        startGame
    );


/* =========================================
   BUTTON EXIT
   ========================================= */

document
    .getElementById("exitBtn")
    .addEventListener(
        "click",
        function() {

            goHome();

        }

    );


/* =========================================
   UPDATE GAME
   ========================================= */

function update(timestamp) {

    if (
        page !== "game" ||
        gameOver
    ) {

        return;

    }


    /* Kecepatan meningkat
       setiap 3 makanan */

    const speed =
        Math.min(
            18,
            8 +
            Math.floor(
                score / 3
            )
        );


    const interval =
        1000 / speed;


    if (
        timestamp - lastMove <
        interval
    ) {

        return;

    }


    lastMove = timestamp;


    const head =
        snake[0];


    const newHead = {

        x:
            head.x +
            direction.x *
            GRID_SIZE,

        y:
            head.y +
            direction.y *
            GRID_SIZE

    };


    snake.unshift(
        newHead
    );


    /* =====================================
       CEK SEMUA MAKANAN
       ===================================== */

    let makan = false;


    for (
        let i = 0;
        i < foods.length;
        i++
    ) {

        const food =
            foods[i];


        if (

            newHead.x ===
                food.x &&

            newHead.y ===
                food.y

        ) {

            /* Tambah skor */

            score++;


            makan = true;


            /* Ganti warna ular */

            colorIndex =
                (
                    colorIndex + 1
                ) %
                SNAKE_COLORS.length;


            /*
               Makanan yang dimakan
               langsung pindah ke
               tempat baru.
            */

            foods[i] =
                createFood();


            break;

        }

    }


    /* Kalau tidak makan,
       ekor dihapus */

    if (!makan) {

        snake.pop();

    }


    /* =====================================
       TABRAKAN DINDING
       ===================================== */

    if (

        newHead.x < 0 ||

        newHead.x +
            GRID_SIZE >
            WIDTH ||

        newHead.y < 0 ||

        newHead.y +
            GRID_SIZE >
            HEIGHT

    ) {

        triggerGameOver();

        return;

    }


    /* =====================================
       TABRAKAN TUBUH
       ===================================== */

    for (
        let i = 1;
        i < snake.length;
        i++
    ) {

        if (

            newHead.x ===
                snake[i].x &&

            newHead.y ===
                snake[i].y

        ) {

            triggerGameOver();

            return;

        }

    }

}


/* =========================================
   BACKGROUND
   ========================================= */

function drawBackground() {

    ctx.fillStyle =
        COLORS.black;


    ctx.fillRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );

}


/* =========================================
   HOME SNAKE
   ========================================= */

function drawHomeSnake() {

    const cx =
        WIDTH / 2;


    const cy =
        HEIGHT / 2 - 15;


    const radius =
        Math.max(
            16,
            Math.min(
                25,
                WIDTH / 32
            )
        );


    const positions = [

        [
            cx - 4 * radius,
            cy + 12
        ],

        [
            cx - 3 * radius,
            cy + 2
        ],

        [
            cx - 2 * radius,
            cy - 8
        ],

        [
            cx - radius,
            cy
        ],

        [
            cx,
            cy + 10
        ],

        [
            cx + radius,
            cy
        ]

    ];


    const colors = [

        "#af7de1",
        "#ff91b9",
        "#ff9b4b",
        "#ffcd4b",
        "#5abe6e",
        "#5aa0eb"

    ];


    positions.forEach(
        (position, index) => {

            ctx.beginPath();


            ctx.arc(
                position[0],
                position[1],
                radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                colors[index];


            ctx.fill();


            ctx.strokeStyle =
                COLORS.white;


            ctx.lineWidth = 2;


            ctx.stroke();

        }
    );


    const headX =
        cx + radius;


    const headY =
        cy;


    /* MATA */

    ctx.fillStyle =
        COLORS.white;


    ctx.beginPath();


    ctx.arc(
        headX + 8,
        headY - 7,
        5,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.beginPath();


    ctx.arc(
        headX + 8,
        headY + 7,
        5,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.fillStyle =
        COLORS.eyeBlack;


    ctx.beginPath();


    ctx.arc(
        headX + 10,
        headY - 7,
        2,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.beginPath();


    ctx.arc(
        headX + 10,
        headY + 7,
        2,
        0,
        Math.PI * 2
    );


    ctx.fill();


    /* PIPI */

    ctx.fillStyle =
        COLORS.lightPink;


    ctx.beginPath();


    ctx.arc(
        headX + 4,
        headY + 16,
        4,
        0,
        Math.PI * 2
    );


    ctx.fill();


    /* LIDAH */

    ctx.strokeStyle =
        COLORS.pink;


    ctx.lineWidth = 2;


    ctx.beginPath();


    ctx.moveTo(
        headX + radius - 2,
        headY
    );


    ctx.lineTo(
        headX + radius + 10,
        headY
    );


    ctx.lineTo(
        headX + radius + 14,
        headY - 4
    );


    ctx.moveTo(
        headX + radius + 10,
        headY
    );


    ctx.lineTo(
        headX + radius + 14,
        headY + 4
    );


    ctx.stroke();

}


/* =========================================
   MAKANAN
   ========================================= */

function drawFood() {

    /*
       Gambar semua 5 makanan
    */

    foods.forEach(
        food => {

            const cx =
                food.x +
                GRID_SIZE / 2;


            const cy =
                food.y +
                GRID_SIZE / 2;


            const radius =
                GRID_SIZE / 2 - 2;


            /* BAYANGAN */

            ctx.beginPath();


            ctx.arc(
                cx + 1,
                cy + 2,
                radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                COLORS.shadow;


            ctx.fill();


            /* MAKANAN */

            ctx.beginPath();


            ctx.arc(
                cx,
                cy,
                radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                COLORS.red;


            ctx.fill();


            ctx.strokeStyle =
                COLORS.white;


            ctx.lineWidth = 1;


            ctx.stroke();


            /* KILAUAN */

            ctx.beginPath();


            ctx.arc(
                cx - 3,
                cy - 3,
                3,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                COLORS.lightPink;


            ctx.fill();

        }

    );

}


/* =========================================
   ULAR
   ========================================= */

function drawSnake() {

    const colors =
        SNAKE_COLORS[
            colorIndex
        ];


    snake.forEach(
        (part, index) => {

            let color;


            if (
                index === 0
            ) {

                color =
                    colors[0];

            }


            else if (
                index % 2 === 0
            ) {

                color =
                    colors[1];

            }


            else {

                color =
                    colors[2];

            }


            const centerX =
                part.x +
                GRID_SIZE / 2;


            const centerY =
                part.y +
                GRID_SIZE / 2;


            const radius =
                GRID_SIZE / 2;


            ctx.beginPath();


            ctx.arc(
                centerX,
                centerY,
                radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                color;


            ctx.fill();


            ctx.strokeStyle =
                COLORS.white;


            ctx.lineWidth = 1;


            ctx.stroke();

        }

    );


    drawSnakeEyes();

}


/* =========================================
   MATA ULAR
   ========================================= */

function drawSnakeEyes() {

    const head =
        snake[0];


    let eyes;


    if (
        direction.x === 1
    ) {

        eyes = [

            [
                head.x + 14,
                head.y + 6
            ],

            [
                head.x + 14,
                head.y + 14
            ]

        ];

    }


    else if (
        direction.x === -1
    ) {

        eyes = [

            [
                head.x + 6,
                head.y + 6
            ],

            [
                head.x + 6,
                head.y + 14
            ]

        ];

    }


    else if (
        direction.y === -1
    ) {

        eyes = [

            [
                head.x + 6,
                head.y + 6
            ],

            [
                head.x + 14,
                head.y + 6
            ]

        ];

    }


    else {

        eyes = [

            [
                head.x + 6,
                head.y + 14
            ],

            [
                head.x + 14,
                head.y + 14
            ]

        ];

    }


    eyes.forEach(
        position => {

            /* Mata putih */

            ctx.beginPath();


            ctx.arc(
                position[0],
                position[1],
                4,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                COLORS.white;


            ctx.fill();


            /* Pupil */

            ctx.beginPath();


            ctx.arc(
                position[0],
                position[1],
                2,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                COLORS.eyeBlack;


            ctx.fill();

        }

    );

}


/* =========================================
   SCORE
   ========================================= */

function drawScore() {

    const panel = {

        x: 15,

        y: 15,

        width: 165,

        height: 52

    };


    /* Background */

    ctx.beginPath();


    roundedRect(
        panel.x,
        panel.y,
        panel.width,
        panel.height,
        17
    );


    ctx.fillStyle =
        COLORS.white;


    ctx.fill();


    /* Border */

    ctx.beginPath();


    roundedRect(
        panel.x,
        panel.y,
        panel.width,
        panel.height,
        17
    );


    ctx.strokeStyle =
        COLORS.lightBlue;


    ctx.lineWidth = 3;


    ctx.stroke();


    /* Text */

    ctx.fillStyle =
        COLORS.darkBlue;


    ctx.font =
        "bold 20px Arial";


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    ctx.fillText(

        "SKOR  " + score,

        panel.x +
            panel.width / 2,

        panel.y +
            panel.height / 2

    );

}


/* =========================================
   ROUNDED RECTANGLE
   ========================================= */

function roundedRect(
    x,
    y,
    width,
    height,
    radius
) {

    ctx.moveTo(
        x + radius,
        y
    );


    ctx.lineTo(
        x + width - radius,
        y
    );


    ctx.quadraticCurveTo(
        x + width,
        y,
        x + width,
        y + radius
    );


    ctx.lineTo(
        x + width,
        y + height - radius
    );


    ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
    );


    ctx.lineTo(
        x + radius,
        y + height
    );


    ctx.quadraticCurveTo(
        x,
        y + height,
        x,
        y + height - radius
    );


    ctx.lineTo(
        x,
        y + radius
    );


    ctx.quadraticCurveTo(
        x,
        y,
        x + radius,
        y
    );


    ctx.closePath();

}


/* =========================================
   DRAW HOME
   ========================================= */

function drawHome() {

    drawBackground();


    /* JUDUL */

    ctx.fillStyle =
        COLORS.darkBlue;


    ctx.font =
        `bold ${Math.max(
            42,
            WIDTH / 8
        )}px Arial`;


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "top";


    ctx.fillText(

        "SNAKE",

        WIDTH / 2,

        Math.max(
            30,
            HEIGHT / 12
        )

    );


    /* ULAR */

    drawHomeSnake();


    /* PETUNJUK */

    ctx.fillStyle =
        "#738096";


    ctx.font =
        `${Math.max(
            15,
            WIDTH / 55
        )}px Arial`;


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "bottom";


    ctx.fillText(

        "WASD  •  PANAH  •  TOMBOL LAYAR",

        WIDTH / 2,

        HEIGHT - 15

    );

}


/* =========================================
   DRAW GAME
   ========================================= */

function drawGame() {

    drawBackground();


    /* GAMBAR 5 MAKANAN */

    drawFood();


    /* GAMBAR ULAR */

    drawSnake();


    /* GAMBAR SKOR */

    drawScore();

}


/* =========================================
   MAIN LOOP
   ========================================= */

function gameLoop(timestamp) {

    update(timestamp);


    if (
        page === "home"
    ) {

        drawHome();

    }


    else {

        drawGame();

    }


    requestAnimationFrame(
        gameLoop
    );

}


/* =========================================
   MULAI LOOP
   ========================================= */

requestAnimationFrame(
    gameLoop
);


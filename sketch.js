// =========================
// CELESTE PLATFORMER
// WITH YOUR PNG IMAGES
// =========================


// ---------- CONSTANTS ----------
const GRAVITY = 0.6;


// ---------- IMAGES ----------
let bg;
let playerImg;
let platformImg;


// ---------- PLAYER VARIABLES ----------
let playerX = 200;
let playerY = 100;

let playerVX = 0;
let playerVY = 0;


// ---------- PLATFORMS ----------
let platforms = [];


// ---------- CUSTOM BOUNCE PLATFORM ----------
let bouncePlatform = {
  x: 550,
  y: 220,
  w: 140,
  h: 30
};


// =========================
// LOAD PNG IMAGES
// =========================
function preload() {

  bg = loadImage("assets/images/background.png");

  playerImg = loadImage("assets/images/player.png");

  platformImg = loadImage("assets/images/platform.png");
}


// =========================
// SETUP
// =========================
function setup() {

  createCanvas(windowWidth, windowHeight);

  // normal platforms
  platforms.push({
    x: 0,
    y: height - 40,
    w: width,
    h: 40
  });

  platforms.push({
    x: 200,
    y: 500,
    w: 180,
    h: 30
  });

  platforms.push({
    x: 450,
    y: 400,
    w: 180,
    h: 30
  });

  platforms.push({
    x: 750,
    y: 300,
    w: 180,
    h: 30
  });
}


// =========================
// DRAW LOOP
// =========================
function draw() {

  // ---------- BACKGROUND IMAGE ----------
  image(bg, 0, 0, width, height);


  // ---------- GRAVITY ----------
  playerVY = playerVY + GRAVITY;


  // ---------- KEY MOVEMENT ----------
  if (keyIsDown(LEFT_ARROW)) {

    playerVX = playerVX - 0.5;
  }


  if (keyIsDown(RIGHT_ARROW)) {

    playerVX = playerVX + 0.5;
  }


  // ---------- FRICTION ----------
  playerVX = playerVX * 0.9;


  // ---------- VELOCITY MOVES PLAYER ----------
  playerX = playerX + playerVX;

  playerY = playerY + playerVY;


  // ---------- KEEP PLAYER INSIDE CANVAS ----------
  playerX = constrain(playerX, 0, width - 50);

  playerY = constrain(playerY, 0, height + 200);


  // ---------- DRAW PLATFORMS ----------
  drawPlatforms();


  // ---------- PLATFORM COLLISION ----------
  checkPlatformCollision();


  // ---------- CUSTOM BOUNCE PLATFORM ----------
  drawBouncePlatform();

  checkBouncePlatform();


  // ---------- DRAW PLAYER ----------
  drawPlayer();
}


// =========================
// PLAYER IMAGE
// =========================
function drawPlayer() {

  push();

  image(
    playerImg,
    playerX,
    playerY,
    50,
    50
  );

  pop();
}


// =========================
// DRAW NORMAL PLATFORMS
// =========================
function drawPlatforms() {

  for (let platform of platforms) {

    image(
      platformImg,
      platform.x,
      platform.y,
      platform.w,
      platform.h
    );
  }
}


// =========================
// PLATFORM COLLISION
// =========================
function checkPlatformCollision() {

  for (let platform of platforms) {

    let touching =
      playerX + 50 > platform.x &&
      playerX < platform.x + platform.w &&
      playerY + 50 > platform.y &&
      playerY + 50 < platform.y + platform.h + 15 &&
      playerVY >= 0;

    if (touching) {

      playerY = platform.y - 50;

      playerVY = 0;
    }
  }
}


// =========================
// CUSTOM PLATFORM
// =========================
function drawBouncePlatform() {

  fill(0, 255, 255);

  rect(
    bouncePlatform.x,
    bouncePlatform.y,
    bouncePlatform.w,
    bouncePlatform.h
  );

  fill(255);

  textSize(20);

  text(
    "BOUNCE",
    bouncePlatform.x + 20,
    bouncePlatform.y - 10
  );
}


// =========================
// BOUNCE MECHANIC
// =========================
function checkBouncePlatform() {

  let touching =
    playerX + 50 > bouncePlatform.x &&
    playerX < bouncePlatform.x + bouncePlatform.w &&
    playerY + 50 > bouncePlatform.y &&
    playerY + 50 < bouncePlatform.y + bouncePlatform.h + 15 &&
    playerVY >= 0;

  if (touching) {

    playerY = bouncePlatform.y - 50;

    // CUSTOM MECHANIC
    playerVY = -20;
  }
}


// =========================
// JUMP
// =========================
function keyPressed() {

  if (keyCode === 32) {

    playerVY = -12;
  }
}
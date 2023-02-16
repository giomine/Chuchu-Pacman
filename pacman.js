// ! Style it mobile-first if possible
// const grid = querySelect grid
// const cells = []
// const width = 15
// const cellCount = width * width
// currentScore = 0
// highScore = currentScore //? saved in localStorage
// ghosts = []
// walls = [] //! collisions, if you hit a wall you can't move through it -- how should i make these? either set blocks or random blocks
// startingPosition = 47
// currentPosition = startingPosition //? current position of Pacman
// ghostsStartingPosition
// ghostsCurrentPosition
// lives = 3
// food = [] //? if you eat all the food you win!

// ? create the grid and place Pacman in it
// function createGrid(){
  // use a for loop to create cell elements
  // create cell div
  // append cell div to grid
  // push cell into cellCount array
  // addPacman(startingPosition)
// }

// ? get Pacman's position
// function addPacman(position){
  // cells[position].classList.add('pacman')
// }
//? Start game + set everything back to defaultValue()
// function startGame(){
  // defaultValues()
// }

//? All default game values incl. score, lives, positions, and empty grid
// defaultValues() {
  // currentScore = 0
  // currentPosition = startingPosition
  // lives = 3
// }

//? Movement of Pacman triggered by keydown events
// movePacman(e) {
  // const key = e.key
  // if (e.key === 'ArrowLeft'){
    // etc etc
  // }
// }

//? Current Pacman must be removed each time we move his position 
// function removePacman() {
  // 
// }

//? If flashing food is eaten, ghosts flash and you can catch them, which sends them back to their starting pos
// function ateFlashingFood(){
  // 
// }

//? Checks if collision takes off a life and changes position back to startingPosition, or if it's a wall, prevents movement
// function collision(){
  // 
// }

//? Triggered when lives is 0
// function gameOver(){
  // 
// }

//? Each ghost has it's own random path/style that leads towards Pacman -- hard part is making them follow pacman himself - need a pathfinder
// function ghostMovement() {
  // 
// }


// document.addEventListener('keydown', movePacman)

// ? If I have time left for swipes
// document.addEventListener('touchstart', swipeStart)
// document.addEventListener('touchmove', swipeMove)
// document.addEventListener('touchend', swipeEnd)


//! The biggest challenge here is the logic which moves the ghosts. While their movement may appear random, they are always moving toward Pac Man, who is himself being moved by the player.
function init(){
  // ! Style it mobile-first if possible
  // const grid = querySelect grid
  // const cells = []
  // const width = 15
  // const cellCount = width * width
  // currentScore = 0
  // highScore = currentScore //? saved in localStorage
  // ghosts = [] // an array of ghosts, each one is an image file with it's own startingPosition and currentPosition variables
  // wallCells = [] // collisions, if you hit a wall you can't move through it. walls are styled as a CSS class added to specific grid cells.
  // startingPosition = 47
  // currentPosition = startingPosition //? current position of Pacman
  // ghostsStartingPosition
  // ghostsCurrentPosition
  // lives = 3
  // food // if you eat all the food you win! will be an emoji or image file added to specific grid cells 
  // flashingFood // will be an emoji or image file added to specific grid cells
  // ! can be bonus food worth * 100 points, comes to a random place on a timeOut so you only get bonus points if you eat it in time

  // ? create the grid and place Pacman, ghosts, food, and walls in it
  // function createGrid(){
    // use a for loop to create cell elements
    // create cell div
    // append cell div to grid
    // push cell into cellCount array
    // addPacman(startingPosition)
    // addGhost(startingPosition)
    // food 
    // flashingFood
    // addWall()
  // }

  //? add Pacman to grid
  // function addPacman(position){
    // cells[position].classList.add('pacman')
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
    // cell[currentPosition].classList.remove(.pacman)
  // }

  // ? get each Ghost's position
  // function addGhost(position){
    // ghosts.forEach((ghost) => {
      // cells[position].classList.add('ghost')
    // })
  // }

  //? Each ghost has it's own random path/style. Hard part is making them follow pacman - need a pathfinder. Similar to movePacman but with random numbers?
  // function ghostMovement() {
    // 
  // }

  //? Current Ghost must be removed each time it moves position 
  // function removeGhost() {
    // cell[ghostsCurrentPosition].classList.remove(.ghost) //? make sure this can be applied to each individual ghost
  // }

  //? If flashing food is eaten, ghosts flash and you can catch them, which sends them back to their starting pos
  // function ateFlashingFood(){
    // if (currentPosition.classList.contains(flashingFood)){
      // cell[flashingFoodPosition].classList.remove(.flashing-food) //? make sure this cycles through whole food array
      // flashingGhosts()
    // }
  // }

  //? if ghosts are flashing, you can catch them and they return to their starting position
  // function flashingGhosts(){
    //? add flashing animation to all ghosts on setTimeout of 5 seconds (do they stay in the home spot for as long as the flashyfood is running or do they resume the chase immediately?)
    //? during those five seconds:
    // if (currentPosition === ghostsCurrentPosition){
      // ghostsCurrentPosition = ghostsStartingPosition
      //? reset and restart ghost movement or not necessary?
    // }
  // }

  //? Add walls to grid
  // function addWall(){
    // cell[wallCell].classList.add(.wall)
  // }
  
  //? Checks if collision takes off a life and changes position back to startingPosition, or if it's a wall, prevents movement
  // function collision(){
  //   if (currentPosition contains ghost/CurrentPosition || currentPosition next to wallCells) {
  //     lives--
  //     if (lives === 0) {
  //       gameOver() 
  //     } else {
  //       position resets to startingPosition
  //     }
  //   }
  // }
    
  //? Triggered when lives is 0
  // function gameOver(){
    // removePacman()
    // removeGhosts()
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
  
  // document.addEventListener('keydown', movePacman)
  
  // ? If I have time left for swipes (eg: swipe left will do same thing as keypress ArrowLeft)
  // document.addEventListener('touchstart', swipeStart)
  // document.addEventListener('touchmove', swipeMove)
  // document.addEventListener('touchend', swipeEnd)

}

window.addEventListener('DOMContentLoaded', init)

//! The biggest challenge here is the logic which moves the ghosts. While their movement may appear random, they are always moving 
//! toward Pac Man, who is himself being moved by the player.
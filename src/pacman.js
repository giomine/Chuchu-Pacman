function init(){
  
  const grid = document.querySelector('.grid')
  const width = 25
  const length = 15
  const cellCount = width * length
  const cells = []
  // currentScore = 0
  // highScore = currentScore //? saved in localStorage
  // ghosts = [] // an array of ghosts, each one is an image file with it's own startingPosition and currentPosition variables
  const wallCells = [50, 51, 52, 300, 301, 302, 72, 73, 74, 322, 323, 324, 7, 32, 57, 17, 42, 67, 12, 37, 307, 332, 357, 317, 342, 367, 337, 362, 102, 103, 104, 127, 152, 202, 227, 252, 253, 254, 120, 121, 122, 147, 172, 222, 247, 272, 271, 270, 155, 156, 157, 205, 206, 207, 167, 168, 169, 217, 218, 219, 85, 86, 87, 88, 89, 285, 286, 287, 288, 289, 135, 160, 185, 210, 211, 212, 136, 137, 138, 213, 188] // collisions, if you hit a wall you can't move through it. walls are styled as a CSS class added to specific grid cells.
  // ! Let's make collisions next
  const startingPosition = 70
  let currentPosition = startingPosition
  // ghostsStartingPosition
  // ghostsCurrentPosition
  // lives = 3
  // food // if you eat all the food you win! will be an emoji or image file added to specific grid cells 
  // flashingFood // will be an emoji or image file added to specific grid cells
  // bonusFood // worth 100 points, comes to a random place on a timeOut so you only get bonus points if you eat it in time
  // ? create the grid and place Pacman, ghosts, food, and walls in it
  function createGrid(){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addPacman(startingPosition)
    // addGhost(startingPosition)
    // food 
    // flashingFood
    addWall()
  }


  function addPacman(position){
    cells[position].classList.add('pacman')
  }

  function movePacman(e) {
    const nextCell = currentPosition + 1
    const lastCell = currentPosition - 1
    const cellAbove = currentPosition - width
    const cellBelow = currentPosition + width
    removePacman()
    if ((e.key === 'ArrowLeft' || e.key === 'a') && currentPosition % width !== 0){
      cells[lastCell].classList.contains('wall') ? console.log('wall on left!') : currentPosition--
    } else if ((e.key === 'ArrowRight' || e.key ===  'd') && currentPosition % width !== width - 1) {
      cells[nextCell].classList.contains('wall') ? console.log('wall on right!') : currentPosition++
    } else if ((e.key === 'ArrowUp' || e.key === 'w') && currentPosition >= width) {
      cells[cellAbove].classList.contains('wall') ? console.log('wall above!') : currentPosition -= width
    } else if ((e.key === 'ArrowDown' || e.key === 's') && currentPosition + width < cellCount){
      cells[cellBelow].classList.contains('wall') ? console.log('wall below!') : currentPosition += width
    } else {
      console.log('well now i\'m not doing it 🙅🏻‍♀️')
    }
    addPacman(currentPosition)
  }

  function removePacman() {
    cells[currentPosition].classList.remove('pacman')
  }

  function addWall(){
    wallCells.forEach(wall => {
      // console.log(wall) // so each of these is a number, that number needs to be a cells[i]
      cells[wall].classList.add('wall')
    })
  }

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
  
  //? Checks if collision takes off a life and changes position back to startingPosition, or if it's a wall, prevents movement
  // collision()
  // function collision(position){
    // if (currentPosition contains ghost/CurrentPosition || currentPosition next to wallCells) {
      // lives--
      // if (lives === 0) {
      //   gameOver() 
      // } else {
      //   position resets to startingPosition
      // }
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

  
  document.addEventListener('keydown', movePacman)
  
  // ? If I have time left for swipes (eg: swipe left will do same thing as keypress ArrowLeft)
  // document.addEventListener('touchstart', swipeStart)
  // document.addEventListener('touchmove', swipeMove)
  // document.addEventListener('touchend', swipeEnd)
  
  createGrid()
}

window.addEventListener('DOMContentLoaded', init)

//! The biggest challenge here is the logic which moves the ghosts. While their movement may appear random, they are always moving 
//! toward Pac Man, who is himself being moved by the player.
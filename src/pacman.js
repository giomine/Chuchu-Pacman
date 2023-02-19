function init(){
  
  const startButton = document.querySelector('#top div')
  const grid = document.querySelector('.grid')
  const width = 25
  const length = 15
  const cellCount = width * length
  const cells = []
  let interval
  let timer
  let currentScore = 0
  let ateFlashingFood = false
  let currentScoreDisplay = document.querySelector('#bottom div span')
  currentScoreDisplay.innerText = currentScore
  // highScore = currentScore //? saved in localStorage
  const ghostOne = {
    ghostStartingPosition: 0,
    ghostCurrentPosition: 0,
  }
  const ghostTwo = {
    ghostStartingPosition: 10,
    ghostCurrentPosition: 10,
  }
  const ghostThree = {
    ghostStartingPosition: 20,
    ghostCurrentPosition: 20,
  }
  const ghostFour = {
    ghostStartingPosition: 30,
    ghostCurrentPosition: 30,
  }
  const ghosts = [ghostOne, ghostTwo, ghostThree, ghostFour] // an array of ghosts, each one is an image file with it's own startingPosition and currentPosition variables
  const wallCells = [50, 51, 52, 300, 301, 302, 72, 73, 74, 322, 323, 324, 7, 32, 57, 17, 42, 67, 12, 37, 307, 332, 357, 317, 342, 367, 337, 362, 102, 103, 104, 127, 152, 202, 227, 252, 253, 254, 120, 121, 122, 147, 172, 222, 247, 272, 271, 270, 155, 156, 157, 205, 206, 207, 167, 168, 169, 217, 218, 219, 85, 86, 87, 88, 89, 285, 286, 287, 288, 289, 135, 160, 185, 210, 211, 212, 136, 137, 138, 213, 188] // collisions, if you hit a wall you can't move through it. walls are styled as a CSS class added to specific grid cells.
  const startingPosition = 70
  let currentPosition = startingPosition
  lives = 3
  livesDisplay = document.querySelector('#bottom div:nth-of-type(2) span')
  livesDisplay.innerText = '♥️♥️♥️'
  const flashingFood = [113, 200, 349, 99] // will be an emoji or image file added to specific grid cells
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
    addGhost(ghosts.ghostStartingPosition)
    addFlashingFood()
    addWall()
    addFood() // if you eat all the food you win! will be an emoji or image file added to specific grid cells 
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
    if (cells[currentPosition].classList.contains('food')){
      cells[currentPosition].classList.remove('food')
      currentScore++
      currentScoreDisplay.innerText = currentScore
    }
    if (cells[currentPosition].classList.contains('flashing-food')){
      ateFlashingFood = true
      currentScore += 100
      currentScoreDisplay.innerText = currentScore
      cells[currentPosition].classList.remove('flashing-food')
    }

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
    ghostCollision()
  }

  function removePacman() {
    cells[currentPosition].classList.remove('pacman')
  }

  function addWall(){
    wallCells.forEach(wall => {
      //? console.log(wall) // each of these is a number, that number needs to be a cells[i]
      cells[wall].classList.add('wall')
    })
  }

  function addFood(){
    cells.forEach(cell => {
      if (cell.classList.contains('wall') || cell.classList.contains('flashing-food')){
      } else {
        cell.classList.add('food')
      }
    })
  }

  //? get each Ghost's position
  function addGhost(position){
    for (let i = 0; i < ghosts.length; i++){
      if (cells[position]?.classList.contains('ghost')){
      } 
      else {
        cells[ghosts[i].ghostCurrentPosition]?.classList.add('ghost')
      }
    }
  }

  //? if ghosts are flashing, you can catch them and they return to their starting position
  //? add flashing animation to all ghosts on setTimeout of 5 seconds; during those 5 secs if Pacman eats them they go back to startingPos
  function flashingGhosts(position){
    for (let i = 0; i < ghosts.length; i++){
      if (currentPosition === ghosts[i].ghostCurrentPosition && cells[position]?.classList.contains('flashing-ghost')){
        console.log("Got 'im!!!")
        ghosts[i].ghostCurrentPosition = ghosts[i].ghostStartingPosition
      }

      if (cells[position]?.classList.contains('flashing-ghost')){
      } else {
        cells[ghosts[i].ghostCurrentPosition]?.classList.add('flashing-ghost')
      }
    }
    timer = setTimeout(() => {
      ateFlashingFood = false
    }, 5000)
  }

  //? Each ghost has it's own random path/style. Hard part is making them follow pacman - need a pathfinder. Similar to movePacman but with random numbers?
  function ghostMovement(){
    
    interval = setInterval(() => {
      removeGhost()
      
      for (let i = 0; i < ghosts.length; i++){
        const nextCell = ghosts[i].ghostCurrentPosition + 1
        const lastCell = ghosts[i].ghostCurrentPosition - 1
        const cellAbove = ghosts[i].ghostCurrentPosition - width
        const cellBelow = ghosts[i].ghostCurrentPosition + width
        const randomMvmt = [nextCell, lastCell, cellAbove, cellBelow]
        //! they now move randomly and can't walk through walls, but they can keep going eg left right left right left right
        //! they need to walk a path, not go backwards and forwards
        const random = Math.floor(Math.random() * randomMvmt.length)

        if (randomMvmt[random] === nextCell && ghosts[i].ghostCurrentPosition % width !== width - 1){
          cells[nextCell]?.classList.contains('wall') || cells[nextCell]?.classList.contains('ghost') ? 
          console.log('blocked!') :
          ghosts[i].ghostCurrentPosition++
        } else if (randomMvmt[random] === lastCell && ghosts[i].ghostCurrentPosition % width !== 0) {
          cells[lastCell]?.classList.contains('wall') || cells[lastCell]?.classList.contains('ghost') ? 
          console.log('blocked!') : 
          ghosts[i].ghostCurrentPosition--
        } else if (randomMvmt[random] === cellBelow && ghosts[i].ghostCurrentPosition + width < cellCount){
          cells[cellBelow]?.classList.contains('wall') || cells[cellBelow]?.classList.contains('ghost') ? 
          console.log('blocked!') : 
          ghosts[i].ghostCurrentPosition = ghosts[i].ghostCurrentPosition + width 
        } else if (randomMvmt[random] === cellAbove && ghosts[i].ghostCurrentPosition >= width){
          cells[cellAbove]?.classList.contains('wall') || cells[cellAbove]?.classList.contains('ghost') ? 
          console.log('blocked!') : 
          ghosts[i].ghostCurrentPosition = ghosts[i].ghostCurrentPosition - width 
        }
        ateFlashingFood ? flashingGhosts(ghosts[i].ghostCurrentPosition) : addGhost(ghosts[i].ghostCurrentPosition)
      }
    }, 500)
  }
  ghostMovement()

  function removeGhost() {
    for (let i = 0; i < ghosts.length; i++){
      cells[ghosts[i].ghostCurrentPosition]?.classList.remove('ghost', 'flashing-ghost', 'caught-ghost')
    }
  }

  function addFlashingFood(){
    flashingFood.forEach((food) => {
      cells[food].classList.add('flashing-food')
    })
  }
  
  
  //? Checks if collision takes off a life and changes position back to startingPosition, or if it's a wall, prevents movement
  function ghostCollision(){
    if (cells[currentPosition]?.classList.contains('ghost')){
      console.log('ghost!!!')
      lives--
      livesDisplay.innerText = lives ? '❤️'.repeat(lives) : '💔'
      if (lives === 0){
        console.log('stopping....')
        clearInterval(interval)
        setTimeout(() => {
          alert('Game over!!!')
        }, 100)
      }
    }
  }
  ghostCollision()
    
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
  function defaultValues() { //! call inside restartGame
    currentScore = 0
    currentPosition = startingPosition //! this needs changing, can still move pacman after game over
    lives = 3
    livesDisplay.innerText = lives ? '❤️'.repeat(lives) : '💔' 
  }

  // startButton.addEventListener('click', startGame)
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
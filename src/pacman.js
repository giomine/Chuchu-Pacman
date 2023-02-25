function init(){
  // ! VISUAL THEMES
  let bg = document.querySelector('body')
  let main = document.querySelector('main')
  let sections = document.querySelectorAll('section')
  const clicked = document.createElement('audio')
  let pacman = window.localStorage.getItem('pacman')
  if (!pacman) { window.localStorage.setItem('pacman', 'pacman') }
  const pacManTheme = document.querySelector('.pacman-theme')
  pacManTheme?.addEventListener('click', function(){
    console.log('chose pacman!') 
    clicked.src = './sounds/pacwakawaka.m4a'
    clicked.play()
    window.localStorage.setItem('pacman', 'pacman')
  })

  const parappaTheme = document.querySelector('.parappa-theme')
  parappaTheme?.addEventListener('click', function(){ 
  console.log('chose parappa!') 
  clicked.src = './sounds/badabada.m4a'
  clicked.play()
  window.localStorage.setItem('pacman', 'parappa')
})

  const chuchuTheme = document.querySelector('.chuchu-theme')
  chuchuTheme?.addEventListener('click', function(){
    console.log('chose chuchu!') 
    clicked.src = './sounds/chuchu-start.m4a'
    clicked.play()
    window.localStorage.setItem('pacman', 'chuchu')
  })

  //! DIFFICULTY MODES
  let difficulty = window.localStorage.getItem('difficulty')
  if (!difficulty) { window.localStorage.setItem('difficulty', 'medium') }
  let speed = 0
  const easyMode = document.querySelector('.easy')
  const mediumMode = document.querySelector('.medium')
  const hardMode = document.querySelector('.hard')
  easyMode?.addEventListener('click', function(){
    console.log('chose easy mode!') 
    clicked.src = './sounds/shenmue-start.m4a'
    clicked.play()
    window.localStorage.setItem('difficulty', 'easy')
  })
  mediumMode?.addEventListener('click', function(){
    console.log('chose medium mode!') 
    clicked.src = './sounds/shenmue-start.m4a'
    clicked.play()
    window.localStorage.setItem('difficulty', 'medium')
  })
  hardMode?.addEventListener('click', function(){
    console.log('chose hard mode!') 
    clicked.src = './sounds/shenmue-start.m4a'
    clicked.play()
    window.localStorage.setItem('difficulty', 'hard')
  })
  if (window.localStorage.getItem('difficulty') === 'easy'){
    speed = 800
  } else if (window.localStorage.getItem('difficulty') === 'medium'){
    speed = 500
  } else if (window.localStorage.getItem('difficulty') === 'hard'){
    speed = 380
  }

  // ! AUDIOS
  let ouch = document.querySelector('.ouch')
  let audio = document.querySelector('audio')
  if (audio){
    audio.controls = true
    audio.loop = true
    audio.volume = 0.5
    if (window.localStorage.getItem('pacman') === 'pacman'){
      audio.src = './sounds/pacman.m4a'
    } else if (window.localStorage.getItem('pacman') === 'parappa'){
      audio.src = './sounds/parappa.m4a'
    } else if (window.localStorage.getItem('pacman') === 'chuchu'){
      audio.src = './sounds/chuchulevel1.mp3'
    }

  }

  // ! LANGUAGE OPTIONS -- ONLY SET UP HERE, HAVE NOT UPDATED LANGUAGES IN DISPLAYS
  let language = window.localStorage.getItem('language')
  const english = document.querySelector('.en')
  english?.addEventListener('click', function(){
    console.log('Language set to English!') 
    alert('Language set to English. Click start to play!')
    window.localStorage.setItem('language', 'english')
    console.log(language)
  })
  const arabic = document.querySelector('.ar')
  arabic?.addEventListener('click', function(){
    console.log('Language set to Arabic!') 
    alert('Language set to Arabic. Click start to play!')
    window.localStorage.setItem('language', 'arabic')
    console.log(language)
  })
  const swedish = document.querySelector('.sv')
  swedish?.addEventListener('click', function(){
    console.log('Language set to Swedish!') 
    alert('Language set to Swedish. Click start to play!')
    window.localStorage.setItem('language', 'swedish')
    console.log(language)
  })
  const japanese = document.querySelector('.jp')
  japanese?.addEventListener('click', function(){
    console.log('Language set to Japanese!') 
    alert('Language set to Japanese. Click start to play!')
    window.localStorage.setItem('language', 'japanese')
    console.log(language)
  })

  // ! VARIABLES
  let swipeRight
  let swipeLeft
  let swipeUp
  let swipeDown
  let levelsCleared = 0
  let pacmanCoords
  let pacmanCoordsX
  let pacmanCoordsY
  const homeButton = document.querySelector('.home-button')
  const restartButton = document.querySelector('.restart-button')
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
  const highScoreSpan = document.querySelector('.highscore span')
  let highScore = localStorage.getItem('highScore') //? saved in localStorage
  highScoreSpan.innerText = highScore
  let ghostOne = {
    ghostStartingPosition: 161,
    ghostCurrentPosition: 161,
  }
  let ghostTwo = {
    ghostStartingPosition: 186,
    ghostCurrentPosition: 186,
  }
  let ghostThree = {
    ghostStartingPosition: 186,
    ghostCurrentPosition: 186,
  }
  let ghostFour = {
    ghostStartingPosition: 187,
    ghostCurrentPosition: 187,
  }
  const ghosts = [ghostOne, ghostTwo, ghostThree, ghostFour]
  const wallCells = [50, 51, 52, 300, 301, 302, 72, 73, 74, 322, 323, 324, 7, 32, 57, 17, 42, 67, 12, 37, 307, 332, 357, 317, 342, 367, 337, 362, 102, 103, 104, 127, 152, 202, 227, 252, 253, 254, 120, 121, 122, 147, 172, 222, 247, 272, 271, 270, 155, 156, 157, 205, 206, 207, 167, 168, 169, 217, 218, 219, 85, 86, 87, 88, 89, 285, 286, 287, 288, 289, 237, 137, 185, 189, 239, 139, 135, 235] // collisions, if you hit a wall you can't move through it. walls are styled as a CSS class added to specific grid cells.
  const wallCellsSecondLevel = [25, 26, 27, 28, 29, 30, 125, 126, 127, 128, 129, 154, 179, 44, 45, 46, 47, 48, 49, 145, 146, 147, 148, 149, 170, 195, 325, 326, 327, 328, 329, 330, 344, 345, 346, 347, 348, 349, 252, 253, 254, 228, 278, 270, 271, 272, 246, 296, 282, 283, 284, 285, 289, 290, 291, 292, 81, 82, 83, 84, 85, 33, 58, 108, 133, 89, 90, 91, 92, 93, 41, 66, 116, 141, 185, 189, 12, 37, 337, 362, 135, 136, 138, 139, 212]
  const wallCellsThirdLevel = [27, 51, 52, 53, 77, 55, 56, 57, 59, 60, 61, 35, 85, 63, 64, 65, 67, 68, 69, 43, 93, 71, 72, 73, 128, 129, 130, 104, 154, 133, 108, 158, 136, 137, 138, 112, 162, 141, 116, 166, 144, 145, 146, 120, 170, 201, 202, 203, 205, 206, 207, 181, 231, 209, 210, 211, 213, 214, 215, 189, 239, 217, 218, 219, 221, 222, 223, 197, 247, 278, 279, 280, 254, 304, 283, 282, 284, 286, 287, 288, 262, 312, 290, 291, 292, 294, 295, 296, 270, 320, 327, 352, 331, 356, 335, 360, 339, 364, 343, 368, 347, 372, 4, 8, 12, 16, 20, 124, 174, 274, 324, 100, 150, 250, 300]
  const startingPosition = 70
  let currentPosition = startingPosition
  let lives = 3
  livesDisplay = document.querySelector('#bottom div:nth-of-type(2) span')
  livesDisplay.innerText = '♥️♥️♥️'
  const flashingFood = [113, 200, 349, 99]
  const flashingFoodSecondLevel = [277, 213, 59, 171]
  const flashingFoodThirdLevel = [315, 271, 178, 19]
  
  // ! FUNCTIONS
  // ? create the grid and place Pacman, ghosts, food, and walls in it
  function createGrid(){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      // cell.innerText = i
      grid?.appendChild(cell)
      cells.push(cell)
    }
    addPacman(startingPosition)
    addGhost()
    addFlashingFood()
    addWall()
    addFood()
  }

  function addPacman(position){
    if (window.localStorage.getItem('pacman') === 'pacman'){
      cells[position].classList.add('pacman')
    } else if (window.localStorage.getItem('pacman') === 'parappa'){
      cells[position].classList.add('parappa-pacman')
    } else if (window.localStorage.getItem('pacman') === 'chuchu'){
      cells[position].classList.add('chuchu-pacman')
    }
  }

  let moves = 0
  function movePacman(e) {
    if (lives === 0){
      currentPosition = currentPosition
      // console.log('well he can\'t move now, he\s dead!')
    } else {

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
      if (cells[currentPosition].classList.contains('flashing-food') || cells[currentPosition].classList.contains('parappa-flashing-food') || cells[currentPosition].classList.contains('chuchu-flashing-food')){
        ateFlashingFood = true
        currentScore += 100
        currentScoreDisplay.innerText = currentScore
        cells[currentPosition].classList.remove('flashing-food') || cells[currentPosition].classList.remove('parappa-flashing-food') || cells[currentPosition].classList.remove('chuchu-flashing-food')
      }

      if (currentScore > highScore){
        highScore = currentScore
        localStorage.setItem('highScore', highScore)
        highScoreSpan.innerText = highScore
      }

      let stillFood = document.getElementsByClassName('food')
      if (stillFood.length > 0){
      } else {
        levelsCleared++
        if (levelsCleared < 3){
          youWin()
        } else {
        youWinGame()
        }
      }

      if ((e.key === 'ArrowLeft' || e.key === 'a') && currentPosition % width !== 0){
        moves++
        cells[lastCell].classList.contains('wall') || cells[lastCell]?.classList.contains('parappa-walls') || cells[lastCell]?.classList.contains('chuchu-walls')  ? console.log('wall on left!') : currentPosition--
      } else if ((e.key === 'ArrowRight' || e.key ===  'd') && currentPosition % width !== width - 1) {
        moves++
        cells[nextCell].classList.contains('wall') || cells[nextCell].classList.contains('parappa-walls') || cells[nextCell].classList.contains('chuchu-walls') ? console.log('wall on right!') : currentPosition++
      } else if ((e.key === 'ArrowUp' || e.key === 'w') && currentPosition >= width) {
        moves++
        cells[cellAbove].classList.contains('wall') || cells[cellAbove].classList.contains('parappa-walls') || cells[cellAbove].classList.contains('chuchu-walls') ? console.log('wall above!') : currentPosition -= width
      } else if ((e.key === 'ArrowDown' || e.key === 's') && currentPosition + width < cellCount){
        moves++
        cells[cellBelow].classList.contains('wall') || cells[cellBelow].classList.contains('parappa-walls') || cells[cellBelow].classList.contains('chuchu-walls') ? console.log('wall below!') : currentPosition += width
      } else {
        // console.log('well now i\'m not doing it 🙅🏻‍♀️')
      }

      addPacman(currentPosition)
      ghostCollision()

      // ! Pacman coordinates
      pacmanCoords = cells[currentPosition].getBoundingClientRect()
      pacmanCoordsX = pacmanCoords.x
      pacmanCoordsY = pacmanCoords.y 
    }
    if (moves === 1) { if (confirm('Do you want to play with music?') === true) { audio.play() } else { audio.pause() } }
  }

  function removePacman() {
    if (window.localStorage.getItem('pacman') === 'pacman'){
      cells[currentPosition].classList.remove('pacman')
    } else if (window.localStorage.getItem('pacman') === 'parappa'){
      cells[currentPosition].classList.remove('parappa-pacman')
    } else if (window.localStorage.getItem('pacman') === 'chuchu'){
      cells[currentPosition].classList.remove('chuchu-pacman')
    }
  }

  function addWall(){
    if (!pacman) { window.localStorage.setItem('pacman', 'pacman') }
      if (levelsCleared === 0 ){
      wallCells.forEach(wall => {
        //? console.log(wall) // each of these is a number, that number needs to be a cells[i]
        if (window.localStorage.getItem('pacman') === 'pacman'){
          cells[wall].classList.add('wall')
          bg.style.backgroundImage = "url('./styles/themes/pacman_theme/bg.png')" 
          main.style.backgroundColor = 'rgba(0,0,0,0.8)'
          sections.forEach(section => section.style.backgroundColor = 'white')
        } else if (window.localStorage.getItem('pacman') === 'parappa'){
          cells[wall].classList.add('parappa-walls')
          bg.style.backgroundImage = "url('./styles/themes/parappa_theme/bg.png')" 
          main.style.backgroundColor = 'rgba(0,0,0,0.8)'
          sections.forEach(section => section.style.backgroundColor = 'white')
        } else if (window.localStorage.getItem('pacman') === 'chuchu'){
          cells[wall].classList.add('chuchu-walls')
          bg.style.backgroundImage = "url('./styles/themes/chuchurocket_theme/bg.png')" 
          main.style.backgroundColor = 'rgba(0,0,0,0.6)'
          sections.forEach(section => section.style.backgroundColor = 'white')
        }
      })
    } else if (levelsCleared === 1){
      wallCells.forEach(wall => {
        cells[wall].classList.remove('wall') || cells[wall].classList.remove('parappa-walls') || cells[wall].classList.remove('chuchu-walls')
      })
      wallCellsSecondLevel.forEach(newWall => {
        if (window.localStorage.getItem('pacman') === 'pacman'){
          cells[newWall].classList.add('wall')
          bg.style.backgroundImage = "url('./styles/themes/pacman_theme/bg.png')" 
          main.style.backgroundColor = 'rgba(0,0,0,0.8)'
          sections.forEach(section => section.style.backgroundColor = 'white')
        } else if (window.localStorage.getItem('pacman') === 'parappa'){
          cells[newWall].classList.add('parappa-walls')
          bg.style.backgroundImage = "url('./styles/themes/parappa_theme/bg.png')" 
          main.style.backgroundColor = 'rgba(0,0,0,0.8)'
          sections.forEach(section => section.style.backgroundColor = 'white')
        } else if (window.localStorage.getItem('pacman') === 'chuchu'){
          cells[newWall].classList.add('chuchu-walls')
          bg.style.backgroundImage = "url('./styles/themes/chuchurocket_theme/bg.png')" 
          main.style.backgroundColor = 'rgba(0,0,0,0.6)'
          sections.forEach(section => section.style.backgroundColor = 'white')
        }
      })
      ghostPathFinderMovement()
      addFlashingFood()  //? it was important to call addFlashingFood before addFood, otherwise the color would be overwritten by CSS and the flashing food would be green instead of gold
      addFood()
    } else if (levelsCleared === 2){
      wallCellsSecondLevel.forEach(newWall => {
        cells[newWall].classList.remove('wall') || cells[newWall].classList.remove('parappa-walls') || cells[newWall].classList.remove('chuchu-walls')
      })
      wallCellsThirdLevel.forEach(wall => {
        if (window.localStorage.getItem('pacman') === 'pacman'){
          cells[wall].classList.add('wall')
          bg.style.backgroundImage = "url('./styles/themes/pacman_theme/bg.png')" 
          main.style.backgroundColor = 'rgba(0,0,0,0.8)'
        } else if (window.localStorage.getItem('pacman') === 'parappa'){
          cells[wall].classList.add('parappa-walls')
          bg.style.backgroundImage = "url('./styles/themes/parappa_theme/bg.png')" 
          main.style.backgroundColor = 'rgba(0,0,0,0.8)'
        } else if (window.localStorage.getItem('pacman') === 'chuchu'){
          cells[wall].classList.add('chuchu-walls')
          bg.style.backgroundImage = "url('./styles/themes/chuchurocket_theme/bg.png')" 
          main.style.backgroundColor = 'rgba(0,0,0,0.6)'
        }
      })
      ghostPathFinderMovement()
      addFlashingFood()
      addFood()
    }
  }

  function addFood(){
    cells.forEach(cell => {
      if (cell.classList.contains('wall') || cell.classList.contains('parappa-walls') || cell.classList.contains('chuchu-walls') || cell.classList.contains('flashing-food')){
      } else {
        cell.classList.add('food')
      }
    })
  }

  function addGhost(position){
    for (let i = 0; i < ghosts.length; i++){
        if (window.localStorage.getItem('pacman') === 'pacman'){
          cells[ghosts[i].ghostCurrentPosition]?.classList.add('ghost')
        } else if (window.localStorage.getItem('pacman') === 'parappa'){
          cells[ghosts[i].ghostCurrentPosition]?.classList.add('parappa-ghost')
        } else if (window.localStorage.getItem('pacman') === 'chuchu'){
          cells[ghosts[i].ghostCurrentPosition]?.classList.add('chuchu-ghost')
        }
      // }
    }
  }

  //! sometimes timer only runs for 0.5 seconds
  //! sometimes ghost doesn't return to starting position
  function flashingGhosts(position){
    for (let i = 0; i < ghosts.length; i++){
      if (currentPosition === ghosts[i].ghostCurrentPosition){
        // console.log("Got 'im!!!")
        ghosts[i].ghostCurrentPosition = ghosts[i].ghostStartingPosition
      }

      if (cells[position]?.classList.contains('flashing-ghost') || cells[position].classList.contains('flashing-parappa-ghost') || cells[position].classList.contains('flashing-chuchu-ghost')){ //!!!!! ?? need to add others here?
      } else {
        if (window.localStorage.getItem('pacman') === 'pacman'){
          cells[ghosts[i].ghostCurrentPosition]?.classList.add('flashing-ghost')
        } else if (window.localStorage.getItem('pacman') === 'parappa'){
          cells[ghosts[i].ghostCurrentPosition]?.classList.add('flashing-parappa-ghost')
        } else if (window.localStorage.getItem('pacman') === 'chuchu'){
          cells[ghosts[i].ghostCurrentPosition]?.classList.add('flashing-chuchu-ghost')
        }
      }
    }
    timer = setTimeout(() => {
      ateFlashingFood = false
    }, 5000)
  }

  function ghostPathFinderMovement(){

    interval = setInterval(() => { //! start of intervals (this is how often the ghosts will move)
      let arrOfXOptions
      let arrOfYOptions
      for (let i = 0; i < ghosts.length; i++){
        setTimeout(() => { //! start of timer to stagger ghost movement (this is when each ghost will start moving)
          arrOfXOptions = []
          arrOfYOptions = []
          removeGhost()
          let nextCell = ghosts[i].ghostCurrentPosition + 1
          let lastCell = ghosts[i].ghostCurrentPosition - 1
          let cellAbove = ghosts[i].ghostCurrentPosition - width
          let cellBelow = ghosts[i].ghostCurrentPosition + width
          let xCoordsArr = []
          let yCoordsArr = []
          let nextCellCoords = cells[nextCell]?.getBoundingClientRect()
          let nextCellCoordsX = nextCellCoords?.x
          let nextCellCoordsY = nextCellCoords?.y
          xCoordsArr.push(nextCellCoordsX)
          yCoordsArr.push(nextCellCoordsY)
          let lastCellCoords = cells[lastCell]?.getBoundingClientRect()
          let lastCellCoordsX = lastCellCoords?.x
          let lastCellCoordsY = lastCellCoords?.y
          xCoordsArr.push(lastCellCoordsX)
          yCoordsArr.push(lastCellCoordsY)
          let cellAboveCoords = cells[cellAbove]?.getBoundingClientRect()
          let cellAboveCoordsX = cellAboveCoords?.x
          let cellAboveCoordsY = cellAboveCoords?.y
          xCoordsArr.push(cellAboveCoordsX)
          yCoordsArr.push(cellAboveCoordsY)
          let cellBelowCoords = cells[cellBelow]?.getBoundingClientRect()
          let cellBelowCoordsX = cellBelowCoords?.x
          let cellBelowCoordsY = cellBelowCoords?.y
          xCoordsArr.push(cellBelowCoordsX) //? xCoordsArr is in order of nextCell, lastCell, cellAbove, cellBelow, so if index 0 is smallest number, move to nextCell; if index 1 is smallest, move to lastCell etc.
          yCoordsArr.push(cellBelowCoordsY)
          // console.log(yCoordsArr)

          //? check all the coordinates around the ghost and see which one is closest to 'distance from pacman'
          //? X MOVEMENT
          xCoordsArr.map((x) => {
            arrOfXOptions.push(Math.abs(x - pacmanCoordsX)) // perfect, now we have an array of the x options for each ghost, we need choose the one closest to 0
          })

          let lowestX = 0
          for (let j = 0; j < arrOfXOptions.length; j++){
            if (arrOfXOptions[j] !== arrOfXOptions[j]){
            } else if (arrOfXOptions[j] < arrOfXOptions[lowestX]) {
              lowestX = j
            }
            // console.warn('lowestX is: ' + j + ': ' + lowestX) //? This is the smallest index :D
          }
          
          //? Y MOVEMENT
          yCoordsArr.map((y) => {
            arrOfYOptions.push(Math.abs(y - pacmanCoordsY)) // perfect, now we have an array of the y options for each ghost, we need choose the one closest to 0
          })
          
          let lowestY = 0
          for (let k = 0; k < arrOfYOptions.length; k++){
            if (arrOfYOptions[k] !== arrOfYOptions[k]){
            } else if (arrOfYOptions[k] < arrOfYOptions[lowestY]) {
              lowestY = k
            }
            // console.log(arrOfYOptions)
            // console.warn('lowestY is: ' + k + ': ' + lowestY) //? This is the smallest index :D
          } 
          //? random choice between X and Y movement
          const xOrYMovement = Math.floor(Math.random() * 2)
          if (xOrYMovement === 0){
            if (lowestX === 0 && ghosts[i].ghostCurrentPosition % width !== width - 1){
                cells[nextCell]?.classList.contains('wall') || cells[nextCell]?.classList.contains('parappa-walls') || cells[nextCell]?.classList.contains('chuchu-walls') || cells[nextCell]?.classList.contains('ghost') || cells[nextCell]?.classList.contains('parappa-ghost') || cells[nextCell]?.classList.contains('chuchu-ghost') ? 
                console.log('blocked right!') :
                ghosts[i].ghostCurrentPosition++
              } else if (lowestX === 1 && ghosts[i].ghostCurrentPosition % width !== 0){
                cells[lastCell]?.classList.contains('wall') || cells[lastCell]?.classList.contains('parappa-walls') || cells[lastCell]?.classList.contains('chuchu-walls') || cells[lastCell]?.classList.contains('ghost') || cells[lastCell]?.classList.contains('parappa-ghost') || cells[lastCell]?.classList.contains('chuchu-ghost') ? 
                console.log('blocked left!') : 
                ghosts[i].ghostCurrentPosition--
              } 
          } else if (xOrYMovement === 1){
            if (lowestY === 2 && ghosts[i].ghostCurrentPosition >= width){
              cells[cellAbove]?.classList.contains('wall') || cells[cellAbove]?.classList.contains('parappa-walls') || cells[cellAbove]?.classList.contains('chuchu-walls') || cells[cellAbove]?.classList.contains('ghost') || cells[cellAbove]?.classList.contains('parappa-ghost') || cells[cellAbove]?.classList.contains('chuchu-ghost') ? 
              console.log('blocked above!') : 
              ghosts[i].ghostCurrentPosition = ghosts[i].ghostCurrentPosition - width 
            } else if (lowestY === 3 && ghosts[i].ghostCurrentPosition + width < cellCount){
              cells[cellBelow]?.classList.contains('wall') || cells[cellBelow]?.classList.contains('parappa-walls')  || cells[cellBelow]?.classList.contains('chuchu-walls') || cells[cellBelow]?.classList.contains('ghost') || cells[cellBelow]?.classList.contains('parappa-ghost') || cells[cellBelow]?.classList.contains('chuchu-ghost') ? 
              console.log('blocked below!') : 
              ghosts[i].ghostCurrentPosition = ghosts[i].ghostCurrentPosition + width 
            }
          }
          // console.log('loop: ' + lowestX, lowestY)
          // console.warn('position: ' + ghosts[i].ghostCurrentPosition)
          ateFlashingFood ? flashingGhosts(ghosts[i].ghostCurrentPosition) : addGhost(ghosts[i].ghostCurrentPosition)
        }, i * (speed + 2000)) //! end of timer

      }
      ghostCollision()
    }, speed ) //! end of intervals
  }
  ghostPathFinderMovement()

  function removeGhost() {
    for (let i = 0; i < ghosts.length; i++){
      // cells[ghosts[i].ghostCurrentPosition]?.classList.remove('ghost', 'flashing-ghost', 'flashing-parappa-ghost', 'flashing-chuchu-ghost', 'caught-ghost')
      if (window.localStorage.getItem('pacman') === 'pacman'){
        cells[ghosts[i].ghostCurrentPosition]?.classList.remove('ghost', 'flashing-ghost', 'caught-ghost')
      } else if (window.localStorage.getItem('pacman') === 'parappa'){
        cells[ghosts[i].ghostCurrentPosition]?.classList.remove('parappa-ghost', 'flashing-parappa-ghost', 'caught-ghost')
      } else if (window.localStorage.getItem('pacman') === 'chuchu'){
        cells[ghosts[i].ghostCurrentPosition]?.classList.remove('chuchu-ghost', 'flashing-chuchu-ghost', 'caught-ghost')
      }
    }
  }

  function addFlashingFood(){
    if (!pacman) { window.localStorage.setItem('pacman', 'pacman') }
    if (levelsCleared === 0){
      flashingFood.forEach((food) => {
        if (window.localStorage.getItem('pacman') === 'pacman'){
          cells[food].classList.add('flashing-food')
        } else if (window.localStorage.getItem('pacman') === 'parappa'){
          cells[food].classList.add('parappa-flashing-food')
        } else if (window.localStorage.getItem('pacman') === 'chuchu'){
          cells[food].classList.add('chuchu-flashing-food')
        }
      })
    } else if (levelsCleared === 1){
      flashingFood.forEach((food) => {
        if (window.localStorage.getItem('pacman') === 'pacman'){
          cells[food].classList.remove('flashing-food')
        } else if (window.localStorage.getItem('pacman') === 'parappa'){
          cells[food].classList.remove('parappa-flashing-food')
        } else if (window.localStorage.getItem('pacman') === 'chuchu'){
          cells[food].classList.remove('chuchu-flashing-food')
        }
      })
      flashingFoodSecondLevel.forEach((newFood) => {
        if (window.localStorage.getItem('pacman') === 'pacman'){
          cells[newFood].classList.add('flashing-food')
        } else if (window.localStorage.getItem('pacman') === 'parappa'){
          cells[newFood].classList.add('parappa-flashing-food')
        } else if (window.localStorage.getItem('pacman') === 'chuchu'){
          cells[newFood].classList.add('chuchu-flashing-food')
        }
      })
    } else if (levelsCleared === 2){
      flashingFoodSecondLevel.forEach((food) => {
        if (window.localStorage.getItem('pacman') === 'pacman'){
          cells[food].classList.remove('flashing-food')
        } else if (window.localStorage.getItem('pacman') === 'parappa'){
          cells[food].classList.remove('parappa-flashing-food')
        } else if (window.localStorage.getItem('pacman') === 'chuchu'){
          cells[food].classList.remove('chuchu-flashing-food')
        }
      })
      flashingFoodThirdLevel.forEach((newFood) => {
        if (window.localStorage.getItem('pacman') === 'pacman'){
          cells[newFood].classList.add('flashing-food')
        } else if (window.localStorage.getItem('pacman') === 'parappa'){
          cells[newFood].classList.add('parappa-flashing-food')
        } else if (window.localStorage.getItem('pacman') === 'chuchu'){
          cells[newFood].classList.add('chuchu-flashing-food')
        }
      })
    }
  }
  
  
  //? Checks if collision takes off a life and changes position back to startingPosition, or if it's a wall, prevents movement
  function ghostCollision(){
    if (cells[currentPosition]?.classList.contains('ghost') || cells[currentPosition]?.classList.contains('parappa-ghost') || cells[currentPosition]?.classList.contains('chuchu-ghost')){
      // console.log('ghost!!!')
      // ouch.src = './sounds/ouch/nngh.m4a'
      ouch.src = './sounds/ouch/mlmlml.m4a'
      ouch.play()
      lives--
      livesDisplay.innerText = lives ? '♥️'.repeat(lives) : '💔'
      if (lives === 0){
        gameOver()
      }
    }
  }
  
  function gameOver(){
    // console.log('stopping....')
    clearInterval(interval)
    audio.pause()
    audio.loop = false
    audio.src = './sounds/parappa-game_over clipped.m4a'
    setTimeout(() => {
      alert(`Game over!!! Your final score is: ${currentScore}`)
    }, 100)
  }

  function youWin(){
    // console.log('loading next level....')
    clearInterval(interval)
    currentScore = currentScore+= 100 // give 'em some bonus points
    currentScoreDisplay.innerHTML = currentScore
    removeGhost()
    for (let i = 0; i < ghosts.length; i++){
      ghosts[i].ghostCurrentPosition = ghosts[i].ghostStartingPosition
    }
    addWall()
    setTimeout(() => {
      alert('Level complete!! Have 100 bonus points 😃')
    }, 100)
  }

  function youWinGame(){
    clearInterval(interval)
    audio.pause()
    audio.loop = false
    audio.src = './sounds/ffviivictory.mp3'
    currentScore = currentScore+= 500 // give 'em some bonus points
    currentScoreDisplay.innerHTML = currentScore
    setTimeout(() => {
      alert(`Holy crap! You beat the game!! Have 500 bonus points!!! Your final score is: ${currentScore}`)
    }, 100)
  }

  function restartGame(){
  //? I can't find a way to remove the grid in order to recreate it from scratch 🤷‍♀️
    if (confirm("Are you sure you want to restart?") === true){
      window.location.reload()
    } else {
    }
  }

  function clickedHomeButton(){
    if (confirm("Are you sure you want to return to home screen?") === true){
      window.location = 'index.html'
    } else {
    }
  }


  // ! CHEAT CODE 😃🤓 only works if it's the first thing you do on gameload
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
  const arr = []
  function arraysEqual(a, b){
    if (a === b) return true
    if (a === null || b === null) return false
    if (a.length !== b.length) return false
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false
    }
    // infiniteLives = true //? maybe if i make this a variable and save it to localStorage the cheat would also work from the homescreen?
    lives = 9999999999
    livesDisplay.innerText = '♾️'
    alert('You now have unlimited lives!! Go get \'em 😎')
    return true
  }
  function getKeys(e){
    arr.push(e.key)
    // console.log('Arr is:    ' + arr)
    // console.log('Konami is: ' + konamiCode)
    arraysEqual(arr, konamiCode)
  }
  window.addEventListener('keydown', getKeys)
  //! end of cheat code
  

  // ! EVENT LISTENERS
  homeButton.addEventListener('click', clickedHomeButton)
  restartButton?.addEventListener('click', restartGame)
  document.addEventListener('keydown', movePacman)
  
  // ! SWIPING
    let start = {}
    let end = {}
    let tracking = false
    let thresholdTime = 500
    let thresholdDistance = 50
    swipeStart = function(e) {
      if (e.touches.length>1) {
        tracking = false
        return
      } else {
        tracking = true
        start.t = new Date().getTime()
        start.x = e.targetTouches[0].clientX
        start.y = e.targetTouches[0].clientY
      }
    };
    swipeMove = function(e) {
      if (tracking) {
        e.preventDefault()
        end.x = e.targetTouches[0].clientX
        end.y = e.targetTouches[0].clientY
      }
    }
    swipeEnd = function(e) {
      if (lives === 0){
        currentPosition = currentPosition
        // console.log('well he can\'t move now, he\s dead!')
      } else {
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
      if (cells[currentPosition].classList.contains('flashing-food') || cells[currentPosition].classList.contains('parappa-flashing-food') || cells[currentPosition].classList.contains('chuchu-flashing-food')){
        ateFlashingFood = true
        currentScore += 100
        currentScoreDisplay.innerText = currentScore
        cells[currentPosition].classList.remove('flashing-food') || cells[currentPosition].classList.remove('parappa-flashing-food') || cells[currentPosition].classList.remove('chuchu-flashing-food')
      }
      if (currentScore > highScore){
        highScore = currentScore
        localStorage.setItem('highScore', highScore)
        highScoreSpan.innerText = highScore
      }

      let stillFood = document.getElementsByClassName('food')
      if (stillFood.length > 0){
      } else {
        levelsCleared++
        if (levelsCleared < 3){
          youWin()
        } else {
        youWinGame()
        }
      }
      tracking = false
      let now = new Date().getTime()
      let deltaTime = now - start.t
      let deltaX = end.x - start.x
      let deltaY = end.y - start.y
      // work out what the movement was
      if (deltaTime > thresholdTime) {
        // swipe too slow
        return
      } else {
        if ((deltaX > thresholdDistance) && (Math.abs(deltaY) < thresholdDistance) && ((currentPosition + 1) % width !== 0)) {
          moves++
          cells[nextCell].classList.contains('wall') || cells[nextCell].classList.contains('parappa-walls') || cells[nextCell].classList.contains('chuchu-walls') ? console.log('wall on right!') : swipeRight = currentPosition++
          console.log(swipeRight)
        } else if ((-deltaX > thresholdDistance)&&(Math.abs(deltaY) < thresholdDistance) && currentPosition % width !== 0) {
          moves++
          cells[lastCell].classList.contains('wall') || cells[lastCell]?.classList.contains('parappa-walls') || cells[lastCell]?.classList.contains('chuchu-walls')  ? console.log('wall on left!') : swipeLeft = currentPosition--
          console.log(swipeLeft)
        } else if ((deltaY > thresholdDistance)&&(Math.abs(deltaX) < thresholdDistance) && currentPosition + width < cellCount) {
          moves++
          cells[cellBelow].classList.contains('wall') || cells[cellBelow].classList.contains('parappa-walls') || cells[cellBelow].classList.contains('chuchu-walls') ? console.log('wall below!') : swipeDown = currentPosition += width
          console.log(swipeDown)
        } else if ((-deltaY > thresholdDistance)&&(Math.abs(deltaX) < thresholdDistance) && currentPosition >= width) {
          moves++
          cells[cellAbove].classList.contains('wall') || cells[cellAbove].classList.contains('parappa-walls') || cells[cellAbove].classList.contains('chuchu-walls') ? console.log('wall above!') : swipeUp = currentPosition -= width
          console.log(swipeUp)
        } else {
          // console.log('well now i\'m not doing it 🙅🏻‍♀️')
        }
        addPacman(currentPosition)
        ghostCollision()
        pacmanCoords = cells[currentPosition].getBoundingClientRect()
        pacmanCoordsX = pacmanCoords.x
        pacmanCoordsY = pacmanCoords.y 
      }
      }
      if (moves === 1) { if (confirm('Do you want to play with music?') === true) { audio.play() } else { audio.pause() } }
    }
    document.addEventListener('touchstart', swipeStart, false)
    document.addEventListener('touchmove', swipeMove, false)
    document.addEventListener('touchend', swipeEnd, false)


  createGrid()
}

window.addEventListener('DOMContentLoaded', init)
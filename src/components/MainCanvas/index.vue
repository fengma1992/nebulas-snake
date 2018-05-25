/*** Created by dujianhao on 2018/4/13.*/

<template>
  <div class="main-canvas-view">
    <canvas id="main-canvas" :width="canvasWidth+ 'px'" :height="canvasHeight+ 'px'"></canvas>
    <game-over v-model="gameOverFlag"/>
  </div>
</template>

<script>
import './index.scss'
import { mapState } from 'vuex'
import { KEY_CODES, DIFFICULTY } from '../../enums'
import { START, STOP, PAUSE, RESUME, RESET } from '../../store/mutationTypes'
import GameOver from '../GameOverModal'

const originalSnakeBody = [[0, 0], [1, 0], [2, 0]]
const originalSnakeHead = [3, 0]
const blockSize = 20
const startBtnScale = 0.05
const baseFontColor = '#FF6666'
const snakeBodyColor = '#FF9966'
const foodColor = '#FFCCCC'
const backgroundLineColor = '#EEE'
const snakeHeadColorList = {
  [DIFFICULTY.NORMAL]: '#33a050',
  [DIFFICULTY.MIDDLE]: '#fabe00',
  [DIFFICULTY.HARD]: '#d8210d'
}

export default {
  name: 'main-canvas',
  components: { GameOver },
  data () {
    return {
      gameOverFlag: true,
      canvas: undefined,
      context: undefined,
      canvasWidth: 800,
      canvasHeight: 800,
      containerArr: [], // 表示容器内空白位置
      snakeBody: originalSnakeBody.slice(),
      snakeHead: originalSnakeHead.slice(),
      headDirection: KEY_CODES.RIGHT,
      disabledDirection: KEY_CODES.LEFT,
      foodPosition: undefined,
      timer: undefined,
      winningWord: 'CONGRATULATIONS, YOU DID IT!',
      HEAD_DIFF_POSITIONS: {
        [KEY_CODES.UP]: [0, -1],
        [KEY_CODES.RIGHT]: [1, 0],
        [KEY_CODES.DOWN]: [0, 1],
        [KEY_CODES.LEFT]: [-1, 0],
      }
    }
  },
  computed: {
    ...mapState({
      started: state => state.gameStatus.started,
      paused: state => state.gameStatus.paused,
      score: state => state.gameStatus.score,
      difficulty: state => state.gameStatus.difficulty,
    }),
    rowGridCount () {
      return (this.canvasWidth / blockSize) | 0
    },
    columnGridCount () {
      return (this.canvasHeight / blockSize) | 0
    },
    baseFontSize () {
      return (this.canvasWidth / this.winningWord.length) | 0
    },
    /**
     * startBtn is a congruent triangle
     * @returns {{width: number, height: number}}
     */
    controlBtnSize () {
      return {
        width: this.canvasWidth * startBtnScale * 2,
        height: this.canvasWidth * startBtnScale * Math.sqrt(3)
      }
    },
    controlBtnArea () {
      return {
        top: (this.canvasHeight - this.controlBtnSize.height) / 2,
        right: (this.canvasWidth + this.controlBtnSize.width) / 2,
        bottom: (this.canvasHeight + this.controlBtnSize.width) / 2,
        left: (this.canvasWidth - this.controlBtnSize.height) / 2,
      }
    },
    
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.reset()
      this.canvas = document.getElementById('main-canvas')
      this.context = this.canvas.getContext('2d')
      this.canvas.onclick = this.mouseClickListener
      document.onkeydown = this.keyPress
      this.context.strokeStyle = backgroundLineColor
      this.initAvailableFoodArea()
      this.resizeCanvas()
      this.$nextTick(() => {
        this.clearCanvas()
        this.drawStartBtn()
      })
    },
    mouseClickListener ({ offsetX, offsetY }) {
      if (this.started) {
        this.paused ? this.resume() : this.pause()
      } else {
        this.drawStartBtn() // drawStartBtn to create path
        if (this.context.isPointInPath(offsetX, offsetY)) {
          this.startGame()
        }
      }
    },
    initAvailableFoodArea () {
      this.containerArr = []
      for (let i = 0; i < this.rowGridCount; i++) {
        for (let j = 0; j < this.columnGridCount; j++) {
          this.containerArr.push([i, j].join()) // collect available food position
        }
      }
      // remove the unavailable positions
      this.snakeBody.forEach(item => {
        const index = this.containerArr.indexOf(item.join())
        !~index && this.containerArr.splice(index, 1)
      })
      const index = this.containerArr.indexOf(this.snakeHead.join())
      !~index && this.containerArr.splice(index, 1)
    },
    resizeCanvas () {
      const container = document.getElementsByClassName('main-canvas-view')[0]
      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight
      this.canvasWidth = ((containerWidth / blockSize) | 0) * blockSize
      this.canvasHeight = ((containerHeight / blockSize) | 0) * blockSize
    },
    clearCanvas () {
      this.context.fillStyle = '#fff'
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    },
    addScore () {
      this.$store.commit('ADD_SCORE')
    },
    keyPress ({ keyCode }) {
      if (this.disabledDirection === keyCode) {
        return
      }
      switch (keyCode) {
        case KEY_CODES.UP:
          this.headDirection = KEY_CODES.UP
          this.disabledDirection = KEY_CODES.DOWN
          break
        case KEY_CODES.DOWN:
          this.headDirection = KEY_CODES.DOWN
          this.disabledDirection = KEY_CODES.UP
          break
        case KEY_CODES.LEFT:
          this.headDirection = KEY_CODES.LEFT
          this.disabledDirection = KEY_CODES.RIGHT
          break
        case KEY_CODES.RIGHT:
          this.headDirection = KEY_CODES.RIGHT
          this.disabledDirection = KEY_CODES.LEFT
          break
      }
    },
    drawPausedBtn () {
      this.context.fillStyle = baseFontColor
      this.context.font = `${this.baseFontSize}px serif`
      this.context.textAlign = 'center'
      this.context.fillText(this.score, this.canvasWidth / 2, this.canvas.height / 2)
      const text = 'Resume'
      this.context.font = `${this.baseFontSize}px serif`
      this.context.fillText(text, this.canvasWidth / 2, this.canvas.height / 2 + this.baseFontSize)
    },
    drawStartBtn () {
      this.context.fillStyle = baseFontColor
      this.context.beginPath()
      // move pencil to top left corner
      this.context.moveTo(this.controlBtnArea.left, this.controlBtnArea.top)
      this.context.lineTo(this.controlBtnArea.left, this.controlBtnArea.bottom)
      this.context.lineTo(this.controlBtnArea.right, (this.controlBtnArea.top + this.controlBtnArea.bottom) / 2)
      this.context.closePath()
      this.context.fill()
      const text = 'Start'
      this.context.font = `${this.baseFontSize}px serif`
      this.context.textAlign = 'center'
      this.context.fillText(text, this.canvasWidth / 2, this.controlBtnArea.bottom + this.baseFontSize)
    },
    drawLastScene () {
      this.clearCanvas()
      this.snakeDraw()
      this.foodDraw()
    },
    fillRectDraw (x, y) {
      this.context.fillRect(x * blockSize, y * blockSize, blockSize - 2, blockSize - 2)
    },
    createFood () {
      const index = Math.random() * (this.containerArr.length - 1) | 0
      const temp = this.containerArr[index].split(',')
      this.foodPosition = [+temp[0], +temp[1]] // string 2 num
      this.foodDraw()
    },
    foodDraw () {
      this.context.fillStyle = foodColor
      this.fillRectDraw(this.foodPosition[0], this.foodPosition[1])
    },
    snakeDraw () {
      this.context.fillStyle = snakeBodyColor
      this.snakeBody.forEach((position, index) => {
        this.fillRectDraw(position[0], position[1])
      })
      
      this.context.fillStyle = snakeHeadColorList[this.difficulty]
      this.fillRectDraw(this.snakeHead[0], this.snakeHead[1])
    },
    finalDraw (text) {
      this.context.font = `${this.baseFontSize}px serif`
      this.context.textAlign = 'center'
      this.context.fillStyle = '#fff'
      this.context.fillRect(0, this.canvas.height / 2 - this.baseFontSize * 2, this.canvasWidth, this.baseFontSize * 3)
      this.context.fillStyle = baseFontColor
      this.context.fillText(text, this.canvasWidth / 2, this.canvas.height / 2)
    },
    clearRect (x, y) {
      this.context.fillStyle = '#fff'
      this.context.fillRect(x * blockSize, y * blockSize, blockSize - 2, blockSize - 2)
    },
    checkIfStuck (nextX, nextY) {
      if (nextX < 0 || nextX >= this.rowGridCount || nextY < 0 || nextY >= this.columnCount) {
        return true
      }
      // slim the calculation
      const intersectionIndex = this.snakeBody.findIndex(position => {
        return position[0] === nextX && position[1] === nextY
      })
      
      return ~intersectionIndex
    },
    animate () {
      requestAnimationFrame(() => {
        const gotFood = this.foodPosition.join() === this.snakeHead.join()
        if (gotFood) {
          this.addScore()
          this.createFood()
        } else {
          const tail = this.snakeBody.shift()
          this.clearRect(tail[0], tail[1])
          this.containerArr.push(tail.join()) // set the last tail position available
        }
        const index = this.containerArr.indexOf(this.snakeHead.join())
        !~index && this.containerArr.splice(index, 1) // remove the new head position as its unavailable now
        if (!this.containerArr.length) {
          this.clearTimer()
          this.finalDraw(this.winningWord)
        }
        this.snakeDraw()
      })
    },
    reset () {
      this.clearTimer()
      this.$store.commit(RESET)
      this.snakeBody = originalSnakeBody.slice()
      this.snakeHead = originalSnakeHead.slice()
      this.headDirection = KEY_CODES.RIGHT
      this.disabledDirection = KEY_CODES.LEFT
    },
    async startGame () {
      // const res = await this.$store.dispatch('nebulasPay')
      this.reset()
      this.$store.commit(START)
      this.clearCanvas()
      this.snakeDraw()
      this.createFood()
      this.startTimer()
    },
    gameOver () {
      this.$store.commit(STOP)
      this.clearTimer()
      this.finalDraw('GAME OVER!')
    },
    resume () {
      this.$store.commit(RESUME)
      this.drawLastScene()
      this.startTimer()
    },
    pause () {
      this.$store.commit(PAUSE)
      this.clearTimer()
      this.drawLastScene()
      this.drawPausedBtn()
    },
    startTimer () {
      this.timer = setInterval(() => {
        let [nextX, nextY] = this.snakeHead
        const currentDiffPositions = this.HEAD_DIFF_POSITIONS[this.headDirection]
        nextX += currentDiffPositions[0]
        nextY += currentDiffPositions[1]
        if (this.checkIfStuck(nextX, nextY)) {
          console.log({ nextX, nextY })
          this.gameOver()
          return
        }
        this.snakeBody.push(this.snakeHead)
        this.snakeHead = [nextX, nextY]
        this.animate()
      }, this.difficulty)
    },
    clearTimer () {
      this.timer = clearInterval(this.timer)
    },
  },
}
</script>

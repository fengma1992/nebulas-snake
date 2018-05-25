/**
 * Created by dujianhao on 2018/5/24.
 */

class NebulasSnake {
  constructor () {
    LocalContractStorage.defineProperties(this, {
      scoreBoard: {},
      address: ''
    })
    this.address = ''
    this.scoreBoard = {
      haha: 12
    }
  }

  init () {
    const key = 'jajaja'
    this.scoreBoard[key] = 12323
    return this.scoreBoard
  }

  saveScore (nickname, score) {
    const from = Blockchain.transaction.from
    const info = {}
    info.nickname = nickname
    info.score = score
    info.time = new Date()
    let temp = JSON.parse(JSON.stringify(this.scoreBoard))
    temp[nickname] = info
    this.scoreBoard = temp
    this.address += `${from}/`
    return this.scoreBoard
  }

  getScoreBoard () {
    return this.scoreBoard
  }
}

module.exports = NebulasSnake

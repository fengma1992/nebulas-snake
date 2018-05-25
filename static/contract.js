/**
 * Created by dujianhao on 2018/5/24.
 */

function sortScoreBoard (scoreBoard, decending = true) {
  const result = scoreBoard.sort((a, b) => {
    const result = b.score - a.score
    return decending ? result : -result
  })
  return result.length > 100 ? result.slice(0, 100) : result
}

class NebulasSnake {
  constructor () {
    LocalContractStorage.defineMapProperty(this, 'scoreBoard')
  }

  init () {
    this.scoreBoard.put('scoreBoard', JSON.stringify([]))
    return this.scoreBoard
  }

  saveScore (nickname, score) {
    const account = Blockchain.transaction.from
    const info = {
      address: account,
      nickname: nickname,
      score: score,
      time: +(new Date())
    }

    let userScoreBoard = JSON.parse(this.scoreBoard.get(account)) || []
    let latestScoreBoard = JSON.parse(this.scoreBoard.get('scoreBoard'))

    userScoreBoard.push(info)
    latestScoreBoard.push(info)
    userScoreBoard = sortScoreBoard(userScoreBoard)
    latestScoreBoard = sortScoreBoard(latestScoreBoard)
    this.scoreBoard.put('scoreBoard', JSON.stringify(latestScoreBoard))
    this.scoreBoard.put(account, JSON.stringify(userScoreBoard))
    return true
  }

  getScoreBoard () {
    return JSON.parse(this.scoreBoard.get('scoreBoard'))
  }

  getUserScoreBoard (account) {
    return JSON.parse(this.scoreBoard.get(account))
  }
}

module.exports = NebulasSnake

import { ADD_SCORE, CHANGE_DIFFICULTY, RESTART_GAME, START, STOP, TOGGLE_START, PAUSE, RESUME, RESET, HIDE_GAME_OVER_MODAL, TOGGLE_WALL } from '../mutationTypes'
import { DIFFICULTY } from '../../enums'
const state = {
  wall: true,
  started: false,
  paused: false,
  gameOver: false,
  score: 0,
  difficulty: DIFFICULTY.NORMAL,
}

const mutations = {
  [ADD_SCORE] (state) {
    state.score++
  },
  [CHANGE_DIFFICULTY] (state, difficulty) {
    state.difficulty = difficulty
  },
  [HIDE_GAME_OVER_MODAL] (state) {
    state.gameOver = false
  },
  [STOP] (state) {
    state.started = false
    state.paused = false
    state.gameOver = true
  },
  [PAUSE] (state) {
    state.paused = true
  },
  [RESUME] (state) {
    state.paused = false
  },
  [TOGGLE_START] (state) {
    state.started = !state.started
    state.paused = false
  },
  [RESTART_GAME] (state) {
    state.started = true
    state.paused = false
    state.score = 0
  },
  [RESET] (state) {
    state.started = false
    state.paused = false
    state.score = 0
  },
  [START] (state) {
    state.started = true
    state.paused = false
    state.gameOver = false
  },
  [TOGGLE_WALL] (state) {
    state.wall = !state.wall
  },
}

const actions = {
  // someAsyncTask ({ commit }) {
  // do something async
  // commit('INCREMENT_MAIN_COUNTER')
  // }
}

export default {
  state,
  mutations,
  actions
}

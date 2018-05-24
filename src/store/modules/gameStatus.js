import { ADD_SCORE, CHANGE_DIFFICULTY, RESTART_GAME, START, STOP, TOGGLE_START, PAUSE, RESUME, RESET } from '../mutationTypes'
import { DIFFICULTY } from '../../enums'
const state = {
  started: false,
  paused: false,
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
  [START] (state) {
    state.started = true
    state.paused = false
  },
  [STOP] (state) {
    state.started = false
    state.paused = false
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

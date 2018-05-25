import { PAY_SUCCESS, UPDATE_SCORE_BOARD, UPDATE_USER_SCORE_BOARD, UPDATE_EXTENSION_STATUS, TOGGLE_SCORE_BOARD_SHOW, SET_USER_ACCOUNT } from '../mutationTypes'
import nebulasUtils from '../../utils/nebulasUtils'
import { cloneDeep } from 'lodash'

const state = {
  payed: false,
  scoreBoard: [],
  userScoreBoard: [],
  playerAccount: '',
  showScoreBoard: true,
  extensionInstalled: false
}

const mutations = {
  [PAY_SUCCESS] (state) {
    state.payed = true
  },
  [UPDATE_SCORE_BOARD] (state, scoreBoard) {
    state.scoreBoard = cloneDeep(scoreBoard)
  },
  [UPDATE_USER_SCORE_BOARD] (state, userScoreBoard) {
    state.userScoreBoard = cloneDeep(userScoreBoard)
  },
  [UPDATE_EXTENSION_STATUS] (state, flag) {
    state.extensionInstalled = flag
  },
  [TOGGLE_SCORE_BOARD_SHOW] (state, flag) {
    state.showScoreBoard = flag !== undefined ? flag : !state.showScoreBoard
  },
  [SET_USER_ACCOUNT] (state, account) {
    state.playerAccount = account
  },
}

const actions = {
  async saveScore ({ commit, dispatch }, params) {
    const res = await nebulasUtils.payCall('saveScore', params)
    console.log(res)
    // commit(PAY_SUCCESS)
    dispatch('getUserInfo')
  },
  async getScoreBoard ({ commit }) {
    const res = await nebulasUtils.freeCall('getScoreBoard')
    commit(UPDATE_SCORE_BOARD, JSON.parse(res || '[]'))
    return res
  },
  async getUserScoreBoard ({ commit, state }) {
    if (!state.playerAccount) {
      commit(UPDATE_USER_SCORE_BOARD, [])
    }
    const res = await nebulasUtils.freeCall('getUserScoreBoard', [state.playerAccount])
    commit(UPDATE_USER_SCORE_BOARD, JSON.parse(res || '[]'))
  },
  async getUserInfo ({ commit }) {
    const account = await nebulasUtils.getUserAddress()
    commit(SET_USER_ACCOUNT, account)
  },
}

export default {
  state,
  mutations,
  actions
}

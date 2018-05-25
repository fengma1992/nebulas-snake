import { PAY_SUCCESS, UPDATE_SCORE_BOARD } from '../mutationTypes'
import nebulasUtils from '../../utils/nebulasUtils'
import { cloneDeep } from 'lodash'

const state = {
  payed: false,
  scoreBoard: {}
}

const mutations = {
  [PAY_SUCCESS] (state) {
    state.payed = true
  },
  [UPDATE_SCORE_BOARD] (state, scoreBoard) {
    state.scoreBoard = cloneDeep(scoreBoard)
  }
}

const actions = {
  async saveScore ({ commit }, params) {
    const res = await nebulasUtils.nebulasCall('saveScore', params)
    // commit(PAY_SUCCESS)
    return res
  },
  async getScoreBoard ({ commit }) {
    const res = await nebulasUtils.nebulasCall('getScoreBoard')
    commit(UPDATE_SCORE_BOARD, res)
    return res
  }
}

export default {
  state,
  mutations,
  actions
}

/**
* Created by dujianhao on 2018/5/25.
*/

<template>
  <div v-show="showScoreBoard" class="score-board-view">
    <div class="score-board-main">
      <div class="score-board-title">
        <button @click="showTop100" :class="['score-board-btn', {'selected': showTop100Score}]">TOP 100</button>
        <button @click="showUserHistory"
                :class="['score-board-btn', {'selected': !showTop100Score}]">MY HISTORY
        </button>
      </div>
      <div class="score-board-list">
        <template  v-if="!loading">
          <div v-if="scoreBoardToShow.length" class="score-board-header">
            <p class="header-item item1">nickname</p>
            <p class="header-item item2">score</p>
            <p class="header-item item3">date</p>
          </div>
          <div v-for="item in scoreBoardToShow" :key="item.time" class="score-board-item">
            <p class="nickname item1">{{ item.nickname }}: </p>
            <p class="score item2">{{ item.score }}</p>
            <p class="time item3">{{ new Date(item.time).format("yyyy-MM-dd hh:mm:ss") }}</p>
          </div>
        </template>
        <div v-else class="loading-view">
          Loading...
        </div>
        <button v-if="!scoreBoardToShow.length && !loading" @click="hide" class="loading-view">
          Nothing yet, click to make a history!
        </button>
      </div>
    </div>
    <div class="mask" @click="hide"></div>
  </div>
</template>

<script>
import './index.scss'
import { mapState } from 'vuex'
import { TOGGLE_SCORE_BOARD_SHOW } from '../../store/mutationTypes'

const GET_SCORE_BOARD_TYPES = {
  TOP100: 0,
  USER: 1,
  BOTH: 2,
}

export default {
  name: 'score-board',
  data () {
    return {
      showTop100Score: true,
      loading: false,
    }
  },
  computed: {
    ...mapState({
      top100ScoreBoard: state => state.nebulasData.scoreBoard,
      userScoreBoard: state => state.nebulasData.userScoreBoard,
      showScoreBoard: state => state.nebulasData.showScoreBoard,
    }),
    scoreBoardToShow () {
      return (this.showTop100Score ? this.top100ScoreBoard : this.userScoreBoard) || []
    },
  },
  watch: {
    showScoreBoard (v) {
      v && this.getScoreBoard(GET_SCORE_BOARD_TYPES.BOTH)
    },
  },
  async mounted () {
    await this.getScoreBoard()
  },
  methods: {
    hide () {
      this.$store.commit(TOGGLE_SCORE_BOARD_SHOW, false)
    },
    async getScoreBoard (type) {
      if (this.loading) {
        return
      }
      this.loading = true
      type !== GET_SCORE_BOARD_TYPES.USER && await this.$store.dispatch('getScoreBoard')
      type !== GET_SCORE_BOARD_TYPES.TOP100 && await this.$store.dispatch('getUserScoreBoard')
      this.loading = false
    },
    async showTop100 () {
      this.showTop100Score = true
      await this.getScoreBoard(GET_SCORE_BOARD_TYPES.TOP100)
    },
    async showUserHistory () {
      this.showTop100Score = false
      await this.getScoreBoard(GET_SCORE_BOARD_TYPES.USER)
    },
  }
}
</script>

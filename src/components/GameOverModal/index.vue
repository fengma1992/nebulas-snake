/**
* Created by dujianhao on 2018/5/24.
*/

<template>
  <div class="nebulas-game-over-modal">
    <div class="main">
      <p class="title">Game Over!</p>
      <p class="score-text">Your Score: {{ score }}</p>
      <div class="content">
        <div class="input-area">
          <input v-model="nickname" placeholder="Please input your nickname!" class="text-input"/>
        </div>
        <button @click="saveScore" :class="['save-btn', { 'disabled-btn': saving }]">{{ btnText }}</button>
        <p @click="getScoreBoard" class="score-board-link">Show Score Board</p>
      </div>
    </div>
    <div class="mask" @click="hide"></div>
  </div>
</template>

<script>
import './index.scss'
import { mapState } from 'vuex'
import { HIDE_GAME_OVER_MODAL, TOGGLE_SCORE_BOARD_SHOW } from '../../store/mutationTypes'

export default {
  name: 'nebulas-modal',
  data () {
    return {
      nickname: '',
      saving: false,
      saved: false,
    }
  },
  computed: {
    ...mapState({
      score: state => state.gameStatus.score,
    }),
    btnText () {
      if (this.saved) {
        return 'Saved!'
      }
      return this.saving ? 'Saving...' : 'Save to Nebulas Forever!'
    },
  },
  methods: {
    reset () {
      this.saving = false
      this.saved = false
    },
    hide () {
      this.$store.commit(HIDE_GAME_OVER_MODAL)
      this.reset()
    },
    async saveScore () {
      if (this.saving || this.saved) {
        return
      }
      this.saving = true
      const nickname = this.nickname || 'anonymous'
      const score = this.score + ''
      await this.$store.dispatch('saveScore', [nickname, score])
      this.saving = false
      this.saved = true
    },
    getScoreBoard () {
      this.hide()
      this.$store.commit(TOGGLE_SCORE_BOARD_SHOW, true)
    },
  },
}
</script>

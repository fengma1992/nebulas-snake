/**
* Created by dujianhao on 2018/5/24.
*/

<template>
  <div v-if="showModal" class="nebulas-game-over-modal">
    <div class="main">
      <p class="title">Game Over!</p>
      <p class="score-text">Your Score: {{ score }}</p>
      <div class="content">
        <div class="input-area">
          <input v-model="nickname" placeholder="Please input your nickname!" class="text-input"/>
        </div>
        <button @click="saveScore" class="save-btn">{{ btnText }}</button>
        <button @click="getScoreBoard" class="save-btn">Get Score Board</button>
      </div>
    </div>
    <div class="mask" @click="hide"></div>
  </div>
</template>

<script>

import './index.scss'
import { mapState } from 'vuex'

export default {
  name: 'nebulas-modal',
  props: {
    value: { type: Boolean, default: false },
  },
  data () {
    return {
      nickname: '',
      saving: false,
    }
  },
  computed: {
    ...mapState({
      score: state => state.gameStatus.score,
    }),
    showModal () {
      return this.value
    },
    btnText () {
      return this.saving ? 'Saving' : 'Save to Nebulas'
    },
  },
  methods: {
    hide () {
      this.$emit('input', false)
    },
    async saveScore () {
      if (this.saving) {
        return
      }
      this.saving = true
      const nickname = this.nickname || 'anonymous'
      const score = this.score
      const res = await this.$store.dispatch('saveScore', [nickname, score])
      console.log(res)
      this.saving = false
    },
    async getScoreBoard () {
      const res = await this.$store.dispatch('getScoreBoard')
      console.log(res)
    },
    mount () {
      const el = document.createElement('div')
      document.body.appendChild(el)
      this.$mount(el)
    },
  },
}
</script>

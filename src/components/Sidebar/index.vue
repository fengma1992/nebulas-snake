/*** Created by dujianhao on 2018/4/13.*/

<template>
  <div class="sidebar-view">
    <p class="score-area"><span class="title-text">Score:</span><span class="score-text">{{ score }}</span></p>
    <div class="btn-group">
      <button @click="restart">Restart</button>
      <button @click="toggleStart">{{ toggleStartBtnText }}</button>
    </div>
  </div>
</template>

<script>
import './index.scss'
import { mapState } from 'vuex'

export default {
  name: 'sidebar',
  computed: {
    ...mapState({
      started: state => state.gameStatus.started,
      score: state => state.gameStatus.score,
    }),
    toggleStartBtnText () {
      return this.started ? 'Pause' : 'Resume'
    }
  },
  methods: {
    restart () {
      this.$store.commit('RESTART_GAME')
    },
    toggleStart () {
      this.$store.commit('TOGGLE_START')
    },
  },
}
</script>

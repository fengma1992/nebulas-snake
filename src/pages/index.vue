/*** Created by dujianhao on 2018/4/13.*/

<template>
  <div class="default-view">
    <div class="default-view-header">
      <p>Nebulas Snake</p>
      <div class="difficulty-select-area">
        <p @click="setDifficulty(DIFFICULTY.NORMAL)"
           :class="['difficulty-btn', 'normal', {'unselected': DIFFICULTY.NORMAL !== difficulty}]">Normal</p>
        <p @click="setDifficulty(DIFFICULTY.MIDDLE)"
           :class="['difficulty-btn', 'middle', {'unselected': DIFFICULTY.MIDDLE !== difficulty}]">Middle</p>
        <p @click="setDifficulty(DIFFICULTY.HARD)"
           :class="['difficulty-btn', 'hard', {'unselected': DIFFICULTY.HARD !== difficulty}]">Hard</p>
      </div>
      <p>Score: {{ score }}</p>
    </div>
    <div class="default-view-main">
      <main-canvas v-if="extensionInstalled" ref="mainCanvas"/>
      <div v-else class="extension-install-area">
        <h3 class="extension-hint">Please install the
          <a target="_blank" href="https://github.com/ChengOrangeJu/WebExtensionWallet">WebExtensionWallet</a> before play!</h3>
      </div>
    </div>
    <score-board v-if="extensionInstalled"/>
    <game-over v-if="extensionInstalled && gameOver"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { DIFFICULTY } from '../enums'
import { CHANGE_DIFFICULTY, UPDATE_EXTENSION_STATUS } from '../store/mutationTypes'
import './index.scss'
import MainCanvas from '../components/MainCanvas'
import ScoreBoard from '../components/ScoreBoard'
import GameOver from '../components/GameOverModal'

export default {
  name: 'nebulas-snake',
  components: { MainCanvas, ScoreBoard, GameOver },
  data () {
    return {
      DIFFICULTY,
    }
  },
  computed: {
    ...mapState({
      score: state => state.gameStatus.score,
      difficulty: state => state.gameStatus.difficulty,
      extensionInstalled: state => state.nebulasData.extensionInstalled,
      gameOver: state => state.gameStatus.gameOver,
    }),
  },
  beforeMount () {
    this.checkIfExtensionInstalled()
  },
  mounted () {
    this.extensionInstalled && this.getUserInfo()
  },
  methods: {
    checkIfExtensionInstalled () {
      if (!window.webExtensionWallet) { // extension uninstalled
        this.$store.commit(UPDATE_EXTENSION_STATUS, false)
      } else {
        this.$store.commit(UPDATE_EXTENSION_STATUS, true)
      }
    },
    setDifficulty (difficulty) {
      this.$store.commit(CHANGE_DIFFICULTY, difficulty)
      // this.$refs.mainCanvas.init()
    },
    getUserInfo () {
      this.$store.dispatch('getUserInfo')
    },
  },
}
</script>

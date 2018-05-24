/*** Created by dujianhao on 2018/4/13.*/

<template>
  <div class="default-view">
    <div class="default-view-header">
      <p>Nebulas Snake</p>
      <div class="difficulty-select-area">
        <p @click="setDifficulty(DIFFICULTY.NORMAL)" :class="['difficulty-btn', 'normal', {'unselected': DIFFICULTY.NORMAL !== difficulty}]">Normal</p>
        <p @click="setDifficulty(DIFFICULTY.MIDDLE)" :class="['difficulty-btn', 'middle', {'unselected': DIFFICULTY.MIDDLE !== difficulty}]">Middle</p>
        <p @click="setDifficulty(DIFFICULTY.HARD)" :class="['difficulty-btn', 'hard', {'unselected': DIFFICULTY.HARD !== difficulty}]">Hard</p>
      </div>
      <p>Score: {{ score }}</p>
    </div>
    <div class="default-view-main">
      <main-canvas ref="mainCanvas"/>
      <!--<sidebar/>-->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { DIFFICULTY } from '../enums'
import { CHANGE_DIFFICULTY } from '../store/mutationTypes'
import './index.scss'
import MainCanvas from '../components/MainCanvas'

export default {
  name: 'nebulas-snake',
  components: { MainCanvas },
  data () {
    return {
      DIFFICULTY,
    }
  },
  computed: {
    ...mapState({
      score: state => state.gameStatus.score,
      difficulty: state => state.gameStatus.difficulty,
    }),
  },
  methods: {
    setDifficulty (difficulty) {
      this.$store.commit(CHANGE_DIFFICULTY, difficulty)
      this.$refs.mainCanvas.init()
    },
  },
}
</script>

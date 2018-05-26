/**
* Created by dujianhao on 2018/5/25.
*/
<template>
    <span :class="wrapClasses" @click="toggle" @keydown.space="toggle">
        <input type="hidden" :value="currentValue">
    </span>
</template>
<script>
import './index.scss'

export default {
  name: 'switch-input',
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  computed: {
    wrapClasses () {
      return ['switch-input', this.currentValue ? 'switch-input-checked' : 'switch-input-unchecked']
    },
  },
  methods: {
    toggle () {
      const checked = !this.currentValue
      this.currentValue = checked
      this.$emit('input', checked)
      this.$emit('on-change', checked)
    }
  },
  watch: {
    value (val) {
      this.currentValue = !!val
    }
  }
}
</script>

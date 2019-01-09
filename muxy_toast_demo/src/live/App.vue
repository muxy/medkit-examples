<template>
  <div>
    <toast-live></toast-live>
  </div>
</template>

<script>
import 'spectre.css'

import ToastLive from './ToastLive.vue';

export default {
  name: 'app',
  components: {
    ToastLive,
  }
}
</script>

<style>
</style>
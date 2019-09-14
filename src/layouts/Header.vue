<template>
  <div>
    <a-layout-header :style="{ background: '#fff', padding: 0 }">
      <div class="header">{{ username }}</div>
    </a-layout-header>
  </div>
</template>

<script>
export default {
  props: {
    username: String
  }
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row-reverse;
  margin: 0 1.6rem;
  font-size: 1rem;
}
</style>

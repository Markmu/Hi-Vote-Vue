<template>
  <div>
    <a-menu theme="dark" mode="inline">
      <a-menu-item key="1">
        <a-icon type="user" />
        <span class="nav-text">我的投票</span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="video-camera" />
        <span class="nav-text">新建投票</span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="upload" />
        <span class="nav-text">nav 3</span>
      </a-menu-item>
      <a-menu-item key="4">
        <a-icon type="logout" />
        <span class="nav-text" @click="logout()">退出登录</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("Flag");
      localStorage.removeItem("email");
      this.$router.push("/user/login");
    }
  }
};
</script>

<style></style>

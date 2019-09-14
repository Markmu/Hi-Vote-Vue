<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      collapsedWidth="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo">Hi Vote</div>
      <SiderMenu />
    </a-layout-sider>
    <a-layout>
      <Header :username="setEmail" />
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '420px' }"
        >
          <router-view></router-view>
        </div>
      </a-layout-content>
      <Footer />
    </a-layout>
  </a-layout>
</template>
<script>
import SiderMenu from "./SiderMenu";
import Header from "./Header";
import Footer from "./Footer";
export default {
  components: {
    SiderMenu,
    Header,
    Footer
  },
  data: function() {
    return {
      hello: "hello"
    };
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    }
  },
  computed: {
    setEmail() {
      console.log(this.$store.state);
      return this.$store.state.userInfo;
    }
  }
};
</script>

<style scoped>
#components-layout-demo-responsive .logo {
  height: 2rem;
  background: rgba(255, 255, 255, 0.2);
  margin: 0.5rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  font-size: 1.6rem;
  color: rgb(250, 243, 243);
}
</style>

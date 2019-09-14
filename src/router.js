import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import NotFound from "./views/404";
import store from "./store";
import { Notification } from "ant-design-vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout"),
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          meta: { isLogin: false },
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Login")
        },
        {
          path: "/user/register",
          name: "register",
          meta: { isLogin: false },
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Register")
        }
      ]
    },
    {
      path: "/vote",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
      children: [
        {
          path: "/vote",
          redirect: "/vote/theme"
        },
        {
          path: "/vote/theme",
          name: "theme",
          meta: { isLogin: false },
          component: () =>
            import(/* webpackChunkName: "content" */ "./views/content/Theme")
        },
        {
          path: "/vote/main",
          name: "main",
          meta: { isLogin: true },
          component: () =>
            import(/* webpackChunkName: "content" */ "./views/content/Category")
        }
      ]
    },
    {
      path: "/form"
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "*",
      name: "404",
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 获取登录成功后设置的标志
  let getFlag = localStorage.getItem("Flag");
  let userInfo = localStorage.getItem("email");
  if (getFlag === "isLogin") {
    store.state.isLogin = true;
    store.state.userInfo = userInfo;
    next();
    if (!to.meta.isLogin) {
      if (to.name == "login" || to.name == "register") {
        Notification["error"]({
          message: "请先退出登录"
        });
        router.back();
      }
    }
  } else {
    if (to.meta.isLogin) {
      next({
        path: "/user/login"
      });
      Notification["info"]({
        message: "请先登录"
      });
    } else {
      next();
    }
  }
});

export default router;

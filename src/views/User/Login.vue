<template>
  <div class="space">
    <h1 class="logo">Hi Vote</h1>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                { required: true, message: '请输入您的邮箱！' },
                { type: 'email', message: '请输入正确格式的邮箱！' }
              ],
              validateTrigger: 'blur'
            }
          ]"
          placeholder="邮箱"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            }
          ]"
          type="password"
          placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: false
            }
          ]"
        >
          记住密码
        </a-checkbox>
        <a class="login-form-forgot" href="">
          忘记密码
        </a>
        <a-button type="primary" html-type="submit" class="login-form-button">
          登录
        </a-button>

        <a @click="goRegiste">
          现在注册
        </a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import store from "../../store";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      var that = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$axios.post("/user/login", values).then(function(res) {
            localStorage.setItem("Flag", "isLogin");
            store.state.userInfo = res.data;
            localStorage.setItem("email", res.data.data.email);
            that.$router.push("/vote/main");
            console.log(res.data);
          });
          this.form.setFieldsValue({
            email: "",
            password: ""
          });
          console.log("Received values of form: ", values);
        }
      });
    },
    goRegiste() {
      this.$router.push("/user/register");
    }
  }
};
</script>
<style scoped>
.space {
  width: 20rem;
  margin: 0 auto;
  padding-top: 1rem;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.logo {
  margin: 0 auto;
  text-align: center;
  padding: 2rem 0;
}
</style>

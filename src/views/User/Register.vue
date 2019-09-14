<template>
  <div>
    <a-row type="flex" justify="space-around" class="return">
      <a-col :span="4" @click="goBack">
        <a-icon
          type="left"
          :style="{ fontSize: '1.6rem', lineHeight: '1.6rem' }"
        ></a-icon>
      </a-col>
      <a-col :span="4"> </a-col>
      <a-col :span="4"> </a-col>
      <a-col :span="4"> </a-col>
    </a-row>
    <div class="container">
      <a-row class="title">
        <a-col :span="12" pull="2">用户注册</a-col>
      </a-row>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="邮箱" hasFeedback>
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    type: 'email',
                    message: '请输入正确的邮箱！'
                  },
                  {
                    required: true,
                    message: '请输入邮箱'
                  },
                  {
                    validator: validateEmail
                  }
                ],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="密码">
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入密码！'
                  },
                  {
                    validator: validateToNextPassword
                  }
                ]
              }
            ]"
            type="password"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="确认密码" hasFeedback>
          <a-input
            v-decorator="[
              'confirm',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入确认密码！'
                  },
                  {
                    validator: compareToFirstPassword
                  }
                ]
              }
            ]"
            type="password"
            @blur="handleConfirmBlur"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="手机号">
          <a-input
            v-decorator="[
              'phone',
              {
                rules: [
                  {
                    required: false,
                    message: 'Please input your phone number!'
                  }
                ]
              }
            ]"
            style="width: 100%"
          >
            <a-select
              slot="addonBefore"
              v-decorator="['prefix', { initialValue: '86' }]"
              style="width: 70px"
            >
              <a-select-option value="86">
                +86
              </a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-button type="primary" html-type="submit">
            点击注册
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { Notification } from "ant-design-vue";
export default {
  data() {
    return {
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          sm: { span: 4 }
        },
        wrapperCol: {
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      // var that = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const data = {
            email: values.email,
            password: values.password,
            passwordAgain: values.confirm,
            phone: values.phone
          };
          this.$axios.post("/user/register", data).then(function(response) {
            if (response.data.code === 0) {
              console.log(response.data.data);
              this.form.setFieldsValue({
                email: "",
                password: "",
                confirm: "",
                phone: ""
              });
            } else {
              Notification.error({ message: response.data.msg });
            }
          });
          this.form.setFieldsValue({
            email: "",
            password: "",
            confirm: "",
            phone: ""
          });
          console.log("Received values of form: ", data);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次输入密码不一致!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    validateEmail(rule, value, callback) {
      console.log(value);
      this.$axios.post("/user/check_email", value).then(function(response) {
        console.log(response);
        if (response.data.code === 0) {
          callback();
        } else {
          callback(response.data.msg);
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.container {
  padding: 0 4rem 0;
  max-width: 800px;
  margin: 0 auto;
}
.title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
.return {
  line-height: 4rem;
  height: 4rem;
}
</style>

<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username">
          <label for="">邮箱</label>
          <el-input
            type="username"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label for="">密码</label>
          <el-input
            type="text"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwords" v-show="model == 'register'">
          <label for="">重复密码</label>
          <el-input
            type="text"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <label for="">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input
                v-model.number="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="btn">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="btn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { stripscript } from "@/utils/validate";
import { reactive, ref, toRefs, onMounted } from "@vue/composition-api";
export default {
  name: "login",
  setup(props, context) {
    // 解构的写法
    // setup(props, {refs}) {

    // 这里放置data数据,生命周期,自定义的函数
    console.log(props, context);

    let validateUsername = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!reg.test(value)) {
        callback(new Error("用户名格式错误!"));
      } else {
        callback();
      }
    };
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码为6到20位的数字+字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    let validatePasswords = (rule, value, callback) => {
      // 如果模块值为login,直接通过
      if (model.value === "login") {
        callback();
      }
      // 过滤后的数据
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    let checkCode = (rule, value, callback) => {
      // 过滤空格后的数据
      ruleForm.code = stripscript(value);
      value = ruleForm.code;

      let reg = /^[a-z0-9]{6}$/;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!reg.test(value)) {
        callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };

    /**
     * 声明的数据
     */
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    console.log(menuTab);
    // 模块值
    const model = ref("login");
    console.log(model.value);

    const obj = reactive({
      x: 0,
      y: 1
    });
    console.log(obj.x);
    const o = toRefs(obj);
    console.log(o.x);
    console.log(o.x.value);

    // 表单绑定数据
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    // 表单的验证
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }]
    });

    /**
     * 声明函数
     */
    const toggleMenu = data => {
      console.log(data);
      menuTab.forEach(item => {
        item.current = false;
      });
      data.current = true;
      // 修改模块值
      model.value = data.type;
    };
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // 解构的写法
      // refs[formName].validate(valid => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    };

    /**
     * 生命周期
     */
    // 挂载完成后
    onMounted(() => {});

    return {
      menuTab,
      model,
      toggleMenu,
      submitForm,
      ruleForm,
      rules
    };
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 30px;
  label {
    display: block;
    font-size: 14px;
    margin-bottom: 3px;
    color: #fff;
  }
  .btn {
    display: block;
    width: 100%;
  }
}
</style>

<template>
  <div class="login-container">
    <el-form :label-position="labelPosition" :model="ruleForm" :rules="loginRules" status-icon class="login-form" ref="ruleForm"  auto-complete="on">
      <h3 class="title">后台管理</h3>
      <el-form-item prop="username">
        <div class="form-item-flex">
          <span class="svg-container">
            <user-icon class="svg-icon"></user-icon>
          </span>
          <el-input type="text" v-model="ruleForm.adminName" name="username" autocomplete="off"></el-input>
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <div class="form-item-flex">
          <span class="svg-container">
            <lock-icon class="svg-icon"></lock-icon>
          </span>
          <el-input type="password" v-model="ruleForm.passWord" name="password" autocomplete="off"></el-input>
        </div>
      </el-form-item>
      <el-form-item prop="checkcode">
        <div class="form-item-flex">
          <span class="svg-container">
            <codepen-icon class="svg-icon"></codepen-icon>
          </span>
          <el-input type="text" v-model="ruleForm.validCode" name="checkcode" autocomplete="off"></el-input>
          <img @click="getbase64" :src=checkImg alt="" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleLogin" type="primary" style="width:100%;" :loading="buttonload">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {UserIcon, LockIcon, CodepenIcon} from 'vue-feather-icons'
import service from '@/api/request'
import {setStorage} from '@/api/sessionStorage'

export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (this.ruleForm.adminName === '') {
        return callback(new Error('用户名不能为空！'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (this.ruleForm.passWord === '') {
        return callback(new Error('密码不能为空！'))
      } else {
        callback()
      }
    }
    const validataCheck = (rule, value, callback) => {
      if (this.ruleForm.validCode === '') {
        return callback(new Error('验证码不能为空！'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'right',
      buttonload: false,
      ruleForm: {
        adminName: '',
        passWord: '',
        validCode: '',
        imgToken: ''
      },
      loginRules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkcode: [{ validator: validataCheck, trigger: 'blur' }]
      },
      checkImg: ''
    }
  },
  components: {
    UserIcon,
    LockIcon,
    CodepenIcon
  },
  created () {
    this.getbase64()
  },
  mounted () {
    console.log(this.$router.options.routes)
  },
  methods: {
    getbase64 () {
      service.getbase64().then(respone => {
        this.checkImg = 'data:image/jpg;base64,' + respone.data.result.imgCode
        this.ruleForm.imgToken = respone.data.result.imgToken
      }).catch(error => {
        console.log(error)
      })
    },
    handleLogin () {
      if (this.ruleForm.adminName === '' || this.ruleForm.passWord === '' || this.ruleForm.validCode === '') return
      this.buttonload = true
      service.login(this.ruleForm).then(responent => {
        this.buttonload = false
        console.log(responent.data)
        if (responent.data.resp_code.toString() === '000000') {
          setStorage('userinfo', responent.data.result)
          this.$router.push('/')
        }
      }).catch(error => {
        this.buttonload = false
        console.log(error)
      })
    }
  }
}
</script>

<style rel="stylesheet/css" lang="css">
.login-container{
  display:flex;
  width:100vw;
  height:100vh;
  background-color:#2d3a4b;
}
.login-container .el-input input{
  background: transparent;
  border:none;
  border-radius:0px;
  color:#ffffff;
}
.login-container .el-form-item .form-item-flex{
  display: -webkit-flex;
  display:flex;
  line-height: 40px;
  flex-wrap: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.login-container .title {
  font-size: 26px;
  font-weight: 400;
  color: #fff;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}
.login-container .login-form {
  position: absolute;
  left: 0;
  right: 0;
  width: 380px;
  max-width: 100%;
  padding: 35px 35px 15px 35px;
  margin: 120px auto;
}
.login-container .svg-container {
  color: #889AA4;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
.login-container .svg-container .svg-icon{
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: -0.35rem;
 /* fill: currentColor;*/
  overflow: hidden;
  margin-left: 10px;
}
</style>

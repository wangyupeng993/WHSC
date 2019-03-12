<template>
  <div class="login-container">
    <el-form :label-position="labelPosition" :model="ruleForm" :rules="loginRules" status-icon class="login-form" ref="ruleForm"  auto-complete="on">
      <h3 class="title">中联支付商家后台管理</h3>
      <el-form-item prop="username">
        <div class="form-item-flex">
          <i class="fas fa-home"></i>
          <el-input type="text" v-model="ruleForm.login_id" name="username" autocomplete="off" placeholder="请输入商家账号"></el-input>
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <div class="form-item-flex">
          <i class="fas fa-key"></i>
          <el-input type="password" v-model="ruleForm.login_pass" name="password" autocomplete="off" placeholder="请输入商家密码"></el-input>
        </div>
      </el-form-item>
      <el-form-item prop="googleCode">
        <div class="form-item-flex">
          <i class="fas fa-unlock-alt"></i>
          <el-input type="text" v-model="ruleForm.smsCode" name="googleCode" placeholder="请输入google验证码"></el-input>
        </div>
      </el-form-item>
      <el-form-item prop="imagecode">
        <div class="form-item-flex">
          <i class="fas fa-qrcode"></i>
          <el-input type="text" v-model="ruleForm.validCode" name="imagecode" placeholder="请输入图形验证码"></el-input>
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
import service from '@/api/request/index'
import {setStorage} from '@/api/sessionStorage'

export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (this.ruleForm.login_id === '') {
        return callback(new Error('商家账号不能为空！'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (this.ruleForm.login_pass === '') {
        return callback(new Error('商家密码不能为空！'))
      } else {
        callback()
      }
    }
    const validataGoogle = (rule, value, callback) => {
      if (this.ruleForm.smsCode === '') {
        return callback(new Error('google验证码不能为空！'))
      } else {
        callback()
      }
    }
    const validataImage = (rule, value, callback) => {
      if (this.ruleForm.validCode === '') {
        return callback(new Error('图形验证码不能为空！'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'right',
      buttonload: false,
      ruleForm: {
        login_id: '',
        login_pass: '',
        validCode: '',
        smsCode: '',
        imgToken: ''
      },
      loginRules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        googleCode: [{ validator: validataGoogle, trigger: 'blur' }],
        imagecode: [{ validator: validataImage, trigger: 'blur' }]
      },
      checkImg: null
    }
  },
  mounted () {
    this.getbase64()
    document.onkeydown = this.keyDown
  },
  methods: {
    getbase64 () {
      service.getbase64()
        .then(respone => {
          this.checkImg = `data:image/jpg;base64,${respone.data.result.img}`
          this.ruleForm.imgToken = respone.data.result.code
        })
        .catch(error => {
          console.log(error)
        })
    },
    async handleLogin () {
      if (this.ruleForm.login_id === '' || this.ruleForm.login_pass === '' || this.ruleForm.validCode === '') return
      this.buttonload = true
      await service.login(this.ruleForm)
        .then(responent => {
          this.buttonload = false
          setStorage('userinfo', responent.data.result)
          if (responent.data.resp_code.toString() === '999999') {

          }
          if (responent.data.resp_code.toString() === '000000') {
            setStorage('userinfo', responent.data.result)
            this.$router.push('/')
          }
        })
        .catch(error => {
          this.buttonload = false
          console.log(error)
        })
      await this.getbase64()
    },
    keyDown (e) {
      if (e.key === 'Enter' && window.event.keyCode === 13) {
        this.handleLogin()
      }
    }
  }
}
</script>

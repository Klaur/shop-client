<template>
<div class="login-mask" v-if="showLogin">
    <div class="login">
        <div class="login-content"> 
            <el-form>
            <div v-if="errInfoShow">
               {{errInfo}}
            </div>
            <div class="user">
                <i  class="el-icon-user"></i> 账 号：
                <el-input v-model="username" size="small" placeholder="请输入账号" style="width:200px;">
                </el-input>
            </div>
            <div class="pwd">
                <i  class="el-icon-wodemima"></i> 密 码：
                <el-input v-model="password" type="password" size="small" placeholder="请输入密码" style="width:200px;">
                </el-input>
            </div>
            <div>
                <el-button type="primary" size="medium" round @click="login"> 登 陆 </el-button>
            </div>
            </el-form>
        </div>
        <span class="close" @click="close">X</span>
    </div>
</div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    showLogin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      username: "",
      password: "",
      errInfoShow:false,
      errInfo:''
    };
  },
  methods: {
    close() {
      this.$emit("closeLogin");
      this.password = "";
      this.username = "";
    },
    login() {
      axios.post("/users/login", {
          username:this.username,
          password:this.password
      }).then((response) => {
          let res=response.data
          if(res.status=='0'){
              this.errInfoShow=false 
              this.$emit("closeLogin",res.result.username);
              this.password = "";
              this.username = "";
          }else{
              this.errInfoShow=true
              this.errInfo=res.msg
          }
      });
    }
  }
};
</script>
<style scoped="scoped" lang="less">
@import url("../../assets/font-icon/iconfont.css");
.login-mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color:#333;
  z-index:3;
  .login {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background: #fff;
    padding: 30px 30px 10px 30px;
    width: 300px;
    text-align: center;
    .user,
    .pwd {
      margin: 10px 0;
      &input {
        line-height: 30px;
      }
    }
    .close {
      position: absolute;
      right: 10px;
      top: 2px;
      font-size: 12px;
      cursor: pointer;
    }
  }
}
</style>

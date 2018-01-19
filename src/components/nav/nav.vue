<template>
       <nav class="nav">
            <div class="nav-container">
                <el-row :gutter="10">
                      <el-col :xs="4" :sm="4" :md="4" :lg="6"><div class="logo" @click="$router.push('/')">樂Mall</div></el-col>
                      <el-col :xs="20" :sm="20" :md="20" :lg="18" >
                        <div class="options">
                          <span class="username" v-if="nickName">你好，{{nickName}}</span>
                          <span @click="showLogin=true" class="login"  v-if="!nickName">Login</span>
                          <span class="shopcart" @click="toCart"><i class="el-icon-shoppingcartblackshape"></i></span>
                          <span  class="login" @click="logout"  v-if="nickName">Log Out</span>
                        </div>
                      </el-col>
                </el-row>
            </div>
             <login :showLogin="showLogin" @closeLogin="closeLogin"></login>  
        </nav>
</template>
<script>
import login from "../login/login";
import axios from "axios"
export default {
  data() {
    return {
      nickName: "",
      showLogin: false
    };
  },
  mounted(){
      this.checkLogin()
  },
  methods: {
    checkLogin() {
      axios.get("/users/checkLogin").then(response => {
        let res = response.data;
        if (res.status == "0") {
          this.nickName = res.result;
        }
      });
    },
    closeLogin($event) {
      this.showLogin = false;
      this.nickName = $event ? $event : "";
    },
    logout() {
      this.$confirm("确定退出当前登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios.post("/users/logout").then(response => {
            let res = response.data;
            this.nickName = "";
            if (res.status == "0") {
              this.$message({
                type: "success",
                message: "已退出登陆!"
              });
            }
          });
        })
        .catch(() => {});
    },
    toCart(){
        this.$router.push('cart')
    }
  },
  components: {
    login
  }
};
</script>
<style scoped lang='less'>
.nav {
  width: 100%;
  height: 50px;
  background: #20a0ff;
  color: #fff;
  line-height: 50px;
  .logo {
    text-align: center;
    font-size: 30px;
  }
  .options {
    text-align: right;
    padding-right: 100px;
    .username {
      font-size: 12px;
      margin-right: 10px;
    }
    .shopcart {
      margin-right: 10px;
      cursor: pointer;
    }
    .login {
      font-size: 12px;
      cursor: pointer;
      margin-right: 10px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .nav-container {
  }
}
</style>



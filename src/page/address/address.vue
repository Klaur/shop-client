<template>
    <div class="address-container">
         <nav-head></nav-head>
          <section class="address-list">
              <h1>SHOPPING ADDRESS</h1>
              <ul class="address-box">
                  <li class="address" v-for="(item,index) of addressListFilter" :key="index" @click='selectAddress(index)'>
                      <div class="address-content" :class="{'default':checkedIndex==index}">
                      <h2>{{item.userName}}</h2>
                      <p>{{item.postCode}}</p>
                      <p>{{item.addressDescr}}</p>
                      <p>{{item.tel}}</p>
                      <p style="font-size:14px;"><span v-if="item.isDefault" style="color:orange">默认地址</span><span v-else style="color:red;cursor:pointer" @click="setDefault(item)">设为默认地址</span><span><i class="el-icon-shanchu" @click="deleteAddress(item)"></i></span></p>
                      </div>
                  </li>
                  <li class="address">
                      <div class="address-content add-address">
                          <i class="el-icon-plus"></i>
                      </div>
                  </li>
              </ul>
              <p class="moreAddress" @click.stop="moreAddress"><span>more <i class="el-icon-arrow-up" v-if="limit==3"></i><i class="el-icon-arrow-down" v-else></i></span></p>
              <h1>SHOPPING METHODS</h1>
              <ul class="address-box">
                  <li class="address">
                      <div class="address-content default" >
                      <h2>Standard Shipping</h2>
                      <p>Free</p>
                      <p>During the activity, the freight is free</p>
                      </div>
                  </li>
              </ul>
          </section> 
          <div class="next" @click="toOrderConfirm">下一步</div> 
    </div>
</template>
<script>
import navHead from "../../components/nav/nav.vue";
import axios from "axios";
export default {
  data() {
    return {
      limit: 3,
      checkedIndex:0,
      addressList: []
    };
  },
  mounted() {
    console.log(document.cookie)
    this.init();
  },
  methods: {
    init() {
      axios.get("/users/address").then(response => {
        let res = response.data;
        if (res.status == "0") {
          this.addressList = res.result;
        }
      });
    },
    moreAddress(){
        if(this.limit==3){
            this.limit=this.addressList.length
        }else{
            this.limit=3
        } 
    },
    selectAddress(index){
      this.checkedIndex=index
    },
    setDefault(item){
        let id=item.addressId
        axios.post('/users/address/setDefault',{addressId:id})
        .then(response=>{
            let res = response.data;
            if (res.status == "0") {
            this.$message({
                  type: "success",
                  message: "设置成功!"
                });
                this.init()
                this.checkedIndex=0
            }else{
               this.$message({
                  type: "error",
                  message: res.msg
                }); 
            }
        })
    },
    deleteAddress(item){ 
        let id=item.addressId
       this.$confirm("确定要删除该地址信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }) 
        .then(() => {
          axios
            .post("/users/address/del", { addressId: id})
            .then(response => {
              let res = response.data;
              if (res.status == "0") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.init();
              }
            });
        })
        .catch(() => {});
    },
    toOrderConfirm(){
      this.$router.push({name: 'OrderConfirm',query: { userId: 123 }})
    }
  },
  computed: {
    addressListFilter() {
      return this.addressList.slice(0, this.limit);
    }
  },
  components: {
    navHead
  }
};
</script>
<style scoped lang="less">
.address-container {
  .address-list {
    h1 {
      color: #666;
    }
    .address-box {
      &::after {
        display: table;
        content: "";
        clear: both;
      }
      .address {
        list-style: none;
        float: left;
        width: 25%;
        padding: 10px;
        box-sizing: border-box;
        .address-content {
          padding: 10px 5px;
          background: #fff;
          border: 2px solid #ddd;
          box-sizing: border-box;
          color: #333;
          height: 170px;
          p {
            width: 100%;
            line-height: 26px;
          }
          i {
            font-size: 24px;
            color: #1c91fc;
            cursor: pointer;
            vertical-align: middle; 
          }
        }
        .default {
          border-color: orange;
        }
        .address-content:hover {
          border-color: orange;
        }
        .add-address {
          text-align: center;
          line-height: 130px;
          i {
            font-size: 80px;
          }
        }
      }
    }
    .moreAddress {
        cursor: pointer;
      text-align: center;
      color:  deeppink
    }
  }
  .next{
    float: right;
    margin-right: 20px;
    width: 100px;
    color:#fff;
    background: red;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer
  }
}
</style>



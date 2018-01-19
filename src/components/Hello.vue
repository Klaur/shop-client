<template>
  <div class="hello"> 
    <h3 class="mydiv">
      I am Hello page , and my name is {{$route.query.name}} !
    </h3>
    <table>
      <tr>
        <th>Id</th><th>商品名称</th><th>价格 <span v-if="sort===1" @click="sortByPrice">(低-高)</span> <span v-if="sort!=1" @click="sortByPrice">(高-低)</span>  </th>
      </tr>
      <tr v-for="item in goodsList" :key="item._id">
        <td><img :src="item.productImage" alt=""></td><td>{{item.productName}}</td><td>{{item.salePrice}}</td>
      </tr>
    </table>
    <loading></loading>   
    <li><router-link to="/hello/a">a</router-link></li>
    <li><router-link to="/hello/b">b</router-link></li>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "hello",
  /**@argument
  * 组件创建前访问查看访问权限！
  */
  beforeCreate() {
    if (this.$route.query.name == "jane") {
      this.$router.push({ path: "404" });
    }
  },
  mounted() {
    // console.log(this.goodsList)
     this.getProductList()
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      show: true,
      sort:1,
      num: this.$route.params.level,
      person: {
        name: 1
      },
      goodsList: [],
      pageNo:1,
      pageSize:10,
    };
  },
  methods: {
    increase() {
      this.num++;
    },
    decrease() {
      this.num--;
    },
    addAttr() {
      //      this.person.show=true
      this.$set(this.person, "show", true);
      console.log(this.person);
    },
    getProductList(){
       axios
      .get(`/goods`, {
        params: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          sort: this.sort
        }
      })
      .then(res => {
        let data = res.data;
        if (data.status == "0") {
          this.goodsList = data.result.list;
        } else {
          this.goodsList = [];
        }
      });
    },
    sortByPrice(){
      if(this.sort==1){
        this.sort=-1
      }else{
        this.sort=1
      }
      this.pageNo=1;
      this.pageSize=10;
      this.getProductList()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
h3{
  margin-bottom: 30px;
  border-bottom:1px solid red; 
}
table {
  width: 90%;
  margin: 0 auto;
  td,
  th {
    text-align: center;
  }
}
</style>

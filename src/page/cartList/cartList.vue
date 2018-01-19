<template>
    <div>
        <nav-head></nav-head>    
        <header>我的购物车</header>
        <section class="cart-container">
            <table class="cart-list">
                <thead>
                    <tr>
                       <th width='50'></th>
                       <th>商品图片</th>
                       <th>价格</th>
                       <th>数量</th>
                       <th>总价</th>
                       <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) of productList" :key='index'>
                        <td><el-checkbox v-model="item.checked" @change="editCart('check',item)"></el-checkbox></td>
                        <td class="productInfo"><img :src="item.productImage" style="width:140px;height:100px;vertical-align:middle">{{item.productName}}</td>
                        <td>{{Number(item.salePrice).toFixed(2)}}</td>
                        <td><el-input-number size='mini' @change="editCart('num',item)" v-model="item.productNum"  :min="1"  label="描述文字"></el-input-number></td>
                        <td>{{(item.productNum*item.salePrice).toFixed(2)}}</td>
                        <td>
                            <i class="el-icon-shanchu" style="font-size:20px;color:#666;cursor: pointer;" @click="deleteGoods(item)"></i>
                        </td>
                    </tr>                   
                </tbody>
            </table>
            <p style="text-align:center" v-if="productList.length==0">您还未添加商品到购物车！</p>
            <div class="cart-option">
                <span class="selection"><el-checkbox v-model="checkedAll" @change="toggleCheckAll">选择全部</el-checkbox></span>
                <span class="buy">总价：{{allPrice}}
                    <span class="buy-btn" @click="comfirmOrder">确认订单</span>
                </span>
            </div>
        </section>
    </div>
</template>   
<script>
import navHead from "../../components/nav/nav.vue";
import axios from "axios";
export default {
  data() {
    return {
      productList: []
    };
  },
  computed: {
    checkedAll() {
      return this.checkedCount == this.productList.length;
    },
    checkedCount() {
      var i = 0;
      this.productList.forEach(item => {
        if (item.checked == "1") {
          i++;
        }
      });
      return i;
    },
    allPrice(){
        let price=0;
        this.productList.forEach((item)=>{
            if(item.checked=='1'){
                price+=item.productNum*item.salePrice
            }
        })
        return price.toFixed(2)
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      axios.get("/users/cartList").then(response => {
        let res = response.data;
        if (res.status == "0") {
          res.result.forEach((item, index) => {
            item.checked = item.checked == "1" ? true : false;
          });
          this.productList = res.result;
        }
      });
    },
    deleteGoods(goods) {
      this.$confirm("确定要删除该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/users/cart/del", { productId: goods.productId })
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
    editCart(flag, item) {
      if (flag == "num") {
        item.checked = true;
      }
      axios
        .post("/users/cart/edit", {
          productId: item.productId,
          productNum: item.productNum,
          checked: Number(item.checked).toString()
        })
        .then(response => {
          var res = response.data;
          if (res.status != "0") {
            this.$message.error(res.msg);
            this.init();
          }
        });
    },
    toggleCheckAll(checked) {
        console.log(checked)
      var check = !checked;
      this.productList.forEach(item => {
        item.checked = check;
      });
      axios
        .post("/users/cart/editCheckAll", {
          checkAll: check
        })
        .then(response => {
          var res = response.data;
          if (res.status != "0") {
            this.$message.error(res.msg);
            this.init();
          }
        });
    },
    comfirmOrder(){
        if(this.checkedCount>0){
            this.$router.push('address')
        }
    }
  },
  components: {
    navHead
  }
};
</script>
<style scoped lang='less'>
header {
  margin: 40px;
  font-size: 40px;
  color: #666;
}
.cart-container {
  padding: 0 20px;
  .cart-list {
    margin-bottom: 60px;
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
    box-sizing: border-box;
    thead {
      background: #555;
      color: #eee;
      th {
        padding: 5px 0;
      }
    }
    tbody {
      tr {
        height: 120px;
      }
      td {
        text-align: center;
      }
      .productInfo {
        width: 30%;
        text-align: left;
      }
    }
  }
}
  .cart-option {
    border: 1px solid #ddd;
    width: 100%;
    display: table;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffffff;
    z-index: 1;
    // &::after{
    //     content: none;
    //     display: table;
    //     clear: both;
    // }
    .selection {
      display: table-cell;
      padding-left: 20px;
    }
    .buy {
      display: table-cell;
      text-align: right;
      .buy-btn {
        margin-left: 20px;
        display: inline-block;
        background: red;
        color: #eee;
        padding: 10px 20px;
        cursor: pointer;
      }
    }
  }
</style>



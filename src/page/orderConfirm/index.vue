  <template>
    <div class="main">
      <nav-head></nav-head> 
      <h1>确认订单</h1>
     <table class="order-list">
                <thead>
                    <tr>
                       <th>商品图片</th>
                       <th>价格</th>
                       <th>数量</th>
                       <th>总价</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) of ordertList" :key='index'>
                        <td class="productInfo"><img :src="item.productImage" style="width:140px;height:100px;vertical-align:middle">{{item.productName}}</td>
                        <td>{{Number(item.salePrice).toFixed(2)}}</td>
                        <td>*{{item.productNum}}</td>
                        <td>{{(item.productNum*item.salePrice).toFixed(2)}}</td>
                    </tr>                  
                </tbody>
            </table>
            <div class="cost">
              <p>
                商品总价：{{subTotal}}
              </p>
              <p>
                折扣：{{discount}}
              </p>
              <p>
                运费：{{shipping}}
              </p>
              <p>
                税费：{{tax}}
              </p>
              <p>
                订单总价：{{ordertTotal}}
              </p>
              <span class="confirm">确定</span>
            </div>
    </div>
  </template>
  <script>
import axios from "axios";
import math from 'mathjs'
import navHead from "../../components/nav/nav";
export default {
  data() {
    return {
      subTotal:0,
      shipping:100,
      discount:200,
      tax:400,
      ordertTotal:0,
      ordertList: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log(math)
      axios.get("/users/cartList").then(response => {
        let res = response.data;
        if (res.status == "0") {
          res.result.forEach((item, index) => {
            if(item.checked=='1'){
               this.subTotal+=item.salePrice*item.productNum
            }
          });
          this.ordertList = res.result;
          //this.subTotal-this.shipping-this.discount-this.tax
          //this.ordertTotal = math.chain(this.subTotal).subtract(this.discount).subtract(this.tax).done()
          this.ordertTotal = math.chain(954.32).subtract(200).subtract(300).done()
        }
      });
    }
  },
  components: {
    navHead
  }
};
</script>
<style lang="less">
.order-list {
  border-collapse: collapse;
  width: 98%;
  margin: 0 auto;
  text-align: center;
  thead {
    background: #999;
    tr {
      height: 40px;
    }
  }
  .productInfo {
    text-align: left;
  }
}
.cost{
  text-align: right;
  padding-right: 30px;
  p{
    color: #f09;
  }
}

</style>

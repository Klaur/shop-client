  <template>
    <div class="main">
        <nav-head></nav-head>
        <section class="breadcrumbs">首页</section>
        <section class="container-main">
              <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="4" :lg="6">
                          <div class="menu">
                              <h3 class="title">Price</h3>
                              <ul class="price-seletions" v-for="(item,index) in priceList" :key='index'>
                                  <li :class="{active:isActivePriceLevel==index}" @click="choosePriceFilter(item,index)">{{item.descr}}</li>
                              </ul>
                        </div>
                    </el-col>
                      <el-col :xs="24" :sm="24" :md="20" :lg="18" >
                          <div class="sort">
                              排序：<span class="sort-name" v-if="sort==1" @click="sortByPrice">升序</span><span class="sort-name" v-if="sort!=1" @click="sortByPrice">降序</span>
                          </div>
                          <div class="products">
                              <div class="product-list">
                                  <el-row :gutter="20">
                                    <el-col :xs="24" :sm="12" :md="6" :lg="6" v-for="item in goodsList" :key='item.id'>
                                        <dl class="product">
                                            <dt class="product-img">
                                                <img :src="item.productImage" alt="">
                                            </dt>
                                            <dd class="product-title" :title="item.productName">
                                                {{item.productName}}
                                            </dd>
                                            <dd class="product-saleInfo"></dd>
                                            <dd class="product-price">￥{{item.salePrice}}</dd>
                                            <dd class="product-shopcart" @click="addCart(item.productId)">加入购物车</dd>
                                        </dl>    
                                    </el-col>
                                </el-row> 
                                        <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                                                <div v-show="loading">
                                                  <img src="../../static/svg/loading-bars.svg" alt="">
                                                </div>  
                                        </div>
                              </div>
                          </div>
                    </el-col>
                </el-row>
        </section>
        <footer>底部</footer>
    </div>
  </template>
  <script>
import axios from "axios";
import navHead from "../components/nav/nav";
export default {
  mounted() {
    this.getProductList(false);
  },
  data() {
    return {
      loading: false,
      busy: true,
      goodsList: [],
      pageNo: 1,
      pageSize: 8,
      sort: 1,
      isActivePriceLevel: 0,
      minPrice: 0,
      maxPrice: "",
      priceList: [
        {
          descr: "All",
          maxPrice: "",
          minPrice: 0
        },
        {
          descr: "0.00 - 100.00",
          maxPrice: 100,
          minPrice: 0
        },
        {
          descr: "100.00 - 200.00",
          maxPrice: 200,
          minPrice: 100
        },
        {
          descr: "200.00 - 500.00",
          maxPrice: 500,
          minPrice: 200
        },
        {
          descr: "500.00 - 1000.00",
          maxPrice: 1000,
          minPrice: 500
        },
        {
          descr: "1000.00 - 2000.00",
          maxPrice: 2000,
          minPrice: 1000
        },
        {
          descr: "2000.00 - 3000.00",
          maxPrice: 3000,
          minPrice: 2000
        },
        {
          descr: "3000.00以上",
          maxPrice: "",
          minPrice: 3000
        }
      ]
    };
  },
  methods: {
    getProductList(flag) {
      this.loading = true;
      axios
        .get(`/goods/list`, {
          params: {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            sort: this.sort,
            minPrice: this.minPrice,
            maxPrice: this.maxPrice
          }
        })
        .then(res => {
          this.loading = false;
          let data = res.data;
          if (data.status == "0") {
            if (flag) {
              this.goodsList = this.goodsList.concat(data.result.list);
              if (data.result.count < this.pageSize) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.goodsList = data.result.list;
              this.busy = false;
            }
          }
        });
    },
    sortByPrice() {
      if (this.sort == 1) {
        this.sort = -1;
      } else {
        this.sort = 1;
      }
      this.pageNo = 1;
      this.pageSize = 8;
      this.getProductList();
    },
    choosePriceFilter(price, index) {
      console.log(price);
      this.isActivePriceLevel = index;
      this.pageNo = 1;
      this.minPrice = price.minPrice;
      this.maxPrice = price.maxPrice;
      this.getProductList();
    },
    loadMore() {
      this.busy = true;
      this.loading = true;
      setTimeout(() => {
        this.pageNo++;
        this.getProductList(true);
      }, 1000);
    },
    addCart(productId) {
      axios
        .post(`/goods/addCart`, {
          productId: productId
        })
        .then(res => {
          this.loading = false;
          let data = res.data;
          if (data.status == "0") {
            this.$message({
              message: "添加购物车成功！",
              type: "success",
              showClose: true
            });
          } else {
            this.$message({
              message: data.msg,
              // type: "error",
              showClose: true
            });
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
body {
  overflow-x: hidden;
  font-family: "微软雅黑";
  color: #555;
}
.main {
  .breadcrumbs {
    height: 30px;
    line-height: 30px;
    background: #eee;
    color: #666;
    font-size: 12px;
    padding: 0 0 0 100px;
  }
  .container-main {
    min-height: 600px;
    .menu {
      .title {
        height: 50px;
        line-height: 50px;
        font-size: 18px;
      }
      padding: 0 40px;
      .price-seletions li {
        height: 40px;
        line-height: 40px;
        list-style: none;
        padding-left: 20px;
        cursor: pointer;
        margin-bottom: 10px;
      }
      .price-seletions li:hover {
        border-left: 4px solid #20a0ff;
      }
      .price-seletions .active {
        border-left: 4px solid #20a0ff;
      }
    }
    .sort {
      height: 40px;
      line-height: 40px;
      text-align: right;
      padding-right: 40px;
      font-size: 12px;
      font-weight: 700;
      .sort-name {
        color: #e54f56;
        cursor: pointer;
      }
    }
    .product-list {
      .product {
        border: 2px solid #dddddd;
        padding: 6px;
        transition: all 0.5s ease-out;
        margin-bottom: 30px;
        &:hover {
          border: 2px solid #ee7a23;
          transform: translate3d(0, -5px, 0);
          box-shadow: 0 0 10px #999;
        }
        .product-img img {
          width: 100%;
        }
        .product-title {
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          overflow: hidden;
          padding: 4px 8px;
        }
        .product-saleInfo {
          font-size: 14px;
          padding: 4px 8px;
        }
        .product-price {
          font-size: 14px;
          padding: 4px 8px;
        }
        .product-shopcart {
          margin: 4px 20px;
          text-align: center;
          height: 40px;
          line-height: 40px;
          color: #20a0ff;
          border: 1px solid #20a0ff;
          cursor: pointer;
        }
        .product-shopcart:hover {
          background: #20a0ff;
          color: #fff;
        }
      }
      .load-more {
        text-align: center;
      }
    }
  }
}
</style>

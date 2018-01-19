<template>
    <div class="child">
     I am A page!
    </div>
</template>
<script>
    export default {
      props:[
        'num'
      ],
        data () {
            return {
              name:123
            }
        },
      methods:{
        increase(){
          this.$emit('increment')
        },
        decrease(){
          this.$emit('decrement')
        }
      }
    }
</script>
<style scoped="scoped" lang="less">
  .child{
    span{
      color:red
    }
  }
</style>

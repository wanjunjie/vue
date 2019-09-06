<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
    import util from '@/util/util';
    import './assets/img/iconfont/iconfont.js';
    import './assets/css/main.css';
    import './assets/aip/js/aipiconfont/iconfont.js';
    import './assets/aip/css/AIP.css';
    export default {
        name: 'App',
        data(){
            return{
                routePath:[],
                target:''
            }
        },
        watch:{
            '$route':{
                handler(newValue, oldValue) {
                    this.routePath.push({newValue,oldValue});
                    let lastObj = this.routePath[this.routePath.length-1];
                    if(lastObj.newValue.path=='/register'&&util.isValidate(lastObj.oldValue)){
                        this.target = lastObj.oldValue.path;
                    }
                    if(util.isValidate(lastObj.oldValue) && (lastObj.oldValue.path=='/register'||lastObj.oldValue.path=='/setPassword')){
                        if(this.target!='/userEdit' && this.target!='/setPassword'){ //修改用户密码的放行
                            this.$router.push({path:this.target});
                        }
                    }
                },
                immediate:true,//在watch里监测路由变化，如果路由有改变立即去执行handler方法
                deep:true//深度监测
            }
        }
    }
</script>

<style>
    /*首页-跳转到惠老板的a链接*/
    .my-link-icon{
        bottom: 5rem;
    }

    /*重写toast的样式*/
    .mint-toast {
        width: 100%;
        position: fixed;
        max-width: 80%;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        box-sizing: border-box;
        text-align: center;
        z-index: 1002 !important;
        -webkit-transition: opacity .3s linear;
        transition: opacity .3s linear
    }
</style>

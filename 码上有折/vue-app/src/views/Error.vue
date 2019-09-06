<template>
    <div class="app">
        <div class="return-result-icon">
            <svg class="icon red" aria-hidden="true">
                <use xlink:href="#icon-guanbi"></use>
            </svg>
        </div>
        <div class="return-result-info">{{errorCode}}</div>
        <div class="return-result-title">失败原因：{{errorMsg}}</div>
        <div class="return-result-details-list">
            
        </div>
        
        <router-link class="link-btn-orange" style="margin-top:5rem;" to="/app">返回首页</router-link>
  
        
    </div>
</template>

<script>
import '@/assets/css/app.css'
export default {
 name: 'Error',
    data(){
        return{
            errorCode:"",
            errorMsg:"",
            tokenId: this.$store.state.token
        }
    },
    created(){
        this.getError();
    },
    methods:{

        //查询页面初始化信息
        getError(){
            if(this.$route.query.msg){
                this.errorMsg=this.$route.query.msg;
                this.errorCode=this.$route.query.code;
            }
        }


    }
}
</script>

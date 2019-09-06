<template>
    <div class="app">
        <div class="return-result-icon">
            <svg class="icon blue" aria-hidden="true">
                <use xlink:href="#icon-dui1"></use>
            </svg>
        </div>
        <div class="return-result-title">惠买免密支付开通成功！</div>
        <div class="return-result-info">
            买单时，将自动从绑定银行卡支付，享免密支付1000元，超过该金额将需要校验。
        </div>
        <div class="return-result-info">
            <span class="blue">{{count}}S</span>后自动回到首页
        </div>
        <router-link to="/app" class="link-btn-orange" style="margin-top:1rem;" >确定</router-link>
    </div>
</template>

<script>
import '@/assets/css/app.css'
export default {
    name: 'AddSucess',
    data(){
        return{
            count:3,//倒计时
        }
    },
    created(){
        this.toCount();
    },
    methods:{
        //倒计时
        toCount(){
            let timer = setInterval(() => {
                if (this.count > 0) {
                    this.count--;
                }
                else{
                    clearInterval(timer);
                    this.$router.push({name:'app'});
                }
               }, 1000)
        }
    }
}
</script>

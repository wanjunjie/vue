<template>
     <div class="app">
        <div class="return-result-icon">
            <svg class="icon green" aria-hidden="true">
                <use xlink:href="#icon-dui1"></use>
            </svg>
        </div>
        <div class="return-result-info">支付成功</div>
        <div class="return-result-title red"  v-if="discountAmount!='0.00'">优惠¥ {{discountAmount}}</div>
        <div class="return-result-details-list">
            <div v-if="deductAmt" class="item" >
                <div class="t red">
                    红包抵扣
                    <span class="p red">{{deductAmt}}</span>
                </div>
            </div>
            <div class="item" >
                <div class="t">
                    支付金额
                    <span class="p">{{orderAmount}}</span>
                </div> 
            </div>
            <div class="item">
                <div class="t">
                    商户名称
                    <span class="p">{{this.mchtName}}</span>
                </div>
            </div>
            <div class="item">
                <div class="t">
                    付款方式
                    <span class="p">{{bankName}} {{cardType}}({{bankCardNoLast4}})</span>
                </div>
            </div>
        </div>
        <router-link class="link-btn-orange" style="margin-top:1rem;" to="/app">完成</router-link>
        
    </div>
</template>

<script>
import '@/assets/css/app.css'
export default {
 name: 'PaySuccess',
    data(){
        return{
            mchtName:"",
            orgName:"",
            bankName:"",
            cardType:"",
            orderAmount:"",
            discountAmount:"",
            bankCardNoLast4:"",
            mobileNoMark:"",
            deductAmt:"",
            tokenId: this.$store.state.token
        }
    },
    created(){
        this.queryPaymentOrder();
    },
    methods:{

        //查询页面初始化信息
        queryPaymentOrder(){
            this.$util.postRequest('/walletpn/payment/queryOrder',{tokenId:this.tokenId})
            .then(res =>{
                console.log(res);
                if(res == undefined || null == res){
                    return;
                }
                this.mchtName = res.data.mchtName;
                this.orgName = res.data.orgName;
                this.bankName = res.data.bankName;
                this.cardType = res.data.cardType;
                this.orderAmount = res.data.orderAmount;
                this.discountAmount = res.data.discountAmount;
                this.bankCardNoLast4 = res.data.bankCardNoLast4;
                this.mobileNoMark = res.data.mobileNoMark;
                this.deductAmt = res.data.detuctAmt;
            })
        },


    }
}
</script>

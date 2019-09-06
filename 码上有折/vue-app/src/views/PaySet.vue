<template>
    <div>
        <div class="payment-set-list">
            <div class="item">
                <div class="logo">
                    <img src="@/assets/logo.png">
                </div>
                <div class="title">
                    <span class="t b">惠买免密支付</span>
                    <router-link v-if="!bindCard" class="l" to="/addCard">添加银行卡开通 &gt;</router-link>
                    <a v-else class="l" href="javascript:void(0);">已开通</a>
                </div>
                <div class="info">单笔最高1000元</div>
            </div>
            <div class="item" v-for="(v,i) in cardList" :key="i" v-if="v.defaultCard == '1'">
                <div class="title">
                    <span class="t">{{v.bankName}} {{v.cardType == '01' ? '储蓄卡':'信用卡'}} （{{v.account.slice(-4)}}）</span>
                    <router-link class="l" to="/changeCard">查看 &gt;</router-link>
                </div>
            </div>
        </div>
        <div class="payment-set-bottom-info">开通即表示同意<a :href="this.$dataUrl+'/ets/html/payment/agreement/tlwallet/mmfkAgree.html'">《通联钱包免密付款授权协议》</a></div>
        
        <div v-if="recommend" style="margin-top: 1rem; text-align: left; padding-left: .5rem;" class="index-bottom-info">
            <span v-if="!bindCard">检测到您已经绑定了银行卡，直接选择卡开通更便捷</span>
            <span v-else>如需更换特权支付卡，可直接选择已绑定的卡</span>
        </div>
        <div class="bank-card-list" style="margin-bottom:.3rem;">
            <div v-if="v.useable == '0'" class="item" v-for="(v,i) in recommendCardList" :key="i" @click="toOpen(v.id,v.phoneNo)">
                <div class="logo"><img :src="'https://cashier.allinpay.com/ets/image/mobile/PcEfastBankLogo/'+v.orgName+'.png'"></div>
                <div class="title">
                    <span class="t">{{v.bankName}} {{v.cardType == '01' ? '储蓄卡':'信用卡'}} ({{v.account.slice(-4)}})</span>
                </div>
            </div>
            
        </div>

    </div>
    
</template>

<script>
export default {
    name: 'PaySet',
    data(){
        return {
            tokenId: this.$store.state.token,
            bindCard: false,
            cardList: [],
            recommendCardList: [],
            recommend: false
        }
    },
    created(){
        this.getCardList()
        this.getRecommendCardList()
    },
    methods:{
        getRecommendCardList(){
            this.$util.postRequest('/walletpn/bankCard/userCardList', {tokenId:this.tokenId})
            .then( response => {
                if(response.data == ''){
                }
                else if(response.data.ERRORCODE){
                    this.$util.Message.error({message: response.data.ERRORMSG});
                }
                else{
                    this.recommendCardList = response.data
                    for(var v of this.recommendCardList){
                        if(v.useable == '0'){
                            this.recommend = true;
                        }
                    }
                    
                }
                console.log('bankCard/userCardList::')
                console.log(response)
                console.log('store.state.token::')
                console.log(this.$store.state.token)
                console.log('route.query.tokenId::')
                console.log(this.$route.query.tokenId)
                
            })
        },
        getCardList(){
            this.$util.postRequest('/walletpn/bankCard/cardList', {tokenId:this.tokenId})
            .then( response => {
                if(response.data == ''){
                }
                else if(response.data.ERRORCODE){
                    this.$util.Message.error({message: response.data.ERRORMSG});
                }
                else{
                    this.bindCard = true
                    this.cardList = response.data
                    
                }
                console.log('bankCard/cardList::')
                console.log(response)
                console.log('store.state.token::')
                console.log(this.$store.state.token)
                console.log('route.query.tokenId::')
                console.log(this.$route.query.tokenId)
                
            })
        },

        toOpen(id,phoneNo){
            this.$router.push({name:'getMsgCode',params:{id:id,mobileNo:phoneNo}});
        }
    }
}
</script>

<template>
    <div>
        <div class="bank-card-list">
            <div class="item" v-for="(v,i) in cardList" :key="i" @click="openChange(v.id , v.defaultCard == '1' )">
                <div class="logo"><img :src="'https://cashier.allinpay.com/ets/image/mobile/PcEfastBankLogo/'+v.orgName+'.png'"></div>
                <div class="title">
                    <span class="t">{{v.bankName}} {{v.cardType == '01' ? '储蓄卡':'信用卡'}} （{{v.account.slice(-4)}}）</span>
                    <a v-if="v.defaultCard == '1'" class="btn selected" href="javascript:void(0);">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-roundcheckfill"></use>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <router-link class="link-btn-gray" style="margin-top:1.5rem;" to="/addCard">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-add"></use>
            </svg>
            添加银行卡
        </router-link>
        <div v-if="openShow" class="set-bank-card">
            <div class="link-list">
                <a @click="setDefaultCard(agreeId)" v-if="!this.defaultCard" class="item" href="javascript:void(0)">设为默认卡</a>
                <a @click="removeBind(removeId)" class="item" href="javascript:void(0)">解除绑定</a>
                <a @click="openShow = !openShow" class="item" href="javascript:void(0)">取消</a>
            </div>
            <div @click="openShow = !openShow" class="bg"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaySet',
    data(){
        return {
            tokenId: this.$store.state.token,
            bindCard: true,
            cardList: [],
            openShow: false,
            removeId: '',
            agreeId: '',
            defaultCard:false
        }
    },
    created(){
        this.getCardList()
    },
    methods:{
        getCardList(){
            this.$util.postRequest('/walletpn/bankCard/cardList', {tokenId:this.tokenId})
            .then( response => {
                if(response.data == ''){
                    this.bindCard = false
                    this.cardList = []
                }
                else if(response.data.ERRORCODE){
                    this.bindCard = false
                    this.cardList = []
                    this.$util.Message.error({message: response.data.ERRORMSG});
                }
                else{
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
        openChange(id ,flag){
            this.openShow = true
            this.removeId = id
            this.agreeId = id
            this.defaultCard = flag
        },
        removeBind(id){
            this.$util.postRequest('/walletpn/bankCard/removeCard', {tokenId:this.tokenId, id:id})
            .then( response => {
                this.openShow = false
                this.getCardList()
                console.log('bankCard/removeCard::')
                console.log(response)
                console.log('store.state.token::')
                console.log(this.$store.state.token)
                console.log('route.query.tokenId::')
                console.log(this.$route.query.tokenId)
                
            })
        },
        setDefaultCard(id){
            this.$util.postRequest('/walletpn/bankCard/setDefaultCard', {tokenId:this.tokenId, id:id})
            .then( response => {
                this.openShow = false
                this.getCardList()
                console.log('bankCard/setDefaultCard::')
                console.log(response)
                console.log('store.state.token::')
                console.log(this.$store.state.token)
                console.log('route.query.tokenId::')
                console.log(this.$route.query.tokenId)
                
            })
        }
    }
}
</script>

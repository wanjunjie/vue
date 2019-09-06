<template>
<div>
    <div class="renew-top-info">
        超级会员续费
    </div>
    <div class="renew-item">
        <span class="i"><img src="@/assets/images/2018-10-23_03.png"></span>
        <span class="t">
            <b>限时特惠</b>
            <span class="n"><span class="b">2</span>元/月</span>
            <span class="g">10元/月</span>
        </span>
    </div>
    <a class="link-btn-orange" style="margin-top:2.5rem;" href="javascript:void(0)" @click="toRenew">立即续费</a>
    <a v-if="isIndexTo" class="link-btn-gray" style="margin-top:.5rem;" href="javascript:void(0)" @click="toNoRenew">暂不续费,买单也有小优惠</a>
    <form  v-if="renewParam"  submit="" ref="payForm" :action="renewParam.requestURL"  method="post">
        <input type="hidden" :key="key" :value="val" v-if="key!='requestURL'" :name="key" v-for="(val,key) in renewParam"/>
        <input type="hidden" name="tokenId" :value="tokenId"/>
    </form>

    <form v-if="isIndexTo" ref="noRenewForm" :action="this.$dataUrl+'/walletpn/cusProducts/pay'"  method="post">
        <input type="hidden" :key="key" :value="val" :name="key" v-for="(val,key) in formParams"/>
        <input type="hidden" name="tokenId" :value="tokenId"/>
    </form>
     
</div>
</template>

<script>
import '@/assets/css/app.css'
import wx from 'weixin-js-sdk'
export default {
    name: 'renewalDate',
    data(){
        return{
            renewParam:{},
            tokenId:this.$store.state.token,
            isIndexTo:false,
            formParams:{}
        }
    },
    created(){
        this.isIndexTo = this.$util.isValidate(this.$route.query.issuerId);
        this.formParams = this.isIndexTo?this.$route.query:{};
    },
    methods:{
        //会员续费
        async toRenew(){
            let result =false;
            this.$util.openIndicator();
            await this.$util.postRequest('/walletpn/renew/renewBywm',{tokenId:this.$store.state.token,amount:"200"})
                .then( res => {
                    console.log(res)
                    this.renewParam = res.data;
                    
                    if(res.data == undefined || res.data.errorCode!=undefined){
                        result=false;
                    }else{
                        result = true;
                    }
                });

                if( result){
                    //拼装form，跳转收银台支付
                    this.$refs.payForm.submit();
                }
                
        },
        //暂不续费,买单也有小优惠
        toNoRenew(){
            this.$refs.noRenewForm.submit();
        }
    }
}
</script>

<template>
<div>
    <div class="img">
        <img src="@/assets/images/2018-10-23-1_01.jpg">
    </div>
    <div class="img invite-friends-img">
        <div class="info">
            • 华润万家、沃尔玛、家乐福等更多商家<br>
            &nbsp;&nbsp;&nbsp;优惠买单<br>
            • 消费可享折上折、单单折、持续折
        </div>
        <div class="qr-code">
            <div class="img"><img src="@/assets/images/my-red-packets_18.png"></div>
            <div class="i">长按关注公众号，立即省钱！</div>
        </div>
        <img src="@/assets/images/2018-10-23-1_04.png">
    </div>
 
</div>
</template>

<script>
import '@/assets/css/app.css'
export default {
  name: 'visitorsUser',
    data(){
        return {
            tokenId: ''
        }
    },
    methods:{
        saveToken(){
            if(this.$route.query.tokenId){
                localStorage.setItem('referrerTokenId',this.$route.query.tokenId)
                //this.$router.replace({name:'visitorsUser'})
                window.location.replace("/walletpn/vueapp/#/visitorsUser");
            }
        }
    },
    computed:{

    },
    created(){
        this.saveToken()
    }
}
</script>

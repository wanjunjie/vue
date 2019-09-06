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
        <img src="@/assets/images/2018-10-23-1_02.png">
    </div>
    <div class="img invite-friends-img">
        <a class="btn-1" href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwMjQ3MTA1Mg==&scene=126#wechat_redirect">立即体验</a>
        <img src="@/assets/images/2018-10-23-1_03.png">
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
            }
            // console.log('11111111111111111')
            // console.log(this.$store.state.token)
        }
    },
    computed:{

    },
    created(){
        this.saveToken()
    }
}
</script>

<template>
<div>
    <!-- 钱包appId-->
    <div v-if="TLAppId == 'TLA0021'">
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
    <!--南京银行-->
    <div v-else-if="TLAppId == 'Tlmswxf'">
        <div class="img">
            <img src="@/assets/images/20190516_01b.png">
        </div>
        <div class="img">
            <img src="@/assets/images/20190516_02b.png">
        </div>
        <div class="img">
            <img src="@/assets/images/20190516_03b.png">
        </div>
        <div class="img">
            <img src="@/assets/images/20190516_04b.png">
        </div>
        <div class="img">
            <img src="@/assets/images/20190516_05b.png">
        </div>
    </div>
    <!--山东邮政-->
    <div v-else-if="TLAppId == 'TLmsycb'">
        <div class="img">
            <img src="@/assets/images/20190516_01c.png">
        </div>
        <div class="img">
            <img src="@/assets/images/20190516_02c.png">
        </div>
        <div class="img">
            <img src="@/assets/images/20190516_03c.png">
        </div>
        <div class="img">
            <img src="@/assets/images/20190516_04c.png">
        </div>
        <div class="img">
            <img src="@/assets/images/20190516_05c.png">
        </div>
    </div>
    <!--大连农商行-->
    <div v-else-if="TLAppId == 'TLmsnsh'">
        <div class="img">
            <img src="@/assets/images/20190516_01.png">
        </div>
        <div class="img">
            <img src="@/assets/images/20190516_02.png">
        </div>
        <div class="img">
            <img src="@/assets/images/20190516_03.png">
        </div>
        <div class="img">
            <img src="@/assets/images/20190516_04.png">
        </div>
        <div class="img">
            <img src="@/assets/images/20190516_05.png">
        </div>
    </div>
    <div v-else>
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
</div>
</template>

<script>
import '@/assets/css/app.css'
export default {
  name: 'visitorsUser',
    data(){
        return {
            tokenId: '',
            TLAppId:''
        }
    },
    methods:{
        saveToken(){
            if(this.$route.query.tokenId){
                localStorage.setItem('referrerTokenId',this.$route.query.tokenId)
                //this.$router.replace({name:'visitorsUser'})
                window.location.replace("/walletpn/vueapp/#/visitorsUser?TLAppId="+this.TLAppId);
            }
        }
    },
    computed:{

    },
    created(){
        this.TLAppId = this.$route.query.TLAppId;
        this.saveToken()
        
    }
}
</script>

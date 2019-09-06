<template>
    <div id="app">
       <div class="recommended-code-success">
           <div class="content-bg">
               <div class="return-info">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dui1"></use>
                    </svg>
                    <div class="t">开通成功</div>
                    <div class="i">
                        <span>查看赏金，请 </span>&nbsp;
                        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.allinpay.tonglianqianbao">下载通联钱包APP</a><br>
                        <span>使用账号 {{mobileNo}} 登录领取</span>
                    </div>
               </div>
               <div class="qr-code">
                   <img src="@/assets/images/my-red-packets_18.png">
                   <div class="p">长按关注</div>
               </div>
           </div>
       </div>
    </div>
</template>

<script>
import '@/assets/css/app.css'
export default {
    data(){
        return {
            firstyflag:true,
            mobileNo:"",
        }
    },
    methods:{ 
        gotoApp(){
            this.$router.push({ name: 'app'});
        },
       saveTokenId(){
            if(this.$route.params.mobileNo){
                this.mobileNo = this.$route.params.mobileNo;

                sessionStorage.setItem("mobileNo",this.mobileNo);
                //this.$router.replace({name:'addMchtSucc'});
                window.location.replace("/walletpn/vueapp/#/addMchtSucc");
            }else{
                this.mobileNo = sessionStorage.getItem("mobileNo");
            }
        },
    },
    computed:{

    },
    created(){
        this.saveTokenId();
    }
}
</script>
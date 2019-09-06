<template>
    <div class="app">
        <div class="add-bank-card-top">
            请添加持卡人本人的银行卡
        </div>
       <div class="form-input-list">
            <div class="item">
                <span class="t">持卡人</span>
                <div class="i"><input type="text" placeholder="姓名" v-model="name" :readonly="nameDisable"></div>
            </div>
            <div class="item">
                <span class="t">卡号</span>
                <div class="i"><input type="tel" placeholder="卡号" v-model="cardShow" @keyup="getCardCode" maxlength="23"></div>
                <input v-model="cardNo" type="hidden">
            </div>
            <div class="agreement">
                
                <a class="orange"  :href="this.$dataUrl+'/tlqbh5/bank/querySupportBankList?appId='+appId+'&mchtId='+mchtId">支持银行列表</a>
               <!--
                <a class="orange"  :href="'http://test.allinpay.com/tlqbh5/bank/querySupportBankList?appId='+appId+'&mchtId='+mchtId">支持银行列表</a>
                 -->
            </div>
       </div>
        <a class="link-btn-orange" style="margin-top:1rem;" href="javascript:void(0)" @click="conf">确定</a>
    </div>
</template>

<script>
import '@/assets/css/app.css'
import { Toast } from 'mint-ui'
export default {
    name: 'AddCard',
    data(){
        return{
            name:"",//用户姓名
            authenticated:"0",//是否实名 0-否1-是
            cardNo:"",//用户卡号
            cardShow:"",//卡号显示带空格
            nameDisable:false, //姓名是否可输
            pidCode:"",//证件号码
            appId:"",//appId
            mchtId:""//商户号
        }
    },
    created(){
        this.queryUserInfo();
    },
    methods:{
        //查询用户实名信息
        queryUserInfo(){
            this.$util.postRequest('/walletpn/sign/queryUserInfo',{tokenId:this.$store.state.token})
            .then(res =>{
                console.log(res);
                this.name = res.data.realName;
                this.pidCode = res.data.pidCodeMark;
                this.authenticated = res.data.authenticated;
                this.appId=res.data.appId;
                this.mchtId=res.data.mchtId;
                if(this.authenticated=='1'){
                    this.nameDisable=true;
                }
            })
        },

        //确认提交
        conf(){
            //姓名判空
            if(!this.$util.isValidate(this.name)){
                Toast({
                    message:'请输入持卡人姓名!',
                    duration:3000
                });
                return;
            }
            //卡号判空
            if(!this.$util.isValidate(this.cardNo)){
                Toast({
                    message:'请输入卡号!',
                    duration:3000
                });
                return;
            }
            if(this.cardNo.length<15){
                Toast({
                    message:'请输入正确的卡号!',
                    duration:3000
                });
                return;
            }
            if(this.cardNo.length>19){
                Toast({
                    message:'请输入正确的卡号!',
                    duration:3000
                });
                return;
            }

            this.$util.postRequest('/walletpn/sign/addCard',{tokenId:this.$store.state.token,name:this.name,cardNo:this.cardNo})
            .then(res =>{
                console.log(res);
                if(res == undefined){
                    return;
                }
                
                this.$router.push({ name: 'addMobile'});
            })
        },
        
        getCardCode(){
            if(/\S{5}/.test(this.cardShow)){
                this.cardShow = this.cardShow.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
            }
            this.cardNo = this.cardShow.replace(/\s+/g,"")
            console.log(this.cardNo)
        },
    }
}
</script>

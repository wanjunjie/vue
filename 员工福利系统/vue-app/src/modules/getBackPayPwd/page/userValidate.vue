<template>
    <div class="app-wrap">
        <dl class="form-list pt-30">
            <dd>
                <div class="title">姓 名</div>
                <div class="input-box">
                    <input type="text" v-model="name" placeholder="请输入姓名">
                </div>
            </dd>
            <dd>
                <div class="title">身份证</div>
                <div class="input-box">
                    <input type="text" v-model="idCardNo" placeholder="请输入身份证号码">
                </div>
            </dd>
            <dt v-if="cardNoValidateFLag=='1'">填入{{bankName}}{{cardType|cardTypeTrans}}(尾号{{cardMask|last4}})的信息</dt>
            <dd v-if="cardNoValidateFLag=='1'">
                <div class="title">银行卡</div>
                <div class="input-box">
                    <input type="tel" v-model="cardNo"  placeholder="请输入银行卡号">
                </div>
            </dd>
        </dl>
        <div class="btn-box mt-35">
            <a class="btn btn-blue" href="javascript:void(0)" @click="next">下一步</a>
        </div>


        <!--微信分享标签-->
        <wxshare/>
    </div>
</template>

<script>
    import $ from 'jquery'
    import AIP from '@/util/aip'
    import util from '@/util/util'
    import { Toast, MessageBox } from 'mint-ui'
    import {mapGetters} from 'vuex';
    import wxshare from '../../../components/wxshare'

export default {
    
    data(){
        return {
            mobileNo:"",
            cardMask:"",
            cardType:"",
            bankName:"",
            cardNoValidateFLag:"0",
            name:"",
            idCardNo:"",
            cardNo:""
        }
    },
    filters:{
        last4(num){
            if(num && null !=num){
                var temp = num.substring(num.length-4, num.length);
                return temp;
            }
        },
        cardTypeTrans(cardType){
            if("00"==cardType){
                return "贷记卡";
            }else if("01"==cardType){
                return "借记卡";
            }{

            }
        }
    },
    methods:{ 
       
        //确认提交
        next(){
            if(!util.isValidate(this.name)){
                Toast({
                    message:'请输入姓名!',
                    duration:3000
          
          });
                return;
            }
            if(!util.isValidate(this.idCardNo)&&!util.checkIdCard(this.cardNo)){
                Toast({
                    message:'请输入身份卡号!',
                    duration:3000
                });
                return;
            }
            if("1"==this.cardNoValidateFLag&&!util.isValidate(this.cardNo)&&!util.checkBankId(this.cardNo)){
                Toast({
                    message:'请输入正确的银行卡号!',
                    duration:3000
                });
                return;
            }
             util.axiosPost('/eebpc/getBackPwd/cardNoValidate',{name:this.name,idCardNo:this.idCardNo,cardNo:this.cardNo})
            .then(res => {
                console.log(res);
                if(res == undefined || null == res){
                    return;
                }

                this.$router.push({name:'sentMessageValidate'});
            });
        },


    },
    computed:{

    },
    created(){
        util.axiosPost('/eebpc/getBackPwd/queryUserInfo')
            .then(res => {
                console.log(res);
                if(res == undefined || null == res){
                    return;
                }
                this.cardMask = res.data.cardMask;
                this.cardNoValidateFLag = res.data.cardNoValidateFLag;
                this.bankName = res.data.bankName;
                this.cardType = res.data.cardType;
            });
    },
    components:{
        wxshare
    }
}
</script>
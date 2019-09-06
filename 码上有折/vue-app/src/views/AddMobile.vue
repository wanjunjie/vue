<template>
    <div class="app">
        <div class="add-bank-card-top">
            您添加的银行卡为
        </div>
        <div class="add-bank-card">
            <span class="logo"><img  :src="'https://cashier.allinpay.com/ets/image/mobile/PcEfastBankLogo/'+bankCode+'.png'"></span>
            <span class="t" v-if="cardType=='01'">{{bankName}} 储蓄卡</span>
            <span class="t" v-if="cardType=='00'">{{bankName}} 信用卡</span>
        </div>
       <div class="form-input-list">
            <div v-if="!nameDisable" class="item">
                <span class="t">身份证</span>
                <div class="i"><input type="text" placeholder="请输入身份证号" v-model="pidCode"></div>
            </div>
            <div class="item" v-if="cardType=='00'">
                <span class="t">CVV2</span>
                <div class="i"><input type="tel" placeholder="请输入银行卡背后CVV2码" v-model="cvv2" maxlength="3"></div>
            </div>
            <div class="item" v-if="cardType=='00'">
                <span class="t">有效期</span>
                <div class="i"><input type="tel" placeholder="请输入银行卡有效期" @click="ShouPup" v-model="expiredDate" readonly></div>
            </div>
            <div class="item">
                <span class="t">手机号</span>
                <div class="i"><input type="tel" placeholder="请输入银行预留手机号" v-model="mobileNo"></div>
            </div>
            <div class="agreement">
                <span class="i">
                    <input type="checkbox">
                    <svg class="icon selected" aria-hidden="true">
                        <use xlink:href="#icon-roundcheckfill"></use>
                    </svg>
                    <span class="t">同意</span>
                </span>
                <a :href="this.$dataUrl+'/ets/html/payment/agreement/tlwallet/payAgree.html'">《快捷支付服务协议》</a><br>
            </div>

            <div class="agreement agreement-top">
                <a v-if="tips" :href="url">{{tips}}</a><br>
            </div>
        </div>
        <a class="link-btn-orange" style="margin-top:1rem;" href="javascript:void(0)" @click="conf">确定</a>
        
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="true" position="bottom">
           <mt-picker :slots="slots" @change="onValuesChange" style="width: 7.5rem;" showToolbar>
               <div class="picker-toolbar-title">
                   <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
                   <div class="">请选择有效期</div>
                   <div class="usi-btn-sure" @click="popupVisible = !popupVisible">确定</div>
                </div>
            </mt-picker>
        </mt-popup>
        
    </div>
</template>

<script>
import '@/assets/css/app.css'
import { Toast, Picker } from 'mint-ui'
export default {
    name: 'AddMobile',
    data(){
        return{
            mobileNo:"",//手机号码
            expiredDate:"",//有效期
            expiredDateVal:"",//有效期传值
            cvv2:"", //cvv2
            bankCode:"", //银行编号
            cardType:"",//卡类型 00 贷记 01 借记
            bankName:"",//银行名称
            nameDisable:false,//是否实名 true实名，false未实名
            pidCode:"",//证件号码
            pidCode4:"",
            tips:"",
            url:"",
            showToolbar: true,
            slots: [
                {
                    flex: 1,
                    values: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039', '2040', '2041', '2042', '2043', '2044', '2045', '2046', '2047', '2048', '2049', '2050'],
                    className: 'slot1',
                    textAlign: 'right'
                }, 
                {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, 
                {
                    flex: 1,
                    values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                    className: 'slot3',
                    textAlign: 'left'
                }
            ],
            popupVisible: false,
        }
    },
    created(){
        this.querySignInfo();
    },
    methods:{
        getPidCode(){
            if(/\S{5}/.test(this.pidCode4)){
                this.pidCode4 = this.pidCode4.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
            }
            this.pidCode = this.pidCode4.replace(/\s+/g,"")
            console.log(this.pidCode)
        },
        ShouPup() {
            this.popupVisible = true
        },
        onValuesChange(picker, values){
            this.expiredDate = values[0] + '-' + values[1];
            this.expiredDateVal = values[0].substr(values[0].length - 2) + '' + values[1];
            // console.log(this.expiredDateVal)
        },
        //查询页面初始化信息
        querySignInfo(){
            this.$util.postRequest('/walletpn/sign/querySignInfo',{tokenId:this.$store.state.token})
            .then(res =>{
                console.log(res);
                if(res == undefined || null == res){
                    return;
                }

                this.bankCode = res.data.bankCode;
                this.bankName = res.data.bankName;
                this.cardType=res.data.cardType;
                this.authenticated = res.data.authenticated;
                if(this.authenticated=='1'){
                    this.nameDisable=true;
                    this.pidCode = res.data.pidCodeMark;
                }
                this.tips=res.data.tips;
                this.url=res.data.url;
            })
        },

        
        //确认提交
        conf(){
            //证件判空
            if(!this.$util.isValidate(this.pidCode)){
                Toast({
                    message:'请输入持卡人身份证!',
                    duration:3000
                });
                return;
            }
            //卡号判空
            if(!this.$util.isValidate(this.mobileNo)){
                Toast({
                    message:'请输入手机号!',
                    duration:3000
                });
                return;
            }
            if(this.mobileNo.length != 11){
                Toast({
                    message:'请输入正确的手机号!',
                    duration:3000
                });
                return;
            }
            var myreg=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            if (!myreg.test(this.mobileNo)) {
                Toast({
                    message:'手机号码格式有误!',
                    duration:3000
                });
                return;
            } 

            //信用卡校验cvv2和有效期
            if(this.cardType=="00"){
                if(!this.$util.isValidate(this.cvv2)){
                    Toast({
                        message:'请输入CVV2!',
                        duration:3000
                    });
                    return;
                }
                if(!this.$util.isValidate(this.expiredDate)){
                    Toast({
                        message:'请输入卡有效期!',
                        duration:3000
                    });
                    return;
                }
            }
            this.$util.postRequest('/walletpn/sign/addMobile',{tokenId:this.$store.state.token,mobileNo:this.mobileNo,certNo:this.pidCode,cvv2:this.cvv2,expiredDate:this.expiredDateVal})
            .then(res =>{
                console.log(res);
                if(res == undefined ){
                    return;
                }
                this.$router.push({ name: 'addMsgCode'});
            })

        }
    }
}
</script>
<style scoped>
.picker-toolbar-title {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 15px 0;
    font-size: 16px;
}
.usi-btn-cancel,
.usi-btn-sure {
    color: #f3a40a
}
.agreement-top{
    margin-top: 0.1rem!important
}
</style>

<template>
    <div class="app-wrap pb-200">
        <div class="login-top-title pt-50">
            <div class="fs-19">绑定企业为您开通的福利卡</div>
            <div class="fs-14 mt-10">专为已合作的机构提供员工福利</div>
        </div>
        <dl class="form-list mt-35">
            <dd>
                <div class="title">账 号</div>
                <div class="input-box">
                    <input ref="cardId" v-model="regformData.cardId" type="text" placeholder="请输入卡号或身份证号码">
                    <div v-show="regformData.cardId!=''" class="clear-input" @click="regformData.cardId=''">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-guanbi"></use>
                        </svg>
                    </div>
                </div>
            </dd>
            <dd>
                <div class="title">密 码</div>
                <div class="input-box">
                    <input ref="password" v-model="passwordIhp" type="password" placeholder="请输入钱包支付密码">
                </div>
            </dd>
        </dl>
        <div class="agree-agreement">
            <span class="checkbox" @click="ischeck=!ischeck">
                <input type="checkbox">
                <svg class="icon" :class="{'blue':ischeck}" aria-hidden="true">
                    <use xlink:href="#icon-dui"></use>
                </svg>
            </span>
            <span>我同意<a href="javascript:void(0)" @click="openDialog">员工福利卡平台用户服务协议</a></span>
        </div>
        <div class="btn-box mt-35">
            <a @click="login" class="btn btn-blue" href="javascript:void(0)">绑定</a>
        </div>
        <div class="login-bottom-info">
            风险提示：您作为企业的职工，知晓您所在企业通过借款形式向您筹集资金，用于企业的生产经营。您本人自愿向所在企业借款，形成借贷关系，并愿意承担由此带来的风险。
        </div>
        <div v-show="dialogFiled.open" class="dialog-pop-up">
            <div class="dialog-content" style="overflow:scroll; height: 30rem; -webkit-overflow-scrolling : touch;">
                <div class="title">
                    <svg class="icon" aria-hidden="true" @click="closeDialog">
                        <use xlink:href="#icon-guanbi"></use>
                    </svg>
                </div>
                <div class="info">
                    <eebH5Agreement/>
                </div>
            </div>
            <div class="dialog-bg"></div>
        </div>
        <wxshare/>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import util from '@/util/util';
    import {encrypt} from '@/util/encryptPassword';
    import { Toast,MessageBox } from 'mint-ui';
    import eebH5Agreement from './eebH5Agreement'
    import wxshare from './wxshare'
    export default {
        name: 'register',
        data() {
            return {
                clearInput:false,
                passwordIhp:'',
                regformData: {
                    cardId: '',//卡号
                    password: '',//密码
                    resource:'',//来源
                },
                ischeck:true,
                dialogFiled:{
                    open:false,
                    timeClose:false//设置的时间到了才能关闭(目的在于让用户至少看指定的几秒钟才能关闭)
                }

            }
        },
        methods:{
            openDialog(){
                this.dialogFiled.open = true;//打开
                setTimeout(()=>{
                    this.dialogFiled.timeClose = true;
                },10000);
            },
            closeDialog(){
                if(!this.dialogFiled.timeClose){
                    Toast({message:"协议阅读时间过短!"});
                    return;
                }else{
                    this.dialogFiled.open = false;//打开
                }
            },
            login(){
                let rules = {
                    cardId:[{isNull:true,message:'请输入卡号或者身份证号码'}]//,
                    //password:[{isNull:true,message:'请输入6位数字密码'},{isNum:true,message:'请输入6位数字密码'}]
                };
                let rs = util.validateForm(this.regformData,rules);
                if(rs.hasNull){
                    Toast({message:rs.info});
                    return;
                }
                if(!util.isValidate(this.passwordIhp)||!util.isNumber(this.passwordIhp)){
                    Toast({message:"请输入6位数字密码"});
                    return;
                }
                let rs1 = util.checkIdCard( this.regformData.cardId);
                let rs2 = util.checkBankId( this.regformData.cardId);
                if( !rs1  && !rs2 ){

                    Toast({message:"请输入正确的卡号或者身份证号码"});
                    return;
                }
                if( !this.ischeck ){

                    Toast({message:"请同意员工福利服务平台协议"});
                    return;
                }
                let resource = this.$route.query.resource;
                if(null == resource){
                    resource = this.$route.params.resource;
                }
                 console.log("resource:"+resource);
                this.regformData.resource=resource;
                this.regformData.password = encrypt(this.$refs.password.value,this.key);

                this.$store.dispatch('userregister',this.regformData).then(resp=>{
                    console.log(resp.data);
                    if(resp.data){
                        sessionStorage.setItem('user', JSON.stringify(resp.data));
                        this.$router.push({path:'/perfectInfor'});//去签约
                    }
                })
            }
        },
        created(){
            this.$store.dispatch('getKey',{});
        },
        computed:{
            ...mapGetters({
                key:'getKey'
            })
        },
        components:{
            eebH5Agreement,
            wxshare
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .dialog-pop-up .dialog-content {
        position: fixed;
        top: 50%;
        left: 50%;
        min-height: 98%;
        min-width: 98%;
        background-color: #fff;
        z-index: 2;
        transform: translate(-50%, -50%);
        border-radius: 8px;
        -webkit-box-shadow: 0 -2px 2px rgba(0, 0, 0, .1);
        box-shadow: 0 -2px 2px rgba(0, 0, 0, .1);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
    }
    .dialog-pop-up .dialog-content .title {
        text-align: right;
        padding: 25px 0 15px 0;
        margin: 0 20px;
        border-bottom: 1px #eee solid;
    }
</style>

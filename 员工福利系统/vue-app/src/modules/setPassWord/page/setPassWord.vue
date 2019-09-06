<template>
    <div>
        <div v-show="first" class="app-wrap">
            <div class="login-top-title pt-50">
                <div>6位数字支付密码</div>
            </div>
            <passWord @child-value="getChildValue"/>
            <div class="btn-box mt-30">
                <a :class="buttonAbbled1" href="javascript:void(0)" @click="next">下一步</a>
            </div>
        </div>

        <div v-show="!first" class="app-wrap">
            <div class="login-top-title pt-50">
                <div>再次输入</div>
            </div>
            <passWord @child-value="getChildValue2"/>
            <div class="btn-box mt-30">
                <a :class="buttonAbbled2" href="javascript:void(0)" @click="save">完成</a>
            </div>
        </div>

        <!--微信分享标签-->
        <wxshare/>
    </div>
</template>

<script>
    import util from '@/util/util';
    import {encrypt} from '@/util/encryptPassword';
    import {mapGetters} from 'vuex';
    import passWord from '../../../components/passWord';
    import { Toast, MessageBox } from 'mint-ui';
    import wxshare from '../../../components/wxshare'
    export default {
        name: "setPassWord",
        data(){
            return {
                first:true,
                buttonAbbled1:"btn mt-10 btn-gray",
                buttonAbbled2:"btn mt-10 btn-gray",
                pwd1:"",
                pwd2:"",
                password:""
            }
        },
        methods:{
            getChildValue(data){
                if(data.length==6){
                    this.buttonAbbled1="btn mt-10 btn-blue";
                }else{
                    this.buttonAbbled1="btn mt-10 btn-gray";
                    return;
                }
                this.pwd1=data;
            },
            getChildValue2(data){
                if(data.length==6){
                    this.buttonAbbled2="btn mt-10 btn-blue";
                }else{
                    this.buttonAbbled2="btn mt-10 btn-gray";
                    return;
                }
                this.pwd2=data;
            },

            //下一步
            next(){
                if(this.buttonAbbled1=="btn mt-10 btn-gray"){
                    return;
                }
                this.first=false;
            },

            //保存密码
            save(){
                if(this.buttonAbbled2=="btn mt-10 btn-gray"){
                    return;
                }
                if(this.pwd1!= this.pwd2){
                    Toast({
                        message:'两次密码输入不一致，请重新输入',
                        duration:3000
                    });
                }
 
                //密码加密
                this.password = encrypt(this.pwd1,this.key);
                
                util.axiosPost('/eebpc/password/setPassword',{password:this.password})
                .then(res => {
                    console.log(res)
                    if(util.isValidate(res.data)){
                        //设置成功，进入登录页面
                        this.$router.push({name:'register',params:{resource:'qb'}});
                    }
                    //this.$router.push({name:'register',params:{resource:'qb'}});
                })
                .catch( err => {
                    console.log(err)
                })
                
            }
        },
        components:{
            passWord,
            wxshare
        },
        created(){
            this.$store.dispatch('getKey',{});
        },
        computed:{
            ...mapGetters({
                key:'getKey'
            })
        }
    }
</script>
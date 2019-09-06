<template>
    <!--修改密码-->

    <div class="app-wrap">
        <dl class="form-list mt-35">
            <dd>
                <div class="title">旧密码</div>
                <div class="input-box">
                    <input ref="oldPassword" v-once v-model="pwdFormData.oldPassword" type="password" placeholder="输入旧密码">
                    <div class="clear-input">
                        <svg class="icon" aria-hidden="true" @click="$refs.oldPassword.value=''">
                            <use xlink:href="#icon-guanbi"></use>
                        </svg>
                    </div>
                </div>
            </dd>
            <dd>
                <div class="title">新密码</div>
                <div class="input-box">
                    <input ref="newPassword" v-once v-model="pwdFormData.newPassword" type="password" placeholder="输入6位数密码">
                </div>
            </dd>
            <dd>
                <div class="title">确认密码</div>
                <div class="input-box">
                    <input v-model="pwdFormData.againPwd" type="password" placeholder="再次输入新密码">
                </div>
            </dd>
        </dl>
        <div class="btn-box mt-35">
            <a class="btn btn-blue" @click="editPwd" href="javascript:void(0)">修改</a>
        </div>

        <!--微信分享标签-->
        <wxshare/>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import util from '@/util/util';
    import {encrypt} from '@/util/encryptPassword';
    import { Toast,MessageBox } from 'mint-ui';
    import wxshare from '../../../components/wxshare'
    export default {
        name: "userEdit",
        data(){
            return {
                pwdFormData:{
                    oldPassword:'',//输入原密码
                    newPassword:'',//输入新密码
                    againPwd:''//再次输入
                }
            }
        },
        methods:{
            editPwd(){
                let rules = {
                    oldPassword:[{isNull:true,message:'请输入原始密码!'}],
                    newPassword:[{isNull:true,message:'请输入新密码!'}],
                    againPwd:[{isNull:true,message:'请再次输入新密码!'}]
                };
                let rs = util.validateForm(this.pwdFormData,rules);
                if(rs.hasNull){
                    Toast({message:rs.info, duration:3000});
                    return;
                }
                if(this.pwdFormData.newPassword!=this.pwdFormData.againPwd){
                    Toast({
                        message:'两次密码输入不一致!',
                        duration:3000
                        //className:'mint-toast-icon mintui mintui-success'
                    });
                    return;
                }
                //以上表单校验

                this.pwdFormData.oldPassword = encrypt(this.$refs.oldPassword.value,this.key);
                this.pwdFormData.newPassword = encrypt(this.$refs.newPassword.value,this.key);
                this.$store.dispatch('modifyPwd',this.pwdFormData).then(resp=>{
                    console.log(resp.data);
                    if(resp.data){
                        MessageBox.alert('修改成功请重新登录!','提示').then(action => {
                            this.$router.push({path:'/register'});
                        });
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
            wxshare
        }
    }
</script>

<style scoped>
</style>

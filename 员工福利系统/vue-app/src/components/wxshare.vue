<template>
    
</template>

<script>

    import util from '@/util/util';

    export default {
        name: 'wxshare',
        data() {
            return {
                wxdetail:"",
                thumb: require ('@/assets/logo.png'),
            }
        },
        methods:{
        },
        created(){
            if(util.getIsWxClient()){
                let img = location.protocol +"//"+ location.host + this.thumb;
                util.wxShareCom(img);
            }
            
        },
        computed:{
        
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>

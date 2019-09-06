<template>
    <div class="app-wrap">
        <div class="title">{{title}}</div>
        <div class="time">{{createDate | formatDate('yyyy-MM-dd')}}</div>
        <div class="content" v-html="changeTextarea"></div>
    </div>
</template>

<script>

    import util from '@/util/util';
    export default {
        name: "",
        filters:{
            formatDate(val,pattern){
                return util.formatDate.format(val,pattern);
            }
        },
        data(){
            return {
                readStatus:this.$route.params.readStatus,
                id:this.$route.params.id,
                title:this.$route.params.title,
                createDate:this.$route.params.createDate,
                content:this.$route.params.content
            }
        },
        computed:{
            changeTextarea: function () {
                if (!this.content) return '';
                this.content = this.content.replace(/\r\n/g,"<br>");
                this.content = this.content.replace(/\n/g,"<br>");
                this.content = this.content.replace(/\s/g,"&nbsp;");
                return this.content
            }
        },
        methods:{
            getNoticeList(){
                util.axiosPost('/eebpc/Msg/addReadMsg',{msgNum:this.id})
                .then( res => {
                    console.log(res);
                });
            }
        },
        created(){
            if(this.readStatus == 0){
                this.getNoticeList();
            }
        },
        components:{
            
        }
    }
</script>

<style scoped>
    .title{
        text-align: center;
        padding: 30px 20px 10px 20px;
        font-size: 16px;
        line-height: 120%;
        font-weight: bold;
    }
    .time{
        text-align: right;
        padding: 10px 0;
        margin: 0 20px;
        color: #999;
        border-bottom: 1px #eee solid
    }
    .content{
        text-indent: 2em;
        padding: 10px 20px;
        line-height: 150%;
    }
</style>

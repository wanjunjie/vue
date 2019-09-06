<template>
    <div class="app-wrap">
        <dl class="news-center">
            <dd v-for="(item, index) in noticeList" :key="index">
                <router-link :class="['link', (item.readStatus==0?'bold':'')]" :to="{name:'noticeDetail',params:{readStatus:item.readStatus, id:item.id, title:item.title, createDate:item.createDate, content:item.content}}">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tongzhi"></use>
                    </svg>
                    <a class="title" href="#">
                        {{item.title}}
                    </a>
                    <div class="time">{{item.createDate | formatDate('MM-dd')}}</div>
                </router-link>
            </dd>
        </dl>
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
                noticeList:[]
            }
        },
        methods:{
            getNoticeList(){
                util.axiosPost('/eebpc/Msg/queryMsg')
                .then( res => {
                    console.log(res.data.list);
                    this.noticeList = res.data.list
                });
            }
        },
        created(){
            this.getNoticeList();
        },
        components:{
            
        }
    }
</script>

<style scoped>
</style>
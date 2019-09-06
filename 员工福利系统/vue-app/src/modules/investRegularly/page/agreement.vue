<template>
<div>
    <div v-if="queryPower.xy!=='0'">
        <div class="activity-rules-title"><span>内部借款协议</span></div>
        <ul class="activity-rules-list">
          <li>甲方：{{enterpriseName}}</b></li>
          <li>乙方：<b>{{userName}}({{idCardMark(idCardNo)}})</b></li>
          <li>鉴于，甲方因公司发展及生产经营之需要，同时，为提高员工参与公司发展的积极性，甲乙双方本着平等自愿的原则，经协商一致达成如下协议，以资双方恪守：</li>
          <li>一、乙方自愿向甲方提供借款人民币<b>{{inputAmount&&''!==inputAmount?inputAmount:'未填写'}}</b>元整（大写:【&nbsp;<b>{{DX(inputAmount)}}</b>】）。<br>乙方将相应借款资金支付给甲方集资平台时，则视为已向甲方提供借款。</li>
          <li>二、乙方须保证其在本协议签订之时为甲方及其控股子公司的在职员工，与甲方及其控股子公司存在有效的劳动合同关系。</li>
          <li>三、乙方须保证其向甲方提供的借款资金来源合法，是乙方的自有资金，并非向第三人借贷的资金或以其他方式向他人募集的资金。</li>
          <li>四、本协议项下的借款期限为  <b>{{productObj.prodTerm}}</b><span v-if="productObj.fixedTerm==2" >个月</span> <span v-if="productObj.fixedTerm==1" >天</span>   ，自甲方收到乙方借款之日起算。借款年利率为<b>{{productObj.prodRate}}</b>，双方按规定时间进行资金（含本金、利息）结算。</li>
          <li>五、乙方向甲方提供的借款将用于正常经营用途，甲方保证不将借款用于其他非法用途。</li>
          <li>六、在借款期限内，乙方可按甲方产品设定进行集资产品间的份额转换，或请求甲方提前还款，但应提前书面告知甲方，甲方有权拒绝。若乙方与甲方或甲方关联公司解除或终止劳动合同的，甲方可单方选择提前还款，甲方提前还款的利息，按乙方实际交款期间，产品约定的利率计息。</li>
          <li>七、甲方无论经营业绩如何，均应按约还本付息。乙方除享有本协议约定的固定利息外，不再享有甲方其他利益。</li>
          <li>八、乙方完全理解甲方借款对象的特定性。乙方保证不以任何形式向社会公众宣传甲方筹集资金的行为及方式，或向非甲方或甲方关联公司员工的第三人推荐集资产品。</li>
          <li>九、双方沟通一致并明确：乙方资金出借所产生的相关税费由乙方承担，乙方自行向主管税务机关申报、缴纳，甲方不负责处理相关事宜。</li>
          <li>十、如乙方违反本协议的任何约定，甲方有权单方解除本协议。</li>
          <li>十一、本协议为线上协议，乙方确认接受后即生效。本协议在甲乙双方借贷关系到期或解除时终止。</li>
          <li>十二、凡因本协议引起的或与本协议有关的任何争议，均应提交上海仲裁委员会按照该会仲裁规则进行仲裁。仲裁裁决是终局的，对双方当事人均有约束力。</li>
          <li>甲方：</li>
          <li>乙方：</li>
          <li>&nbsp;</li>
          <li>签署日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</li>
        </ul>
    </div>
    <iframe v-else :src="url"
            class="iframeCss"
            scrolling="no" 
            frameBorder="0"
            title="协议"></iframe>
</div>
</template>
<script>
    import util from '@/util/util'
    import { Toast, MessageBox } from 'mint-ui'
    import {mapGetters} from 'vuex';
    export default {
        name: "agreement",
        data(){
            return {
                enterpriseName:"",
                userName:"",
                idCardNo:"",
                inputAmount:this.$route.params.inputAmount,
                url:'',
                interestsDate:''
            }
        },
        filters:{
        },
        methods:{
            DX(n) {
                if(undefined==n||n==''){
                    return '零';
                }
                if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
                    return "数据非法";
                var unit = "千百拾亿千百拾万千百拾圆角分", str = "";
                n += "00";
                var p = n.indexOf('.');
                if (p >= 0)
                    n = n.substring(0, p) + n.substr(p+1, 2);
                unit = unit.substr(unit.length - n.length);
                for (var i=0; i < n.length; i++)
                    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
                return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
            },
            transDate(time){
                return time.substring(0,4)+"年"+time.substring(5,7)+"月"+time.substring(8,10)+"日";
            },
            idCardMark(idCardNo){
                return idCardNo.substring(0,2)+"**************"+idCardNo.substring(16,18);
            }
        },
        created(){
            this.interestsDate = this.$route.params.interestsDate;

            this.$store.dispatch('getKey',{});
            util.axiosPost('/eebpc/wealthCenter/getEnterpriseAndEmployeeName').then(resp=>{
                console.log(resp.data);
                this.enterpriseName = resp.data.enterpriseName;
                this.userName = resp.data.userName;
                this.idCardNo = resp.data.idCardNo;

                if(this.queryPower.xy==='0'){
                    let url = util.getPropUrl(process.env.NODE_ENV);//
                    this.url = `${url.etsUrl}eebh5/assets/xieyi/${resp.data.instanceId}.html?flag=2`;
                }
                this.url += encodeURI(`&enterpriseName=${this.enterpriseName}&userName=${this.userName}&idCardNo=${this.idCardMark(this.idCardNo)}&prod_money_inc=${this.inputAmount&&this.inputAmount!==''?this.inputAmount:'未填写'}&prod_money_inc_dx=${this.DX(this.inputAmount)}&prodTerm=${this.productObj.prodTerm}&fixedTerm=${this.productObj.fixedTerm}&prodRate=${this.productObj.prodRate}`);
            });
        },
        mounted(){
            //if(!this.queryPower.xy!=='0'){
                //document.title = '企业入金合规说明';
            //}
        },
        computed:{
            ...mapGetters({
                productObj:'getProductObj',
                queryPower:'getQueryPower'
            })
        }
    }
</script>

<style scoped>
    .iframeCss{
        width:100%;
        height:110rem;
    }
</style>

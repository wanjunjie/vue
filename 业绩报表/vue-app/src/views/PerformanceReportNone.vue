<template>
 <div class="wrap grey-bg">

    <div class="yj-top-infor">
        <div class="title">交易总笔数</div>
        <div class="total"><span class="n">--</span></div>
        <div class="info-item merchants">
            <div class="icon"></div>
            <div class="info">
                <div class="t">商户总数</div>
                <div class="c"><span class="n">--</span></div>
            </div>
        </div>
        <div class="info-item trading">
            <div class="icon"></div>
            <div class="info">
                <div class="t">交易总金额</div>
                <div class="c"><span class="n">--</span></div>
            </div>
        </div>
    </div>
    <ul class="yj-data-list">
        <li>
            <div class="name"><span class="t" >今日数据</span></div>
             <router-link class="sub-item" to="">
                
                <div class="line">
                    <div class="item"><span class="t">新增商户</span><span class="c">--</span></div>
                </div>
            </router-link>
            <router-link class="sub-item" to="">
                
                <div class="line">
                    <div class="item"><span class="t">交易金额</span><span class="c">--</span></div>
                </div>
                <div class="line">
                    <div class="item"><span class="t">交易笔数</span><span class="c">--</span></div>
                    <div class="item r-item"><span class="t">失败笔数</span><span class="c">--</span></div>
                </div>
            </router-link>
        </li>
        <li>
            <div class="name"><span class="t">昨日数据</span></div>
            <router-link class="sub-item" to="">
                
                <div class="line">
                    <div class="item"><span class="t">新增商户</span><span class="c">--</span></div>
                </div>
            </router-link>
            <router-link class="sub-item" to="">
                
                <div class="line">
                    <div class="item"><span class="t">交易金额</span><span class="c">--</span></div>
                </div>
                <div class="line">
                    <div class="item"><span class="t">交易笔数</span><span class="c">--</span></div>
                    <div class="item r-item"><span class="t">失败笔数</span><span class="c">--</span></div>
                </div>
            </router-link>
        </li>
        <li>
            <div class="name"><span class="t">当月数据</span></div>
             <router-link class="sub-item" to="">
                
                <div class="line">
                    <div class="item"><span class="t">新增商户</span><span class="c">--</span></div>
                </div>
            </router-link>
            <router-link class="sub-item" to="">
                
                <div class="line">
                    <div class="item"><span class="t">交易金额</span><span class="c">--</span></div>
                </div>
                <div class="line">
                    <div class="item"><span class="t">交易笔数</span><span class="c">--</span></div>
                    <div class="item r-item"><span class="t">失败笔数</span><span class="c">--</span></div>
                </div>
            </router-link>
        </li>
        <li>
            <div class="name"><span class="t">上月数据</span></div>
             <router-link class="sub-item" to="">
                
                <div class="line">
                    <div class="item"><span class="t">新增商户</span><span class="c">--</span></div>
                </div>
            </router-link>
            <router-link class="sub-item" to="">
                
                <div class="line">
                    <div class="item"><span class="t">交易金额</span><span class="c">--</span></div>
                </div>
                <div class="line">
                    <div class="item"><span class="t">交易笔数</span><span class="c">--</span></div>
                    <div class="item r-item"><span class="t">失败笔数</span><span class="c">--</span></div>
                </div>
            </router-link>
        </li>
    </ul>
</div>
</template>
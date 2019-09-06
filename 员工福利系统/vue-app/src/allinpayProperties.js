/**
 *  配置本地-测试-生产地址。
 *  其中测试和生产都是通过build命令打包后生成
 * @author wencb
 * @creation 2018年6月27日
 */

export const development = {                                   //local
    etsUrl:'http://test.allinpay.com/'                  //开发环境ip
};
export const production = {                                    //test
    etsUrl:'http://test.allinpay.com/'                   //测试环境ip
};
/* export const production = {                                    //pro
    etsUrl:'https://qianbao.allinpay.com/'             //生产环境ip
};*/

// 将两个字符串形式的大数转换为数组格式按位相加
// 用于避免javascript的精度丢失
function arrayAdd(str1,str2){
    var str1length = str1.length;
    var str2length = str2.length;
    var tmp = "";
    if(str1length != str2length){
        for(var i=0;i<Math.abs(str1length - str2length);i++){
            tmp = tmp + "0";
        }
    }//生成对较短字符串的补位串，保证有足够的位数进行相加
    var length = 0;
    if(str1length == str2length){
        length = str1length;
    }else{
        if (str1length < str2length){
            str1 = tmp + str1; length = str2length;
        }else{
            str2 = tmp + str2; length = str1length;
        }
    }//完成短字符串的补位（前补0），同时得到两个字符串的长度

    var array1 = str1.split("");    //字符串转数组
    var array2 = str2.split("");	//字符串转数组
    var array3 = new Array(length + 1);    //用于存放加和值的数组，要比参数字符串长1个字节，用于保存可能的进位

    var add = 0;	//保存进位值的临时参数
    for(var i=length-1;i>=0;i--){  //从末位开始逐位相加
        var x1 = array1[i];
        var x2 = array2[i];
        var addvalue = parseInt(x1) + parseInt(x2) + parseInt(add);
		if(addvalue >= 10){//有进位的情况
            if(addvalue >= 20){	//该分支不会出现
                array3[i+1] = addvalue - 20;
                add = 2;
            }else{		//有进位则将进位值参数置为1，并将余数赋给array3的当前位
                array3[i+1] = addvalue - 10;
                add = 1;
            }
        }else{	//没有进位的情况 array3的值即位两值和进位值的和
            array3[i+1] = addvalue;
            add = 0; //进位值为0
        }
    }

    if(add > 0){//如果最终的进位值不为0，则赋给array3[0]作为最高位的值
        array3[0] = add; //注意，如果进位值为0，不要赋给array3[0]（初始化值为N/A），这样转出来的字符串才不会以0开头导致和java算法产生错位
    }
    return array3.join("");//数组转字符串

}
export const encrypt = (str,pwd) => {
    if(pwd == null || pwd.length <= 0) {
        alert("Please enter a password with which to encrypt the message.");
        return null;
    }
    var prand = "";
    for(var i=0; i<pwd.length; i++) {
        prand += pwd.charCodeAt(i).toString();
    }

    var sPos = Math.floor(prand.length / 5);
    var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5));
    var incr = Math.ceil(pwd.length / 2);
    var modu = Math.pow(2, 31) - 1;
    if(mult < 2) {
        alert("Algorithm cannot find a suitable hash. Please choose a different password. \nPossible considerations are to choose a more complex or longer password.");
        return null;
    }

    var salt = Math.round(Math.random() * 1000000000) % 100000000;
    prand += salt;
    while(prand.length > 10) {
        var x1 = prand.substring(0, 10);
        var x2 = prand.substring(10, prand.length);
        prand = arrayAdd(x1 , x2);
    }
    prand = (mult * prand + incr) % modu;

    var enc_chr = "";
    var enc_str = "";
    for(var i=0; i<str.length; i++) {
        enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
        if(enc_chr < 16) {
            enc_str += "0" + enc_chr.toString(16);
        } else
            enc_str += enc_chr.toString(16);
        prand = (mult * prand + incr) % modu;
    }

    salt = salt.toString(16);
    while(salt.length < 8)
        salt = "0" + salt;
    enc_str += salt;

    return enc_str;
}


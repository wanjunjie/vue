import $ from 'jquery'
import fastClick from 'fastclick'

export default{
    //键盘支付密码
    addKeyboardPayPassword(num, obj) {
        var forgot = '';
        if(obj.forgot != null){
            forgot = '<a class="aip-password" href="javascript:void(0);">忘记密码</a>'
        }
        var html = '' +
            '<div id="aipKeyboard" class="aip-keyboard-pay-password">' +
            '    <div class="aip-content">' +
            '        <div class="aip-title">' +
            '            <a class="aip-close" href="javascript:void(0);">' +
            '                <svg class="font-icon" aria-hidden="true">' +
            '                    <use xlink:href="#icon-left"></use>' +
            '                </svg>' +
            '            </a>' +
            '            <span>密码</span>' +
                         forgot +
            '        </div>' +
            '        <div class="aip-money">' +
            '            <span class="num">' + num + '</span> <span>元</span>' +
            '        </div>' +
            '        <div class="aip-password-box">' +
            '            <input id="passWordInput" disabled class="aip-input" type="hidden">' +
            '            <ul class="aip-clearfix">' +
            '                <li>' +
            '                    <svg class="font-icon" aria-hidden="true">' +
            '                        <use xlink:href="#icon-dot"></use>' +
            '                    </svg>' +
            '                </li>' +
            '               <li>' +
            '                    <svg class="font-icon" aria-hidden="true">' +
            '                        <use xlink:href="#icon-dot"></use>' +
            '                    </svg>' +
            '               </li>' +
            '               <li>' +
            '                   <svg class="font-icon" aria-hidden="true">' +
            '                       <use xlink:href="#icon-dot"></use>' +
            '                   </svg>' +
            '               </li>' +
            '               <li>' +
            '                   <svg class="font-icon" aria-hidden="true">' +
            '                       <use xlink:href="#icon-dot"></use>' +
            '                   </svg>' +
            '               </li>' +
            '               <li>' +
            '                   <svg class="font-icon" aria-hidden="true">' +
            '                       <use xlink:href="#icon-dot"></use>' +
            '                   </svg>' +
            '               </li>' +
            '               <li>' +
            '                   <svg class="font-icon" aria-hidden="true">' +
            '                       <use xlink:href="#icon-dot"></use>' +
            '                   </svg>' +
            '               </li>' +
            '           </ul>' +
            '       </div>' +
            '       <dl class="aip-keyboard-box aip-clearfix">' +
            '           <dd atr-val="1">1</dd>' +
            '           <dd atr-val="2">2</dd>' +
            '           <dd atr-val="3">3</dd>' +
            '           <dd atr-val="4">4</dd>' +
            '           <dd atr-val="5">5</dd>' +
            '           <dd atr-val="6">6</dd>' +
            '           <dd atr-val="7">7</dd>' +
            '           <dd atr-val="8">8</dd>' +
            '           <dd atr-val="9">9</dd>' +
            '           <dd atr-val="0" class="two-item">0</dd>' +
            '           <dt>' +
            '               <svg class="font-icon" aria-hidden="true">' +
            '                   <use xlink:href="#icon-tuigejian"></use>' +
            '               </svg>' +
            '           </dt>' +
            '       </dl>' +
            '   </div>' +
            '   <div class="aip-bg"></div>' +
            '</div>';
        $('.app-wrap').prepend(html);
        var parent = $('.aip-keyboard-pay-password');
        if(num == ''){
            parent.find('.aip-money span').hide();
        }
        parent.find('.aip-password-box li').each(function(){
            var thisW = $(this).width();
            $(this).css({"height": thisW, "font-size": thisW * 0.8+"px"});
        });
        parent.find('.aip-keyboard-box dd').click(function () {
            var tVal = $(this).attr('atr-val').toString(),
                inputVal = parent.find('.aip-input').val().toString(),
                Total = inputVal + tVal;
            if(Total.length < 6){
                parent.find('.aip-input').val(Total);
                parent.find('.aip-password-box ul li').slice(0,inputVal.length+1).addClass('aip-selected');
            }
            else if(Total.length == 6){
                parent.find('.aip-input').val(Total);
                parent.find('.aip-password-box ul li').slice(0,inputVal.length+1).addClass('aip-selected');
                setTimeout(function () {
                    parent.hide();
                    if(typeof obj.callback == "function"){
                        obj.callback();
                    }
                    parent.remove();
                }, 100)
            }
        });
        parent.find('.aip-keyboard-box dt').click(function () {
            var inputVal = parent.find('.aip-input').val(),
                Total = inputVal.slice(0, inputVal.length - 1);
            if(Total.length >= 0){
                parent.find('.aip-input').val(Total);
            }
            parent.find('.aip-password-box ul li').removeClass('aip-selected').slice(0,Total.length).addClass('aip-selected');
        });
        parent.find('.aip-close').click(function () {
            parent.remove();
        });
        parent.find('.aip-password').click(function () {
            if(typeof obj.forgot == "function"){
                parent.remove();
                obj.forgot();
            }
        });
        fastClick.attach(document.getElementById('aipKeyboard'))
    }
}

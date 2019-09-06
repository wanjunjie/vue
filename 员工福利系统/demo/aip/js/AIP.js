/**
 * Created by wanjunjie@hotmail.com on 2018/6/6
 */

if (typeof jQuery === 'undefined') {
    throw new Error('jQuery must be included before aip\'s JavaScript.')
}
(function ($) {
    var version = $.fn.jquery.split(' ')[0].split('.');
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
        throw new Error('aip\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
    }
})(jQuery);
var AIP = (function ($) {
    "use strict";
    var Modal = function () {
        function Modal() {
        }
        //键盘支付密码start
        Modal.prototype.addKeyboardPayPassword = function (num, obj) {
            var html = '' +
                '<div class="aip-keyboard-pay-password">' +
                '    <div class="aip-content">' +
                '        <div class="aip-title">' +
                '            <a class="aip-close" href="javascript:void(0);">' +
                '                <svg class="font-icon" aria-hidden="true">' +
                '                    <use xlink:href="#icon-left"></use>' +
                '                </svg>' +
                '            </a>' +
                '            <span>支付密码</span>' +
                '            <a class="aip-password" href="javascript:void(0)">忘记密码</a>' +
                '        </div>' +
                '        <div class="aip-money">' +
                '            <span class="num">' + num + '</span> <span>元</span>' +
                '        </div>' +
                '        <div class="aip-password-box">' +
                '            <input id="passWordInput" disabled class="aip-input" type="hidden">' +
                '            <ul>' +
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
                '       <dl class="aip-keyboard-box">' +
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
            $('body').prepend(html);
            var parent = $('.aip-keyboard-pay-password');
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
                    obj.forgot();
                }
            });
        };
        //支付密码start
        Modal.prototype.addPayPassword = function (num, fun) {
            var html = '' +
                '<div class="aip-pay-password">' +
                    '<div class="aip-content">' +
                        '<div class="aip-title">' +
                            '<a class="aip-close" href="javascript:AIP.rePayPassword(\'.aip-pay-password\')">' +
                                '<svg class="font-icon" aria-hidden="true">' +
                                    '<use xlink:href="#icon-guanbi"></use>' +
                                '</svg>' +
                            '</a>' +
                            '<span>请输入支付密码</span>' +
                            '<a id="aipForgotPassword" class="aip-password" href="javascript:void(0)">忘记密码</a>' +
                        '</div>' +
                        '<div class="aip-money">' +
                            '<span>'+ num +'</span> 元' +
                        '</div>' +
                        '<div id="passWordInput" class="aip-password-box">' +
                            '<input onkeyup="AIP.changePassword(this, ' + fun + ', \'.aip-pay-password\')" class="aip-input" max="6" maxlength="6" type="tel">' +
                            '<ul class="aip-clearfix">' +
                                '<li><input type="password" max="1" maxlength="1" value=""></li>' +
                                '<li><input type="password" max="1" maxlength="1" value=""></li>' +
                                '<li><input type="password" max="1" maxlength="1" value=""></li>' +
                                '<li><input type="password" max="1" maxlength="1" value=""></li>' +
                                '<li><input type="password" max="1" maxlength="1" value=""></li>' +
                                '<li><input type="password" max="1" maxlength="1" value=""></li>' +
                            '</ul>' +
                        '</div>' +
                    '</div>' +
                    '<div class="aip-bg"></div>' +
                '</div>';
            $('body').prepend(html);
            AIP.payPasswordStyle();
        };
        Modal.prototype.addPopupPayPassword = function (num, fun) {
            var html = '' +
                '<div class="aip-popup-pay-password">' +
                '   <div class="aip-content">' +
                '       <div class="aip-title">请输入支付密码</div>' +
                '       <div class="aip-money">' +
                '           <span>'+ num +'</span> 元' +
                '       </div>' +
                '       <div id="passWordInput" class="aip-password-box">' +
                '           <input onkeyup="AIP.changePassword(this, ' + fun + ', \'.aip-popup-pay-password\')" class="aip-input" max="6" maxlength="6" type="tel">' +
                '           <ul class="aip-clearfix">' +
                '               <li><input type="password" max="1" maxlength="1" value=""></li>' +
                '               <li><input type="password" max="1" maxlength="1" value=""></li>' +
                '               <li><input type="password" max="1" maxlength="1" value=""></li>' +
                '               <li><input type="password" max="1" maxlength="1" value=""></li>' +
                '               <li><input type="password" max="1" maxlength="1" value=""></li>' +
                '               <li><input type="password" max="1" maxlength="1" value=""></li>' +
                '           </ul>' +
                '       </div>' +
                '       <div class="aip-footer">' +
                '           <div class="two-1"><a href="javascript:AIP.rePayPassword(\'.aip-popup-pay-password\')" class="gray">取消</a></div>' +
                '           <div class="two-2"><a id="aipForgotPassword" href="javascript:void(0)" class="">忘记密码</a></div>' +
                '       </div>' +
                '   </div>' +
                '   <div class="aip-bg"></div>' +
                '</div>';
            $('body').prepend(html);
            AIP.payPasswordStyle();
        };
        Modal.prototype.payPasswordStyle = function () {
            $("#passWordInput .aip-input").focus();
            $("#passWordInput ul li input").each(function(){
                var thisW = $(this).width();
                $(this).css({"height": thisW, "font-size": thisW * 0.5+"px"});
            });
        };
        Modal.prototype.changePassword = function (curObj, fun, elm) {
            var thisVal = $(curObj).val();
            var numList = $(curObj).siblings("ul").find("li");
            numList.each(function(){
                $(this).removeClass("aip-selected").find("input").val("");
                if($(this).index() < thisVal.length){
                    $(this).addClass("aip-selected").find("input").val(thisVal.charAt($(this).index()));
                }
            });
            if(thisVal.length >= 6){
                AIP.rePayPassword(elm, fun);
            }
        };
        Modal.prototype.rePayPassword = function (elm, fun) {
            $(elm).hide();
            if(typeof fun == "function"){
                fun();
            }
            $(elm).remove();

        };
        //
        //确认对话框start
        Modal.prototype.addConfirmDialog = function (info, name1, style1, fun1, name2, style2, fun2) {
            var infor = info, func1 = fun1, func2 = fun2;
            if(infor == '' || infor == undefined){
                infor = '是否同意！';
            }
            if(func1 == undefined){
                func1 = '';
            }
            if(func2 == undefined){
                func2 = '';
            }
            var html = '' +
                '<div class="aip-confirm-dialog">' +
                '   <div class="aip-content">' +
                '       <div class="aip-info">' +
                '           <div class="content">' +
                                infor +
                '           </div>' +
                '       </div>' +
                '       <div class="aip-footer">' +
                '           <div class="two-1"><a href="javascript:AIP.reConfirmDialog('+func1+');" class="'+style1+'">'+name1+'</a></div>' +
                '           <div class="two-2"><a href="javascript:AIP.reConfirmDialog('+func2+');" class="'+style2+'">'+name2+'</a></div>' +
                '       </div>' +
                '   </div>' +
                '   <div class="aip-bg"></div>' +
                '</div>';
            $('body').prepend(html);
        };
        Modal.prototype.addConfirmBox = function (info, name1, style1, fun1) {
            var infor = info, func1 = fun1;
            if(infor == '' || infor == undefined){
                infor = '请确认！';
            }
            if(func1 == undefined){
                func1 = '';
            }
            var html = '' +
                '<div class="aip-confirm-dialog">' +
                '   <div class="aip-content">' +
                '       <div class="aip-info">' +
                '           <div class="content">' +
                                infor +
                '           </div>' +
                '       </div>' +
                '       <div class="aip-footer">' +
                '           <a href="javascript:AIP.reConfirmDialog('+func1+');" class="'+style1+'">'+name1+'</a>' +
                '       </div>' +
                '   </div>' +
                '   <div class="aip-bg"></div>' +
                '</div>';
            $('body').prepend(html);
        };
        Modal.prototype.reConfirmDialog = function (fun) {
            if(fun != ''){
                fun;
            }
            $('.aip-confirm-dialog').remove();
        };
        //
        //提示框
        Modal.prototype.addPromptBox = function (info, fun1) {
            var infor = info, func1 = fun1;
            if(infor == '' || infor == undefined){
                infor = '请确认！';
            }
            if(func1 == undefined){
                func1 = '';
            }
            var html = '' +
                '<div class="aip-confirm">' +
                '   <div class="aip-content">' +
                '       <a class="aip-close" href="javascript:AIP.rePromptBox('+ func1 +')">' +
                '           <svg class="font-icon" aria-hidden="true">' +
                '               <use xlink:href="#icon-guanbi"></use>' +
                '           </svg>' +
                '       </a>' +
                '       <div class="aip-info">' +
                            infor +
                '       </div>' +
                '   </div>' +
                '   <div class="aip-bg"></div>' +
                '</div>';
            $('body').prepend(html);
            AIP.PromptBoxStyle();
        };
        Modal.prototype.PromptBoxStyle = function () {
            var elm = $(".aip-confirm .aip-content");
            elm.animate({
                "margin-top": '-' + elm.height()/2 + 'px',
                'opacity': 1,
                'top': '50%'
            });
        };
        Modal.prototype.rePromptBox = function (fun) {
            if(fun != ''){
                fun;
            }
            $('.aip-confirm').remove();
        };
        //
        //提示信息start
        Modal.prototype.addToolTip = function (info) {
            var infor = info;
            if(infor == '' || infor == undefined){
                infor = '已确认！';
            }
            var html = '' +
                '<div class="aip-tool-tip">' +
                    '<div class="aip-content">' +
                        '<div class="aip-info">' +
                            infor +
                        '</div>' +
                    '</div>' +
                '</div>';
            $('body').prepend(html);
            setTimeout(function(){
                $('.aip-tool-tip').remove();
            },1500);
        };
        //
        function createModal() {
            return new Modal()
        }
        var Modal = createModal();
        return Modal;
    }();
    return Modal;
})(jQuery);
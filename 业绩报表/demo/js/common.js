window.addEventListener(('orientationchange' in window ? 'orientationchange' : 'resize'), (function() {//判断是屏幕旋转还是resize
    function c() {
        var d = document.documentElement;//获取html元素
        var cw = d.clientWidth || 750;
        d.style.fontSize = (50 * (cw / 375)) + 'px';
    }
    c();
    return c;
})(), false);
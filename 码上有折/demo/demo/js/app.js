;(function(){
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    var html = document.getElementsByTagName('html')[0];
    var settingFs = parseInt(html.style.fontSize);
    var settedFs = settingFs;
    var whileCount = 0;
    while(true) {
        var realFs = parseInt(window.getComputedStyle(html).fontSize);
        var delta = realFs - settedFs;
        if (Math.abs(delta) >= 1) //不相等
        {
            if (delta > 0) settingFs--; else settingFs++;
            html.setAttribute('style', 'font-size:'+settingFs + 'px!important');
        } else
            break;
        if (whileCount++ > 100) //之所以弄个100的循环跳出的原因，在于实在无法预判设备是否能计算得到36px，比如设备只能计算35px，37px，这样会死循环只能跳出了
            break
    }
})()
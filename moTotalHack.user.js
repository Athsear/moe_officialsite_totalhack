// ==UserScript==
// @name        MoE OfficialSite Total Hack
// @namespace   moTotalHack
// @description MoE OfficialSiteを（個人的に）使いやすくする
// @include     http://moepic.com/*
// @include     https://moepic.com/*
// @grant       none
// @version     0.0.1
// ==/UserScript==
(function(d, func) {
    var check = function() {
        if (typeof unsafeWindow.jQuery == 'undefined') return false;
        func(unsafeWindow.jQuery); return true;
    }
    if (check()) return;
    var s = d.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
    d.getElementsByTagName('head')[0].appendChild(s);
    


    
    (function() {
        if (check()) return;
        setTimeout(arguments.callee, 100);
    })();
})(document, function($) {
        //newsを上に
        $(".index_infopane").after($(".topnewspane").clone());
        $(".topnewspane").eq(1).remove();
         
        //iconサイズ変更
        $("table .newslist td img[alt='もえガチャ']").width(15).height(15).css("margin-left",'2px');
        $("table .newslist td img[alt='ミニゲーム']").width(15).height(15).css("margin-left",'2px');
         
        //sorts
        var tool = getToolBox();
        
        //ページ分けは必須
        $(".newslist").before(tool);

        setSwitch();
        
        if(isLogin()) {
            setScreen();
        }

        function getToolBox() {
            var tool = $("<ul>").attr("id","motSPane").css({"clear":"both","list-style-type":"none","margin-left":"-39px"});
            tool.append($("<li>").append($("<img>").attr({src:"/info_img/ico_patch.gif",alt:"パッチアップデート情報"})).css("float","left").attr("id","motSPatch"));
            tool.append($("<li>").append($("<img>").attr({src:"/info_img/ico_mente.gif",alt:"メンテナンス情報"})).css("float","left").attr("id","motSMente"));
            tool.append($("<li>").append($("<img>").attr({src:"/info_img/ico_info.gif",alt:"ニュース情報"})).css("float","left").attr("id","motSInfo"));
            tool.append($("<li>").append($("<img>").attr({src:"/info_img/ico_event.gif",alt:"イベント情報"})).css("float","left").attr("id","motSEvent"));
            tool.append($("<li>").append($("<img>").attr({src:"/info_img/ico_shop.gif",alt:"ショップ情報"})).css("float","left").attr("id","motSShop"));
            tool.append($("<li>").append($("<img>").attr({src:"/info_img/ico_minigame.gif",alt:"ミニゲーム"}).width(15).height(15)).css({"float":"left","margin":"3px 0 0 2px"}).attr("id","motSMinigame"));
            tool.append($("<li>").append($("<img>").attr({src:"/info_img/ico_gacha.gif",alt:"もえガチャ"}).width(15).height(15)).css({"float":"left","margin":"3px 0 0 4px"}).attr("id","motSGacha"));
            
            return tool;
        }
        
        function setSwitch() {
            $("#motSPatch img").on("click", function() {
                toggleNews("パッチアップデート情報",this);
            });
            
            $("#motSMente img").on("click", function() {
                toggleNews("メンテナンス情報",this);
            });
            
            $("#motSInfo img").on("click", function() {
                toggleNews("ニュース情報",this);
            });
            
            $("#motSEvent img").on("click", function() {
                toggleNews("イベント情報",this);
            });
            
            $("#motSShop img").on("click", function() {
                toggleNews("ショップ情報",this);
            });
            
            $("#motSMinigame img").on("click", function() {
                toggleNews("ミニゲーム",this);
            });
            
            $("#motSGacha img").on("click", function() {
                toggleNews("もえガチャ",this);
            });
        }
        
        function toggleNews(type,elem) {
        switchNews(type);
        toggleButton(elem);
        }
        
        function switchNews(type) {
            var newslist = $(".newslist tr");
            newslist.each(function() {
                if($("img",this).attr("alt") == type) {
                    $(this).toggle();
                }
            });
        }

        function toggleButton(elem) {
            var className = $(elem).attr("class");
            if(className == "motSOn") {
                $(elem).removeClass("motSOn");
                $(elem).css("opacity",1);
            } else {
                $(elem).addClass("motSOn");
                $(elem).css("opacity",0.5);
            }
        }
        
        function setScreen() {
            $("td.ltd2").html("");
            $("td.ltd2").css("text-align","center");
            $("td.ltd2").append($("<div>").append($("<a>").attr("href","https://moepic.com/mp_itembox/mp_itembox.php")
                .text("ItemBox")
                .css({
                    "display":"block"
                    ,"margin-top":"0px"
                    ,"color":"#F4F4F4"
                    ,"font-weight":"bold"
                    ,"text-decoration":"none"
                    ,"font-size":"0.9em"
                })).css({
                    "height":"18px"
                    ,"width":"86px"
                    ,"border":"1px solid #ABABAB"
                    ,"outline":"1px solid #7B7B7B"
                    ,"border-radius":"5px"
                    ,"-moz-outline-radius":"5px"
                    ,"background": "-moz-linear-gradient(top, #444444 0%, #666666 100%)"
                })
            );
            
            //ただし、この機能は手でブラウザのpopup blockをonにしてもらう必要あり
            $("body").keydown(function(event) {
                //alt + f
                if( event.altKey === true && event.which === 70 ){
                    motOw("/minigame/combine.php");
                }
                
                //alt + r
                else if( event.altKey === true && event.which === 82 ){
                    motOw("/minigame/refine.php");
                }
                
                //alt + d
                else if( event.altKey === true && event.which === 68 ){
                    motOw_g("/minigame/gachagacha.php?mode=mrg");
                }
                
                //alt + p
                else if( event.altKey === true && event.which === 80 ){
                    motOw_g("/minigame/gachagacha.php?mode=mf");
                }
                
                //alt + e
                else if( event.altKey === true && event.which === 69 ){
                    motOw_g("/minigame/gachagacha.php?mode=mg");
                }
                
                //alt + c
                else if( event.altKey === true && event.which === 67 ){
                    motOw_g("/minigame/gachagacha.php?mode=mgg");
                }
                
                //alt + s
                else if( event.altKey === true && event.which === 83 ){
                    motOw_g("/minigame/gachagacha.php?mode=mr");
                }
                
                //alt + g
                else if( event.altKey === true && event.which === 71){
                    motOw_g("/minigame/gachagacha.php?mode=md");
                }

                
            });
            

        }
        
        function isLogin() {
            var login = $("#login");
            if(login) {
                return true;
            } else {
                return false;
            }
        }
        

});

function motOw(url) {
    window.open(url, '_blank','width=668,height=520,status=no,scrollbars=no,directories=no,menubar=no,resizable=yes,toolbar=no');
}

function motOw_g(url) {
  window.open(url, 'another','width=578,height=440,status=no,scrollbars=no,directories=no,menubar=no,resizable=yes,toolbar=no');

}

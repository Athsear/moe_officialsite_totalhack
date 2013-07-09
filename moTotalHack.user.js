// ==UserScript==
// @name        MoE OfficialSite Total Hack
// @namespace   moTotalHack
// @description MoE OfficialSiteを（個人的に）使いやすくする
// @include     http://moepic.com/*
// @include     https://moepic.com/*
// @grant       none
// @version     1
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
            //$("body").append($("<div>").css({"display":"none"}).attr("id","motWindow"));
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
            $("body").on("keydown",function(event) {
                //alt + f
                if( event.altKey === true && event.which === 70 ){
                    openMinigame("/minigame/combine.php","f");
                }
                
                //alt + r
                else if( event.altKey === true && event.which === 82 ){
                    openMinigame("/minigame/refine.php","r");
                }
                
                //alt + d
                else if( event.altKey === true && event.which === 68 ){
                    openMinigame("mrg","g");
                }
                
                //alt + p
                else if( event.altKey === true && event.which === 80 ){
                    openMinigame("mf","g");
                }
                
                //alt + e
                else if( event.altKey === true && event.which === 69 ){
                    openMinigame("mg","g");
                }
                
                //alt + c
                else if( event.altKey === true && event.which === 67 ){
                    openMinigame("mgg","g");
                }
                
                //alt + s
                else if( event.altKey === true && event.which === 83 ){
                    openMinigame("mr","g");
                }
                
                //alt + g
                else if( event.altKey === true && event.which === 71){
                    openMinigame("md","g");
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
        
        function openMinigame(mode,gametype) {
            var mHeight,mWidth,iHeight,iWidth;
            var gamemode;
            if(gametype == "g") {
                mHeight ="480px";
                mWidth = "602px";
                iWidth = "598px";
                iHeight = "440px";
                gamemode = "/minigame/gachagacha.php?mode=" + mode;
            } else {
                mHeight = "580px";
                mWidth = "672px";
                iHeight = "540px"; 
                iWidth = "668px";
                gamemode = mode;
            }
            var mDialog = $("<div>")
                .append($("<iframe>")
                    .attr("src",gamemode)
                    .css({
                        "height":iHeight
                        ,"width":iWidth
                        })
                )
                .attr("id" , "motOWMinigame")
                .append(getGradButton("閉じる","motOWCloseButton"));
            if(gametype == "g") {
                mDialog.append(getGradButton("アイテム一覧","motOWItemListButton"));
            }
                
            mDialog
                .css({
                    "height":mHeight
                    ,"width":mWidth
                    ,"background-color" : "#F1F1ED"
                    ,"border" : "2px solid #000000"
                    ,"box-shadow":"0px 0px 20px 20px rgba(0,0,0,0.5)"
                    
                });
            
            mDialog.center();
            
            $("body").prepend(mDialog);
            $("#motOWCloseButton").on("click",function() {
                $("#motOWMinigame").empty();
                $("#motOWMinigame").remove();
                
            });
            if(gametype == "g") {
                $("#motOWItemListButton").on("click",function() {
                    window.open('/minigame/item_list.php?code='+mode, '', 'toolbar=no,location=no,directoryies=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=700');
                });
            }
        }  

        function getGradButton(text,id) {
            var gButton = $("<div>")
                    .append($("<a>")
                        .attr({href:"javascript:void(0)",id:id})
                        .text(text)
                        .css({
                            "display":"block"
                            ,"margin-top":"0px"
                            ,"color":"#F4F4F4"
                            ,"font-weight":"bold"
                            ,"text-decoration":"none"
                            ,"font-size":"0.9em"
                            ,"text-align" : "center"
                        })
                    )
                    .css({
                        "height":"18px"
                        ,"width":"86px"
                        ,"border":"1px solid #ABABAB"
                        ,"outline":"1px solid #7B7B7B"
                        ,"border-radius":"5px"
                        ,"-moz-outline-radius":"5px"
                        ,"background": "-moz-linear-gradient(top, #444444 0%, #666666 100%)"
                        ,"margin":"10px 0 0 10px"
                        ,"float":"left"
                    })
            return gButton;
        }



        jQuery.fn.center = function() {
            this.css("position","fixed");
            this.css("left",Math.floor($(window).width() - this.width()) / 2 +"px");
            this.css("top",Math.floor($(window).height() - this.height()) / 2 +"px");
            return this;
        }
});



function motOw(url) {
    window.open(url, '_blank','width=668,height=520,status=no,scrollbars=no,directories=no,menubar=no,resizable=yes,toolbar=no');
}

function motOw_g(url) {
  window.open(url, 'another','width=578,height=440,status=no,scrollbars=no,directories=no,menubar=no,resizable=yes,toolbar=no');

}

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
    s.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
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
            
             //var mileage = $(null).load("https://moepic.com/mileage/index.php");
             
             $.ajax({
                 type:"GET"
                 ,url : "https://moepic.com/mileage/index.php"
                 ,dataType:"html"
                 ,success:function(data) {
                     var mileagePoint = $(data).find("div #content").text();
                     mileagePoint = mileagePoint.match("[0-9]+P");
                     $("td.ltd3 div.playernote span.txt1").eq(1).append("&nbsp;/&nbsp;"+ mileagePoint);
                 }
             });
             
             
            
            // もえがちゃ統合されたっぽいので適当に変更しておきます
            $("body").on("keydown",function(event) {
                //alt + f：練金の森
                if( event.altKey === true && event.which === 70 ){
                    openMinigame("/minigame/combine.php","f");
                }
                
                //alt + r：精錬の泉
                else if( event.altKey === true && event.which === 82 ){
                    openMinigame("/minigame/refine.php","r");
                }
                
                //alt + s：期間限定ガチャ（mode:mrgは以前はDiamondだった）
                else if( event.altKey === true && event.which === 83 ){
                    openMinigame("mrg","g");
                }

                //（mode:mfは以前はPearlだったがガチャ統合により廃止された）
                //（mggは以前はクラシックだったが、ガチャ統合により廃止された）

                //alt + g（mgは以前はEmeraldだったが、これにガチャが統合された）
                else if( event.altKey === true && event.which === 71 ){
                    openMinigame("mg","g");
                }

                //（mrは動物ガチャSilverだったが、こちらも統合により廃止）                
                //alt + a：動物ガチャ（mdは昔は動物ガチャGoldだった）
                else if( event.altKey === true && event.which === 65){
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
            if($("#motOWMinigame").size() ) {
                $("#motOWMinigame").empty();
                $("#motOWMinigame").remove();
                return false;
            }
            var mHeight,mWidth,iHeight,iWidth;
            var gamemode;
            if(gametype == "g") {
                mHeight ="480px";
                mWidth = "989px";
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
                        ,"float" : "left"
                        })
                )
                .attr("id" , "motOWMinigame");
                if(gametype=="g") {
                    mDialog.append($("<div>").load("https://moepic.com/minigame/item_list.php?code=" + mode + " div table")
                        .css({
                            "float":"right"
                            ,"overflow" : "scroll"
                            ,"width": "368px"
                            ,"height":"446px"
                        })
                    )
                }
                mDialog.append(getGradButton("閉じる","motOWCloseButton"));
                
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

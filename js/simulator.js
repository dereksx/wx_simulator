/**
 * Created by sunhongjian on 2016/6/3.
 */
function Simulator(){
    this.opts ={};
    this.init();
}
Simulator.prototype = {
    myDate : new Date(),
    jsonData:null,
    init:function(){
        this.bindEvent();
        this.getDate();
    },
    getDate:function(){
        var content = $("#material_content");
        if(content.length==0) {

        }else{
            var strData = content.val();
            this.jsonData = eval( strData );
            console.log(this.jsonData);
        }
        if(this.jsonData.length>1){
            this.doMultiTemplate();
        }else{
            this.doSingleTemplate();
        }
        //字符串类型转换成json对象

    },
    //单图模板
    doSingleTemplate:function(){
        var temp = "";
        var data = this.jsonData[0];
        //验证字段是否存在,如果不存在填充默认值
        var title = data.title ? data.title : "标题",
            date = data.day ? data.day : this.myDate.getMonth()+"月"+this.myDate.getDay(),
            digest = data.digest ? data.digest : "概述";
        temp = '<div class="msg_card wx_phone_preview_card jsPhoneViewCard">'+
                    '<div class="msg_card_inner">'+
                        '<div class="msg_card_bd">'+
                            '<h4 class="msg_card_title" title="">'+title+'</h4>'+
                            '<div class="msg_card_info">'+date+'</div>'+
                            '<div class="msg_card_extra_info" style="background-image:url('+data.thumbUrl+');"></div>'+
                            '<div class="msg_card_desc" title="">'+digest+'</div>'+
                        '</div>'+
                        '<div class="msg_card_ft"> <i class="icon_arrow_default"></i> 阅读原文</div>'+
                    '</div>'+
                '</div>';
        this.renderHtml(temp);
    },
    //多图模板
    doMultiTemplate:function(){
        var temp = "";
        var data = this.jsonData;

        var title_first = data[0].title ? data[0].title : "标题";
        temp +=
            '<div class="msg_card wx_phone_preview_multi_card has_first_cover">' +
            '<div class="msg_card_inner">';
        temp +=
            '<div class="card_cover_appmsg_item jsPhoneViewCard">' +
            '<div class="card_cover_appmsg_inner" style="background-image:url(' + data[0].thumbUrl + ');">' +
            '</div>' +
            '<strong class="card_cover_title">' + title_first + '</strong>' +
            '</div>';
        $.each(data,function(i,item){
            if(i>0){
                var title = item.title ? item.title : "标题";
                temp += '<div class="card_appmsg_item jsPhoneViewCard">';
                if (item.thumbUrl) {
                    temp += '<img class="card_appmsg_thumb" src=' + item.thumbUrl + '>';
                }
                temp += '<div class="card_appmsg_content">' + title + '</div>' +
                    '</div>';

            }
        });
        temp+= '</div>' +
            '</div>';
        this.renderHtml(temp);
    },
    //内容页模板
    doPageTemplate:function(idx){
        var temp = "",
            data = this.jsonData[idx];

        var date = data.day ? data.day : this.myDate.toLocaleDateString();
        temp  = '<div class="wx_phone_preview_appmsg appmsg_wap">' +
                '<div class="rich_media">' +
                '<div class="rich_media_area_primary">' +
                '<h2 class="rich_media_title" title="">' + data.title + '</h2>' +
                '<div class="rich_media_meta_list">' +
                '<em class="rich_media_meta rich_media_meta_text">'+date+'</em>' +
                '<em class="rich_media_meta rich_media_meta_text">' + data.author + '</em>' +
                '</div>' +
                '<div class="rich_media_content">' + data.content + '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
        this.renderHtml(temp);
    },
    //渲染页面
    renderHtml:function(tpl){
        $("#page_container").html(tpl);
    },
    //绑定事件
    bindEvent:function(){
        var self = this;
        $(document).on("click",".wx_phone_preview_card ,.card_cover_appmsg_item",function(){
            self.doPageTemplate(0);
        });
        $(document).on('click', '.card_appmsg_item', function () {
            var idx = $(".card_appmsg_item").index($(this)[0])+1;
            self.doPageTemplate(idx);
        });
        $(".histroy_back").on("click", function () {
            //点击回退按钮重新获取渲染数据
            self.getDate();
        });
    }
};
$(function(){
    new Simulator();

});


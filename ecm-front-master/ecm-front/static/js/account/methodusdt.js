$(function () {
    var bind = GetQueryString().bind;
    var ifMethod;
    if (bind && bind == 1) {
        $('.weui-title').text('导入USDT');
        $('#bindBtn').text('确认绑定');
        $('#bindqrode').css('display','none');
        ifMethod = '0'
    } else {
        $('.weui-title').text('USDT');
        $('#bindBtn').text('保存');
        $('#bindqrode').css('display','block');
        ifMethod = '1'
    }
    showFun(ifMethod)
});

function showFun(ifMethod) {
    tokenVerification('/account/getCollection', {
        type: '3',
        status: 0
    }, function (data) {
        if (data.code == 200) {
            var obj = data.data;
            if (obj != null && obj != '') {
                $('#usdtaddr').val(obj.account);
                $('#usdtaddr').attr('disabled', true);
                if(typeof obj.urlCode == '' && typeof obj.urlCode == null){
                    $('#weChatImg').empty();
                    $('#weChat').val('');
                }else{
                    $('#weChatImg').append('<img id="img02" class="weui-uploader__file" />');
                    $('#img02').attr('src',imgHost+obj.urlCode);
                    $('#weChat').val(imgHost+obj.urlCode);
                }
                $('#weChatInput').attr('disabled',true);
            }
        } else {
            console.log(data)
        }
    })
}


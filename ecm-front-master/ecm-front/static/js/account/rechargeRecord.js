$(function () {
    tokenVerification('/account/findByUser', {}, function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var tpl = "<div class=\"weui-panel weui-panel_access\">" +
            "<h3>" + (item.type === '1' ? '普通充币' : '普通提币') + "</h3>" +
            "<a class=\"weui-cell weui-cell_access weui-cell_example\">" +
            "<div class=\"weui-cell__bd weui-cell_primary\">" +
            "<p>" + item.amount + "USDT</p>" +
            "<p>" + (item.status === '1'?'待审核' : '完成') + "</p>" +
                "<p>" + item.createDate + "</p></div></a></div>";
            $("#list").append(tpl);
        }
    });
})

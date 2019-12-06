$(function () {
    $('#bindBtn').click(function () { //提币申请弹窗
        var uscoin = $('#uscoin').val();
        var usdtaddr = $('#usdtaddr').val();
        if (!uscoin) {
            $.toast('请输入提币数量','text');
            return;
        }
        if (!usdtaddr) {
            $.toast('请输入收款地址','text');
            return;
        }
        $('#bindBtn').attr('disabled', true);
        cashWithdrawal(uscoin,usdtaddr);
    });
});

function cashWithdrawal(uscoin,usdtaddr) {
    tokenVerification('/account/cashWithdrawal', {
        amount:uscoin,
        addr:usdtaddr
    }, function (data) {
        if (data.code == 200) {
        } else {
            console.log(data)
        }
        $.toast(data.msg, 'text');
        $('#bindBtn').attr('disabled', false);
    })
}

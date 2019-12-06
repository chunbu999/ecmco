$(function () {
    $('#bindBtn').click(function () { //充币弹窗
        $.toast('充币提交成功');
        var coinid = $('#coinid').val();
        var amount = $('#amount').val();
        if (!coinid) {
            $.toast('请输入区块链交易ID','text');
            return;
        }
        if (!amount) {
            $.toast('请输入区块链交易ID','text');
            return;
        }
        if (parseFloat(amount).toString() == "NaN") {
            $.toast('请输入数字','text');
            return;
        }
        $('#bindBtn').attr('disabled', true);
        recharge(coinid,amount);
    });
})

function recharge(coinid,amount) {
    tokenVerification('/account/recharge', {
        no: coinid,
        amount: amount
    }, function (data) {
        if (data.code == 200) {
        } else {
            console.log(data)
        }
        $.toast(data.msg, 'text');
        $('#bindBtn').attr('disabled', false);
    });
}

var dataUrl;
$(function(){
	var qrcode = new QRCode('qrcode',{
		width:80,
		height:80,
		text:'https://fir.im/3eva'
	})
	//获取网页中的canvas对象 
	var mycanvas1=document.getElementsByTagName('canvas')[0]; 
	//将转换后的img标签插入到html中 
	var img=convertCanvasToImage(mycanvas1); 
	$('#imagQrDiv').append(img);//imagQrDiv表示你要插入的容器id

	var getPixelRatio = function(context) {     // 获取设备的PixelRatio
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    };
    var shareContent = $("#de")[0]; 
    var width = shareContent.offsetWidth; 
    var height = shareContent.offsetHeight; 
    var canvas = document.createElement("canvas"); 
    var context = canvas.getContext('2d'); 
    var scale = getPixelRatio(context);    //将canvas的容器扩大PixelRatio倍，再将画布缩放，将图像放大PixelRatio倍。
    canvas.width = width * scale; 
    canvas.height = height * scale;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
 
    var opts = {
        scale: scale, 
        canvas: canvas,
        width: width, 
        height: height,
        dpi: window.devicePixelRatio
    };
    html2canvas(shareContent, opts).then(function (canvas) {
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        dataUrl = canvas.toDataURL('image/jpeg', 1.0);
        var newImg = document.createElement("img");  
        newImg.src =  dataUrl;
        newImg.width = '100%';
        newImg.height= '100%';
      	newImg.className = 'allImg';
        $("body")[0].appendChild(newImg);
        $('#demo').css('display','none');
    });



})
function convertCanvasToImage(canvas) { 
	//新Image对象，可以理解为DOM 
	var image = new Image(); 
	// canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持 
	// 指定格式 PNG 
	image.src = canvas.toDataURL("image/png"); 
	return image; 
} 

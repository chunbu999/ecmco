var userToken = localStorage.getItem('ecmToken');
var myDate = new Date().toLocaleString();
var userInfo = JSON.parse(localStorage.getItem('userInfo'));
var sendUser = userInfo.phone;//发送者
var ReceiveUser = GetQueryString().name;//接收者
var conn = {};
WebIM.config = config;
WebIM.message = WebIM.default.message
WebIM.utils = WebIM.default.utils
WebIM.debug = WebIM.default.debug
WebIM.statusCode = WebIM.default.statusCode

conn = WebIM.conn = new WebIM.default.connection({
    isHttpDNS: WebIM.config.isHttpDNS,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    host: WebIM.config.Host,
    https: WebIM.config.https,
    url: WebIM.config.xmppURL,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: true,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    isStropheLog: WebIM.config.isStropheLog,
    delivery: WebIM.config.delivery,
    appKey: WebIM.config.appkey,
})

//conn.listen({
//  onOpened: function (message) {          //连接成功回调
//  	console.log("连接成功："+message)
//      console.log("%c [opened] 连接已成功建立", "color: green");
//      console.log(myDate + "登陆成功");
//  },
//  onClosed: function (message) {
//      console.log("onclose:" + message);
//  },   //连接关闭回调
//  onTextMessage: function (message) {
//      console.log('收到onTextMessage信息: ', message);
//		
//  },    //收到文本消息
//  onEmojiMessage: function (message) {
//      console.log('onEmojiMessage: ', message);
//  },   //收到表情消息
//  onPictureMessage: function (message) {
//      console.log('onPicMessage: ', message);
//  }, //收到图片消息
//  onAudioMessage: function (message) {
//      console.log('onAudioMessage: ', message);
//  },   //收到音频消息
//  onFileMessage: function (message) {
//      console.log('onFileMessage: ', message);
//  },    //收到文件消息
//  recallMessage: function (message) {
//      console.log('recallMessage', message);
//  }, //消息撤回
//  onPresence: function (message) {
//      var myDate = new Date().toLocaleString();
//      console.log('onPresence: ', myDate + JSON.stringify(message));
//      switch (message.type) {
//          case 'subscribe': // 对方请求添加好友
//              var truthBeTold = window.confirm((message.from + "申请添加您为好友:"));
//              if (truthBeTold) {
//                  // 同意对方添加好友
//                  conn.subscribed({
//                      to: message.from,
//                      message: "[resp:true]"
//                  });
//                  console.log("同意添加好友");
//              } else {
//                  // 拒绝对方添加好友
//                  conn.unsubscribed({
//                      to: message.from,
//                      message: "rejectAddFriend" // 拒绝添加好友回复信息
//                  });
//                  console.log("拒绝添加好友");
//              }
//              break;
//          case 'subscribed': // 对方同意添加好友，已方同意添加好友
//          	console.log('对方同意添加好友');
//              break;
//          case 'unsubscribe': // 对方删除好友
//              break;
//          case 'unsubscribed': // 被拒绝添加好友，或被对方删除好友成功
//              break;
//      }
//  },       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
//  onRoster: function (message) {
//      console.log("onRoster", message);
//  },         //处理好友申请
//  onOnline: function () {
//      console.log("onOnline");
//  },                  //本机网络连接成功
//  onOffline: function () {
//      console.log('offline');
//  },                 //本机网络掉线
//  onError: function (message) {
//      console.log('失败onError: ', message);
//
//  },//失败回调
//  onReceivedMessage: function (message) {
//      console.log('已发送服务器onReceivedMessage: ', message);
//  },    //收到消息送达服务器回执
//  onDeliveredMessage: function (message) {
//      console.log('已发送客户onDeliveredMessage：', message);
//  },   //收到消息送达客户端回执
//  onReadMessage: function (message) {
//      console.log('onReadMessage: ', message);
//  }        //收到消息已读回执
//});
conn.listen({
    onOpened: function (message) { //连接成功回调
        var myDate = new Date().toLocaleString();
        console.log("%c [opened] 连接已成功建立", "color: green");
    },
    onClosed: function (message) { //连接关闭回调
        console.log("onclose:" + message);
    },         
    onTextMessage: function (message) { //收到文本消息
        console.log('onTextMessage: ', message);
		var npc = '<div class="x-message-group">'+
					'<div class="x-message-user">商家</div>'+
					'<div class="x-message-content"><p class="x-message-text">'+ message.data +'</p></div>'+
					'<div class="x-message-time">10-11 10:42 AM'+
						'<span class="x-message-status"></span>'+
					'</div>'+
				'</div>'
    },    
    onEmojiMessage: function (message) { //收到表情消息
        console.log('onEmojiMessage: ', message);
    },   
    onPictureMessage: function (message) { //收到图片消息
        console.log('onPicMessage: ', message);
    }, 
    onCmdMessage: function (message) {
        console.log('onCmdMessage: ', message);
        var truthBeTold = window.confirm((message.from + "邀请您加入会议"));
        if (truthBeTold) {
            emedia.mgr.joinConference(message.ext.confrId, message.ext.password, ext).then(function () {
                console.log("********加入会议成功*******")
                // var videoTag = document.getElementById("localVideo")
                // emedia.mgr.streamBindVideo(stream, videoTag);
            })
        } else {

        }
    },     //收到命令消息
    onAudioMessage: function (message) { //收到音频消息
        console.log('onAudioMessage: ', message);
    },   
    onLocationMessage: function (message) { //收到位置消息
        console.log('onLocMessage: ', message);
    },
    onFileMessage: function (message) { //收到文件消息
        console.log('onFileMessage: ', message);
    },    
    recallMessage: function (message) { //消息撤回
        console.log('recallMessage', message);
    }, 
    onVideoMessage: function (message) {
        console.log('onVideoMessage: ', message);
        var node = document.getElementById('privateVideo');
        var option = {
            url: message.url,
            headers: {
                'Accept': 'audio/mp4'
            },
            onFileDownloadComplete: function (response) {
                var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                node.src = objectURL;
            },
            onFileDownloadError: function () {
                console.log('File down load error.')
            }
        };
        WebIM.utils.download.call(conn, option);
    },   //收到视频消息
    onPresence: function (message) {
        var myDate = new Date().toLocaleString();
        console.log('onPresence: ', myDate + JSON.stringify(message));
        switch (message.type) {
            case 'subscribe': // 对方请求添加好友
                var truthBeTold = window.confirm((message.from + "申请添加您为好友:"));
                if (truthBeTold) {
                    // 同意对方添加好友
                    conn.subscribed({
                        to: message.from,
                        message: "[resp:true]"
                    });
                    console.log("同意添加好友");
                } else {
                    // 拒绝对方添加好友
                    conn.unsubscribed({
                        to: message.from,
                        message: "rejectAddFriend" // 拒绝添加好友回复信息
                    });
                    console.log("拒绝添加好友");
                }
                break;
            case 'subscribed': // 对方同意添加好友，已方同意添加好友
                break;
            case 'unsubscribe': // 对方删除好友
                break;
            case 'unsubscribed': // 被拒绝添加好友，或被对方删除好友成功
                break;
            case 'memberJoinPublicGroupSuccess': // 成功加入聊天室
                console.log('join chat room success' + myDate);
                console.log(new Date().toLocaleString());
                break;
            case 'joinChatRoomFaild': // 加入聊天室失败
                console.log('join chat room faild');
                break;
            case 'joinPublicGroupSuccess': // 意义待查
                console.log('join public group success', message.from);
                break;
            case 'createGroupACK':
                conn.createGroupAsync({
                    from: message.from,
                    success: function (option) {
                        console.log('Create Group Succeed');
                    }
                });
                break;
        }
    },       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
    onRoster: function (message) { //处理好友申请
        console.log("onRoster", message);
    },         
    onInviteMessage: function (message) { //处理群组邀请
        console.log('Invite');
    },  
    onOnline: function () { //本机网络连接成功
        console.log("onOnline");
    },                  
    onOffline: function () { //本机网络掉线
        console.log('offline');
    },                 
    onError: function (message) { //失败回调
        console.log('onError: ', message);

    },          
    onBlacklistUpdate: function (list) { //黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        console.log(list);
    },
    onReceivedMessage: function (message) { //收到消息送达服务器回执
        console.log('onReceivedMessage: ', message);
    },    
    onDeliveredMessage: function (message) { //收到消息送达客户端回执
        console.log('onDeliveredMessage：', message);
    },  
    onReadMessage: function (message) { //收到消息已读回执
        console.log('onReadMessage: ', message);
    },       
    onCreateGroup: function (message) { //创建群组成功回执（需调用createGroupNew）
        console.log('onCreateGroup: ', message);
    },        
    onMutedMessage: function (message) { //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
        console.log('onMutedMessage: ', message);
    }         
});
			

$(function(){
	console.log(sendUser);
	$('.chatBuy').text(ReceiveUser);
	$('.x-chat-content').scrollTop( $('.x-chat-content')[0].scrollHeight );
	if(userToken == null && userToken == ''){
		//即时通讯账号密码登录
	    conn.open({
	        apiUrl: WebIM.config.apiURL,
	        user: sendUser,
	        pwd: '654321',
	        appKey: WebIM.config.appkey,
	        success: function (data) {
            	console.log(data);
            	localStorage.setItem('ecmToken',data.access_token);
                console.log('send private text Success');
            },
            fail: function (e) {
            	console.log(e)
                console.log("Send private text error");
            }
	    });
	}else{
		//即时通讯token登录
		var options = {
		    apiUrl: WebIM.config.apiURL,
		    user: sendUser,
		    accessToken: userToken,
		    appKey: WebIM.config.appkey
		};
		conn.open(options);
	}
	
	
	
	//发送文本信息
    document.getElementById('privateText').onclick = function () {
    	var tmsg = document.getElementById("toMsg").value;
        var tname = ReceiveUser;	   //接收者         
        var id = conn.getUniqueId();                 // 生成本地消息id
        var msg = new WebIM.default.message('txt', id);      // 创建文本消息
        console.log(myDate)
        msg.set({
			msg: tmsg,                  // 消息内容
            to: tname,
            ext: {
                'time': myDate
            },   
            success: function () {
                console.log('send private text Success');
	           	msgText = msg.body.msg;
	           	document.getElementById("toMsg").value = '';
	            var tpl = '<div class="group x-message-right">'+
						'<div class="x-message-user"></div>'+
						'<div class="x-message-content"><p class="x-message-text">'+ msg.body.msg +'</p></div>'+
						'<div class="x-message-time"> '+ myDate +''+
							'<span class="x-message-status"></span>'+
						'</div>'+
					'</div>';
				$('.x-chat-content').append(tpl);
				$('.x-chat-content').scrollTop( $('.x-chat-content')[0].scrollHeight );
            },
            fail: function (e) {
            	console.log(e)
                console.log("Send private text error");
            }
        });
        msg.body.chatType = 'singleChat';
        conn.send(msg.body);
    };

})

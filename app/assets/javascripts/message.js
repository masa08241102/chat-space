$(function(){ 
  function buildHTML(message){//create.json.jbuilderから
    
    var image = message.image.url ? `<img class="lower-message__image" src=${message.image.url} >`: ""; //三項演算子を使ってmessage.imageにtrueならHTML要素、faiseなら空の値を代入。

    var html =
    `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
        <div class="upper-message__date">
            ${message.data}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
          ${image}
        </div>
      </div>`
    return html;
  }
  $('.new_message').on('submit', function(e){//新規メッセージ
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
  $.ajax({//create.json.jbuilderへ
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })

  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.new_message')[0].reset();//設定した初期値になる
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
  })
    .fail(function(){
      alert('error');
    });
    return false;
  });

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message').last().data("message-id"); 
      // var group_id = $(".group").data("group-id");

      $.ajax({ //ajax通信
        url: "api/messages", //サーバを指定。api/message_controllerに処理を飛ばす
        type: 'get', 
        dataType: 'json', 
        data: {id: last_message_id} 
      })
      .done(function (messages) { 
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        })
      })
      .fail(function () {
        alert('自動更新に失敗しました');//ダメだったらアラートを出す
      });
    }
  };
  setInterval(reloadMessages, 5000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
});
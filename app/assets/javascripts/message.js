$(function(){ 
  function buildHTML(message){//create.json.jbuilderから

    var image = message.image.url ? `<img class="lower-message__image" src=${message.image.url} >`: ""; //三項演算子を使ってmessage.imageにtrueならHTML要素、faiseなら空の値を代入。

    var html =//メッセージの投稿内容
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
  $('.new_message').on('submit', function(e){//新規メッセージを入力し、sendボタンを押したらイベント発火
    e.preventDefault();//初期イベントの解除。ボタンを入力して情報をcontrollreに行くのを防ぐ
    var formData = new FormData(this);//イベントが発火した要素の値を取得
    var url = $(this).attr('action')//イベントが発火したaction=urlを取得
  $.ajax({//create.json.jbuilderへ
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })

  .done(function(data){//controllerのcreateからjsonデータタイプで返ってくる。jbuilderの内容が、dataに格納されている
    var html = buildHTML(data);//ハッシュで格納されたデータを上記のhtmlに格納する。
    $('.messages').append(html);//dataの入ったhtmlをmessageに挿入する
    $('.new_message')[0].reset();//メッセージ欄は情報が残らないように初期化する
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
  })
    .fail(function(){//新規投稿に失敗したらアラートが出現する
      alert('error');
    });
    return false;//毎回データがreturnしないようにする
  });

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){//他のページで自動更新されないようにする
      last_message_id = $('.message').last().data("message-id");//最後のメッセージを拾ってきて、最後のページのみ更新する

      $.ajax({ //ajax通信
        url: "api/messages", //サーバを指定。api/message_controllerに処理を飛ばす
        type: 'get', 
        dataType: 'json', 
        data: {id: last_message_id} 
      })
      .done(function (messages) { //index.jsonから
        var insertHTML = '';//からのhtmlを用意する
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
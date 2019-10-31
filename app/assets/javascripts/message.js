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
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
  })
    .fail(function(){
      alert('error');
    });
    return false;
  });

  var reloadMessages = function(){//自動更新
    last_message_id = $('.message').last().data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}//index.json
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML)
      })
    })
    .fail(function(){
      alert("自動更新に失敗しました");
    });
  };
  setInterval(reloadMessages, 50000);
});
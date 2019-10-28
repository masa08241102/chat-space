$(function() {
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;//ユーザーネーム表示
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="chat-group-user__remove chat-group-user__button" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>
    `;//削除の表示
    $(".js-add-user").append(html);
  }
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function() {//①文字入力でイベント発火
    let input = $("#user-search-field").val();
    $.ajax({ //②入力した値をjbuilderへ
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {  //③conttrollerから返ってくる
        $("#user-search-result").empty();

        if (users.length !== 0) {//④usersの中身が0でなければaddUserにいきuserのhtmlを表示
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {//④-①input=入力がないとイベント終了
          return false;
        } else {//④-②ユーザーがいなければaddNoUserを表示
          addNoUser();
        }
      })
      .fail(function() {
        alert("ユーザーが表示できません。");
      });
  });
  $(document).on('click', '.user-search-add', function() {//⑤追加ボタンを押したらイベント発火
    const userName = $(this).attr("data-user-name");//user.nameをuserNameへ代入
    const userId = $(this).attr("data-user-id");//user.idをuserIdへ代入
    $(this)//追加ボタン
      .parent()//親要素取得
      .remove();//親要素削除
    addDeleteUser(userName, userId);//消去画面にnameとidデータを渡す
    addMember(userId);//メンバーidの追加
  });
  $(document).on('click', '.user-search-remove', function() {//消去ボタンイベント発火
    $(this)//消去ボタンの要素を取得
      .parent()//親要素取得
      .remove();//親要素消去
  });
});
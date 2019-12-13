$(function(){
  function buildHTML(message){

    if (message.image) {
      var html = `<div class="messages">
                    <div class="chat-main__messages-writer-name">
                     ${message.user_name}
                    </div>
                    <div class="chat-main__messages-data">
                      ${message.created_at}
                    </div>
                    <p class="chat-main__messages-writer-name-content">
                      ${message.content}
                      <br>
                      <img class="lower-message__image" src="${message.image}">
                    </p>
                  </div>`                  
    } else {
      var html = `<div class="messages">
                    <div class="chat-main__messages-writer-name">
                      ${message.user_name}
                    </div>
                    <div class="chat-main__messages-data">
                      ${message.created_at}
                    </div>
                    <p class="chat-main__messages-writer-name-content">
                      ${message.content}
                    </p>
                  </div>`     

    }
    return html
  }
  
  $("#new_message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url, 
      type: 'POST', 
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false,
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__messages').append(html);
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      $('.new_message')[0].reset('');
      $('.form__submit').prop('disabled', false);
    })

    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });

  })
})


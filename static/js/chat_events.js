$(function() {
    var socket = io();
    
    $('.username_form').submit(function() {
        username = $('.username').val()
        $('.username').val('');
        socket.emit('set_username', username);
        $(this).hide()
        $('.message').focus()
        return false
    });

    $('.message_form').submit(function() {
        socket.emit('send_message', $('.message').val());
        $('.message').val('');
        return false;
    });

    socket.on('send_message', function(msg) {
        $('.chat_box').append($('<li>').text(msg));
        $('.chat_box')[0].scrollTop = $('.chat_box')[0].scrollHeight;
    });

    socket.on('username_set', function(msg) {
        $('.chat_box').append($('<li>').text(msg));
        $('.chat_box')[0].scrollTop = $('.chat_box')[0].scrollHeight;
    });
})
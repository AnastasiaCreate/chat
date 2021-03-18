function login(auto = false, reg = false) {

    let alert = $('#alert');
    let ok = $('#ok');
    alert.hide(); ok.hide();

    let url = (reg) ? 'http://dneb.site:3000/reg' : 'http://dneb.site:3000/auth';

    let data = JSON.stringify({
        username: $('#login').val(),
        password: $('#password').val(),
        uuid: 'random_text',
    })

    $.support.cors = true;
    let ajax = $.ajax({
        type: 'POST',
        url: url,
        contentType: "application/json",
        // dataType: "json",
        data: data,
        xhrFields: {
            withCredentials: true
        }
    });

    ajax.catch(function (value) {
        sessionStorage.clear();
        if (auto)
            return;
        $('#button').prop('disabled', false);
        alert.show();
        alert.text(value.responseText);
    })
    ajax.done(function (value) {
        if (!auto) {
            ok.show();
            sessionStorage.setItem('user', data);
        }
        setTimeout(() => {
            document.location.href = 'chat.html';
        }, 300)
    })
}

function loadChat(last = -1, count = 25) {
    return new Promise(function (resolve, reject) {
        let url = 'http://dneb.site:3000/chat';
        let data = JSON.stringify({
            last_message_id: last,
            count: count,
        })

        $.support.cors = true;
        let ajax = $.ajax({
            type: 'POST',
            url: url,
            contentType: "application/json",
            // dataType: "json",
            data: data,
            async: true,
            xhrFields: {
                withCredentials: true
            }
        });
        
        ajax.done(function (value) {
            resolve(eval(value));
        })
        
        ajax.catch(function (error) {
            reject(error);
        })

        // ajax.always(function (value) {
        //     console.log('always')
        //     // resolve(value);
        //     // if (value['status'] === 200)
        //     //     resolve(value)
        //     // else
        //     //     reject(false);
        // })
    })
}

function sendMsg(text) {
    return new Promise(function (resolve, reject) {
        let url = 'http://dneb.site:3000/chat/message';
        let data = JSON.stringify({
            message: text,
        })

        $.support.cors = true;
        let ajax = $.ajax({
            type: 'POST',
            url: url,
            contentType: "application/json",
            dataType: "json",
            data: data,
            xhrFields: {
                withCredentials: true
            }
        });

        ajax.always(function (value) {
            resolve(value);
        })
    })
}

function liveUp() {
        let url = 'http://dneb.site:3000/alive';
        let data = ''

        $.support.cors = true;
        $.ajax({
            type: 'POST',
            url: url,
            xhrFields: {
                withCredentials: true
            }
        });
}

function normalizeTime(time) {
    return `${time.getHours() > 10 ? time.getHours() : '0' + time.getHours()}:${time.getMinutes() > 10 ? time.getMinutes() : '0' + time.getMinutes()}`
}
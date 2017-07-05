const defaults = {
    title: 'Olar!',
    message: 'Não esqueça de beber água!',
    timeout: 1 * 60 * 60 * 1000
}

window.onload = function() {
    if(Notification.permission !== "granted") {    
        /*Notification.requestPermission().then(function(result) {
            console.log(result);
        });*/
    }

    notify();
}

function notify() {
    var options = {
        body: defaults.message,
        icon: 'img/squirtle.png'
    }
  
    var notification = new Notification(defaults.title, options);

    setTimeout(notify, 1 * 60 * 60 * 1000);
}
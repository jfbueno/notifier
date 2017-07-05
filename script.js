window.onload = function() {
    if(Notification.permission !== "granted") {    
        Notification.requestPermission().then(function(result) {
            console.log(result);
        });
    }

    notify();
}

function notify() {
    var options = {
        body: 'Não esquecer de beber água.',
        icon: 'img/squirtle.png'
    }
  
    var notification = new Notification("Olar!", options);

    setTimeout(notify, 1 * 60 * 60 * 1000);
}
const defaults = {
    title: 'Olar!',
    body: 'Não esqueça de beber água!',
    minutesTimeout: 30
}

let mainConfig = { };

const CONFIG_LOCAL_STORAGE_KEY = '_config';
const getConfigObj = () => JSON.parse(localStorage.getItem(CONFIG_LOCAL_STORAGE_KEY)) || {};

let notificationSound = new Audio('audio/att.ogg');

window.onload = function() {
    if(Notification.permission !== "granted") {    
        Notification.requestPermission().then(function(result) {
            console.log(result);
        });
    }

    init();
}

function init() {    
    document.getElementById('btn-config').addEventListener('click', btnConfigClick);
    document.getElementById('btn-test').addEventListener('click', sendNotification);

    initComponents();
    loadConfiguration();
    setTimeout(notify, mainConfig.timeout);
}

function loadConfiguration() {
    const savedConfig = getConfigObj();

    mainConfig = {
        title: savedConfig.title || defaults.title,
        body: savedConfig.body || defaults.body,
        timeout: (savedConfig.minutesTimeout || defaults.minutesTimeout) * 60 * 1000
    };
}

function initComponents() {
    const config = getConfigObj();

    for(let prop in config){
        document.getElementsByName(prop)[0].value = config[prop] || defaults[prop];
    }
}

function btnConfigClick() {
    const configObj = { }
    const inputs = document.querySelectorAll('#config-container>input');

    for(let element of inputs) {
        if(element.value && element.name){
            configObj[element.name] = element.value;
        }
    }

    localStorage.setItem(CONFIG_LOCAL_STORAGE_KEY, JSON.stringify(configObj));
}

function notify() {    
    sendNotification();
    setTimeout(notify, mainConfig.timeout);
}

function sendNotification() {
    loadConfiguration();

    const options = {
        body: mainConfig.body,
        icon: 'img/squirtle.png'
    }
  
    notificationSound.play();
    notificationSound.loop = true;

    const notification = new Notification(mainConfig.title, options);

    notification.onclick = function() {
        this.close();
    };

    notification.onclose = function() {
        notificationSound.pause();
        notificationSound.currentTime = 0;        
    };
}


const defaults = {
    title: 'Olar!',
    body: 'Não esqueça de beber água!',
    minutesTimeout: 15
}

const CONFIG_LOCAL_STORAGE_KEY = '';

window.onload = function() {
    if(Notification.permission !== "granted") {    
        Notification.requestPermission().then(function(result) {
            console.log(result);
        });
    }

    __init();
}

function __init() {    
    document.getElementById('btn-config').addEventListener('click', btnConfigClick);    
    initComponents();
    notify();
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
    const configObj = getConfigObj();

    const options = {
        body: configObj.body || defaults.body,
        icon: 'img/squirtle.png'
    }
  
    const title = configObj.title || defaults.title;
    const notification = new Notification(title, options);
    const timeout = (configObj.minutesTimeout || defaults.minutesTimeout) * 60 * 1000;
    setTimeout(notify, timeout);
}

const getConfigObj = () => JSON.parse(localStorage.getItem(CONFIG_LOCAL_STORAGE_KEY)) || {};

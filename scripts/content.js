let timeoutID
const showDisplaySpeed = (currentSpeedIndex) => {
    let prevDisplaySpeed = document.querySelector('.display-speed')
    if (prevDisplaySpeed) document.body.removeChild(prevDisplaySpeed)

    const displaySpeed = document.createElement('div')
    displaySpeed.classList.add('display-speed')
    displaySpeed.textContent = `Скорость ${currentSpeedIndex*0.25+0.5}x`
    document.body.appendChild(displaySpeed)

    clearTimeout(timeoutID)

    timeoutID = setTimeout(() => {
        let prevDisplaySpeed = document.querySelector('.display-speed')
        if (prevDisplaySpeed) document.body.removeChild(prevDisplaySpeed)
    },2000)
}

if (window.location.host === 'ulbitv.ru') {
    let player

    new Promise((resolve)=> {
        const idInterval = window.setInterval(() => {
            player = document.querySelector(`[data-place="new-player"]`)

            if (player) {
                clearInterval(idInterval)
                resolve()
            }
        },500)

    }).then(()=> {
        const iframe = document.getElementsByTagName('iframe')[0]
        const btn = document.createElement('button')
        btn.classList.add('btn-player')
        btn.textContent = "Активировать хоткеи"
        btn.onclick = () => window.open(iframe.attributes[1].nodeValue)
        player.after(btn)
    })
}

if (window.location.host === 'player-ua.gceuproxy.com') {

    let play

    new Promise((resolve)=> {
        const idInterval = window.setInterval(() => {
            play = document.querySelector(`[data-plyr="play"]`)

            if (play) {
                clearInterval(idInterval)
                resolve()
            }
        },500)

    }).then(()=> {
        document.body.classList.add('window-player')

        const speeds = document.querySelectorAll(`[data-plyr="speed"]`)
        const fullscreen = document.querySelector(`[data-plyr="fullscreen"]`);
        let currentSpeedIndex = Array.from(speeds).findIndex((value) => value.ariaChecked === 'true') ?? 2

        window.addEventListener('keydown', function(event) {
            if (event.code === "Space") {
                play.click()
            }

            if ((event.key === "+" || event.key === "=") && currentSpeedIndex < 6) {
                speeds[++currentSpeedIndex].click()
                showDisplaySpeed(currentSpeedIndex)

            }

            if ((event.key === "-" || event.key === "_") && currentSpeedIndex > 0) {
                speeds[--currentSpeedIndex].click()
                showDisplaySpeed(currentSpeedIndex)
            }

            if (event.code === 'KeyF') {
                fullscreen.click();
            }
        })
    })
}
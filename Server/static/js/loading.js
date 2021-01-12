const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const waitTillLoads = new Promise( async (resolve, _) => {
    await sleep(1000);

    let host = checkhost()
    console.log(host)

    const url = host + 'init';

    while (true) {
        const rawResponse = await fetch(url)
        let resp = await rawResponse.json();
        if (resp===200) {
            resolve('ok');
            break;
        }
    }
});

waitTillLoads.then(async (_) => {
    document.getElementById("loaderid").remove();
    document.getElementById("loadertext").innerHTML =
'<p>\
<span font-family: "Arvo" style="color:purple">\
    <b>\
        Meet El Digito<br>\
        &#129299<br>\
    </b>\
</span>\
<span style="font-size:20px;">\
    Your AI assistant for handwriting (LOL! Is that even a thing!!!) <br>\
    Well, he is still learning how to write,\
    and he can write at most one digit in one go for now.<br>\
    Select a tuner value using the slider and press Generate!\
</span>\
</p>'
});

function checkhost() {
    let currentUrl = window.location.href;
    if (currentUrl.startsWith('http://localhost')) {
        return 'http://localhost:3000/'
    } else {
        return 'https://ugly-digits.herokuapp.com/'
    }
}
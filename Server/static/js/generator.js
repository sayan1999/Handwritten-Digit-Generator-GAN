async function generate() {

    let input =  document.getElementById("slider").value
    console.log(`Random Noisy Input Mean is ${input}`)

    let host = checkhost()
    console.log(host)

    const url = host + 'predict?integer=' + input;

    const rawResponse = await fetch(url)
    let result = await rawResponse.json();
    result = tf.tensor(result).mul([1, 1, 1, 1]).dataSync()
    for(var i=0;i<result.length;i++){
        result[i]=result[i]*128.0 + 128.0;
    }
    context=document.getElementById("canvas1").getContext("2d")
    context.scale(0.5, 0.5)
    context.putImageData(new ImageData(Uint8ClampedArray.from(result), 128, 128), 1, 1);
    document.getElementById("slider1").scrollIntoView();
}

function checkhost() {
    let currentUrl = window.location.href;
    if (currentUrl.startsWith('http://localhost')) {
        return 'http://localhost:3000/'
    } else {
        return 'https://ugly-digits.herokuapp.com/'
    }
}
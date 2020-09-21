const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//Passing joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: APIkey,
        src: joke,
        hl: 'en-gb',
        v: 'Alice',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get jokes from API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try { 
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //Text-to-Speech
        tellMe(joke);
        //Disable button during speech
        toggleButton();
    } catch(error) {
        console.log('whoops', error);
    }
}

//Event Listeners
button.addEventListener('click', getJokes);
//Enable button after speech has ended
audioElement.addEventListener('ended', toggleButton);

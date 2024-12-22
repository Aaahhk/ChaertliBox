
const data = [
    { category: 'Grundlagen', de: 'Waschmaschine', en: 'Washing machine', phonetic: 'wosching maschien' },
    { category: 'Grundlagen', de: 'Tisch', en: 'Table', phonetic: 'teibl' },
    { category: 'Geschäftswelt', de: 'Besprechung', en: 'Meeting', phonetic: 'miiting' },
    { category: 'Geschäftswelt', de: 'Abgabetermin', en: 'Deadline', phonetic: 'dedlain' },
    { category: 'Notfallhilfen', de: 'Rufen Sie einen Krankenwagen!', en: 'Call an ambulance!', phonetic: 'kol än ämbjulänz' },
    { category: 'Notfallhilfen', de: 'Haben Sie Schmerzen?', en: 'Do you feel pain?', phonetic: 'du ju fiil päin' }
];

let currentDirection = '';
let currentIndex = 0;
const dailyWords = 5;
let shuffledData = [];

function selectDirection(direction) {
    currentDirection = direction;
    shuffledData = shuffle(data).slice(0, dailyWords);
    currentIndex = 0;
    showFlashcard();
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function showFlashcard() {
    if (currentIndex < shuffledData.length) {
        const currentItem = shuffledData[currentIndex];
        const frontText = currentDirection === 'de-en' ? currentItem.de : currentItem.en;
        const backText = currentDirection === 'de-en' ? `${currentItem.en}<br>Lautschrift: ${currentItem.phonetic}` : currentItem.de;

        document.body.innerHTML = `
            <div class="card" style="border: 1px solid #ddd; border-radius: 10px; padding: 20px; max-width: 300px; margin: auto; text-align: center;">
                <div id="front" style="display: block;">${frontText}</div>
                <div id="back" style="display: none;">${backText}</div>
                <button onclick="playAudio('${currentItem.en}')" style="background-color: transparent; border: none; cursor: pointer; margin-top: 10px;">
                    🔊
                </button>
            </div>
            <div style="margin-top: 20px;">
                <button onclick="flipCard()" style="padding: 10px 20px; background-color: #ffc107; border: none; border-radius: 5px;">Umdrehen</button>
                <button onclick="nextCard()" style="padding: 10px 20px; background-color: #28a745; border: none; border-radius: 5px;">Weiter (${currentIndex + 1}/${dailyWords})</button>
            </div>
        `;
    } else {
        document.body.innerHTML = '<p>Du hast alle Wörter für heute gelernt!</p>';
    }
}

function flipCard() {
    const front = document.getElementById('front');
    const back = document.getElementById('back');
    if (front && back) { // Ensure elements exist before accessing
        if (front.style.display === 'none') {
            front.style.display = 'block';
            back.style.display = 'none';
        } else {
            front.style.display = 'none';
            back.style.display = 'block';
        }
    } else {
        console.error('FlipCard error: Elements not found');
    }
}

function nextCard() {
    currentIndex++;
    showFlashcard();
}

function playAudio(text) {
    fetch('https://api.mozilla.org/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang: 'en-US' })
    }).then(response => response.blob()).then(blob => {
        const audio = new Audio(URL.createObjectURL(blob));
        audio.play();
    }).catch(error => console.error('TTS Error:', error));
}

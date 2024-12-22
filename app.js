
const data = [
    { category: 'Grundlagen', de: 'Waschmaschine', en: 'Washing machine', phonetic: 'wosching maschien' },
    { category: 'Grundlagen', de: 'Tisch', en: 'Table', phonetic: 'teibl' },
    { category: 'Geschäftswelt', de: 'Besprechung', en: 'Meeting', phonetic: 'miiting' },
    { category: 'Geschäftswelt', de: 'Abgabetermin', en: 'Deadline', phonetic: 'dedlain' },
    { category: 'Notfallhilfen', de: 'Rufen Sie einen Krankenwagen!', en: 'Call an ambulance!', phonetic: 'kol än ämäbläns' },
    { category: 'Notfallhilfen', de: 'Haben Sie Schmerzen?', en: 'Do you feel pain?', phonetic: 'du ju fiil päin' }
];

let currentDirection = '';
let currentCategory = '';
let currentIndex = 0;
const flashcardDiv = document.getElementById('flashcard');
const categorySelectionDiv = document.getElementById('category-selection');
const directionSelectionDiv = document.getElementById('direction-selection');

function selectDirection(direction) {
    currentDirection = direction;
    directionSelectionDiv.style.display = 'none';
    categorySelectionDiv.style.display = 'block';
}

function startLearning(category) {
    currentCategory = category;
    currentIndex = 0;
    categorySelectionDiv.style.display = 'none';
    showFlashcard();
}

function showFlashcard() {
    const filteredData = data.filter(item => item.category === currentCategory);
    if (currentIndex < filteredData.length) {
        const currentItem = filteredData[currentIndex];
        document.getElementById('front-side').classList.add('visible');
        document.getElementById('back-side').classList.remove('visible');
        document.getElementById('word-text').innerText = currentDirection === 'de-en' ? currentItem.de : currentItem.en;
        document.getElementById('translation-text').innerText = currentDirection === 'de-en' ? currentItem.en : currentItem.de;
        document.getElementById('phonetic-text').innerText = currentDirection === 'de-en' ? currentItem.phonetic : '';
        flashcardDiv.style.display = 'block';
    } else {
        endLearning();
    }
}

function flipCard() {
    document.getElementById('front-side').classList.toggle('visible');
    document.getElementById('back-side').classList.toggle('visible');
}

function showNextCard() {
    currentIndex++;
    showFlashcard();
}

function endLearning() {
    flashcardDiv.style.display = 'none';
    categorySelectionDiv.style.display = 'none';
    directionSelectionDiv.style.display = 'block';
}

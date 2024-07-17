const app = Vue.createApp({
    data() {
        return {
            weather: {
                temperature: '',
                wind: '',
                description: ''
            },
            city: 'London, Ontario',
            word: '',
            dictionary: {
                word: '',
                phonetic: '',
                partOfSpeech: '',
                definition: ''
            },
            fact: ''
        };
    },
    created() {
        this.getWeather();
        this.getRandomFact();
    },
    methods: {
        getWeather() {
            fetch(`https://goweather.herokuapp.com/weather/${this.city}`)
                .then(response => response.json())
                .then(data => {
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind;
                    this.weather.description = data.description;
                });
        },
        defineWord() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
                .then(response => response.json())
                .then(data => {
                    const entry = data[0];
                    this.dictionary.word = entry.word;
                    this.dictionary.phonetic = entry.phonetics[0].text;
                    this.dictionary.partOfSpeech = entry.meanings[0].partOfSpeech;
                    this.dictionary.definition = entry.meanings[0].definitions[0].definition;
                });
        },
        getRandomFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => response.json())
                .then(data => {
                    this.fact = data.text;
                });
        }
    }
});

app.mount('#app');

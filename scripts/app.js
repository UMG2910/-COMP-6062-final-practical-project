const app = Vue.createApp({
    data() {
        return {
            city: '',
            word: '',
            weather: {
                city: 'London, Ontario',
                temperature: '',
                wind: '',
                description: ''
            },
            dictionary: {
                word: '',
                phonetic: '',
                partOfSpeech: '',
                definition: ''
            },
            randomFact: ''
        };
    },
    methods: {
        getWeather() {
            const cityName = this.city.trim() || 'London Ontario';
            fetch(`https://goweather.herokuapp.com/weather/${cityName}`)
                .then(response => response.json())
                .then(data => {
                    this.weather.city = cityName.replace('%20', ' ');
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind;
                    this.weather.description = data.description;
                });
        },
        defineWord() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
                .then(response => response.json())
                .then(data => {
                    const wordData = data[0];
                    this.dictionary.word = wordData.word;
                    this.dictionary.phonetic = wordData.phonetic;
                    this.dictionary.partOfSpeech = wordData.meanings[0].partOfSpeech;
                    this.dictionary.definition = wordData.meanings[0].definitions[0].definition;
                });
        },
        getRandomFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => response.json())
                .then(data => {
                    this.randomFact = data.text;
                });
        }
    },
    mounted() {
        this.getWeather();
        this.getRandomFact();
    }
});

app.mount('#app');

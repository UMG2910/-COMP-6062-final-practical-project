const app = Vue.createApp({
    data() {
        return {
            city: '',
            word: '',
            weather: null,
            weatherCity: 'London, Ontario',
            definition: null,
            randomFact: null,
            defaultCity: 'London, Ontario'
        };
    },
    methods: {
        async getWeather() {
            const cityName = this.city || this.defaultCity;
            const response = await fetch(`https://goweather.herokuapp.com/weather/${cityName}`);
            const data = await response.json();
            this.weather = data;
            this.weatherCity = cityName;
        },
        async getDefinition() {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`);
            const data = await response.json();
            if (data.length > 0) {
                this.definition = {
                    word: data[0].word,
                    phonetic: data[0].phonetic || 'N/A',
                    partOfSpeech: data[0].meanings[0].partOfSpeech,
                    definition: data[0].meanings[0].definitions[0].definition
                };
            }
        },
        async getRandomFact() {
            const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
            const data = await response.json();
            this.randomFact = data.text;
        }
    },
    created() {
        this.getWeather();
    }
});

app.mount('#app');

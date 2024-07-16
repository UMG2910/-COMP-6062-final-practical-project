new Vue({
    el: '#random-fact',
    data: {
        fact: ''
    },
    methods: {
        fetchFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => response.json())
                .then(data => {
                    this.fact = data.text;
                });
        }
    },
    mounted() {
        this.fetchFact();
    }
});

new Vue({
    el: '#weather',
    data: {
        city: 'London Ontario',
        weatherInfo: ''
    },
    methods: {
        fetchWeather() {
            fetch(`https://goweather.herokuapp.com/weather/London%20Ontario`)
                .then(response => response.json())
                .then(data => {
                    this.weatherInfo = `Temperature: ${data.temperature}, Wind: ${data.wind}, Description: ${data.description}`;
                });
        },
        updateCityWeather() {
            const city = document.getElementById('city').value;
            this.city = city;
            this.fetchWeather();
        }
    },
    mounted() {
        this.fetchWeather();
    }
});

new Vue({
    el: '#dictionary',
    data: {
        word: '',
        definitionInfo: ''
    },
    methods: {
        fetchDefinition() {
            const word = document.getElementById('word').value;
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/Bottle`)
                .then(response => response.json())
                .then(data => {
                    if(data.title) {
                        this.definitionInfo = 'No definition found.';
                    } else {
                        const entry = data[0];
                        this.definitionInfo = `Word: ${entry.word}, Phonetic: ${entry.phonetic}, Part of Speech: ${entry.meanings[0].partOfSpeech}, Definition: ${entry.meanings[0].definitions[0].definition}`;
                    }
                });
        }
    }
});

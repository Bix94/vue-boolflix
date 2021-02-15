
var app = new Vue({
  el: '#app',
  data:{
    visibile : false,
    // inizializzo api a 0
    query:'',
    // creo array elementi
    elementi: [],
    // creo array popolari
    popolari: [],
    popolariDue: [],
    // creo array toprated
    topRated: [],
    topRatedDue: [],
    // creo array upcoming
    upcoming: [],
    // inizializzo nei data per snellire html
    imgUrl: 'https://image.tmdb.org/t/p/',
    imgSize: 'w185',

  },
  methods: {
    ricerca(){
      axios
        .get("https://api.themoviedb.org/3/search/movie",{
          params: {
          // key fornita dal sito
            api_key: '4e5ea8902a1c82aae91854e56dae3dc9',
          // collego query ai data
            query: this.query
          }
        })
        .then((result) => {
          // svuoto array per evitare doppioni
          if(this.elementi.length > 0){
            this.elementi = [];
          }
          // ciclo elementi e pusho api in array
          result.data.results.forEach((item, i) => {
            this.elementi.push(item);
          });
        });
      axios
          // stessa cosa per serie tv
        .get("https://api.themoviedb.org/3/search/tv",{
          params: {
            api_key: '4e5ea8902a1c82aae91854e56dae3dc9',
            query: this.query
          }
        })
        .then((result) => {
          result.data.results.forEach((item, i) => {
            this.elementi.push(item);
          });
        });
    },
    // con il return ottengo direttamente la funzione senza bisogno di @
    ottengoVoto(voto){
      return parseInt(voto / 2);
    },
    mostra(){
      this.visibile = true;
    },
    nascondi(){
      this.visibile = false;
    },
    playPause(){
      var myVideo = document.getElementById("video1");
        if (myVideo.paused){
          myVideo.play();
        }else
          myVideo.pause();
    }
  },
  mounted(){
      axios
        .get("https://api.themoviedb.org/3/movie/popular",{
          params: {
            api_key: '4e5ea8902a1c82aae91854e56dae3dc9',
            query: this.query
          }
        })
        .then((result) => {
          this.popolari = result.data.results.splice(0,9);
          this.popolariDue = result.data.results.splice(2,18);
        });
      axios
        .get("https://api.themoviedb.org/3/movie/top_rated",{
          params: {
            api_key: '4e5ea8902a1c82aae91854e56dae3dc9',
            query: this.query
          }
        })
        .then((result) => {
          this.topRated = result.data.results.splice(0,9);
          this.topRatedDue = result.data.results.splice(2,18);
        });
      axios
        .get("https://api.themoviedb.org/3/movie/upcoming",{
          params: {
            api_key: '4e5ea8902a1c82aae91854e56dae3dc9',
            query: this.query
          }
        })
        .then((result) => {
          this.upcoming = result.data.results.splice(0,9);
        });
  }
});

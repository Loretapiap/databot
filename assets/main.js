new Vue({
  el: '#app',
  data() {
    return {
      menuToggle : false,
      subMenuToggle : false,
      searchVal: "",
      states: [],
      cards: [
        {
          title: "Snow White and the Seven Dwarfs",
          type: "reservation",
          hour: "14:00",
          date: "December 21, 1937",
          price: 16500,
          pay: true,
          state: "inprocess"
        },
        {
          title: "Snow White and the Seven Dwarfs",
          type: "reservation",
          hour: "14:00",
          date: "December 21, 1937",
          price: 16500,
          state: "ready"
        },
        {
          title: "Snow White and the Seven Dwarfs",
          type: "reservation",
          hour: "14:00",
          date: "December 21, 1937",
          price: 16500,
          state: "request"
        }
      ]
    }
  },

  computed: {

   filteredCards() {
     let cardsList = this.cards.filter(card => {

       let match = card.title.toLowerCase().match(this.searchVal.toLowerCase());

       if (this.states.length && card.state) {
         return (match && this.states.includes(card.state.toLowerCase()));
       }
       
       if(card.countDown) {
        if(card.countDown > 0) {
          setTimeout(() => {
            card.countDown -= 1
          }, 1000)      
         } else {
           card.countDown = 'Fuera de plazo';
           console.log(card.countDown);
         }
       }
       

       return match;
     });

     return cardsList;
   }
   
 },


  methods: {

    // timer
    createProduct(){
      this.cards.push({
        title: "",
          type: "",
          hour: "14:00",
          date: "",
          price: "",
          state: "request",
          countDown : 10
      });
      $("#exampleModalCenter").modal("hide");
    }
  }
});



Vue.filter('minutes', function(value) {
  if (typeof value !== "number") {
      return value;
  }

    let minutes = parseInt(Math.floor((value / 60))); 
    let seconds= parseInt((value + (minutes * 60)) % 60); 

    let dMins = (minutes > 9 ? minutes : '0' + minutes);
    let dSecs = (seconds > 9 ? seconds : '0' + seconds);

    return dMins + ":" + dSecs;
  
  
});
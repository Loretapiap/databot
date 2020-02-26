new Vue({
  
  el: '#app',
  data() {
    return {
      menuToggle : false,
      subMenuToggle : false,
      comment : "",
      searchVal: "",
      states: [],
      cards: [
        {
          title: "Pedido 1",
          type: "reservation",
          hour: "14:00",
          date: "Febrero 21, 2020",
          price: 16500,
          pay: true,
          state: "inprocess"
        },
        {
          title: "Pedido 2",
          type: "reservation",
          hour: "14:00",
          date: "Febrero 21, 2020",
          price: 16500,
          state: "ready"
        },
        {
          title: "Pedido 3",
          type: "reservation",
          hour: "14:00",
          date: "Febrero 21, 2020",
          price: 16500,
          state: "request"
        }
      ],
      modalInfo: {
        title: "",
        type: "",
        hour: "",
        date: "",
        price: "",
        state: "",
        comment : ""
      }
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
    
    openModal(card) {
      this.modalInfo = card;
      $("#onlyread").modal("show");
    },

    createProduct(){
      this.cards.push({
          title: "",
          type: "reservation",
          hour: "14:00",
          date: new Date().toJSON().slice(0,10),
          price: "1500",
          state: "request",
          comment: this.comment,
          countDown : 300
      });
      // clean filters
      this.states = [];
      this.comment = "";
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
const deck = [];

Vue.component('card', {
  props: ['hand'],
  template: `
    <transition-group tag="div" class="hands">
      <div class="card" :class="'cd' + (key + 1)" v-for="(c, key) in hand" :key="key">{{ c }}</div>
    </transition-group>
  `
});

let player = new Vue({
  el: '#player',
  data: {
    hand: [],
    count: 3,
    message: ''
  },
  methods: {
    drawCard: function() {
      if (this.hand.length < 10) {
        this.hand.push(deck.shift());
        this.count = this.cardCount;
        console.log('draw! hands: ' + this.hand.length);
      } else {
        this.message = 'full';
      }
    }
  },
  computed: {
    cardCount: function() {
      return this.hand.length;
    }
  },
  created() {
    for (let i = 0; i < 30; i++) {
      deck.push('card' + (i + 1));
    }
    for (let i = deck.length - 1; i >= 0; i--) {
      var r = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[r]] = [deck[r], deck[i]];
    }
    for (let i = 0; i < 3; i++) {
      this.hand.push(deck.shift());
    }
  }
});

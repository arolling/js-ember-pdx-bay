import Ember from 'ember';

export default Ember.Service.extend({
  cart: [],
  store: Ember.inject.service(),

  add(item) {
    item.set('quantity', item.get('quantity')-1);
    this.get('cart').pushObject(item);
  },

  remove(item){
    var location = this.get('cart').indexOf(item);
    item.set('quantity', item.get('quantity') + 1);
    this.get('cart').removeAt(location);
  },

  subTotal: Ember.computed('cart.@each.item', function() {
    var sum = 0;
    for(var i=0; i < this.get('cart').length; i++){
      sum += this.get('cart')[i].get('cost');
    }
    return sum;
  }),

  empty() {
    this.get('cart').setObjects([]);
  },

  finalSale(user){
    var buyer = user.get('client');
    this.get('cart').forEach(function(item){
      buyer.get('buyingHistory').addObject(item);
      buyer.save().then(function(){
        return item.save();
      });
    });
  }
});

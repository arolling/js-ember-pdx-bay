import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('store', {path: '/store/:user_id'});
  this.route('cart');
});

export default Router;

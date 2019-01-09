/*
  This vuejs plugin loads up the Muxy SDK and automatically binds the Muxy
  object and a new SDK to the vue global scope
*/
import Muxy from '@muxy/extensions-js';

export default {
  install(Vue, options = {}) {
    if (!options.client_id) {
      throw new Error('Must specify extension id when using the Muxy Vue plugin');
    }

    Muxy.testJWTRole = options.role || 'viewer';
    Muxy.setup({
      clientID: options.client_id,
      uaString: options.ua_string || 'UA-99381428-2'
    });

    Vue.prototype.$muxy = Muxy;
    Vue.prototype.$sdk = new Muxy.SDK();
  }
};
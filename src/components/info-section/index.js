'use strict';

import {
	WINDOW_RESIZE,
	SIDEBAR_TOGGLE
} from '../../config/messages';

export default Vue.extend({

  template: require('./template.html'),

  data: function() {

    return {
      isDisplay: false
    };
  },

  created: function() {
    this.bind();
  },

  ready: function() {

    this.addEventListener();
  },

  methods: {

    /*
     * Binding & Events
     */

    bind: function() {
    },

    addEventListener: function() {

      this.$on(WINDOW_RESIZE, this.onWindowResize);

      this.$on(SIDEBAR_TOGGLE, this.onSidebarToggle);

    },

    onWindowResize: function(width, height) {

    },

    onSidebarToggle: function() {

      this.isDisplay = !this.isDisplay;

      console.log('clicked');
      
    }

  },

  transitions: {},

  components: {}
});
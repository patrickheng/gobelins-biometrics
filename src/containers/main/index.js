'use strict';

import {
	WINDOW_RESIZE,
	SIDEBAR_TOGGLE
} from '../../config/messages';

import infoSectionComponent from 'components/info-section';

import 'gsap';

export default Vue.extend({

  template: require('./template.html'),

  data: function() {

    return {
      _hidden: null
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
    },

    onWindowResize: function(width, height) {

    },

    toggleSideBar: function() {
      this.$broadcast(SIDEBAR_TOGGLE);
    }

  },

  transitions: {
  },

  components: {
    infoSectionComponent
  }
});
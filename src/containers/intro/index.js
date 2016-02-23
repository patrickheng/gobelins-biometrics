'use strict';

import {
	WINDOW_RESIZE
} from '../../config/messages';

import 'gsap';

export default Vue.extend({

  template: require('./template.html'),

  data: function() {

    return {
    };
  },

  created: function() {
    this.bind();
  },

  ready: function() {

    this.addEventListener();
    this.createGSAPTimeline();

    this.frigerPrintTweening = false;
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

    createGSAPTimeline: function() {
      this.fingerprintTl = new TimelineMax({paused: true});

      console.log(this.$els);
    },

    onWindowResize: function(width, height) {
      console.log('Window resize from application.', width, height);
    },

    onFingerprintMouseDown: function() {
      this.frigerPrintTweening = true;
    },

    onFingerprintMouseMove: function() {
    }
    ,
    onFingerprintMouseLeave: function() {
      this.frigerPrintTweening = false;
    }

  },

  transitions: {},

  components: {}
});
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

    this.generateGSAPTimeline();

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

      if(!this.isDisplay) {
        this.isDisplay = true;
        this.hideTl.stop();
        this.showTl.play(0);
      } else {
        this.isDisplay = false;
        this.showTl.stop();
        this.hideTl.play(0);
      }
    },

    generateGSAPTimeline: function() {
      this.showTl = new TimelineMax({paused: true});

      this.hideTl = new TimelineMax({paused: true});

      // this.showTl.to(this.$el, 2, {x: '100%'}, {x: '0%', ease: Expo.easeOut});
      // this.hideTl.to(this.$el, 2, {x: '0%'}, {x: '100%', ease: Expo.easeOut});
    }

  },

  transitions: {

  },

  components: {}
});
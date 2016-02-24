'use strict';

import {
	WINDOW_RESIZE,
	SIDEBAR_TOGGLE
} from '../../config/messages';

export default Vue.extend({

  template: require('./template.html'),

  data() {

    return {
      isDisplay: false
    };
  },

  created() {
    this.bind();
  },

  ready() {

    this.addEventListeners();

    this.generateGSAPTimeline();

  },

  methods: {

    /*
     * Binding & Events
     */

    bind() {
    },

    addEventListeners() {

      this.$on(WINDOW_RESIZE, this.onWindowResize);

      this.$on(SIDEBAR_TOGGLE, this.onSidebarToggle);

      document.addEventListener('keyup', ::this.onKeyUp, false);

    },

    removeEventListeners() {

      this.$off(WINDOW_RESIZE, this.onWindowResize);

      this.$off(SIDEBAR_TOGGLE, this.onSidebarToggle);

      document.removeEventListener('keyup', ::this.onKeyUp, false);

    },

    onKeyUp(ev) {
      if (ev.keyCode === 27 && this.isDisplay) {
        this.closeSidebar();
      }
    },

    onWindowResize(width, height) {

    },

    onSidebarToggle() {

      if(!this.isDisplay) {
        this.showSidebar();
      } else {
        this.closeSidebar();
      }
    },

    showSidebar() {
      this.isDisplay = true;
      this.hideTl.stop();
      this.showTl.play(0);
    },

    closeSidebar() {
      this.isDisplay = false;
      this.showTl.stop();
      this.hideTl.play(0);
    },

    generateGSAPTimeline() {
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
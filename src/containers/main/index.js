'use strict';

import {
	WINDOW_RESIZE,
	SIDEBAR_TOGGLE
} from '../../config/messages';

import infoSectionComponent from 'components/info-section';

import 'gsap';

export default Vue.extend({

  template: require('./template.html'),

  data() {

    return {
    };
  },

  created() {
    this.bind();
  },

  ready() {

    this.addEventListeners();
  },

  beforeDestroy() {

    this.removeEventListeners();
  },

  methods: {

    /*
     * Binding & Events
     */

    bind() {
    },

    addEventListeners() {
      Emitter.on(WINDOW_RESIZE, this.onWindowResize);
    },

    removeEventListeners() {
      Emitter.off(WINDOW_RESIZE, this.onWindowResize);
    },

    onWindowResize(width, height) {

    },

    toggleSideBar() {
      Emitter.emit(SIDEBAR_TOGGLE);
    }

  },

  transitions: {
  },

  components: {
    infoSectionComponent
  }
});
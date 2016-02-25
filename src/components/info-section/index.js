'use strict';

import Emitter from 'utils/Emitter';

import {
	WINDOW_RESIZE,
	WEBGL_ENABLE_RAYCAST,
	WEBGL_DISABLE_RAYCAST,
  WEBGL_CLICK_ON_OBJECT
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

      this.$on(WINDOW_RESIZE, this.onWindowResize);

      this.$on(WEBGL_CLICK_ON_OBJECT, this.onClickOnObject);

      document.addEventListener('keyup', ::this.onKeyUp, false);

    },

    removeEventListeners() {

      this.$off(WINDOW_RESIZE, this.onWindowResize);

      this.$off(WEBGL_CLICK_ON_OBJECT, this.onClickOnObject);

      document.removeEventListener('keyup', ::this.onKeyUp, false);

    },

    onKeyUp(ev) {
      if (ev.keyCode === 27 && this.isDisplay) {
        this.closeSidebar();
      }
    },

    onWindowResize(width, height) {

    },

    onClickOnObject() {

      if(!this.isDisplay) {
        this.showSidebar();
      } else {
        this.closeSidebar();
      }
    },

    showSidebar() {
      this.isDisplay = true;
			Emitter.emit(WEBGL_DISABLE_RAYCAST);
    },

    closeSidebar() {
      this.isDisplay = false;
			Emitter.emit(WEBGL_ENABLE_RAYCAST);
    }

  },

  transitions: {

  },

  components: {}
});
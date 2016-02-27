'use strict';

import Emitter from 'utils/Emitter';

import contentData from 'data/content';

import {
	SIDEBAR_CLOSE,
	WEBGL_ENABLE_RAYCAST,
	WEBGL_DISABLE_RAYCAST,
  WEBGL_IS_INTERSECTING,
  WEBGL_IS_NOT_INTERSECTING,
  WEBGL_CLICK_ON_OBJECT
} from '../../config/messages';

export default Vue.extend({

  template: require('./template.html'),

  data() {

    return {
      content: {
        title: '',
      },
      isDisplay: false
    };
  },

  created() {
    this.bind();
    this.isIntersecting = false;
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


      Emitter.on(WEBGL_CLICK_ON_OBJECT, this.onClickOnObject);
      Emitter.on(WEBGL_IS_INTERSECTING, this.onIsIntersecting);
      Emitter.on(WEBGL_IS_NOT_INTERSECTING, this.onIsNotIntersecting);

      document.addEventListener('keyup', this.onKeyUp, false);

    },

    removeEventListeners() {
      Emitter.off(WEBGL_CLICK_ON_OBJECT, this.onClickOnObject);
      Emitter.off(WEBGL_IS_INTERSECTING, this.onIsIntersecting);
      Emitter.off(WEBGL_IS_NOT_INTERSECTING, this.onIsNotIntersecting);

      document.removeEventListener('keyup', this.onKeyUp, false);

    },

    onIsIntersecting() {
      this.isIntersecting = true;
    },

    onIsNotIntersecting() {
      this.isIntersecting = false;
    },

    onKeyUp(ev) {
      if (ev.keyCode === 27 && this.isDisplay) {
        this.closeSidebar();
      }
    },

    onClickOnObject(object) {
      this.content.title = contentData[object.ref].name;
      this.showSidebar();
    },

    onClickOnOverlay() {
      if(!this.isIntersecting) {
        this.closeSidebar();
      }
    },

    showSidebar() {
      this.isDisplay = true;
			// Emitter.emit(WEBGL_DISABLE_RAYCAST);
    },

    closeSidebar() {
      this.isDisplay = false;
      this.isIntersecting = false;
      Emitter.emit(SIDEBAR_CLOSE);
      Emitter.emit(WEBGL_ENABLE_RAYCAST);
    }

  },

  transitions: {

  },

  components: {}
});
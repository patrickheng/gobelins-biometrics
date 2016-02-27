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
      content: {},
      currentArticle: {},
      isArticleViewMode: false,
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
      this.content = contentData[object.ref];
      this.showSidebar();
    },

    onClickOnOverlay() {
      if(!this.isIntersecting) {
        this.closeSidebar();
      }
    },

    selectArticle(articleIndex) {
      this.isArticleViewMode = true;
      this.currentArticle = this.content.articles[articleIndex];
      console.log(this.content, this.currentArticle);
    },
    backToIndex() {
      this.isArticleViewMode = false;
    },
    showSidebar() {
      this.isDisplay = true;
			// Emitter.emit(WEBGL_DISABLE_RAYCAST);
    },

    closeSidebar() {
      
      this.isDisplay = false;
      this.isIntersecting = false;

      setTimeout(()=>{
        this.isArticleViewMode = false;
      }, 700)

      Emitter.emit(SIDEBAR_CLOSE);
      Emitter.emit(WEBGL_ENABLE_RAYCAST);
    }

  },

  transitions: {

  },

  components: {}
});
'use strict';

import Emitter from 'utils/Emitter';

import contentData from 'data/content';

import find from 'lodash.find';

import 'gsap';

import {
  WEBGL_CLICK_ON_OBJECT,
  SIDEBAR_CLOSE
} from '../../config/messages';

export default Vue.extend({

  template: require('./template.html'),

  data() {

    return {
      previousChapter : '',
      nextChapter : '',
      isDisplay: false
    };
  },

  created() {
    this.bind();
  },

  ready() {
    this.currentIndex = 0;
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
      Emitter.on(WEBGL_CLICK_ON_OBJECT, this.showNavigation);
      Emitter.on(SIDEBAR_CLOSE, this.hideNavigation);
    },

    removeEventListeners() {
      Emitter.off(WEBGL_CLICK_ON_OBJECT, this.showNavigatioff);
      Emitter.off(SIDEBAR_CLOSE, this.hideNavigation);
    },

    showNavigation(object) {
      this.currentIndex = contentData[object.ref].id;
      this.setNavigationChapter();
      this.isDisplay = true;
    },

    goToPreviousChapter() {

      const tl = new TimelineMax();

      tl
        .to(this.$els.container, 0.4, {opacity: 0, y: '50%', ease: Expo.easeOut, onComplete: ()=> {
          this.currentIndex = (this.currentIndex > 0 ) ? this.currentIndex - 1 : 4;
          this.setNavigationChapter();
        }})
        .to(this.$els.container, 0.4, {opacity: 1, y: '0%', ease: Expo.easeOut});
    },

    goToNextChapter() {
      this.currentIndex = (this.currentIndex < 4 ) ? this.currentIndex + 1 : 0;
      this.setNavigationChapter();
    },

    setNavigationChapter() {
      const prevIndex = (this.currentIndex > 0 ) ? this.currentIndex - 1 : 4;
      const nextIndex = (this.currentIndex < 4 ) ? this.currentIndex + 1 : 0;

      this.previousChapter = find(contentData, {id: prevIndex}).title;
      this.nextChapter = find(contentData, {id: nextIndex}).title;
    },

    hideNavigation() {
      this.isDisplay = false;
    }
  }
});
'use strict';

import Emitter from 'utils/Emitter';

import contentData from 'data/content';

import find from 'lodash.find';

import 'gsap';

import {
  WEBGL_CLICK_ON_OBJECT,
  SIDEBAR_CLOSE,
  NAVIGATION_SWITCH_CHAPTER
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
    this.contentDictionary = [];
    this.nbChapters = 5;
    this.currentIndex = 0;
    this.navTimeout = null;

    for (let chapter in contentData) {
      this.contentDictionary.push(chapter);
    }
  },

  ready() {
    this.addEventListeners();
    this.generateTimelineMax();
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
      Emitter.off(WEBGL_CLICK_ON_OBJECT, this.showNavigation);
      Emitter.off(SIDEBAR_CLOSE, this.hideNavigation);
    },

    generateTimelineMax() {
      this.tl = new TimelineMax({paused: true});

      this.tl
        .to(this.$els.container, 0.4, {opacity: 0, y: '50%', ease: Expo.easeOut})
        .to(this.$els.container, 0.4, {opacity: 1, y: '0%', ease: Expo.easeOut});
    },

    showNavigation(object) {
      this.currentIndex = contentData[object.ref].id;
      this.setNavigationChapter();
      this.isDisplay = true;
    },

    goToPreviousChapter() {

      this.tl.stop();
      this.tl.play(0);

      clearTimeout(this.navTimeout);

      this.navTimeout = setTimeout(()=> {
        this.currentIndex = (this.currentIndex > 0 ) ? this.currentIndex - 1 : this.nbChapters - 1;
        this.setNavigationChapter();
        Emitter.emit(NAVIGATION_SWITCH_CHAPTER, this.contentDictionary[this.currentIndex]);
      }, 200);
    },

    goToNextChapter() {
      this.tl.stop();
      this.tl.play(0);

      clearTimeout(this.navTimeout);

      this.navTimeout = setTimeout(()=> {
        this.currentIndex = (this.currentIndex < this.nbChapters - 1) ? this.currentIndex + 1 : 0;
        this.setNavigationChapter();
        Emitter.emit(NAVIGATION_SWITCH_CHAPTER, this.contentDictionary[this.currentIndex]);
      }, 200);
    },

    setNavigationChapter() {
      const prevIndex = (this.currentIndex > 0 ) ? this.currentIndex - 1 : this.nbChapters - 1;
      const nextIndex = (this.currentIndex < this.nbChapters - 1 ) ? this.currentIndex + 1 : 0;

      this.previousChapter = contentData[this.contentDictionary[prevIndex]].title;
      this.nextChapter = contentData[this.contentDictionary[nextIndex]].title;
    },

    hideNavigation() {
      this.isDisplay = false;
    }
  }
});
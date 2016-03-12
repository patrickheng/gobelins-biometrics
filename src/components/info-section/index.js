'use strict';

import Emitter from 'utils/Emitter';

import contentData from 'data/content';

import {
	SIDEBAR_CLOSE,
	NAVIGATION_SWITCH_CHAPTER,
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
    this.nextTitle = '';
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
      Emitter.on(NAVIGATION_SWITCH_CHAPTER, this.onSwitchChapter);

      document.addEventListener('keyup', this.onKeyUp, false);

    },

    removeEventListeners() {
      Emitter.off(WEBGL_CLICK_ON_OBJECT, this.onClickOnObject);
      Emitter.off(WEBGL_IS_INTERSECTING, this.onIsIntersecting);
      Emitter.off(WEBGz_IS_NOT_INTERSECTING, this.onIsNotIntersecting);
			Emitter.off(NAVIGATION_SWITCH_CHAPTER, this.onSwitchChapter);

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

		onSwitchChapter(ref) {

      console.log('ref', ref);


      this.content.id= contentData[ref].id;
      this.content.ref= contentData[ref].ref;
      this.content.articles= contentData[ref].articles;

      this.nextTitle = contentData[ref].title;

      this.isArticleViewMode = false;

      this.displayArticles();

      const tl = new TimelineMax();

      tl
        .fromTo(this.$els.title, 0.5, { y: 0 , opacity: 1 }, { y: -25, opacity: 0, ease: Expo.EaseOut, onComplete: ()=>{
          this.content.title = this.nextTitle;
        }})

      .fromTo(this.$els.title, 0.5, { y: 25 , opacity: 0 }, { y: 0, opacity: 1, ease: Expo.EaseOut })


		},

    onClickOnOverlay() {
      if(!this.isIntersecting) {
        this.closeSidebar();
      }
    },

    selectArticle(articleIndex) {
      this.isArticleViewMode = true;
      this.currentArticle = this.content.articles[articleIndex];

      const currentArticleEls = this.$els.selectedarticle.children;
      TweenMax.set(currentArticleEls, {opacity: 0, x:0});
      TweenMax.staggerFromTo(currentArticleEls, 2, {opacity: 0, x: 100}, {opacity: 1, x: 0, ease: Expo.easeOut}, 0.3);
    },

    backToIndex() {
      this.isArticleViewMode = false;
    },

    showSidebar() {
      this.isDisplay = true;
      this.displayArticles();

			// Emitter.emit(WEBGL_DISABLE_RAYCAST);
    },

    displayArticles() {

			const articles = this.$els.articlelist.getElementsByClassName('info-section_article-element');

      TweenMax.set(articles, {opacity: 0, x:0});
      TweenMax.fromTo(this.$els.title, 2.5, {opacity: 0, y: 50}, {opacity: 1, y: 0, ease: Expo.easeOut}, 0.4);

      setTimeout(()=> {
        TweenMax.staggerFromTo(articles, 1, {opacity: 0, x: 100}, {opacity: 1, x: 0, ease: Expo.easeOut}, 0.2);
      }, 300);

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
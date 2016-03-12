'use strict';

import Router from 'router';

import 'gsap';

import SplitText from '../../vendors/splitText.js';

import {
	WINDOW_RESIZE
} from '../../config/messages';

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

    this.launchEnterAnimation();

    this.createAnimationTimeline();

    this.mouseIsDown = false;
    this.mouseIsIn = false;
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
      // Emitter.on(WINDOW_RESIZE, this.onWindowResize);
      document.addEventListener('mouseup', this.onMouseUp, false);
      document.addEventListener('mousedown', this.onMouseDown, false);
      document.addEventListener('touchstart', this.onMouseDown, false);
      document.addEventListener('touchleave', this.onMouseUp, false);
    },

    removeEventListeners() {
      // Emitter.off(WINDOW_RESIZE, this.onWindowResize);
      document.removeEventListener('mouseup', this.onMouseUp, false);
      document.removeEventListener('mousedown', this.onMouseDown, false);
      document.removeEventListener('touchstart', this.onMouseDown, false);
      document.removeEventListener('touchleave', this.onMouseUp, false);
    },

    launchEnterAnimation() {
      this.enterTl = new TimelineMax();

      this.titleSplited = new SplitText(this.$els.title, {
        type: 'chars'
      });

      const speed = 2;
      const interSpeed = speed / this.titleSplited.chars.length;

      this.enterTl
        .staggerFrom(this.titleSplited.chars, speed, {opacity: 0, scale: 0.7, ease: Expo.easeOut}, interSpeed)
        .from(this.$els.backgroundcontainer, 5, {opacity: 0, scale: 0.5, ease: Expo.easeOut}, 1)
        .from(this.$els.fingerprint, 5, {opacity: 0, scale: 0, ease: Back.easeOut}, 1)
        .from(this.$els.holdindicationunder, 5, {y: 30, opacity: 0, ease: Expo.easeOut}, 1)
        .from(this.$els.holdindication, 5, {y: 30, opacity: 0, ease: Expo.easeOut}, 1);

    },

    createAnimationTimeline() {

      this.fingerprintTl = new TimelineMax({paused: true, onComplete: this.holdClickComplete});
      this.leaveTl = new TimelineMax({paused: true, onComplete: this.goToExperiencePage});

      this.fingerprintTl
        .fromTo(this.$els.fingerprint, 3, {scale: 1}, {scale: 1.2, ease: RoughEase.ease}, 0)
        .fromTo(this.$els.holdindication, 1, {opacity: 0}, {opacity: 1, ease: RoughEase.ease}, 0)
        .fromTo(this.$els.holdindication, 3, {width: 0 }, {width: 137, ease: Expo.easeOut}, 0)
        .to(this.$els.backgroundcontainer, 3, {scale: 1.2, ease: Expo.easeOut}, 0)
        .fromTo(this.$els.holdindication, 1, {opacity: 0}, {opacity: 1, ease: RoughEase.ease}, 1)

      this.fingerprintTlDuration = this.fingerprintTl.duration();

      this.leaveTl
        .to(this.$els.backgroundcontainer, 1, {opacity: 0, ease: Expo.easeOut}, 0)
        .to(this.$els.fingerprint, 1, {scale: 0, ease: Back.easeOut})
        .to(this.$els.holdindication, 1, {opacity: 0, y: 200, ease: Expo.easeOut}, 0)
        .to(this.$els.holdindicationunder, 1, {opacity: 0, y: 200, ease: Expo.easeOut}, 0)
        .to(this.$els.title, 2, {opacity: 0, y: -500, ease: Expo.easeOut}, 0);

    },

    holdClickComplete() {
      this.leaveTl.play();
    },

    goToExperiencePage() {
      Router.go({name: 'experience'});
    },

    onWindowResize(width, height) {
      console.log('Debounce : Window resize from application.', width, height);
    },

    onMouseDown() {
      this.mouseIsDown = true;

      if(this.mouseIsIn) {
        this.fingerprintTl.play();
      }
    },

    onMouseUp() {
      this.mouseIsDown = false;

      this.fingerprintTl.pause();
      this.fingerprintTl.reverse();
    },

    onFingerprintMouseMove() {
      this.mouseIsIn = true;
    },

    onFingerprintMouseLeave() {
      this.mouseIsIn = false;
      this.mouseIsDown = false;
    }

  },

  transitions: {},

  components: {
  }
});
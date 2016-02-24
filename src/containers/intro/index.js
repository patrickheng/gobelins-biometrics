'use strict';

import 'gsap';

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

      TweenMax.from(this.$els.title, 5, {opacity: 0, ease: Expo.easeOut});
      TweenMax.from(this.$els.fingerprint, 5, {opacity: 0, scale: 0, ease: Back.easeOut, delay: 0.2});
      TweenMax.from(this.$els.holdindicationunder, 5, {y: '100%', opacity: 0, ease: Expo.easeOut, delay: 0.2});

    },

    createAnimationTimeline() {

      this.fingerprintTl = new TimelineMax({paused: true, onComplete: this.holdClickComplete});

      this.fingerprintTl
        .fromTo(this.$els.fingerprint, 3, {scale: 1}, {scale: 1.2, ease: RoughEase.ease}, 0)
        .fromTo(this.$els.holdindication, 1, {opacity: 0}, {opacity: 1, ease: RoughEase.ease}, 0)
        .fromTo(this.$els.holdindication, 5, {width: 0 }, {width: 155, ease: Expo.easeOut}, 0)
        .fromTo(this.$els.holdindication, 2, {opacity: 0}, {opacity: 1, ease: RoughEase.ease}, 3);

      this.fingerprintTlDuration = this.fingerprintTl.duration();
      
    },

    holdClickComplete() {

    },

    onWindowResize(width, height) {
      console.log('Window resize from application.', width, height);
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
      console.log('mouseup');
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
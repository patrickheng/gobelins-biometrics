'use strict';

import {
	WINDOW_RESIZE
} from '../../config/messages';

import raf from 'raf';

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

    this.createGSAPTimeline();

    this.render();

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
      this.$on(WINDOW_RESIZE, this.onWindowResize);
      document.addEventListener('mouseup', this.onMouseUp, false);
      document.addEventListener('mouseDown', this.onMouseDown, false);
    },

    removeEventListeners() {
      this.$off(WINDOW_RESIZE, this.onWindowResize);
      document.removeEventListener('mouseup', this.onMouseUp, false);
      document.removeEventListener('mouseDown', this.onMouseDown, false);
    },

    createGSAPTimeline() {
      this.fingerprintTl = new TimelineMax({paused: true});
      this.fingerprintTl.fromTo(this.$els.holdindication, 2, {width: 0 }, {width: 155, ease: Expo.easeOut});
      this.fingerprintTlDuration = this.fingerprintTl.duration();
    },

    render() {
      if(this.mouseIsDown) {
        const time = this.fingerprintTl.time();

        if(time < this.fingerprintTlDuration) {
          this.fingerprintTl.seek(time + 0.01);
          this.raf = raf(this.render());
        }
      }
    },

    onWindowResize(width, height) {
      console.log('Window resize from application.', width, height);
    },

    onMouseDown() {
      this.mouseIsDown = true;
    },

    onMouseUp() {
      this.mouseIsDown = false;
    },

    onFingerprintMouseDown() {

    },

    onFingerprintMouseMove() {
      this.mouseIsIn = true;

      setTimeout(()=>{
        this.mouseIsIn = false;
      }, 1000)
    },

    onFingerprintMouseLeave() {
      this.mouseIsIn = false;
      this.mouseIsDown = false;
    }

  },

  transitions: {},

  components: {}
});
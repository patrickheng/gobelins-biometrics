'use strict';

import Emitter from 'utils/Emitter';

import Container from 'Container';

import {
  WEBGL_IS_INTERSECTING,
  WEBGL_IS_NOT_INTERSECTING
} from '../../config/messages';

export default Vue.extend({

  template: require('./template.html'),

  data() {

    return {
      name: ''
    };
  },

  created() {
    this.bind();
  },

  ready() {
    this.addEventListeners();

    this.generateGSAPTimeline();
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

      Emitter.on(WEBGL_IS_INTERSECTING, ::this.onIsIntersecting);
      Emitter.on(WEBGL_IS_NOT_INTERSECTING, ::this.onIsNotIntersecting);

    },

    removeEventListeners() {

      Emitter.off(WEBGL_IS_INTERSECTING, ::this.onIsIntersecting);
      Emitter.off(WEBGL_IS_NOT_INTERSECTING, ::this.onIsNotIntersecting);

    },

    generateGSAPTimeline() {
      this.enterTl = new TimelineMax({paused: true});
      this.leaveTl = new TimelineMax({paused: true});

      this.enterTl
        .fromTo(this.$els.container, 1, {width: '0%', opacity: 1}, {width: '100%', opacity: 1, ease: Expo.easeOut});


      this.leaveTl
        .fromTo(this.$els.container, 1, {opacity: 1}, {opacity: 0, ease: Expo.easeOut});
    },

    onIsIntersecting(intersectObject) {
      this.name = intersectObject.object.name;
      this.leaveTl.stop();
      this.enterTl.play(0);
      console.log('intersecting');
    },

    onIsNotIntersecting() {
      this.enterTl.stop();
      this.leaveTl.play(0);
    }

  }
});
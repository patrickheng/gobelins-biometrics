'use strict';

import Emitter from 'utils/Emitter';

import {
	WINDOW_RESIZE,
	SIDEBAR_TOGGLE,
  WEBGL_IS_INTERSECTING,
  WEBGL_IS_NOT_INTERSECTING,
  WEBGL_CLICK_ON_OBJECT
} from '../../config/messages';

import InfoSectionComponent from 'components/info-section';

import WebglExperienceComponent from 'components/webgl-experience';

import CurrentIntersectIndicatorComponent from 'components/current-intersect-indicator';

import 'gsap';

export default Vue.extend({

  template: require('./template.html'),

  data() {

    return {
      isIntersecting: false
    };
  },

  created() {
    this.bind();
  },

  ready() {

    this.currentObjectRef = null;

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
      Emitter.on(WEBGL_IS_INTERSECTING, this.onIsIntersecting);
      Emitter.on(WEBGL_IS_NOT_INTERSECTING, this.onIsNotIntersecting);
      this.$on(WINDOW_RESIZE, this.onWindowResize);
    },

    removeEventListeners() {
      Emitter.off(WEBGL_IS_INTERSECTING, this.offIsIntersecting);
      Emitter.off(WEBGL_IS_NOT_INTERSECTING, this.onIsNotIntersecting);
      this.$off(WINDOW_RESIZE, this.onWindowResize);
    },

    onWindowResize(width, height) {
      this.$broadcast(WINDOW_RESIZE, width, height);
    },

    onClick() {
      if(this.isIntersecting) {
        console.log('click on ', this.currentObjectRef);

        Emitter.emit(WEBGL_CLICK_ON_OBJECT, this.currentObjectRef);
				
        this.isIntersecting = false;
      }
    },

    onIsIntersecting(intersectObject) {
      this.currentObjectRef = intersectObject.object.ref;
      this.isIntersecting = true;
    },

    onIsNotIntersecting() {
      this.isIntersecting = false;
    },

    toggleSideBar() {
      this.$broadcast(SIDEBAR_TOGGLE);
    }

  },

  transitions: {
  },

  components: {
    InfoSectionComponent,
    WebglExperienceComponent,
    CurrentIntersectIndicatorComponent
  }
});
'use strict';

import Emitter from 'utils/Emitter';

import {
	WINDOW_RESIZE,
  WEBGL_MESH_LOADED,
  WEBGL_IS_INTERSECTING,
  WEBGL_IS_NOT_INTERSECTING,
  WEBGL_CLICK_ON_OBJECT
} from '../../config/messages';

import InfoSectionComponent from 'components/info-section';

import WebglExperienceComponent from 'components/webgl-experience';

import NavigationComponent from 'components/navigation';

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

    this.currentObject = null;

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
      Emitter.on(WEBGL_MESH_LOADED, this.isLoaded);
      this.$on(WINDOW_RESIZE, this.onWindowResize);
    },

    removeEventListeners() {
      Emitter.off(WEBGL_IS_INTERSECTING, this.offIsIntersecting);
      Emitter.off(WEBGL_IS_NOT_INTERSECTING, this.onIsNotIntersecting);
      Emitter.off(WEBGL_MESH_LOADED, this.isLoaded);
      this.$off(WINDOW_RESIZE, this.onWindowResize);
    },

    onWindowResize(width, height) {
      this.$broadcast(WINDOW_RESIZE, width, height);
    },

    onClick() {
      if(this.isIntersecting) {

        Emitter.emit(WEBGL_CLICK_ON_OBJECT, this.currentObject);

        this.isIntersecting = false;
      }
    },

    onIsIntersecting(intersectObject) {
      this.currentObject = intersectObject.object;
      this.currentObjectRef = intersectObject.object.ref;
      this.isIntersecting = true;
    },

    onIsNotIntersecting() {
      this.isIntersecting = false;
    },

		isLoaded() {

      const loader = document.querySelector('.experience_loading');

      TweenMax.to(loader, 1, { autoAlpha:0, ease: Expo.easeOut });

		}

  },

  transitions: {
  },

  components: {
    InfoSectionComponent,
    WebglExperienceComponent,
    CurrentIntersectIndicatorComponent,
    NavigationComponent
  }
});
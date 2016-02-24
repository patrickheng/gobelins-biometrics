'use strict';

import {
	WINDOW_RESIZE,
	SIDEBAR_TOGGLE
} from '../../config/messages';

import InfoSectionComponent from 'components/info-section';

import WebglExperienceComponent from 'components/webgl-experience';

import 'gsap';

export default Vue.extend({

  template: require('./template.html'),

  data() {

    return {
      _hidden: null
    };
  },

  created() {
    this.bind();
  },

  ready() {

    this.addEventListeners();

  },

  methods: {

    /*
     * Binding & Events
     */

    bind() {
    },

    addEventListeners() {
      this.$on(WINDOW_RESIZE, this.onWindowResize);
    },

    onWindowResize(width, height) {

    },

    toggleSideBar() {
      this.$broadcast(SIDEBAR_TOGGLE);
    }

  },

  transitions: {
  },

  components: {
    InfoSectionComponent,
    WebglExperienceComponent
  }
});
'use strict';

import Container from 'Container';

import Emitter from 'utils/Emitter';

import {
	WINDOW_RESIZE
} from '../../config/messages';

export default Vue.extend({

  template: require('./template.html'),

  data() {

    return {
      isDisplay: false
    };
  },

  created() {
    this.bind();
  },

  ready() {

    this.scene = Container.get('Scene');
    this.nodeGarden = Container.get('NodeGarden');
    this.scene.begin(this.$els.backgroundgl);

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

      Emitter.on(WINDOW_RESIZE, ::this.onWindowResize);

      document.addEventListener('mousemove', ::this.onMouseMove, false);
    },

    removeEventListeners() {

      Emitter.off(WINDOW_RESIZE, ::this.onWindowResize);

      document.removeEventListener('mousemove', ::this.onMouseMove, false);
    },

    onWindowResize(width, height) {
      this.$els.backgroundgl.style.width = width + 'px';
      this.$els.backgroundgl.style.height = height + 'px';
    },

    onMouseMove(ev) {
      const deltaX = (ev.pageX - window.innerWidth / 2) / (window.innerWidth / 2);
      const deltaY = (ev.pageY - window.innerHeight / 2) / (window.innerHeight / 2);

      this.nodeGarden.onMouseMove(deltaX, deltaY);
    },

    generateGSAPTimeline() {

    }

  }
});
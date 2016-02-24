'use strict';

import Container from 'Container';

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
    this.camera = Container.get('Camera');
    this.renderer = Container.get('Renderer');
    this.nodeGarden = Container.get('NodeGarden');
    this.scene.begin(this.$els.canvascontainer);

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

      this.$on(WINDOW_RESIZE, ::this.onWindowResize);

      document.addEventListener('mousemove', ::this.onMouseMove, false);
    },

    removeEventListeners() {

      this.$off(WINDOW_RESIZE, ::this.onWindowResize);

      document.removeEventListener('mousemove', ::this.onMouseMove, false);
    },

    onWindowResize(width, height) {
      console.log(width, height);
      this.$els.canvascontainer.style.width = width + 'px';
      this.$els.canvascontainer.style.height = height + 'px';

      this.camera.resize(width, height);
      this.renderer.resize(width, height);
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
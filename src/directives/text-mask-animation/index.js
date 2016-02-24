import SplitText from '../../vendors/splitText.js';

import 'gsap';

export default Vue.directive('text-mask-animation-directive', {

  deep: true,

  bind: function() {},

  update: function(data) {

    this.el.innerText = data.text;

    this.titleSplited = new SplitText(this.el, {
      type: 'chars'
    });

    let interSpeed = data.speed / this.titleSplited.chars.length;

    TweenMax.staggerFrom(this.titleSplited.chars, data.speed, {
      opacity: 0,
      scale: 0.7,
      delay: data.delay,
      ease: Expo.easeOut
    }, interSpeed);
  },

  unbind: function() {}
});
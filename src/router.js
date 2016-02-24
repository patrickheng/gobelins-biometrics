import VueRouter from 'vue-router';

import IntroComponent from 'containers/intro';

import MainComponent from 'containers/main';

import 'gsap';

Vue.use(VueRouter);

class Router extends VueRouter {

  constructor() {

    super({
      hashbang: false,
      pushState: true,
      history: true,
      abstract: false,
      saveScrollPosition: false,
      transitionOnLoad: false
    });

    this.firstRoot = true;

    this.transitionTimeout = null;

    this.appWrapper = document.querySelector('#wrapper');

    this.map({

      '/': {
        name: "intro",
        component: IntroComponent
      },

      '/experience': {
        name: "experience",
        component: MainComponent
      }
    });

    this.beforeEach( ({ to, from, abort, next }) => {

      TweenMax.killTweensOf(this.appWrapper, {
        opacity: true,
        scale: true
      });

      if (to.path === from.path && to.path !== '/') {

        console.warn('Router: Same route path : ', to, from);

        abort();

      } else {

        if(!this.firstRoot) {
          clearTimeout(this.transitionTimeout);

          TweenMax.fromTo(this.appWrapper, 0.3, {opacity: 1, scale: 1}, {opacity: 0, ease: Expo.easeOut, onComplete: () => {
            next();
          }});

        }
        else {

          this.firstRoot = false;
          next();

        }

      }
    });

    this.afterEach( ({ to, from }) => {

      clearTimeout(this.transitionTimeout);

      if(!this.firstRoot) {

        this.transitionTimeout = setTimeout(()=>{
          TweenMax.to(this.appWrapper, 1, {opacity: 1, ease: Expo.easeOut});
        }, 300);

      }
    });
  }
}

export default new Router;
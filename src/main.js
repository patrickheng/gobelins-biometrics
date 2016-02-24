import Application from './containers/application';

import Router from './router';

import domready from 'domready';

import 'stylesheets/main.scss';


class Main {

  constructor() {

    this.bind();

    this.addEventListeners();

    this.router = Router;

    this.start();

  }

  bind() {}

  addEventListeners() {}

  start() {

    this.router.start(Application, '#application');

  }
}

domready(() => {

  new Main();

});
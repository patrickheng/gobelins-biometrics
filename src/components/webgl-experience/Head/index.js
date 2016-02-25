import ObjLoader from '../Utils/ObjLoader';

import Container from 'Container';

import Emitter from 'utils/Emitter';

import HotSpot from '../HotSpot';

import raf from 'raf';

import {
	WEBGL_MESH_LOADED
} from 'config/messages';

/**
 * Head class
 */
class Head extends THREE.Object3D {

  /**
   * Constructor function
   * @return {void}
   */
  constructor() {
    super();

    this.mesh = null;

    this.manager = new THREE.LoadingManager();

    this.loader = new THREE.OBJLoader(this.manager);

    this.hotSpots = [];

    this.gui = Container.get('GUI');

    this.clock = Container.get('Clock');

    this.configuration = Container.get('Configuration');

    this.meshConfiguration = this.configuration.get('meshes.head');

    this.hotSpotsConfig = this.configuration.get('hotSpots.head');

    this.hotSpots = [];

    this.position.set( this.meshConfiguration.position.x, this.meshConfiguration.position.y, this.meshConfiguration.position.z );

    this.rotation.y = this.meshConfiguration.rotation.y;

    this.bind();

    this.loadMesh();

  }

  bind() {
    this.update = this.update.bind(this);
  }

  loadMesh() {

    this.loader.load( 'meshes/head.obj', (object) => {

      this.mesh = object;

      this.mesh.scale.set( this.meshConfiguration.scale.x, this.meshConfiguration.scale.y, this.meshConfiguration.scale.z );

      this.box = new THREE.Box3().setFromObject( this.mesh );

      this.box.center( this.mesh.position );

      this.add( this.mesh );

      this.initGUI();

      this.generateHotSpots();

      this.update();

      Emitter.emit(WEBGL_MESH_LOADED);

    }, this.onLoadProgress, this.onLoadError);
  }

  initGUI() {
    const folder = this.gui.addFolder( 'Head' );

    folder.add(this.position, 'x');
    folder.add(this.position, 'y');
    folder.add(this.position, 'z', -20, 2);
    folder.add(this.rotation, 'y').name('rotation y');

  }

  hotSpotDisplay() {
    for (let i = 0; i < this.hotSpots.length; i++) {
      setTimeout(()=> {
        this.hotSpots[i].hotSpotDisplay();
      }, 50)
    }
  }

  generateHotSpots() {
    for (let i = 0; i < this.hotSpotsConfig.length; i++) {
      const hotSpot = new HotSpot(this.hotSpotsConfig[i]);

      this.add(hotSpot);

      this.hotSpots.push(hotSpot);
    }
  }

  onLoadProgress() {

  }

  onLoadError() {
  }

  update() {
    const time = this.clock.time;

    for (let i = 0; i < this.hotSpots.length; i++) {
      this.hotSpots[i].update(time);
    }

    raf(this.update);
  }
}

export default Head;
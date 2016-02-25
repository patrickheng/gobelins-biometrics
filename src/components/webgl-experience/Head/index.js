import ObjLoader from '../Utils/ObjLoader';
import Container from 'Container';

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

    this.gui = Container.get('GUI');

    this.position.set( -93, 5, -1);

    this.rotation.y = 0.6;

    this.loadMesh();

  }

  loadMesh() {

    this.loader.load( 'meshes/head.obj', (object) => {

      this.mesh = object;

      this.mesh.scale.set( 3.6, 3.6, 3.6 );

      this.box = new THREE.Box3().setFromObject( this.mesh );

      this.box.center( this.mesh.position );

      this.add( this.mesh );

      this.initGUI();

    }, this.onLoadProgress, this.onLoadError);
  }

  initGUI() {
    const folder = this.gui.addFolder( 'Head' );

    folder.add(this.position, 'x');
    folder.add(this.position, 'y');
    folder.add(this.position, 'z');
    folder.add(this.rotation, 'y').name('rotation y');

  }

  onLoadProgress() {

  }

  onLoadError() {
  }
}

export default Head;
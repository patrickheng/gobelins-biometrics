import ObjLoader from '../Utils/ObjLoader';
import Container from 'Container';

/**
 * Hand class
 */
class Hand extends THREE.Object3D {

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

    this.position.set(100, -230, 0);
    this.rotation.y = 0.9;

    this.loadMesh();

  }

  loadMesh() {

    this.loader.load( 'meshes/hand.obj', (object) => {

      this.mesh = object;

      this.mesh.scale.set( 0.5, 0.5, 0.5 );

      this.box = new THREE.Box3().setFromObject( this.mesh );

      this.box.center( this.mesh.position );

      this.add( this.mesh );

      this.initGUI();

    }, this.onLoadProgress, this.onLoadError);
  }

  initGUI() {
    const folder = this.gui.addFolder( 'Hand' );

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

export default Hand;
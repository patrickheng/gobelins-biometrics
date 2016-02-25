import ObjLoader from '../Utils/ObjLoader';
import Container from 'Container';

/**
 * Head class
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

    this.loadMesh();
  }

  loadMesh() {

    this.loader.load( 'meshes/hand.obj', (object) => {

      this.mesh = object;

      this.mesh.scale.set( 0.5, 0.5, 0.5 );

      this.mesh.position.x = 230;
      this.mesh.position.y = -130;
      this.mesh.position.z = -130;

      this.rotation.y = Math.PI / 2;

      this.add(this.mesh);

      this.initGUI();

    }, this.onLoadProgress, this.onLoadError);
  }

  initGUI() {
    const folder = this.gui.addFolder( 'Hand' );

    folder.add(this.mesh.position, 'x');
    folder.add(this.mesh.position, 'y');
    folder.add(this.mesh.position, 'z');

  }

  onLoadProgress() {

  }

  onLoadError() {
  }
}

export default Hand;
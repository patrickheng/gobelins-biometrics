import ObjLoader from '../Utils/ObjLoader';

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

    this.loadMesh();
  }

  loadMesh() {

    this.loader.load( 'meshes/head.obj', (object) => {

      this.mesh = object;

      this.add(this.mesh);

    }, this.onLoadProgress, this.onLoadError);
  }

  onLoadProgress() {

  }

  onLoadError() {
  }
}

export default Head;
/**
 * Renderer class
 */
class Renderer extends THREE.WebGLRenderer {

  /**
   * Constructor function
   * @param  {object} options Options
   * @return {void}
   */
  constructor( options = { antialias: true, alpha: true } ) {
    super( options );

    this.setSize( window.innerWidth, window.innerHeight );
    this.setClearColor( 0x000000 );
    this.setPixelRatio( window.devicePixelRatio );
    this.clear();

    // Gamma 2.2 / Linear workflow
    this.gammaInput = true;
    this.gammaOutput = true;

    // document.addEventListener('resize', ::this.resize, false);
  }

  /**
   * Resize function
   * @param  {integer} width  Width
   * @param  {integer} height Height
   * @return {void}
   */
  resize(width, height) {

    this.setSize( width, height );
  }
}

export default Renderer;
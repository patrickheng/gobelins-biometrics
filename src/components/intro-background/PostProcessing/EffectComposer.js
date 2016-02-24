import { Composer } from '@superguigui/wagner';

/**
 * EffectComposer class
 */
class EffectComposer extends Composer {

  /**
   * Constructor function
   * @param  {object} renderer      Renderer
   * @param  {object} configuration Configuration
   * @return {void}
   */
  constructor( renderer, configuration ) {
    const effectComposer = configuration.get( 'effectComposer' );
    super( renderer, effectComposer );

    // Resize listener
    document.addEventListener( 'resize', ::this.resize, false );
  }

  /**
   * Resize function
   * @param  {integer} width  Width
   * @param  {integer} height Height
   * @return {void}
   */
  resize() {
    this.setSize( window.innerWidth, window.innerHeight );
  }
}

export default EffectComposer;
import { Composer } from '@superguigui/wagner';
import Emitter from 'utils/Emitter';

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
    const effectComposer = configuration.get( 'postProcessing.effectComposer' );
    super( renderer, effectComposer );


    // Resize listener
    Emitter.on( 'resize', this.resize );
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

export default EffectComposer;
import { toType } from 'utils/math';

/**
 * Provides
 */
class PostProcessing {

  /**
   * Constructor function
   *
   * @param  {EffectComposer} effectComposer EffectComposer instance
   * @param  {Scene}          scene          Scene instance
   * @param  {Camera}         camera         Camera instance
   * @param  {Renderer}       renderer       Renderer instance
   * @param  {GUI}            gui            GUI instance
   * @param  {Configuration}  configuration  Configuration instance
   */
  constructor( effectComposer, scene, camera, renderer, gui, configuration ) {

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.configuration = configuration.get( 'postProcessing' );
    this.passes = this.configuration.passes;
    this.usePostProcessing = this.configuration.active;
    this.composer = effectComposer;
    this.gui = gui;

    this.initGUI();
  }

  /**
   * InitGUI function
   * @private
   * @todo Make this function generic
   */
  initGUI() {

    const folder = this.gui.addFolder( 'Post processing' );

    folder.add( this.configuration, 'active' );

    this.passes.forEach(pass => {

      const passFolder = folder.addFolder( pass.name );
      const passParams = pass.constructor.params;

      passFolder.add( pass, 'active' );

      for ( let paramName in passParams ) {

        if( passParams.hasOwnProperty( paramName ) ) {

          const paramType = toType( passParams[ paramName ] );

          if (paramType === 'number' ||
              paramType === 'boolean' ||
              paramType === 'string') {

            passFolder.add( passParams, paramName );

          } else if (paramType === 'object') {

            const paramFolder = passFolder.addFolder( paramName );

            for( let subParamName in passParams[ paramName ] ) {

              if (passParams[ paramName ].hasOwnProperty( subParamName )) {

                const subParamType = toType(passParams[paramName][subParamName]);
                if (subParamType === 'number' ||
                    subParamType === 'boolean' ||
                    subParamType === 'string') {

                  paramFolder.add( passParams[ paramName ], subParamName );
                }
              }
            }
          }
        }
      }
    });
  }

  /**
   * Update function
   * @public
   */
  update() {

    if( this.configuration.active ) {

      this.composer.reset();
      this.composer.render( this.scene, this.camera );
      this.passes
        .filter( pass => pass.active )
        .forEach( pass => this.composer.pass( pass.constructor ) );
      this.composer.toScreen();

    } else {

      this.renderer.render( this.scene, this.camera );
    }
  }
}

export default PostProcessing;
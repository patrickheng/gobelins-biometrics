import { BlendMode } from '@superguigui/wagner';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';
import ZoomBlurPass from '@superguigui/wagner/src/passes/zoom-blur/ZoomBlurPass';
import MultiPassBloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import DOFPass from '@superguigui/wagner/src/passes/dof/DOFPass';
import BlendPass from '@superguigui/wagner/src/passes/blend/BlendPass';
import MotionBlurPass from '@superguigui/wagner/src/passes/motion-blur/motion-blur';
import GodRayPass from '@superguigui/wagner/src/passes/godray/godraypass';
import PixelatePass from '@superguigui/wagner/src/passes/pixelate/pixelate';
import RgbSplitPass from '@superguigui/wagner/src/passes/rgbsplit/rgbsplit';
import VignettePass from '@superguigui/wagner/src/passes/vignette/vignettePass';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';

export default {
  active: false,
  effectComposer: {
    useRGBA: true
  },
  passes: [
    {
      name: 'fxaaPass',
      active: false,
      constructor: new FXAAPass()
    },
    {
      name: 'ZoomBlurPass',
      active: false,
      constructor: new ZoomBlurPass()
    },
    {
      name: 'MotionBlurPass',
      active: false,
      constructor: new MotionBlurPass()
    },
    {
      name: 'noisePass',
      active: false,
      constructor: new NoisePass()
    },
    {
      name: 'VignettePass',
      active: false,
      constructor: new VignettePass()
    },
    {
      name: 'RgbSplitPass',
      active: false,
      constructor: new RgbSplitPass()
    },
    {
      name: 'GodRayPass',
      active: false,
      constructor: new GodRayPass()
    },
    {
      name: 'PixelatePass',
      active: false,
      constructor: new PixelatePass()
    },
    {
      name: 'BlendPass',
      active: false,
      constructor: new BlendPass()
    },

    {
      name: 'multiPassBloomPass',
      active: false,
      constructor: new MultiPassBloomPass({
        blurAmount: .5,
        applyZoomBlur: true,
        zoomBlurStrength: 0.7,
        blendMode: BlendMode.Screen
      })
    },
    {
      name: 'dofPass',
      active: false,
      constructor: new DOFPass({
        focalDistance: .01,
        aperture: .005,
        tBias: null,
        blurAmount: 1
      })
    }
  ]
};
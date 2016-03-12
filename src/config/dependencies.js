import Configuration from '../utils/Configuration';
import Scene from '../components/webgl-experience/Core/Scene';
import Camera from '../components/webgl-experience/Core/Camera';
import NodeGarden from '../components/webgl-experience/NodeGarden';
import Head from '../components/webgl-experience/Head';
import Hand from '../components/webgl-experience/Hand';
import Renderer from '../components/webgl-experience/Core/Renderer';
import PostProcessing from '../components/webgl-experience/PostProcessing/PostProcessing';
import EffectComposer from '../components/webgl-experience/PostProcessing/EffectComposer';
import Clock from '../components/webgl-experience/Utils/Clock';
// import GUI from '../components/webgl-experience/Utils/GUI';

export default [
  // --- Core
  {
    type: 'service',
    name: 'Configuration',
    constructor: Configuration
  },

  // --- ThreeJs Core
  {
    type: 'service',
    name: 'Scene',
    constructor: Scene
  },
  {
    type: 'service',
    name: 'Camera',
    constructor: Camera,
    dependencies: [ 'Configuration' ]
  },
  {
    type: 'service',
    name: 'Renderer',
    constructor: Renderer
  },
  {
    type: 'service',
    name: 'EffectComposer',
    constructor: EffectComposer,
    dependencies: [ 'Renderer', 'Configuration' ]
  },
  // {
  //   type: 'service',
  //   name: 'GUI',
  //   constructor: GUI
  // },
  {
    type: 'service',
    name: 'PostProcessing',
    constructor: PostProcessing,
    dependencies: [ 'EffectComposer', 'Scene', 'Camera', 'Renderer', 'GUI', 'Configuration' ]
  },
  {
    type: 'service',
    name: 'Clock',
    constructor: Clock
  },
  {
    type: 'service',
    name: 'NodeGarden',
    constructor: NodeGarden
  },
  {
    type: 'service',
    name: 'Head',
    constructor: Head
  },
  {
    type: 'service',
    name: 'Hand',
    constructor: Hand
  }
];
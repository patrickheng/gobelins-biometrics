import Configuration from '../utils/Configuration';
import Scene from '../components/intro-background/Core/Scene';
import Camera from '../components/intro-background/Core/Camera';
import NodeGarden from '../components/intro-background/NodeGarden';
import Renderer from '../components/intro-background/Core/Renderer';
import PostProcessing from '../components/intro-background/PostProcessing/PostProcessing';
import EffectComposer from '../components/intro-background/PostProcessing/EffectComposer';
import Clock from '../components/intro-background/Utils/Clock';
import GUI from '../components/intro-background/Utils/GUI';

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
  {
    type: 'service',
    name: 'GUI',
    constructor: GUI
  },
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
  }
];
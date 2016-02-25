import Container from 'Container';

/**
 * Ball class
 */
class NodeGarden extends THREE.Object3D {

  /**
   * Constructor function
   * @return {void}
   */
  constructor() {
    super();

    this.showDots = true;
    this.showLines = true;
    this.minDistance = 50;
    this.limitConnections = false;
    this.maxConnections = 50;
    this.maxParticleCount = 50;
    this.particleCount = 20;
    this.radius = 400;
    this.radiusHalf = this.radius / 2;

    this.segments = this.maxParticleCount * this.maxParticleCount;

    this.positions = new Float32Array(this.segments * 3);
    this.colors = new Float32Array(this.segments * 3);

    this.pMaterial = new THREE.PointsMaterial({
      color: 0xc2fffd,
      size: 3,
      // blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: false
    });

    this.particles = new THREE.BufferGeometry();
    this.particlePositions = new Float32Array(this.maxParticleCount * 3);
    this.particlesData = [];
    this.group = new THREE.Group();

    this.isReady = false;

    for (let i = 0; i < this.maxParticleCount; i++) {

      const x = Math.random() * this.radius - this.radius / 2;
      const y = Math.random() * this.radius - this.radius / 2;
      const z = Math.random() * this.radius - this.radius / 2;

      this.particlePositions[i * 3] = x;
      this.particlePositions[i * 3 + 1] = y;
      this.particlePositions[i * 3 + 2] = z;

      // add it to the geometry
      this.particlesData.push({
        velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
        numConnections: 0
      });

      this.particles.setDrawRange(0, this.particleCount);
      this.particles.addAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3).setDynamic(true));

      // create the particle system
      this.pointCloud = new THREE.Points(this.particles, this.pMaterial);
      this.group.add(this.pointCloud);

      this.geometry = new THREE.BufferGeometry();

      this.geometry.addAttribute('position', new THREE.BufferAttribute(this.positions, 3).setDynamic(true));
      this.geometry.addAttribute('color', new THREE.BufferAttribute(this.colors, 3).setDynamic(true));

      this.geometry.computeBoundingSphere();

      this.geometry.setDrawRange(0, 0);

      this.material = new THREE.LineBasicMaterial({
        color: 0xc2fffd,
        vertexColors: 0xc2fffd,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      this.linesMesh = new THREE.LineSegments(this.geometry, this.material);
      this.group.add(this.linesMesh);

      if(this.particlesData.length === this.maxParticleCount) {
        this.isReady = true;
      }

      this.rotation.offset = {
        x: 0,
        y: 0
      };

      this.add(this.group);
    }
  }

  onMouseMove(dx, dy) {
    this.rotation.offset.x = dx / 70;
    this.rotation.offset.y = dy / 70;
  }

  update() {
    if(!this.isReady) {
      return;
    }

    this.time = Container.get('Clock').time;

    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    for (let i = 0; i < this.particleCount; i++) {
      this.particlesData[i].numConnections = 0;
    }

    for (let i = 0; i < this.particleCount; i++) {

      // get the particle
      let particleData = this.particlesData[i];

      this.particlePositions[i * 3] += particleData.velocity.x;
      this.particlePositions[i * 3 + 1] += particleData.velocity.y;
      this.particlePositions[i * 3 + 2] += particleData.velocity.z;

      if (this.particlePositions[i * 3 + 1] < -this.radiusHalf || this.particlePositions[i * 3 + 1] > this.radiusHalf)
        particleData.velocity.y = -particleData.velocity.y;

      if (this.particlePositions[i * 3] < -this.radiusHalf || this.particlePositions[i * 3] > this.radiusHalf)
        particleData.velocity.x = -particleData.velocity.x;

      if (this.particlePositions[i * 3 + 2] < -this.radiusHalf || this.particlePositions[i * 3 + 2] > this.radiusHalf)
        particleData.velocity.z = -particleData.velocity.z;

      if (this.limitConnections && particleData.numConnections >= this.maxConnections)
        continue;

      // Check collision
      for (let j = i + 1; j < this.particleCount; j++) {

        let particleDataB = this.particlesData[j];
        if (this.limitConnections && particleDataB.numConnections >= this.maxConnections)
          continue;

        let dx = this.particlePositions[i * 3] - this.particlePositions[j * 3];
        let dy = this.particlePositions[i * 3 + 1] - this.particlePositions[j * 3 + 1];
        let dz = this.particlePositions[i * 3 + 2] - this.particlePositions[j * 3 + 2];
        let dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < this.minDistance) {

          particleData.numConnections++;
          particleDataB.numConnections++;

          let alpha = 1.0 - dist / this.minDistance;

          this.positions[vertexpos++] = this.particlePositions[i * 3];
          this.positions[vertexpos++] = this.particlePositions[i * 3 + 1];
          this.positions[vertexpos++] = this.particlePositions[i * 3 + 2];

          this.positions[vertexpos++] = this.particlePositions[j * 3];
          this.positions[vertexpos++] = this.particlePositions[j * 3 + 1];
          this.positions[vertexpos++] = this.particlePositions[j * 3 + 2];

          this.colors[colorpos++] = alpha;
          this.colors[colorpos++] = alpha;
          this.colors[colorpos++] = alpha;

          this.colors[colorpos++] = alpha;
          this.colors[colorpos++] = alpha;
          this.colors[colorpos++] = alpha;

          numConnected++;
        }
      }
    }


    this.linesMesh.geometry.setDrawRange(0, numConnected * 2);
    this.linesMesh.geometry.attributes.position.needsUpdate = true;
    this.linesMesh.geometry.attributes.color.needsUpdate = true;

    this.pointCloud.geometry.attributes.position.needsUpdate = true;

    this.group.rotation.y += -this.rotation.offset.x;

    this.group.rotation.x += -this.rotation.offset.y;

  }
}

export default NodeGarden;
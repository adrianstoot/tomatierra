// 3D Interactive Laboratory for Puesta a Tierra (PAT)
// Implemented with Three.js WebGL & OrbitControls

class GroundingViewer3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    if (typeof THREE === 'undefined') {
      this.container.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center space-y-3">
          <div class="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-xl">3D</div>
          <p class="text-sm">El visor 3D requiere conexión a internet para cargar Three.js.</p>
        </div>`;
      return;
    }

    this.currentModelType = 'arqueta'; // 'arqueta', 'cimentacion', 'soldadura'
    this.isWireframe = false;
    this.isAutoRotating = false;
    this.explodeFactor = 0;
    this.modelGroup = null;
    this.animatedObjects = [];
    this.particleSystem = null;

    this.init();
    this.setupEvents();
    this.loadModel(this.currentModelType);
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x070a13);
    this.scene.fog = new THREE.FogExp2(0x070a13, 0.025);

    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 500;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(12, 10, 16);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.maxPolarAngle = Math.PI / 2 + 0.05;
      this.controls.minDistance = 2;
      this.controls.maxDistance = 50;
    }

    // Grid Floor
    const gridHelper = new THREE.GridHelper(26, 26, 0xf59e0b, 0x1e293b);
    gridHelper.position.y = -0.01;
    this.scene.add(gridHelper);

    // Floor Shadow Plane
    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x070b14, roughness: 0.95, metalness: 0.1 });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.02;
    floorMesh.receiveShadow = true;
    this.scene.add(floorMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffbeb, 1.2);
    dirLight.position.set(15, 22, 12);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.001;
    this.scene.add(dirLight);

    const fillLight = new THREE.PointLight(0x38bdf8, 0.5, 30);
    fillLight.position.set(-10, 8, -10);
    this.scene.add(fillLight);

    const warmLight = new THREE.PointLight(0xf59e0b, 0.8, 25);
    warmLight.position.set(0, 4, 0);
    this.scene.add(warmLight);

    window.addEventListener('resize', () => this.onWindowResize());
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  clearScene() {
    if (this.modelGroup) {
      this.scene.remove(this.modelGroup);
      this.modelGroup.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
          else child.material.dispose();
        }
      });
      this.modelGroup = null;
    }
    if (this.particleSystem) {
      this.scene.remove(this.particleSystem);
      this.particleSystem.geometry.dispose();
      this.particleSystem.material.dispose();
      this.particleSystem = null;
    }
    this.animatedObjects = [];
  }

  loadModel(modelType) {
    this.currentModelType = modelType;
    this.clearScene();
    this.modelGroup = new THREE.Group();

    // Standard materials
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xe07a38,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: this.isWireframe
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.8,
      roughness: 0.35,
      wireframe: this.isWireframe
    });

    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.7,
      roughness: 0.4,
      wireframe: this.isWireframe
    });

    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.9,
      metalness: 0.05,
      wireframe: this.isWireframe
    });

    const soilMat = new THREE.MeshStandardMaterial({
      color: 0x452b1b,
      roughness: 0.98,
      metalness: 0.02,
      wireframe: this.isWireframe
    });

    const insulatorMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      roughness: 0.3,
      metalness: 0.1,
      wireframe: this.isWireframe
    });

    const graphiteMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.7,
      metalness: 0.4,
      wireframe: this.isWireframe
    });

    if (modelType === 'arqueta') {
      this.camera.position.set(8, 7, 10);
      if (this.controls) this.controls.target.set(0, 1.5, 0);

      // 1. Excavation Soil Block with hole
      const soilBox = new THREE.Mesh(new THREE.BoxGeometry(9, 3, 9), soilMat);
      soilBox.position.set(0, 0, 0);
      soilBox.receiveShadow = true;
      this.modelGroup.add(soilBox);

      // Permeable Soil at base of chamber
      const chamberPit = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.2, 16), new THREE.MeshStandardMaterial({ color: 0x331e11, roughness: 1 }));
      chamberPit.position.set(0, 0.01, 0);
      this.modelGroup.add(chamberPit);

      // 2. Concrete Inspection Chamber (Prefabricated Box)
      const chamberGroup = new THREE.Group();
      const wallMat = concreteMat;

      // 4 walls
      const wallNorth = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3.2, 0.3), wallMat);
      wallNorth.position.set(0, 1.6, 1.65);
      wallNorth.castShadow = true;
      wallNorth.receiveShadow = true;
      chamberGroup.add(wallNorth);

      const wallSouth = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3.2, 0.3), wallMat);
      wallSouth.position.set(0, 1.6, -1.65);
      wallSouth.castShadow = true;
      wallSouth.receiveShadow = true;
      chamberGroup.add(wallSouth);

      const wallEast = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.2, 3.0), wallMat);
      wallEast.position.set(1.65, 1.6, 0);
      wallEast.castShadow = true;
      wallEast.receiveShadow = true;
      chamberGroup.add(wallEast);

      // West wall with cut/opening for visibility
      const wallWest = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.8, 3.0), wallMat);
      wallWest.position.set(-1.65, 0.9, 0);
      wallWest.castShadow = true;
      chamberGroup.add(wallWest);

      this.modelGroup.add(chamberGroup);
      this.chamberMesh = chamberGroup;

      // 3. Concrete Cover (Tapa Registrable con Desplazamiento)
      const cover = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.25, 3.8), concreteMat);
      cover.position.set(0, 3.35, 0);
      cover.castShadow = true;
      this.coverMesh = cover;
      this.modelGroup.add(cover);

      // 4. Copper-bonded Steel Rod (Pica de Acero Cobreado)
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 4.5, 16), copperMat);
      rod.position.set(0.3, 0.8, -0.2);
      rod.castShadow = true;
      this.modelGroup.add(rod);

      // Cone tip for rod
      const rodTip = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.35, 16), copperMat);
      rodTip.rotation.x = Math.PI;
      rodTip.position.set(0.3, -1.6, -0.2);
      this.modelGroup.add(rodTip);

      // 5. Test Disconnecting Bridge (Puente de Comprobación y Seccionamiento)
      const bridgeGroup = new THREE.Group();
      bridgeGroup.position.set(0, 2.3, 1.35);

      // Insulating supports (Aisladores de resina)
      const ins1 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.22, 12), insulatorMat);
      ins1.rotation.x = Math.PI / 2;
      ins1.position.set(-0.7, 0, 0.05);
      bridgeGroup.add(ins1);

      const ins2 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.22, 12), insulatorMat);
      ins2.rotation.x = Math.PI / 2;
      ins2.position.set(0.7, 0, 0.05);
      bridgeGroup.add(ins2);

      // Copper Busbar (Pletina de Cobre Seccionable)
      const busbar = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.25, 0.06), copperMat);
      busbar.position.set(0, 0, 0.18);
      busbar.castShadow = true;
      bridgeGroup.add(busbar);

      // Disconnecting link (Pletina puente central con tornillos de latón)
      const bridgeLink = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.22, 0.08), brassMat);
      bridgeLink.position.set(0, 0, 0.22);
      bridgeGroup.add(bridgeLink);
      this.bridgeLinkMesh = bridgeLink;

      // Hexagonal Brass Bolts (Tornillos de apriete)
      [-0.6, -0.2, 0.2, 0.6].forEach(x => {
        const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.12, 6), brassMat);
        bolt.rotation.x = Math.PI / 2;
        bolt.position.set(x, 0, 0.28);
        bridgeGroup.add(bolt);
      });

      this.modelGroup.add(bridgeGroup);
      this.bridgeMesh = bridgeGroup;

      // 6. Grounding Conductor Cable (Cable de Cobre Desnudo 35 mm²)
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.3, 2.3, -0.2),
        new THREE.Vector3(0.3, 2.4, 0.6),
        new THREE.Vector3(-0.2, 2.3, 1.2),
        new THREE.Vector3(-0.2, 2.3, 1.45)
      ]);
      const cableGeo = new THREE.TubeGeometry(curve, 32, 0.05, 8, false);
      const cableMesh = new THREE.Mesh(cableGeo, copperMat);
      cableMesh.castShadow = true;
      this.modelGroup.add(cableMesh);

      // Upward LPT conduit entry
      const conduit = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.5, 12), new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 }));
      conduit.position.set(0.6, 2.8, 1.45);
      this.modelGroup.add(conduit);

      // 7. Mechanical Clamp on Rod (Grapa Bimetálica de Apriete)
      const clamp = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.25, 0.35), brassMat);
      clamp.position.set(0.3, 2.2, -0.2);
      clamp.castShadow = true;
      this.modelGroup.add(clamp);

    } else if (modelType === 'cimentacion') {
      this.camera.position.set(16, 14, 20);
      if (this.controls) this.controls.target.set(0, 1.0, 0);

      const foundationGroup = new THREE.Group();

      // Footing & Tie-Beam Parameters
      const span = 6.0;
      const footingSize = 2.4;
      const footingH = 1.0;
      const beamW = 0.6;
      const beamH = 0.8;

      const semiConcreteMat = new THREE.MeshStandardMaterial({
        color: 0x64748b,
        roughness: 0.8,
        metalness: 0.1,
        transparent: true,
        opacity: 0.55,
        wireframe: this.isWireframe
      });

      // 4 Footings (Zapatas de hormigón)
      const positions = [
        [-span/2, -span/2],
        [span/2, -span/2],
        [span/2, span/2],
        [-span/2, span/2]
      ];

      positions.forEach(([x, z]) => {
        // Footing concrete
        const footing = new THREE.Mesh(new THREE.BoxGeometry(footingSize, footingH, footingSize), semiConcreteMat);
        footing.position.set(x, footingH / 2, z);
        footing.receiveShadow = true;
        foundationGroup.add(footing);

        // Column starter stub (Pilar)
        const stub = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.5, 0.7), semiConcreteMat);
        stub.position.set(x, footingH + 0.75, z);
        foundationGroup.add(stub);

        // Rebar cage inside footing (Armadura de acero corrugado)
        for (let i = -0.8; i <= 0.8; i += 0.4) {
          const rebarX = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.8, 8), steelMat);
          rebarX.rotation.z = Math.PI / 2;
          rebarX.position.set(x, 0.2, z + i);
          foundationGroup.add(rebarX);

          const rebarZ = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.8, 8), steelMat);
          rebarZ.rotation.x = Math.PI / 2;
          rebarZ.position.set(x + i, 0.2, z);
          foundationGroup.add(rebarZ);
        }

        // Column longitudinal rebars (Esperas del pilar)
        [-0.2, 0.2].forEach(cx => {
          [-0.2, 0.2].forEach(cz => {
            const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 2.2, 8), steelMat);
            bar.position.set(x + cx, 1.1, z + cz);
            foundationGroup.add(bar);
          });
        });

        // Corner Grounding Rod (Pica vertical de 2 m)
        const rodX = x + (x > 0 ? 0.9 : -0.9);
        const rodZ = z + (z > 0 ? 0.9 : -0.9);
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.5, 12), copperMat);
        rod.position.set(rodX, -0.6, rodZ);
        rod.castShadow = true;
        foundationGroup.add(rod);

        // Inspection Chamber at corners
        const cornerPit = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.8, 0.9), concreteMat);
        cornerPit.position.set(rodX, 0.4, rodZ);
        foundationGroup.add(cornerPit);

        // Equipotential bond weld to column rebar
        const weldPoint = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), copperMat);
        weldPoint.position.set(x + 0.2, 0.4, z + 0.2);
        foundationGroup.add(weldPoint);
      });

      // 4 Tie-Beams (Vigas Riostras de atado)
      const beamN = new THREE.Mesh(new THREE.BoxGeometry(span - footingSize, beamH, beamW), semiConcreteMat);
      beamN.position.set(0, beamH / 2, -span/2);
      foundationGroup.add(beamN);

      const beamS = new THREE.Mesh(new THREE.BoxGeometry(span - footingSize, beamH, beamW), semiConcreteMat);
      beamS.position.set(0, beamH / 2, span/2);
      foundationGroup.add(beamS);

      const beamE = new THREE.Mesh(new THREE.BoxGeometry(beamW, beamH, span - footingSize), semiConcreteMat);
      beamE.position.set(span/2, beamH / 2, 0);
      foundationGroup.add(beamE);

      const beamW2 = new THREE.Mesh(new THREE.BoxGeometry(beamW, beamH, span - footingSize), semiConcreteMat);
      beamW2.position.set(-span/2, beamH / 2, 0);
      foundationGroup.add(beamW2);

      // Bare Copper Grounding Loop in perimeter trench (Anillo Cu 35 mm²)
      const ringOffset = span / 2 + 0.9;
      const ringPoints = [
        new THREE.Vector3(-ringOffset, 0.1, -ringOffset),
        new THREE.Vector3(ringOffset, 0.1, -ringOffset),
        new THREE.Vector3(ringOffset, 0.1, ringOffset),
        new THREE.Vector3(-ringOffset, 0.1, ringOffset),
        new THREE.Vector3(-ringOffset, 0.1, -ringOffset)
      ];
      const ringCurve = new THREE.CatmullRomCurve3(ringPoints);
      const ringGeo = new THREE.TubeGeometry(ringCurve, 64, 0.05, 8, true);
      const ringMesh = new THREE.Mesh(ringGeo, copperMat);
      ringMesh.castShadow = true;
      foundationGroup.add(ringMesh);

      this.modelGroup.add(foundationGroup);
      this.foundationMesh = foundationGroup;

    } else if (modelType === 'soldadura') {
      this.camera.position.set(7, 5, 8);
      if (this.controls) this.controls.target.set(0, 1.2, 0);

      const weldGroup = new THREE.Group();

      // 1. Graphite Mold - Left Half
      const moldLeft = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.6, 1.2), graphiteMat);
      moldLeft.position.set(-0.85, 1.3, 0);
      moldLeft.castShadow = true;
      weldGroup.add(moldLeft);
      this.moldLeftMesh = moldLeft;

      // Graphite Mold - Right Half
      const moldRight = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.6, 1.2), graphiteMat);
      moldRight.position.set(0.85, 1.3, 0);
      moldRight.castShadow = true;
      weldGroup.add(moldRight);
      this.moldRightMesh = moldRight;

      // 2. Crucible Cavity (Crisol superior cónico)
      const crucibleCut = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.1, 16, 1, true), new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 }));
      crucibleCut.position.set(0, 2.0, 0);
      weldGroup.add(crucibleCut);

      // Steel Disc filter in crucible
      const steelDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.04, 16), steelMat);
      steelDisc.position.set(0, 1.45, 0);
      weldGroup.add(steelDisc);

      // 3. Welding Chamber (Cámara central de soldadura en T)
      const weldCore = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 16), copperMat);
      weldCore.position.set(0, 0.8, 0);
      weldGroup.add(weldCore);
      this.weldCoreMesh = weldCore;

      // 4. Horizontal Through-Cable (Cable pasante de cobre 50 mm²)
      const cableHoriz = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 4.5, 16), copperMat);
      cableHoriz.rotation.z = Math.PI / 2;
      cableHoriz.position.set(0, 0.8, 0);
      cableHoriz.castShadow = true;
      weldGroup.add(cableHoriz);

      // 5. Vertical Tap Cable / Rod (Cable vertical de derivación)
      const cableVert = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.2, 16), copperMat);
      cableVert.position.set(0, -0.3, 0);
      cableVert.castShadow = true;
      weldGroup.add(cableVert);

      // 6. Handle Plier Clamp (Tenaza de cierre con mango)
      const handleArmL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.3, 2.2), steelMat);
      handleArmL.position.set(-1.7, 1.3, -0.9);
      handleArmL.rotation.y = -0.3;
      weldGroup.add(handleArmL);

      const handleArmR = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.3, 2.2), steelMat);
      handleArmR.position.set(1.7, 1.3, -0.9);
      handleArmR.rotation.y = 0.3;
      weldGroup.add(handleArmR);

      // Ergonomic grips
      const gripL = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.0, 12), new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.5 }));
      gripL.rotation.x = Math.PI / 2;
      gripL.position.set(-2.0, 1.3, -2.0);
      weldGroup.add(gripL);

      const gripR = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.0, 12), new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.5 }));
      gripR.rotation.x = Math.PI / 2;
      gripR.position.set(2.0, 1.3, -2.0);
      weldGroup.add(gripR);

      // 7. Interactive Exothermic Spark & Flare Particles
      const particleCount = 120;
      const particleGeo = new THREE.BufferGeometry();
      const positionsArr = new Float32Array(particleCount * 3);
      const velocities = [];

      for (let i = 0; i < particleCount; i++) {
        positionsArr[i * 3] = (Math.random() - 0.5) * 0.4;
        positionsArr[i * 3 + 1] = 0.8 + Math.random() * 1.2;
        positionsArr[i * 3 + 2] = (Math.random() - 0.5) * 0.4;

        velocities.push({
          x: (Math.random() - 0.5) * 0.08,
          y: Math.random() * 0.12 + 0.03,
          z: (Math.random() - 0.5) * 0.08
        });
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(positionsArr, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0xfbbf24,
        size: 0.15,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });

      this.particleSystem = new THREE.Points(particleGeo, particleMat);
      this.particleVelocities = velocities;
      this.scene.add(this.particleSystem);

      this.modelGroup.add(weldGroup);
      this.weldMesh = weldGroup;
    }

    this.scene.add(this.modelGroup);
    this.updateExplode(this.explodeFactor);
  }

  setWireframe(enabled) {
    this.isWireframe = enabled;
    if (this.modelGroup) {
      this.modelGroup.traverse(child => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.wireframe = enabled);
          } else {
            child.material.wireframe = enabled;
          }
        }
      });
    }
  }

  setAutoRotate(enabled) {
    this.isAutoRotating = enabled;
  }

  updateExplode(factor) {
    this.explodeFactor = factor;
    if (!this.modelGroup) return;

    if (this.currentModelType === 'arqueta') {
      if (this.coverMesh) {
        this.coverMesh.position.y = 3.35 + factor * 2.5;
        this.coverMesh.position.z = factor * 1.5;
      }
      if (this.bridgeLinkMesh) {
        this.bridgeLinkMesh.position.z = 0.22 + factor * 1.2;
      }
    } else if (this.currentModelType === 'soldadura') {
      if (this.moldLeftMesh) {
        this.moldLeftMesh.position.x = -0.85 - factor * 2.2;
      }
      if (this.moldRightMesh) {
        this.moldRightMesh.position.x = 0.85 + factor * 2.2;
      }
    } else if (this.currentModelType === 'cimentacion') {
      if (this.foundationMesh) {
        this.foundationMesh.children.forEach(child => {
          if (child.geometry && child.geometry.type === 'TubeGeometry') {
            child.position.y = factor * 2.0;
          }
        });
      }
    }
  }

  resetCamera() {
    if (this.controls) {
      this.controls.reset();
      if (this.currentModelType === 'arqueta') {
        this.camera.position.set(8, 7, 10);
        this.controls.target.set(0, 1.5, 0);
      } else if (this.currentModelType === 'cimentacion') {
        this.camera.position.set(16, 14, 20);
        this.controls.target.set(0, 1.0, 0);
      } else if (this.currentModelType === 'soldadura') {
        this.camera.position.set(7, 5, 8);
        this.controls.target.set(0, 1.2, 0);
      }
    }
  }

  setupEvents() {
    // Model Selectors
    document.querySelectorAll('.model-3d-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = btn.getAttribute('data-model');
        document.querySelectorAll('.model-3d-btn').forEach(b => b.classList.remove('active-nav-tab'));
        btn.classList.add('active-nav-tab');
        this.loadModel(type);
      });
    });

    // Wireframe Toggle
    const wireframeBtn = document.getElementById('wireframe3dBtn');
    if (wireframeBtn) {
      wireframeBtn.addEventListener('click', () => {
        const newState = !this.isWireframe;
        this.setWireframe(newState);
        wireframeBtn.classList.toggle('bg-amber-500/20', newState);
        wireframeBtn.classList.toggle('text-amber-400', newState);
      });
    }

    // Auto-Rotate Toggle
    const autoRotateBtn = document.getElementById('autoRotate3dBtn');
    if (autoRotateBtn) {
      autoRotateBtn.addEventListener('click', () => {
        const newState = !this.isAutoRotating;
        this.setAutoRotate(newState);
        autoRotateBtn.classList.toggle('bg-amber-500/20', newState);
        autoRotateBtn.classList.toggle('text-amber-400', newState);
      });
    }

    // Reset Camera
    const resetCamBtn = document.getElementById('resetCamera3dBtn');
    if (resetCamBtn) {
      resetCamBtn.addEventListener('click', () => this.resetCamera());
    }

    // Explode Slider
    const explodeSlider = document.getElementById('explode3dSlider');
    if (explodeSlider) {
      explodeSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) / 100;
        this.updateExplode(val);
      });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.controls) {
      this.controls.update();
    }

    if (this.isAutoRotating && this.modelGroup) {
      this.modelGroup.rotation.y += 0.005;
    }

    // Animate sparks in welding model
    if (this.particleSystem && this.currentModelType === 'soldadura') {
      const positions = this.particleSystem.geometry.attributes.position.array;
      const count = positions.length / 3;

      for (let i = 0; i < count; i++) {
        const vel = this.particleVelocities[i];
        positions[i * 3] += vel.x;
        positions[i * 3 + 1] += vel.y;
        positions[i * 3 + 2] += vel.z;

        // Reset spark when it floats away
        if (positions[i * 3 + 1] > 2.8) {
          positions[i * 3] = (Math.random() - 0.5) * 0.3;
          positions[i * 3 + 1] = 0.8;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
        }
      }
      this.particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

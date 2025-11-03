// Three.js 3D Background for Hero Section
// Creates floating cubes/particles that respond to mouse movement

class ThreeBackground {
  constructor(containerId) {
    this.containerId = containerId;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.cubes = [];
    this.mouse = { x: 0, y: 0 };
    this.isInitialized = false;

    this.init();
    this.animate();
    this.addEventListeners();
  }

  init() {
    try {
      // Scene setup
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x000000); // Black background for overlay

      // Get container first to set correct size
      const container = document.getElementById(this.containerId);
      if (!container) {
        console.warn('Container not found:', this.containerId);
        this.fallback();
        return;
      }

      const rect = container.getBoundingClientRect();

      // Camera setup
      this.camera = new THREE.PerspectiveCamera(
        75,
        rect.width / rect.height,
        0.1,
        1000
      );
      this.camera.position.z = 5;

      // Renderer setup
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(rect.width, rect.height);
      this.renderer.setPixelRatio(window.devicePixelRatio);

      // Add to container
      container.appendChild(this.renderer.domElement);
      this.renderer.domElement.style.position = 'absolute';
      this.renderer.domElement.style.top = '0';
      this.renderer.domElement.style.left = '0';
      this.renderer.domElement.style.zIndex = '0';
      this.renderer.domElement.style.pointerEvents = 'none';

      // Create cubes
      this.createCubes();

      this.isInitialized = true;
    } catch (error) {
      console.warn('Three.js initialization failed:', error);
      this.fallback();
    }
  }

  createCubes() {
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.6
    });

    for (let i = 0; i < 50; i++) {
      const cube = new THREE.Mesh(geometry, material.clone());

      // Random positions
      cube.position.x = (Math.random() - 0.5) * 20;
      cube.position.y = (Math.random() - 0.5) * 20;
      cube.position.z = (Math.random() - 0.5) * 10;

      // Random rotation speeds
      cube.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      };

      this.scene.add(cube);
      this.cubes.push(cube);
    }
  }

  animate = () => {
    if (!this.isInitialized) return;

    requestAnimationFrame(this.animate);

    // Rotate cubes
    this.cubes.forEach(cube => {
      cube.rotation.x += cube.userData.rotationSpeed.x;
      cube.rotation.y += cube.userData.rotationSpeed.y;
      cube.rotation.z += cube.userData.rotationSpeed.z;

      // Mouse interaction - subtle movement towards mouse
      const mouseInfluence = 0.001;
      cube.position.x += (this.mouse.x * mouseInfluence - cube.position.x * 0.01);
      cube.position.y += (-this.mouse.y * mouseInfluence - cube.position.y * 0.01);
    });

    this.renderer.render(this.scene, this.camera);
  }

  addEventListeners() {
    // Mouse movement
    document.addEventListener('mousemove', (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Window resize
    window.addEventListener('resize', () => {
      if (this.camera && this.renderer) {
        const container = document.getElementById(this.containerId);
        if (container) {
          const rect = container.getBoundingClientRect();
          this.camera.aspect = rect.width / rect.height;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(rect.width, rect.height);
        }
      }
    });
  }

  fallback() {
    // Fallback to gradient background if Three.js fails
    const container = document.getElementById(this.containerId);
    if (container) {
      container.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if Three.js is available
  if (typeof THREE !== 'undefined') {
    new ThreeBackground('three-bg-container');
  } else {
    console.warn('Three.js not loaded, using fallback');
    const container = document.getElementById('three-bg-container');
    if (container) {
      container.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  }
});

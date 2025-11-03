// Three.js GPU-driven starfield per-section
// Usage: window.createThreeStarField(sectionEl, options)
// Requires global THREE available on the page.
(function(){
  function isMobile(){ return /Mobi|Android/i.test(navigator.userAgent); }
  if(!window.THREE){
    console.warn('Three.js not found — starfield-three requires THREE');
    window.createThreeStarField = function(){ return { start:()=>{}, stop:()=>{}, destroy:()=>{} }; };
    return;
  }

  const vertexShader = `
    uniform float uTime;
    attribute vec3 aInitPos;
    attribute vec3 aVel;
    attribute vec3 aColor;
    attribute float aStart;
    attribute float aLife;
    varying vec3 vColor;
    varying float vAlpha;
    void main(){
      float t = uTime - aStart;
      if(t < 0.0 || t > aLife){
        vAlpha = 0.0;
        gl_Position = vec4(0.0);
        gl_PointSize = 0.0;
        return;
      }
      // simple physics: p = p0 + v*t + 0.5 * acc * t^2
      vec3 acc = vec3(0.0, -3.2, 0.0);
      vec3 pos = aInitPos + aVel * t + 0.5 * acc * t * t;
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      // size falloff with distance; scale by life
      gl_PointSize =  (8.0 * (1.0 - (t / aLife))) * (300.0 / -mvPosition.z);
      vColor = aColor;
      vAlpha = 1.0 - (t / aLife);
    }
  `;

  const fragmentShader = `
    varying vec3 vColor;
    varying float vAlpha;
    void main(){
      float r = length(gl_PointCoord - vec2(0.5));
      float alpha = smoothstep(0.5, 0.0, r) * vAlpha;
      vec3 col = vColor;
      gl_FragColor = vec4(col, alpha);
    }
  `;

  window.createThreeStarField = function(sectionEl, opts = {}){
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      return { start: ()=>{}, stop: ()=>{}, destroy: ()=>{} };
    }

    const palette = opts.palette || ['#FFD700','#7AFCCF','#FBCFE8'];
    const count = opts.count || (isMobile() ? 256 : 900);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(sectionEl.clientWidth, sectionEl.clientHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.zIndex = '2';
    sectionEl.style.position = sectionEl.style.position || 'relative';
    sectionEl.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, Math.max(0.1, sectionEl.clientWidth / Math.max(1, sectionEl.clientHeight)), 0.1, 2000);
    camera.position.set(0,0,100);

    // geometry and attributes
    const geometry = new THREE.BufferGeometry();
    const aInitPos = new Float32Array(count * 3);
    const aVel = new Float32Array(count * 3);
    const aColor = new Float32Array(count * 3);
    const aStart = new Float32Array(count);
    const aLife = new Float32Array(count);

    // initialize off-screen
    for(let i=0;i<count;i++){
      // start positions clustered above the top of the section
      aInitPos[i*3+0] = (Math.random() - 0.5) * sectionEl.clientWidth * 0.6;
      aInitPos[i*3+1] = sectionEl.clientHeight * 0.5 + Math.random() * (sectionEl.clientHeight * 0.6);
      aInitPos[i*3+2] = 0;
      // velocities (mostly downward)
      aVel[i*3+0] = (Math.random() - 0.5) * 40.0; // spread
      aVel[i*3+1] = - (50 + Math.random() * 140); // speed
      aVel[i*3+2] = (Math.random() - 0.5) * 10.0;
      const col = new THREE.Color(palette[Math.floor(Math.random()*palette.length)]);
      aColor[i*3+0] = col.r; aColor[i*3+1] = col.g; aColor[i*3+2] = col.b;
      aStart[i] = -10000.0; // inactive
      aLife[i] = 1.2 + Math.random() * 1.8;
    }

    geometry.setAttribute('aInitPos', new THREE.BufferAttribute(aInitPos, 3));
    geometry.setAttribute('aVel', new THREE.BufferAttribute(aVel, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(aColor, 3));
    geometry.setAttribute('aStart', new THREE.BufferAttribute(aStart, 1));
    geometry.setAttribute('aLife', new THREE.BufferAttribute(aLife, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0.0 } },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let running = false;
    let startTime = performance.now() / 1000;
    let rafId = null;

    function resize(){
      const w = sectionEl.clientWidth; const h = sectionEl.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = Math.max(0.1, w / Math.max(1,h));
      camera.updateProjectionMatrix();
    }

    const tempVec = new THREE.Vector3();

    function render(){
      material.uniforms.uTime.value = performance.now() / 1000;
      renderer.render(scene, camera);
      if(running) rafId = requestAnimationFrame(render);
    }

    function start(){ if(running) return; running = true; startTime = performance.now() / 1000; render(); }
    function stop(){ running = false; if(rafId){ cancelAnimationFrame(rafId); rafId = null; } }

    // emit burst: assign start times to a subset of particles
    function emitBurst(countEmit=120){
      const now = performance.now() / 1000;
      const attrStart = geometry.getAttribute('aStart');
      for(let i=0;i<countEmit;i++){
        const idx = Math.floor(Math.random() * (attrStart.count));
        attrStart.array[idx] = now + Math.random() * 0.08; // slight jitter
        // randomize velocity for burst
        geometry.getAttribute('aVel').array[idx*3+0] = (Math.random() - 0.5) * 120.0;
        geometry.getAttribute('aVel').array[idx*3+1] = - (60 + Math.random() * 220);
        geometry.getAttribute('aVel').array[idx*3+2] = (Math.random() - 0.5) * 40.0;
        geometry.getAttribute('aLife').array[idx] = 0.9 + Math.random() * 1.6;
      }
      geometry.getAttribute('aStart').needsUpdate = true;
      geometry.getAttribute('aVel').needsUpdate = true;
      geometry.getAttribute('aLife').needsUpdate = true;
    }

    // IntersectionObserver to start/stop when visible
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) start(); else stop(); });
    }, { threshold: 0.15 });
    io.observe(sectionEl);

    // hover support
    let hoverTO = null;
    sectionEl.addEventListener('mouseenter', ()=>{ start(); if(hoverTO) clearTimeout(hoverTO); });
    sectionEl.addEventListener('mouseleave', ()=>{ hoverTO = setTimeout(()=>{ stop(); }, 900); });

    const ro = new ResizeObserver(resize); ro.observe(sectionEl); resize();

    return { start, stop, destroy(){ stop(); io.disconnect(); ro.disconnect(); sectionEl.removeEventListener('mouseenter', ()=>{}); sectionEl.removeEventListener('mouseleave', ()=>{}); if(renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement); } , emitBurst };
  };
})();

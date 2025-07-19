import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Group } from 'three';

async function loadCube() {
    const loader = new GLTFLoader();

    const [cubeData] = await Promise.all([
        loader.loadAsync('models/Cube.glb'),
    ]);

    console.log('loading cube!', cubeData);

    const cube = setupModel(cubeData);

    cube.position.set(0, 0, -2.5);

    return {
        cube,
    };
}

export { loadCube };

function setupModel(data) {
    const group = new Group();
    const updatables = [];

    const meshes = [];

    // First, gather all meshes to avoid modifying the hierarchy while traversing
    data.scene.traverse((node) => {
        if (node.isMesh && node.geometry) {
            meshes.push(node);
        }
    });

    for (const mesh of meshes) {
        mesh.geometry = mesh.geometry.clone();
    }

    const root = data.scene;
    group.add(root);

    group.tick = (delta) => {
        // Optional rotation or animation hooks
    };

    return group;
}


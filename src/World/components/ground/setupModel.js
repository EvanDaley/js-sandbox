import {
    AnimationMixer,
    Group,
    MathUtils,
    MeshPhongMaterial,
    MeshBasicMaterial,
    Mesh,
} from 'three';
import { applyVertexColorsToGeometry } from './vertexColorUtils.js';

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

export { setupModel };

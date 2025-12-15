// Variables globales
let isDrawing = false;
let currentTool = 'pencil';
let currentColor = '#000000';

// Initialisation du canvas
const canvas = document.getElementById('skin-canvas');
const ctx = canvas.getContext('2d');

// Charger un modèle 3D basique (à remplacer par un vrai modèle de Steve)
function initThreeJS() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(200, 400);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Ajouter un cube comme placeholder
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// Outils de dessin
canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('mousemove', draw);

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentTool === 'pencil') {
        ctx.fillStyle = currentColor;
        ctx.fillRect(x, y, 5, 5);
    } else if (currentTool === 'eraser') {
        ctx.clearRect(x, y, 10, 10);
    }
}

// Changement d'outil
document.getElementById('pencil-tool').addEventListener('click', () => currentTool = 'pencil');
document.getElementById('eraser-tool').addEventListener('click', () => currentTool = 'eraser');
document.getElementById('color-picker').addEventListener('input', (e) => currentColor = e.target.value);

// Téléchargement du skin
document.getElementById('download-skin').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'mon_skin_minecraft.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

// Génération par IA
document.getElementById('generate-skin').addEventListener('click', async () => {
    const prompt = document.getElementById('skin-prompt').value;
    if (!prompt) return alert('Veuillez décrire votre skin !');

    try {
        const response = await fetch(`http://localhost:3000/generate-skin?prompt=${encodeURIComponent(prompt)}`);
        const data = await response.json();
        document.getElementById('ai-result').innerHTML = `
            <p>Skin généré :</p>
            <img src="${data.skinUrl}" alt="Skin généré" style="max-width: 200px;">
        `;
    } catch (error) {
        console.error(error);
        document.getElementById('ai-result').innerHTML = '<p>Erreur lors de la génération du skin.</p>';
    }
});

// Initialisation
initThreeJS();
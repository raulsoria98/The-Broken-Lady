import * as THREE from '../../libs/three.module.js'
import { MTLLoader } from '../../libs/MTLLoader.js'
import { OBJLoader } from '../../libs/OBJLoader.js'

function degToRad(deg) {
	return deg * (Math.PI / 180);
}

class Corazon extends THREE.Object3D {
	constructor() {
		super();

		var that = this;
		var materialLoader = new MTLLoader();
		var objectLoader = new OBJLoader();

		this.cajaColisionGeom = new THREE.BoxBufferGeometry(4, 4, 12);
		this.materialColisionador = new THREE.MeshBasicMaterial({ color: 0x000, transparent: true, opacity: 0 });

		this.cajaColision = new THREE.Mesh(that.cajaColisionGeom, that.materialColisionador);

		materialLoader.load('../models/corazon/Love.mtl', (materials) => {
			objectLoader.setMaterials(materials);
			objectLoader.load('../models/corazon/Love.obj', (object) => {
				that.modelo = object;

				that.cajaColision.position.y = 2;
				that.modelo.position.y = 2;

				that.modelo.scale.x = 0.05;
				that.modelo.scale.y = 0.05;
				that.modelo.scale.z = 0.05;

				that.cajaColision.add(that.modelo);
				that.add(that.cajaColision);

			}, null, null);
		})

		this.tiempoAnterior = Date.now();

	}

	consumirVida() {
		this.remove(this.cajaColision);
	}

	modificarPosicion(x, y) {
		this.position.x = x;
		this.position.y = y;
	}

	update() {
		var tiempoActual = Date.now();
		var seg = (tiempoActual - this.tiempoAnterior) / 1000;
		this.rotation.y += 0.0005 * seg;

		this.tiempoAnteroior = tiempoActual;
	}
}

export { Corazon };
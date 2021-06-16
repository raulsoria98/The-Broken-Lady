import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Arbol extends THREE.Object3D {
	constructor() {
		super();

		var that = this;
		var materialLoader = new MTLLoader();
		var objectLoader = new OBJLoader();

		materialLoader.load('./models/tree/tree_bonus.mtl', (materials) => {
			objectLoader.setMaterials(materials);
			objectLoader.load('./models/tree/tree_bonus.obj', (object) => {
				that.modelo = object;

				that.modelo.position.y = 0;

				that.modelo.scale.x = 3;
				that.modelo.scale.y = 3;
				that.modelo.scale.z = 3;

				that.add(that.modelo);

			}, null, null);
		})


	}

	modificarPosicion(x, y, z) {
		this.position.x = x;
		this.position.y = y;
		this.position.z = z;
	}
}

export { Arbol };
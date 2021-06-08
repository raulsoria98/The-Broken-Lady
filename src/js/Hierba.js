import * as THREE from '../../libs/three.module.js'
import {MTLLoader} from '../../libs/MTLLoader.js'
import {OBJLoader} from '../../libs/OBJLoader.js'

class Hierba extends THREE.Object3D {
	constructor() {
		super();

		var that = this;
		var materialLoader = new MTLLoader();
		var objectLoader = new OBJLoader();

		materialLoader.load('../models/hierba/free grass by adam127.mtl', (materials) => {
			objectLoader.setMaterials(materials);
			objectLoader.load('../models/hierba/free grass by adam127.obj', (object) => {
				that.modelo = object;

				that.modelo.position.y = 0;
				// that.modelo.position.z = -1;

				that.modelo.scale.x = 10;
				that.modelo.scale.y = 10;
				that.modelo.scale.z = 10;

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

export {Hierba};
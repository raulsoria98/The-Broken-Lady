import * as THREE from '../../libs/three.module.js'
import {MTLLoader} from '../../libs/MTLLoader.js'
import {OBJLoader} from '../../libs/OBJLoader.js'


function degToRad(deg) {
	return deg * (Math.PI / 180);
}

class Mapache extends THREE.Object3D {
	constructor(plataforma) {
		super();
		//Vida del mapache
		this.vida = 15;
		this.plataforma = plataforma;
		this.velocidad = 5;

		var that = this;
		var materialLoader = new MTLLoader();
		var objectLoader = new OBJLoader();

		this.cajaColisionGeom = new THREE.BoxBufferGeometry(4, 4, 4);
		this.materialColisionador = new THREE.MeshBasicMaterial({color: 0x000, transparent: true, opacity: 0});


		this.cajaColision = new THREE.Mesh(that.cajaColisionGeom, that.materialColisionador);

		materialLoader.load('../models/mapache/mapache.mtl', (materials) => {
			objectLoader.setMaterials(materials);
			objectLoader.load('../models/mapache/mapache.obj', (object) => {
				that.modelo = object;


				that.cajaColision.position.y = 2;
				that.modelo.position.y = 1;
				//that.modelo.position.z = 1;

				that.modelo.scale.x = 1;
				that.modelo.scale.y = 1;
				that.modelo.scale.z = 1;

				that.cajaColision.add(that.modelo);
				that.add(that.cajaColision);

			}, null, null);
		})

		this.tiempoAnterior = Date.now();
	}

	golpear() {
		this.vida -= 1;
		if (this.vida == 0) {
			this.morir();
			return true;
		}
		else {
			return false;
		}
	}

	iniciarGame() {
		this.vida = 3;
		this.add(this.cajaColision);
	}

	morir() {
		console.log("memuero");
		this.remove(this.cajaColision);
	}

	modificarPosicion(x, y) {
		this.position.x = x;
		this.position.y = y;
	}

	update() {
		var tiempoActual = Date.now();
		var seg = (tiempoActual - this.tiempoAnterior) / 1000;

        //Los mapaches se mueven de lado a lado y ademas giran
		if (this.position.x >= (this.plataforma.position.x + this.plataforma.ancho() / 2 - 5))
			this.direccion = "izquierda";
		else if (this.position.x <= (this.plataforma.position.x - this.plataforma.ancho() / 2 + 5))
			this.direccion = "derecha";

		if (this.direccion == "derecha") {
			this.position.x += this.velocidad * seg;
			this.rotation.y += degToRad(90)*seg;
		}
		else {
			this.position.x -= this.velocidad * seg;
			this.rotation.y += degToRad(-90)*seg;
		}

		this.tiempoAnterior = tiempoActual;
	}
}

export {Mapache}

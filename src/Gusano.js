import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import {MTLLoader} from '../libs/MTLLoader.js'
import {OBJLoader} from '../libs/OBJLoader.js'


function degToRad(deg) {
	return deg * (Math.PI / 180);
}

class Gusano extends THREE.Object3D {
	constructor(plataforma) {
		super();
		//Vida del bicho
		this.vida = 3;
		this.plataforma = plataforma;
		this.velocidad = 5;

		var that = this;
		var materialLoader = new MTLLoader();
		var objectLoader = new OBJLoader();

		this.cajaColisionGeom = new THREE.BoxBufferGeometry(4, 4, 12);
		this.materialColisionador = new THREE.MeshBasicMaterial({color: 0x000, transparent: true, opacity: 0.3});


		this.cajaColision = new THREE.Mesh(that.cajaColisionGeom, that.materialColisionador);

		materialLoader.load('../models/space-monster/space-monster.mtl', (materials) => {
			objectLoader.setMaterials(materials);
			objectLoader.load('../models/space-monster/space-monster.obj', (object) => {
				that.modelo = object;


				that.cajaColision.position.y = 2;
				that.modelo.position.y = -2;
				that.modelo.position.z = -1;

				that.modelo.scale.x = 1;
				that.modelo.scale.y = 1;
				that.modelo.scale.z = 1;

				that.cajaColision.add(that.modelo);
				that.add(that.cajaColision);

			}, null, null);
		})

		this.rotation.y += degToRad(-90);

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
		TWEEN.update();

		var tiempoActual = Date.now();
		var seg = (tiempoActual - this.tiempoAnterior) / 1000;

		if (this.position.x >= (this.plataforma.position.x + this.plataforma.ancho() / 2 - 5))
			this.direccion = "izquierda";
		else if (this.position.x <= (this.plataforma.position.x - this.plataforma.ancho() / 2 + 5))
			this.direccion = "derecha";

		if (this.direccion == "derecha") {
			this.position.x += this.velocidad * seg;
			this.rotation.y = degToRad(90);
		}
		else {
			this.position.x -= this.velocidad * seg;
			this.rotation.y = degToRad(-90);
		}

		this.tiempoAnterior = tiempoActual;
	}
}

export {Gusano}

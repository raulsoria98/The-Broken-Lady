function degToRad(deg) {
	return deg * (Math.PI / 180);
}

class Lady {
	constructor(scene) {
		this.peso = 30;
		//Cabeza - nodo
		//Textura
		var texturaCuerpo = new THREE.TextureLoader().load('../img/cuerpo.jpeg');
		var texturaVestido = new THREE.TextureLoader().load('../img/vestido.jpg');
		var texturaMadera = new THREE.TextureLoader().load('../img/madera-negra.jpg');
		//Materiales
		var materialCuerpoS = new THREE.MeshPhongMaterial({map: texturaCuerpo});
		var materialOjitosS = new THREE.MeshPhongMaterial({color: 0x000000, transparent: true, opacity: 0.7});
		var materialMofletesS = new THREE.MeshPhongMaterial({color: 0xFF0000, transparent: true, opacity: 0.7});
		var materialCuernosS = new THREE.MeshPhongMaterial({map: texturaMadera, transparent: true, opacity: 0.8});
		var materialTronquillo1S = new THREE.MeshPhongMaterial({map: texturaVestido, color: 0x8d0002});
		var materialTronquillo2S = new THREE.MeshPhongMaterial({map: texturaVestido, color: 0x8d0002});
		// Materiales Physi
        var materialCuerpo = Physijs.createMaterial( materialCuerpoS, 0.1, 0);
        var materialOjitos = Physijs.createMaterial( materialOjitosS, 0.1, 0);
		var materialMofletes = Physijs.createMaterial( materialMofletesS, 0.1, 0);
        var materialCuernos = Physijs.createMaterial( materialCuernosS, 0.1, 0);
		var materialTronquillo1 = Physijs.createMaterial( materialTronquillo1S, 0.1, 0);
        var materialTronquillo2 = Physijs.createMaterial( materialTronquillo2S, 0.1, 0);

		//Geometria ovalo
		var geomOvalo = new THREE.SphereGeometry(1, 30, 30);

		//Malla cabeza
		// this.craneo = new THREE.Mesh(geomOvalo, materialCuerpo);
		this.cabeza = new Physijs.BoxMesh(geomOvalo, materialCuerpo, this.peso);
		this.cabeza.scale.y = 1.2;
		this.cabeza.scale.x = 1.1;
		this.cabeza.scale.z = 0.9;

		//Ojos
		// this.ojoI = new THREE.Mesh(geomOvalo, materialOjitos);
		this.ojoI = new Physijs.BoxMesh(geomOvalo, materialOjitos, this.peso);
		this.ojoI.scale.y = 1.2 * 0.4;
		this.ojoI.scale.x = 1.1 * 0.3;
		this.ojoI.scale.z = 0.9 * 0.2;
		this.ojoI.rotation.y = 0.4;
		this.ojoI.rotation.x = -0.5;
		this.ojoI.position.set(0.4, 0.4, 0.65);


		//this.ojoD = new THREE.Mesh(geomOvalo, materialOjitos);
		this.ojoD = new Physijs.BoxMesh(geomOvalo, materialOjitos);
		this.ojoD.scale.y = 1.2 * 0.4;
		this.ojoD.scale.x = 1.1 * 0.3;
		this.ojoD.scale.z = 0.9 * 0.2;
		this.ojoD.rotation.y = -0.4;
		this.ojoD.rotation.x = -0.5;
		this.ojoD.position.set(-0.4, 0.4, 0.65);

		//Mofletes
		// this.mofleteD = new THREE.Mesh(geomOvalo, materialMofletes);
		this.mofleteD = new Physijs.BoxMesh(geomOvalo, materialMofletes, this.peso);
		this.mofleteD.scale.y = 1.2 * 0.3;
		this.mofleteD.scale.x = 1.1 * 0.2;
		this.mofleteD.scale.z = 0.9 * 0.2;
		this.mofleteD.rotation.x = -0.4;
		this.mofleteD.rotation.z = Math.PI / 2;
		this.mofleteD.position.set(0.4, 0, 0.62);


		//this.mofleteI = new THREE.Mesh(geomOvalo, materialMofletes);
		this.mofleteI = new Physijs.BoxMesh(geomOvalo, materialMofletes, this.peso);
		this.mofleteI.scale.y = 1.2 * 0.3;
		this.mofleteI.scale.x = 1.1 * 0.2;
		this.mofleteI.scale.z = 0.9 * 0.2;
		this.mofleteI.rotation.x = -0.4;
		this.mofleteI.rotation.z = Math.PI / 2;
		this.mofleteI.position.set(-0.4, 0, 0.62);

		//Cuernos

		// Variables para la animacion
		this.altura_cuernos = 1.2;
		this.ancho_cuernos = 1;
		this.subir = true;

		//Geometria y creacion de las mallas de lo cuernos
		var cuernoGeom = new THREE.CylinderGeometry(0.001, 0.2, 0.5, 30, 30);

		// this.cuernoD = new THREE.Mesh(cuernoGeom, materialCuernos);
		this.cuernoD = new Physijs.BoxMesh(cuernoGeom, materialCuernos, this.peso);
		this.cuernoD.position.set(-this.ancho_cuernos, this.altura_cuernos, 0);
		this.cuernoD.rotation.z = degToRad(40);

		// this.cuernoI = new THREE.Mesh(cuernoGeom, materialCuernos);
		this.cuernoI = new Physijs.BoxMesh(cuernoGeom, materialCuernos, this.peso);
		this.cuernoI.position.set(this.ancho_cuernos, this.altura_cuernos, 0);
		this.cuernoI.rotation.z = degToRad(-40);


		// this.cabeza = new THREE.Object3D();
		// this.cabeza.add(this.craneo, this.ojoI, this.ojoD, this.mofleteD, this.mofleteI, this.cuernoI, this.cuernoD);
		this.cabeza.add(this.ojoD, this.ojoI, this.mofleteD, this.mofleteI, this.cuernoD, this.cuernoI)
		this.cabeza.position.y = 1.9;

		// TODO: ¿Cómo podemos hacer una capa?
		//Cuerpo

		//Materiales


		//Tronco
		var tronco1Geom = new THREE.CylinderGeometry(0.5, 1.1, 1.7, 30, 30);
		// this.tronco1 = new THREE.Mesh(tronco1Geom, materialTronquillo1);
		this.lady = new Physijs.BoxMesh(tronco1Geom, materialTronquillo1, this.peso);
		this.lady.position.set(0,-tronco1Geom.parameters.height / 2,0);
		//this.lady.rotation.y = Math.PI;


		var tronco2Geom = new THREE.CylinderGeometry(1.1, 1.8, 0.9, 30, 30);
		//this.tronco2 = new THREE.Mesh(tronco2Geom, materialTronquillo2);
		this.tronco2 = new Physijs.BoxMesh(tronco2Geom, materialTronquillo2, this.peso);
		this.tronco2.position.set(0,-tronco1Geom.parameters.height/2  - tronco2Geom.parameters.height / 2,0)  ;
		//this.tronco2.rotation.y = Math.PI;

		// this.lady = new THREE.Object3D();
		
		//this.lady.position.y = tronco1Geom.parameters.height + tronco2Geom.parameters.height;

		//Brazos
		var hombroGeom = new THREE.SphereGeometry(0.3, 30, 30);
		var brazoGeom = new THREE.CylinderGeometry(0.1, 0.3, 2, 30, 30);
		var manoGeom = new THREE.SphereGeometry(0.2, 30, 30);

		//Brazo Derecho
		// this.brazoIM = new THREE.Mesh(brazoGeom, materialCuerpo);
		this.brazoIM = new Physijs.BoxMesh(brazoGeom, materialCuerpo, this.peso);
		this.brazoIM.rotation.z = -Math.PI / 2;
		this.brazoIM.position.x = brazoGeom.parameters.height / 2 + hombroGeom.parameters.radius - 0.1;
		// this.hombroIM = new THREE.Mesh(hombroGeom, materialCuerpo);
		this.brazoI = new Physijs.BoxMesh(hombroGeom, materialCuerpo, this.peso);
		this.brazoI.add(this.brazoIM);
		// this.manoIM = new THREE.Mesh(manoGeom, materialCuerpo);
		this.manoIM = new Physijs.BoxMesh(manoGeom, materialCuerpo, this.peso);
		this.manoIM.position.x = manoGeom.parameters.radius + hombroGeom.parameters.radius + brazoGeom.parameters.height - 0.2;

		//Brazo Izquierdo
		//this.brazoDM = new THREE.Mesh(brazoGeom, materialCuerpo);
		this.brazoDM = new Physijs.BoxMesh(brazoGeom, materialCuerpo);
		this.brazoDM.rotation.z = Math.PI / 2;
		this.brazoDM.position.x = - (brazoGeom.parameters.height / 2 + hombroGeom.parameters.radius - 0.1);
		// this.hombroDM = new THREE.Mesh(hombroGeom, materialCuerpo);
		this.brazoD = new Physijs.BoxMesh(hombroGeom, materialCuerpo, this.peso);
		this.brazoD.add(this.brazoDM);
		// this.manoDM = new THREE.Mesh(manoGeom, materialCuerpo);
		this.manoDM = new Physijs.BoxMesh(manoGeom, materialCuerpo, this.peso);
		this.manoDM.position.x = -(manoGeom.parameters.radius + hombroGeom.parameters.radius + brazoGeom.parameters.height - 0.2);

		// Arma
		var geomMango = new THREE.CylinderGeometry(0.15, 0.15, 2, 30, 30);
		var geomMazo = new THREE.BoxGeometry(2, 0.7, 0.7);

		//this.mango = new THREE.Mesh(geomMango, materialCuerpo);
		// this.mango = Physijs.BoxMesh(geomMango, materialCuerpo, this.peso);
		// //this.mazo = new THREE.Mesh(geomMazo, materialCuernos);
		// this.arma = Physijs.BoxMesh(geomMazo, materialCuernos, this.peso);
		// this.arma.position.y += this.arma.geometry.parameters.height / 2 + this.mango.geometry.parameters.height;
		// this.mango.position.y += this.mango.geometry.parameters.height / 2;

		// // this.arma = new THREE.Object3D();
		// this.arma.add(this.mango);
		// this.arma.rotation.y += degToRad(90);
		// this.arma.position.x += this.brazoDM.geometry.parameters.height + this.hombroDM.geometry.parameters.radius;

		//Nodo brazos Izq
		var altura_brazos = 0.1;
		var separacion_brazos = 0.4;

		// this.brazoD = new THREE.Object3D();
		this.brazoD.add(this.manoDM);
		this.brazoD.position.y = altura_brazos;
		this.brazoD.position.x = -separacion_brazos;
		this.brazoD.rotation.z = degToRad(40);

		//Nodo brazos Dcho
		// this.brazoI = new THREE.Object3D();
		this.brazoI.add(this.manoIM); // TODO: ARMA
		this.brazoI.position.y = altura_brazos;
		this.brazoI.position.x = separacion_brazos;
		this.brazoI.rotation.z = degToRad(-40);


		//Piernas
		this.largoPierna = 2.5;
		var piernaGeom = new THREE.CylinderGeometry(0.001, 0.4, this.largoPierna, 30, 5);
		var ingleGeom = new THREE.SphereGeometry(0.3, 30, 30);

		// this.piernaDM = new THREE.Mesh(piernaGeom, materialCuerpo);
		this.piernaDM = new Physijs.BoxMesh(piernaGeom, materialCuerpo, this.peso);
		// this.piernaD = new THREE.Mesh(ingleGeom, materialCuerpo);
		this.piernaD = new Physijs.BoxMesh(ingleGeom, materialCuerpo, this.peso);
		this.piernaD.add(this.piernaDM);
		this.piernaDM.rotation.z = Math.PI;
		this.piernaDM.position.y = -(piernaGeom.parameters.height / 2);

		// this.piernaIM = new THREE.Mesh(piernaGeom, materialCuerpo);
		this.piernaIM = new Physijs.BoxMesh(piernaGeom, materialCuerpo, this.peso);
		// this.piernaI = new THREE.Mesh(ingleGeom, materialCuerpo);
		this.piernaI = new Physijs.BoxMesh(ingleGeom, materialCuerpo, this.peso);
		this.piernaI.add(this.piernaIM);
		this.piernaIM.rotation.z = Math.PI;
		this.piernaIM.position.y = -(piernaGeom.parameters.height / 2);

		//Nodo-brazo-izq - espada
		this.piernaI.position.x = 0.4;
		this.piernaD.position.x = -0.4;

		// this.lady = new THREE.Object3D();
		this.tronco2.add(this.piernaI);
		this.tronco2.add(this.piernaD);
		this.lady.add(this.cabeza);
		this.lady.add(this.brazoI);
		this.lady.add(this.brazoD);
		console.log(this.brazoI);	
		this.lady.add(this.tronco2);
		//this.lady.add(this.brazoI, this.brazoD, this.piernaI, this.piernaD);
		this.lady.position.y = piernaGeom.parameters.height;

		//Escalado

		scene.add(this.lady);

		//Para controlar el tiempo de la animacion de parpadeo
		this.tiempoAns = Date.now();
		this.tiempoAnterior = Date.now();
		this.cerrar = true;
		this.parpadeo = false;

		// Controlar qué pierna mueve al andar
		this.ultimo_paso = "izquierda";

		//TWEEN ATAQUE
		var origen_ataque = {rot_brazo: 0, rot_arma: 90, rot_palante: 0}
		var fin_ataque = {rot_brazo: -60, rot_arma: 110, rot_palante: 45}

		var that = this;
		this.movimiento_ataque = new TWEEN.Tween(origen_ataque)
			.to(fin_ataque, 200)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(() => {
				that.brazoI.rotation.y = degToRad(origen_ataque.rot_brazo);
				that.arma.rotation.y = degToRad(origen_ataque.rot_arma);
				that.arma.rotation.x = degToRad(origen_ataque.rot_palante);
			})
			.yoyo(true).repeat(1)

		//TWEEN ANDAR
		var origen0_andar = {rot_pierna0: 0}
		var fin0_andar = {rot_pierna0: -35}

		var origen1_andar = {rot_pierna1: 0}
		var fin1_andar = {rot_pierna1: 35}

		var origen2_andar = {rot_pierna1: 35, rot_pierna0: -35}
		var fin2_andar = {rot_pierna1: 0, rot_pierna0: 0}

		// Pierna Dcha Primero
		this.movimiento0_andar_D = new TWEEN.Tween(origen0_andar)
			.to(fin0_andar, 50)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(() => {
				that.piernaD.rotation.x = degToRad(origen0_andar.rot_pierna0);
			})

		this.movimiento1_andar_D = new TWEEN.Tween(origen1_andar)
			.to(fin1_andar, 50)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(() => {
				that.piernaI.rotation.x = degToRad(origen1_andar.rot_pierna1);
			})

		this.movimiento2_andar_D = new TWEEN.Tween(origen2_andar)
			.to(fin2_andar, 50)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(() => {
				that.piernaI.rotation.x = degToRad(origen2_andar.rot_pierna1);
				that.piernaD.rotation.x = degToRad(origen2_andar.rot_pierna0);
			})

		this.movimiento0_andar_D.chain(this.movimiento1_andar_D);
		this.movimiento1_andar_D.chain(this.movimiento2_andar_D);

		// Pierna Izda Primero
		this.movimiento0_andar_I = new TWEEN.Tween(origen0_andar)
			.to(fin0_andar, 50)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(() => {
				that.piernaI.rotation.x = degToRad(origen0_andar.rot_pierna0);
			})

		this.movimiento1_andar_I = new TWEEN.Tween(origen1_andar)
			.to(fin1_andar, 50)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(() => {
				that.piernaD.rotation.x = degToRad(origen1_andar.rot_pierna1);
			})

		this.movimiento2_andar_I = new TWEEN.Tween(origen2_andar)
			.to(fin2_andar, 50)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(() => {
				that.piernaD.rotation.x = degToRad(origen2_andar.rot_pierna1);
				that.piernaI.rotation.x = degToRad(origen2_andar.rot_pierna0);
			})

		this.movimiento0_andar_I.chain(this.movimiento1_andar_I);
		this.movimiento1_andar_I.chain(this.movimiento2_andar_I);

		// Velocidad de movimiento de la Lady
		this.velocidad = 15;
	}

	createGUI(gui, titleGui) {
		var that = this;

		this.guiControls = new function () {
			this.escalado = 1;

			this.reset = function () {
				this.escalado = 1;

				that.cilindro.scale.x = this.escalado;
				that.cambiarEscalado(this.escalado, that);
			}
		}

		var folder = gui.addFolder(titleGui);

		folder.add(this.guiControls, "escalado", 1, 8, 1).name("Escalado: ").listen().onChange((value) => {
			that.cilindro.scale.x = value;
			this.cambiarEscalado(value, that);
		});

		folder.add(this.guiControls, 'reset').name('[ Reset ]');
	}

	atacar() {
		this.movimiento_ataque.start();

	}

	//Funciones para el movimiento
	saltar() {
		//TWEEN SALTO
		var that = this;
		var escalado = 0.4;

		var origen1 = {escala_piernas: 1, pos: this.position.y};
		var fin1 = {escala_piernas: escalado, pos: this.position.y - this.largoPierna * (1 - escalado)};

		var movimiento1 = new TWEEN.Tween(origen1)
			.to(fin1, 200)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(() => {
				that.piernaI.scale.y = origen1.escala_piernas;
				that.piernaD.scale.y = origen1.escala_piernas;
				that.position.y = origen1.pos;
			})

		var origen2 = {escala_piernas: escalado, pos: this.position.y - this.largoPierna * (1 - escalado)};
		var fin2 = {escala_piernas: 1, pos: this.position.y + 4};

		var movimiento2 = new TWEEN.Tween(origen2)
			.to(fin2, 200)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(() => {
				that.piernaI.scale.y = origen2.escala_piernas;
				that.piernaD.scale.y = origen2.escala_piernas;
				that.position.y = origen2.pos;
			})

		movimiento1.chain(movimiento2);

		movimiento1.start();
		// var factor_escala_salto = 0.013;
		// var factor_elevacion_salto = 0.1;
		// var tiempoAnterior = Date.now();
		// var tiempoActual;
		// var seg;

		// while(this.preparando_salto){
		//     tiempoActual = Date.now();
		//     seg = (tiempoActual - tiempoAnterior) / 1000;
		//     console.log(seg);

		//     if(this.piernaD.scale.y > 0.5){
		//         this.piernaD.scale.y -= factor_escala_salto * seg;
		//         this.piernaI.scale.y -= factor_escala_salto * seg;


		//         this.lady.position.y -= this.largoPierna * factor_escala_salto * seg;
		//     }
		//     else{
		//         this.preparando_salto = false;
		//     }


		// }

		// while(!this.preparando_salto){
		//     if(this.piernaD.scale.y < 1){
		//         this.piernaD.scale.y += factor_escala_salto;
		//         this.piernaI.scale.y += factor_escala_salto;


		//         this.lady.position.y += this.largoPierna * factor_escala_salto + factor_elevacion_salto;
		//     }
		//     else{
		//         this.preparando_salto = true;

		//     }
		// }
	}

	//Esto solo hace que mire hacia delante
	mirame(){
		this.rotation.y = 0;
	}

	//Prueba
	caer(){
		this.position.y -= 4;
	}

	// FIXME: Arreglar para que se pueda mantener pulsada la tecla de andar
	derecha() {
		this.rotation.y = Math.PI / 2;
		
		if(this.ultimo_paso == "izquierda"){
			this.movimiento0_andar_D.start();
			this.ultimo_paso = "derecha";
		}
		else if(this.ultimo_paso == "derecha"){
			this.movimiento0_andar_I.start();
			this.ultimo_paso = "izquierda";
		}
		
		this.tiempoAnterior_andar = Date.now();

		this.andando_derecha = true;
		this.pos_objetivo = this.position.x + 2;
	}

	izquierda() {
		this.rotation.y = -Math.PI / 2;
		
		if(this.ultimo_paso == "izquierda"){
			this.movimiento0_andar_D.start();
			this.ultimo_paso = "derecha";
		}
		else if(this.ultimo_paso == "derecha"){
			this.movimiento0_andar_I.start();
			this.ultimo_paso = "izquierda";
		}
		
		this.tiempoAnterior_andar = Date.now();

		this.andando_izquierda = true;
		this.pos_objetivo = this.position.x - 2;
	}


	

	update() {
		TWEEN.update();
		//Animacion ojos
		var tiempoActual = Date.now();

		if (!this.parpadeo) {
			var intervalo = (tiempoActual - this.tiempoAnterior) / 1000;
		}
		else {
			var intervalo = 0;
		}

		//Para la animacion del cierre de los ojos
		var seg = (tiempoActual - this.tiempoAns) / 1000;

		if (this.parpadeo) {
			if (this.cerrar) {
				this.ojoI.scale.y -= 2.5 * seg;
				this.ojoD.scale.y -= 2.5 * seg;

				if (this.ojoI.scale.y <= 0.01)
					this.cerrar = false;
			}
			else {
				this.ojoI.scale.y += 2.5 * seg;
				this.ojoD.scale.y += 2.5 * seg;

				if (this.ojoI.scale.y >= 1.2 * 0.4) {
					this.cerrar = true;
					this.parpadeo = false;
					this.tiempoAnterior = tiempoActual;
				}
			}
		}
		this.tiempoAns = tiempoActual;

		//Parpadeo   
		if (intervalo >= 5) {
			this.parpadeo = true;

		}

		// Animacion cuernos
		var altura_max = 1.4;
		var altura_min = 1.2;

		if (this.subir) {
			this.altura_cuernos += 0.002;
			this.ancho_cuernos += 0.002;

			if (this.altura_cuernos >= altura_max)
				this.subir = false;

		} else if (!this.subir) {
			this.altura_cuernos -= 0.002;
			this.ancho_cuernos -= 0.002;

			if (this.altura_cuernos <= altura_min)
				this.subir = true;
		}

		this.cuernoD.position.set(-this.ancho_cuernos, this.altura_cuernos, 0);
		this.cuernoI.position.set(this.ancho_cuernos, this.altura_cuernos, 0);

		//Para andar 
		//Izquierda
		if(this.andando_izquierda){
			var tiempoActual = Date.now();
			var seg = (tiempoActual - this.tiempoAnterior_andar) / 1000;

			this.position.x  -= 2 * seg * this.velocidad;

			this.tiempoAnterior_andar = tiempoActual;

			if(this.position.x < this.pos_objetivo)
				this.andando_izquierda = false;
		}

		//Derecha
		if(this.andando_derecha){
			var tiempoActual = Date.now();
			var seg = (tiempoActual - this.tiempoAnterior_andar) / 1000;

			this.position.x  += 2 * seg * this.velocidad;

			this.tiempoAnterior_andar = tiempoActual;

			if(this.position.x > this.pos_objetivo)
				this.andando_derecha = false;
		}
	}




}



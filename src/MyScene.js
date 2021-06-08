
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import {GUI} from '../libs/dat.gui.module.js'
import {TrackballControls} from '../libs/TrackballControls.js'
import * as TWEEN from '../libs/tween.esm.js'

// Clases de mi proyecto

import {Lady} from './Lady.js'
import {Mapa} from './Mapa.js'
import {Gusano} from './Gusano.js'

/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
	constructor(myCanvas) {
		super();

		this.cayendo = false;

		// Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
		this.renderer = this.createRenderer(myCanvas);

		// Se añade a la gui los controles para manipular los elementos de esta clase
		this.gui = this.createGUI();

		// Construimos los distinos elementos que tendremos en la escena
		this.lady = new Lady(this);
		this.lady.castShadow = true;
		this.add(this.lady);


		// Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
		// Tras crear cada elemento se añadirá a la escena con   this.add(variable)
		this.createLights();

		//La camara que seguira a lady
		this.createCamera();

		// Un suelo 
		this.createGround();


		// Paredes
		// this.createParedes();

		// Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
		//this.axis = new THREE.AxesHelper(5);
		//this.add(this.axis);


		// Por último creamos el modelo.
		// El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a 
		// la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.


		this.iniciarPartida();

		this.tiempoAnterior = Date.now();
	}

	iniciarPartida() {
		//Mapa
		if (this.mapa)
			this.remove(this.mapa);

		this.mapa = new Mapa();
		this.mapa.traverseVisible((unNodo) => {
			unNodo.reciveShadow = true;
		})
		this.add(this.mapa);

		//Objetos
		this.lady.iniciarPartida();
		this.lady.position.set(0, 0, 0); //Posicion inicial
		this.lady.rotation.y = 0;  //Inicialmente nos mira

		//Camara
		this.iniciarCamara(); //Colocamos la camara

		//ESTADOS DEL JUEGO
		this.estado = "OFF";
		this.estadoLady = "VULNERABLE";

		//REGISTROS DE TIEMPO PARA CONTROLAR EL TIEMPO 
		this.golpeada = null;

		document.getElementById("ganar").style.display = "none";
		document.getElementById("perder").style.display = "none";
		document.getElementById("inicio").style.display = "block";

	}

	perderPartida() {
		console.log("perder");
		document.getElementById("perder").style.display = "block";
		this.estado = "PERDER";
	}

	ganarPartida() {
		console.log("ganar");
		document.getElementById("ganar").style.display = "block";
		this.estado = "GANAR";
	}

	createCamera() {
		// Para crear una cámara le indicamos
		//   El ángulo del campo de visión en grados sexagesimales
		//   La razón de aspecto ancho/alto
		//   Los planos de recorte cercano y lejano
		this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
		// También se indica dónde se coloca
		// this.camera.position.set(0, 10, 50);
		// Y hacia dónde mira
		// var look = this.lady.position;
		// this.camera.lookAt(look);

	}

	iniciarCamara() {
		this.camera.position.set(0, 10, 50);
		// Y hacia dónde mira
		var look = this.lady.position;
		this.camera.lookAt(look);
	}

	createGround() {
		// El suelo es un Mesh, necesita una geometría y un material.

		// La geometría es una caja con muy poca altura
		var geometryGround = new THREE.BoxGeometry(200, 0.2, 50);


		// El material se hará con una textura de madera
		var texture = new THREE.TextureLoader().load('../img/water.jpg');
		var materialGround = new THREE.MeshPhongMaterial({map: texture});

		// Ya se puede construir el Mesh
		var ground = new THREE.Mesh(geometryGround, materialGround);

		// Todas las figuras se crean centradas en el origen.
		// El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
		ground.position.x = 75;
		ground.position.y = -4;
		ground.position.z = 20;

		var textureBack = new THREE.TextureLoader().load('../img/skyfinal_0.png');
		this.background = textureBack;

		// Que no se nos olvide añadirlo a la escena, que en este caso es  this
		this.add(ground);
	}

	createParedes() {
		var geometryPared = new THREE.BoxGeometry(50, 50, 0.2);

		// El material se hará con una textura de madera
		var texture = new THREE.TextureLoader().load('../img/metalico.jpg');
		var materialPared = new THREE.MeshPhongMaterial({map: texture, transparent: false, opacity: 0.7});

		// Ya se puede construir el Mesh
		var pared = new THREE.Mesh(geometryPared, materialPared);

		// Todas las figuras se crean centradas en el origen.
		// El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
		pared.position.x = 0;
		pared.position.y = 25;
		pared.position.z = -5; //TODAS LAS PLATAFORMAS TIENEN 5 DE ANCHO


		//Izquierda
		var geomIzquierda = new THREE.BoxGeometry(0.2, 50, 100);
		this.paredIzquierda = new THREE.Mesh(geomIzquierda, materialPared);
		this.paredIzquierda.position.y = 21;
		this.paredIzquierda.position.x = -25;

		//Derecha
		var geomDerecha = new THREE.BoxGeometry(0.2, 50, 100);
		this.paredDerecha = new THREE.Mesh(geomDerecha, materialPared);
		this.paredDerecha.position.y = 21;
		this.paredDerecha.position.x = 25;


		// Que no se nos olvide añadirlo a la escena, que en este caso es  this
		this.add(pared);
		this.add(this.paredIzquierda);
		this.add(this.paredDerecha);

	}

	createGUI() {
		// Se crea la interfaz gráfica de usuario
		var gui = new GUI({width: 350});

		// La escena le va a añadir sus propios controles. 
		// Se definen mediante una   new function()
		// En este caso la intensidad de la luz y si se muestran o no los ejes
		this.guiControls = new function () {
			// En el contexto de una función   this   alude a la función
			this.lightIntensity = 0.5;
			//this.axisOnOff = true;
			this.animacion = false;
		}

		// Se crea una sección para los controles de esta clase
		var folder = gui.addFolder('Luz y Ejes');

		// Se le añade un control para la intensidad de la luz
		folder.add(this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');

		// Y otro para mostrar u ocultar los ejes
		//folder.add(this.guiControls, 'axisOnOff').name('Mostrar ejes : ');

		return gui;
	}

	createLights() {
		// Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
		// La luz ambiental solo tiene un color y una intensidad
		// Se declara como   var   y va a ser una variable local a este método
		//    se hace así puesto que no va a ser accedida desde otros métodos
		var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
		// La añadimos a la escena
		this.add(ambientLight);

		// Se crea una luz focal que va a ser la luz principal de la escena
		// La luz focal, además tiene una posición, y un punto de mira
		// Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
		// En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
		//this.spotLight = new THREE.SpotLight(0xffffff, this.guiControls.lightIntensity);
		//this.spotLight.position.set(60, 60, 200);
		//this.add(this.spotLight);
		this.directionalLight = new THREE.DirectionalLight(0xffffff, this.guiControls.lightIntensity);
		this.directionalLight.position.set(60, 60, 200);
		this.directionalLight.castShadow = true;
		this.directionalLight.shadow.camera.left = -100;
		this.directionalLight.shadow.camera.bottom = -100;
		this.directionalLight.shadow.camera.right = 100;
		this.directionalLight.shadow.camera.top = 100;
		this.add(this.directionalLight);
	}

	createRenderer(myCanvas) {
		// Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.

		// Se instancia un Renderer   WebGL
		var renderer = new THREE.WebGLRenderer();

		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.BasicShadowMap;

		// Se establece un color de fondo en las imágenes que genera el render
		renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

		// Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
		renderer.setSize(window.innerWidth, window.innerHeight);

		// La visualización se muestra en el lienzo recibido
		$(myCanvas).append(renderer.domElement);

		return renderer;
	}

	getCamera() {
		// En principio se devuelve la única cámara que tenemos
		// Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
		return this.camera;
	}

	setCameraAspect(ratio) {
		// Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
		// su sistema operativo hay que actualizar el ratio de aspecto de la cámara
		this.camera.aspect = ratio;
		// Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
		this.camera.updateProjectionMatrix();
	}

	onWindowResize() {
		// Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
		// Hay que actualizar el ratio de aspecto de la cámara
		this.setCameraAspect(window.innerWidth / window.innerHeight);

		// Y también el tamaño del renderizador
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	updateCamera() {

		//Posicion
		this.camera.position.x = this.lady.position.x;
		this.camera.position.y = this.lady.position.y + 10;
	}

	ataque() {
		var rayCaster = [];
		//Si la lady mira a la derecha, se le suma la posicion del martillo
		if (this.lady.mirandoHacia == "derecha") {
			var posicionMartillo = new THREE.Vector3(this.lady.position.x + this.lady.cajaColisionArma.position.x, this.lady.position.y + this.lady.cajaColisionArma.position.y, this.lady.position.z + this.lady.cajaColisionArma.position.z);
		}
		else {
			var posicionMartillo = new THREE.Vector3(this.lady.position.x - this.lady.cajaColisionArma.position.x, this.lady.position.y + this.lady.cajaColisionArma.position.y, -this.lady.position.z - this.lady.cajaColisionArma.position.z);
		}
		//Si la lady mira hacia la izquierda, se la restamos
		//console.log(posicionMartillo);

		var enemigos = this.mapa.cajasEnemigos;

		rayCaster.push(new THREE.Raycaster(posicionMartillo, new THREE.Vector3(0, 1, 0), 0, 0.2)); // rayCaster[0]
		rayCaster.push(new THREE.Raycaster(posicionMartillo, new THREE.Vector3(0, -1, 0), 0, 0.2)); // rayCaster[1]
		rayCaster.push(new THREE.Raycaster(posicionMartillo, new THREE.Vector3(0, 0, 1), 0, 0.2)); // rayCaster[4]
		rayCaster.push(new THREE.Raycaster(posicionMartillo, new THREE.Vector3(0, 0, -1), 0, 0.2)); // rayCaster[5]

		rayCaster.forEach(ray => {

			if (this.estadoLady == "VULNERABLE") {
				enemigos.forEach((enemigo, index) => {
					var interseccion = ray.intersectObject(enemigo, true);

					if (interseccion.length > 0) {
						//Esta parte va en la interaccion del martillo
						var muere = this.mapa.enemigos[index].golpear(); //Recogemos si ha muerto o no

						if (muere == true)
							this.mapa.enemigoMuere(index);

						console.log("Le pego al bicho");
					}
				});
			}


		});
	}

	//Para comprobar las colisiones entre el personaje principal y los muñequitos y el suelo
	colisiones() {

		var rayCaster = [];
		var posicionLady = this.lady.position;


		rayCaster.push(new THREE.Raycaster(posicionLady, new THREE.Vector3(0, -1, 0), 0, 0.5)); // rayCaster[0]
		rayCaster.push(new THREE.Raycaster(posicionLady, new THREE.Vector3(1, 0, 0), 0, 1.2)); // rayCaster[1]
		rayCaster.push(new THREE.Raycaster(posicionLady, new THREE.Vector3(-1, 0, 0), 0, 1.2)); // rayCaster[2]

		var plataformas = this.mapa.cajasPlataformas;
		var enemigos = this.mapa.cajasEnemigos;

		//console.log("Numero de enemigos: ")
		//console.log(this.mapa.cajasEnemigos);


		rayCaster.forEach(ray => {

			if (this.estadoLady == "VULNERABLE") {
				enemigos.forEach(enemigo => {
					var interseccion = ray.intersectObject(enemigo);

					if (interseccion.length > 0) {
						//this.lady.ladyGolpeada(); //Pasamos a un estado en el que indicamos que es invulnerable
						this.estadoLady = "GOLPEADA";
						this.golpeada = Date.now();
					}
				});
			}

			plataformas.forEach(plataforma => {
				var interseccion = ray.intersectObject(plataforma);
				if (interseccion.length > 0) {
					this.cayendo = false;
				}

			});
		});

		//Control del fin de juego
		if (this.lady.miVida() <= 0) {
			//Lady ha muerto, partida perdida
			this.lady.morir();
			this.perderPartida();
		}
	}

	setVida() {

		//Segun la vida que tengamos añadimos mas corazones a la vista

		document.getElementById("vida").innerHTML = '<p>SALUD</p>';

		for (var i = 0; i < this.lady.miVida(); i++)
			document.getElementById("vida").innerHTML += '<img src="../img/vida.png" />';
	}

	update() {
		// Se actualizan los elementos de la escena para cada frame
		// Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
		//this.spotLight.intensity = this.guiControls.lightIntensity;

		// Se muestran o no los ejes según lo que idique la GUI
		//this.axis.visible = this.guiControls.axisOnOff;

		// Se actualiza la posición de la camara segun el movimiento de la lady
		this.updateCamera();

		//Para ver la vida
		this.setVida();

		// Colisiones

		if (this.estado != "OFF" && this.estado != "PERDER") {
			this.colisiones();
			this.ataque();
		}
		else
			this.cayendo = false; //Para que no caiga cuando estamos en pausa

		//Si no nos quedan enemigos, hemos ganao yupiii
		if (this.mapa.cajasEnemigos.length == 0)
			this.ganarPartida();

		if (this.lady.position.y <= -10) // se ha caido al agua
			this.perderPartida();

		if (this.estadoLady == "GOLPEADA") {
			this.lady.ladyGolpeada();
			this.estadoLady = "INVULNERABLE";
		}

		//Control para quitar la invulnerabilidad
		if (this.estadoLady == "INVULNERABLE") {
			var tiempoActual = Date.now();
			var seg = (tiempoActual - this.golpeada) / 1000;

			if (seg >= 2) {
				this.estadoLady = "VULNERABLE"; //Si han pasado dos segundos desde su ultimo golpeo volvemos a su estado inicial
			}
		}

		var tiempoAct = Date.now();
		var transcurrido = (tiempoAct - this.tiempoAnterior) / 1000;
		if (this.cayendo == true)
			this.lady.position.y -= 20 * transcurrido;

		this.tiempoAnterior = tiempoAct;

		this.cayendo = true; //Tenemos que poner siempre a true aqui

		// Se actualiza el resto del modelo
		TWEEN.update();
		this.lady.update(this.guiControls.animacion);
		this.mapa.update();

		// Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
		this.renderer.render(this, this.getCamera());

		// Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
		// Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
		// Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
		requestAnimationFrame(() => this.update())
	}



	//Para el movimiento
	pulsarTecla(tecla) {
		var opcion = tecla.key.toLowerCase(); //Por si tienen activado en el teclado las mayusculas

		switch (opcion) {
			case 'a':
				if (this.estado == "ON")
					this.lady.izquierda();

				break;
			case 'y':
				if (this.estado == "ON")
					this.lady.ladyGolpeada();

				break;

			case 'd':
				if (this.estado == "ON")
					this.lady.derecha();

				break;

			case 's':
				if (this.estado == "ON")
					this.lady.mirame();
				break;

			case 'w':
				if (this.estado == "ON")
					this.lady.caer();
				break;

			case ' ':
				if (this.estado == "ON") {
					this.lady.saltar();
				} else if (this.estado == "OFF") {
					this.estado = "ON";
					//Ocultamos el mensaje de inicio
					document.getElementById("inicio").style.display = "none";
				}
				break;

			case 'n':
				console.log(this.estado);
				if (this.estado == "PERDER" || this.estado == "GANAR") {
					this.iniciarPartida();
				}

				break;

			case 'p':
				if (this.estado == "OFF") {
					this.estado = "ON";
					document.getElementById("pausa").style.display = "none";
				}
				else {
					this.estado = "OFF";
					document.getElementById("pausa").style.display = "block";
				}
				break;

			case 'q':
				if (this.estado == "ON") {
					this.lady.atacar();

				}
				break;

			default:
				break;
		}

		//Actualizar la camara
		//this.nuevoTarget = this.lady.position.clone();
		//console.log(this.nuevoTarget);
		//this.camera.lookAt(this.nuevoTarget);

	}

}

/// La función   main
$(function () {

	// Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
	var scene = new MyScene("#WebGL-output");

	// Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
	window.addEventListener("resize", () => scene.onWindowResize());
	window.addEventListener('keypress', (tecla) => scene.pulsarTecla(tecla));

	// Que no se nos olvide, la primera visualización.
	scene.update();



});

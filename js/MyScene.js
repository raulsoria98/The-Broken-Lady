
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

// Clases de mi proyecto

import { Lady } from './Lady.js'
import { Mapa } from './Mapa.js'

/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
	constructor(myCanvas) {
		super();

		// Gravedad
		this.cayendo = false;

		// Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
		this.renderer = this.createRenderer(myCanvas);

		// Construimos los distinos elementos que tendremos en la escena
		this.lady = new Lady(this);
		this.add(this.lady);

		// Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
		// Tras crear cada elemento se añadirá a la escena con   this.add(variable)
		this.createLights();

		//La camara que seguira a lady
		this.createCamera();

		// Un suelo 
		this.createGround();

		this.listener_sonido = new THREE.AudioListener();
		this.add(this.listener_sonido);

		this.iniciarPartida();

		this.tiempoAnterior = Date.now();
	}

	iniciarPartida() {
		//Mapa
		if (this.mapa)
			this.remove(this.mapa);

		this.mapa = new Mapa();
		this.add(this.mapa);

		//Objetos
		this.lady.iniciarPartida();

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

		this.musica = new THREE.Audio(this.listener_sonido);
		var audio_loader = new THREE.AudioLoader();
		var that = this;
		audio_loader.load("./audio/the_field_of_dreams.mp3", (buffer) => {
			that.musica.setBuffer(buffer);
			that.musica.setVolume(0.4);
			that.musica.setLoop(true);
			that.musica.play();
		});
	}

	perderPartida() {
		document.getElementById("perder").style.display = "block";
		this.estado = "PERDER";

		this.musica.stop();
		var game_over = new THREE.Audio(this.listener_sonido);
		var audio_loader = new THREE.AudioLoader();
		audio_loader.load("./audio/game_over_bad_chest.wav", (buffer) => {
			game_over.setBuffer(buffer);
			game_over.setVolume(0.4);
			game_over.play();
		});
	}

	ganarPartida() {
		document.getElementById("ganar").style.display = "block";
		this.estado = "GANAR";

		this.musica.stop();
		var win = new THREE.Audio(this.listener_sonido);
		var audio_loader = new THREE.AudioLoader();
		audio_loader.load("./audio/youwin.mp3", (buffer) => {
			win.setBuffer(buffer);
			win.setVolume(0.2);
			win.play();
		});
	}

	createCamera() {
		// Para crear una cámara le indicamos
		//   El ángulo del campo de visión en grados sexagesimales
		//   La razón de aspecto ancho/alto
		//   Los planos de recorte cercano y lejano
		this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
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
		var geometryGround = new THREE.BoxGeometry(500, 0.2, 50);

		// El material se hará con una textura de madera
		var texture = new THREE.TextureLoader().load('./img/water.jpg');
		var materialGround = new THREE.MeshPhongMaterial({ map: texture });

		// Ya se puede construir el Mesh
		var ground = new THREE.Mesh(geometryGround, materialGround);

		ground.position.x = 150;
		ground.position.y = -6;
		ground.position.z = 20;

		// Que no se nos olvide añadirlo a la escena, que en este caso es  this
		this.add(ground);

		var textureBack = new THREE.TextureLoader().load('./img/otrobosque.jpg');
		this.background = textureBack;
	}

	createLights() {
		// Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
		// La luz ambiental solo tiene un color y una intensidad
		var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
		// La añadimos a la escena
		this.add(ambientLight);

		this.lightIntensity = 0.5;

		// Luz direccional
		this.directionalLight = new THREE.DirectionalLight(0xffffff, this.lightIntensity);
		this.directionalLight.position.set(100, 60, 200);
		this.add(this.directionalLight);
	}

	createRenderer(myCanvas) {
		// Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.

		// Se instancia un Renderer   WebGL
		var renderer = new THREE.WebGLRenderer();

		// Se establece un color de fondo en las imágenes que genera el render
		renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

		// Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
		renderer.setSize(window.innerWidth, window.innerHeight);

		// La visualización se muestra en el lienzo recibido
		$(myCanvas).append(renderer.domElement);

		return renderer;
	}

	getCamera() {
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
		//Posicion para que siga a la Lady
		this.camera.position.x = this.lady.position.x;
		this.camera.position.y = this.lady.position.y + 10;
	}

	ataque() {
		var rayCaster = [];
		//Si la lady mira a la derecha, se le suma la posicion del martillo
		if (this.lady.mirandoHacia == "derecha") {
			var posicionMartillo = new THREE.Vector3(this.lady.position.x + this.lady.cajaColisionArma.position.x, this.lady.position.y + this.lady.cajaColisionArma.position.y, this.lady.position.z + this.lady.cajaColisionArma.position.z);
		}
		else { //Si la lady mira hacia la izquierda, se la restamos
			var posicionMartillo = new THREE.Vector3(this.lady.position.x - this.lady.cajaColisionArma.position.x, this.lady.position.y + this.lady.cajaColisionArma.position.y, this.lady.position.z - this.lady.cajaColisionArma.position.z);
		}

		var enemigos = this.mapa.cajasEnemigos;

		rayCaster.push(new THREE.Raycaster(posicionMartillo, new THREE.Vector3(0, 1, 0), 0, 0.2)); // rayCaster[0]
		rayCaster.push(new THREE.Raycaster(posicionMartillo, new THREE.Vector3(0, -1, 0), 0, 0.2)); // rayCaster[1]
		rayCaster.push(new THREE.Raycaster(posicionMartillo, new THREE.Vector3(0, 0, 1), 0, 0.3)); // rayCaster[4]
		rayCaster.push(new THREE.Raycaster(posicionMartillo, new THREE.Vector3(0, 0, -1), 0, 0.3)); // rayCaster[5]

		rayCaster.forEach(ray => {

			enemigos.forEach((enemigo, index) => {
				var interseccion = ray.intersectObject(enemigo, true);

				if (interseccion.length > 0) {
					var muere = this.mapa.enemigos[index].golpear(); //Recogemos si ha muerto o no

					if (muere == true)
						this.mapa.enemigoMuere(index);

					var sonido_martillo = new THREE.Audio(this.listener_sonido);
					var audio_loader = new THREE.AudioLoader();
					audio_loader.load("./audio/hit01.wav", (buffer) => {
						sonido_martillo.setBuffer(buffer);
						sonido_martillo.setVolume(0.1);
						sonido_martillo.play();
					});
				}
			});
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
		var vidas = this.mapa.cajasVidas;

		rayCaster.forEach(ray => {

			if (this.estadoLady == "VULNERABLE") {
				enemigos.forEach(enemigo => {
					var interseccion = ray.intersectObject(enemigo);

					if (interseccion.length > 0) {
						this.estadoLady = "GOLPEADA";
						this.golpeada = Date.now();

						var sonido_golpe = new THREE.Audio(this.listener_sonido);
						var audio_loader = new THREE.AudioLoader();
						audio_loader.load("./audio/punch.mp3", (buffer) => {
							sonido_golpe.setBuffer(buffer);
							sonido_golpe.setVolume(0.2);
							sonido_golpe.play();
						});
					}
				});
			}

			plataformas.forEach(plataforma => {
				var interseccion = ray.intersectObject(plataforma);
				if (interseccion.length > 0) {
					this.cayendo = false;
				}

			});

			vidas.forEach((vida, index) => {
				var interseccion = ray.intersectObject(vida);
				if (interseccion.length > 0) {
					this.mapa.consumirVida(index);
					this.lady.ladyCura();
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

	setEnemigos() {
		document.getElementById("enemigos").innerHTML = '<p>ENEMIGOS RESTANTES</p>';
		document.getElementById("enemigos").innerHTML += '<p>'
		document.getElementById("enemigos").innerHTML += this.mapa.cajasEnemigos.length;
		document.getElementById("enemigos").innerHTML += '</p>'
	}

	setVida() {

		//Segun la vida que tengamos añadimos mas corazones a la vista

		document.getElementById("vida").innerHTML = '<p>SALUD</p>';

		for (var i = 0; i < this.lady.miVida(); i++)
			document.getElementById("vida").innerHTML += '<img src="./img/vida.png" />';
	}

	update() {
		// Se actualizan los elementos de la escena para cada frame

		// Se actualiza la posición de la camara segun el movimiento de la lady
		this.updateCamera();

		// Para ver la vida
		this.setVida();
		// Marcador de enemigos
		this.setEnemigos();

		// Colisiones
		if (this.estado != "OFF" && this.estado != "PERDER") {
			this.colisiones();
			this.ataque();
		}
		else
			this.cayendo = false; //Para que no caiga cuando estamos en pausa

		//Si no nos quedan enemigos, hemos ganao yupiii
		if (this.mapa.cajasEnemigos.length == 0 && this.estado != "GANAR")
			this.ganarPartida();

		if (this.lady.position.y <= -10 && this.estado != "PERDER") // se ha caido al agua
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

		// Simulación de gravedad
		var tiempoAct = Date.now();
		var transcurrido = (tiempoAct - this.tiempoAnterior) / 1000;
		if (this.cayendo == true)
			this.lady.position.y -= 20 * transcurrido;

		this.tiempoAnterior = tiempoAct;

		this.cayendo = true; //Tenemos que poner siempre a true aqui

		// Se actualiza el resto del modelo
		TWEEN.update();
		this.lady.update();

		// Movimiento enemigos
		if (this.estado != "OFF" && this.estado != "PERDER") {
			this.mapa.update();
		}

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

			case 'd':
				if (this.estado == "ON")
					this.lady.derecha();

				break;

			case 's':
				if (this.estado == "ON")
					this.lady.mirame();
				break;

			case ' ':
				if (this.estado == "ON") {
					this.lady.saltar();
				} else if (this.estado == "OFF") {
					this.estado = "ON";
					//Ocultamos el mensaje de inicio
					document.getElementById("inicio").style.display = "none";

					//Para que los enemigos no empiecen a andar hasta que inicie la partida
					this.mapa.enemigos.forEach(enemigo => {
						enemigo.tiempoAnterior = Date.now();
					});
				}
				break;

			case 'n':
				if (this.estado == "PERDER" || this.estado == "GANAR") {
					this.iniciarPartida();
				}

				break;

			case 'p':
				if (this.estado == "OFF") {
					this.estado = "ON";
					document.getElementById("pausa").style.display = "none";

					// Para que los enemigos no empiecen a andar hasta que salgamos de la pausa
					this.mapa.enemigos.forEach(enemigo => {
						enemigo.tiempoAnterior = Date.now();
					});
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
	}

}

/// La función   main
$(() => {

	// Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
	var scene = new MyScene("#WebGL-output");

	// Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
	window.addEventListener("resize", () => scene.onWindowResize());
	window.addEventListener('keypress', (tecla) => scene.pulsarTecla(tecla));

	// Que no se nos olvide, la primera visualización.
	scene.update();
});

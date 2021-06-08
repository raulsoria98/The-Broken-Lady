import * as THREE from '../../libs/three.module.js'

import {Plataforma} from './Plataforma.js'
import {Gusano} from './Gusano.js'
import {Arbol} from './Arbol.js'
import {Mapache} from './Mapache.js'
import {Corazon} from './Corazon.js'

class Mapa extends THREE.Object3D {
	constructor() {
		super();

		this.plataformas = [];
		this.enemigos = [];
		this.arboles = [];
		this.vidas = [];
		this.cajasVidas = [];
		this.cajasEnemigos = [];
		this.cajasPlataformas = [];
		var salto = 5;
		var altura_plat = 4;
		var delante = 10;
		var detras = -delante;


		// PLATAFORMAS
		//Punto de inicio
		this.plataformas.push(new Plataforma(50, altura_plat));
		this.plataformas[0].modificarPosicion(0, -altura_plat);
		this.arboles.push(new Arbol());
		this.arboles[0].modificarPosicion(this.plataformas[0].position.x - 20, this.plataformas[0].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[1].modificarPosicion(this.plataformas[0].position.x - 20, this.plataformas[0].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[2].modificarPosicion(this.plataformas[0].position.x + 0, this.plataformas[0].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[3].modificarPosicion(this.plataformas[0].position.x + 20, this.plataformas[0].position.y + altura_plat, detras);

		//Nivel 1
		this.plataformas.push(new Plataforma(10, altura_plat));
		this.plataformas[1].modificarPosicion(this.plataformas[0].position.x + this.plataformas[0].ancho() / 2 + this.plataformas[1].ancho() / 2, salto * 0);

		//Nivel 2
		this.plataformas.push(new Plataforma(100, altura_plat));
		this.plataformas[2].modificarPosicion(this.plataformas[1].position.x + this.plataformas[1].ancho() / 2 + this.plataformas[2].ancho() / 2, salto * 1);
		this.arboles.push(new Arbol());
		this.arboles[4].modificarPosicion(this.plataformas[2].position.x - 40, this.plataformas[2].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[5].modificarPosicion(this.plataformas[2].position.x - 30, this.plataformas[2].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[6].modificarPosicion(this.plataformas[2].position.x - 20, this.plataformas[2].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[7].modificarPosicion(this.plataformas[2].position.x - 5, this.plataformas[2].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[8].modificarPosicion(this.plataformas[2].position.x + 5, this.plataformas[2].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[9].modificarPosicion(this.plataformas[2].position.x + 20, this.plataformas[2].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[10].modificarPosicion(this.plataformas[2].position.x + 25, this.plataformas[2].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[11].modificarPosicion(this.plataformas[2].position.x + 40, this.plataformas[2].position.y + altura_plat, detras);

		//Nivel 3
		this.plataformas.push(new Plataforma(50, altura_plat));
		this.plataformas[3].modificarPosicion(this.plataformas[2].position.x + this.plataformas[2].ancho() / 2 + this.plataformas[3].ancho() / 2, salto * 0);
		this.arboles.push(new Arbol());
		this.arboles[12].modificarPosicion(this.plataformas[3].position.x - 18, this.plataformas[3].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[13].modificarPosicion(this.plataformas[3].position.x - 0, this.plataformas[3].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[14].modificarPosicion(this.plataformas[3].position.x + 18, this.plataformas[3].position.y + altura_plat, detras);

		//Nivel 4
		this.plataformas.push(new Plataforma(100, altura_plat));
		this.plataformas[4].modificarPosicion(this.plataformas[3].position.x + this.plataformas[3].ancho() / 2 + this.plataformas[4].ancho() / 2, salto * 1);
		this.arboles.push(new Arbol());
		this.arboles[15].modificarPosicion(this.plataformas[4].position.x - 40, this.plataformas[4].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[16].modificarPosicion(this.plataformas[4].position.x - 30, this.plataformas[4].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[17].modificarPosicion(this.plataformas[4].position.x - 20, this.plataformas[4].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[18].modificarPosicion(this.plataformas[4].position.x - 5, this.plataformas[4].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[19].modificarPosicion(this.plataformas[4].position.x + 5, this.plataformas[4].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[20].modificarPosicion(this.plataformas[4].position.x + 20, this.plataformas[4].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[21].modificarPosicion(this.plataformas[4].position.x + 25, this.plataformas[4].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[22].modificarPosicion(this.plataformas[4].position.x + 40, this.plataformas[4].position.y + altura_plat, detras);
		
		//Nivel 5 (Salto)
		this.plataformas.push(new Plataforma(50, altura_plat));
		this.plataformas[5].modificarPosicion(this.plataformas[4].position.x + this.plataformas[4].ancho() / 2 + this.plataformas[5].ancho() / 2, salto * 3);
		this.arboles.push(new Arbol());
		this.arboles[23].modificarPosicion(this.plataformas[5].position.x - 18, this.plataformas[5].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[24].modificarPosicion(this.plataformas[5].position.x - 0, this.plataformas[5].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[25].modificarPosicion(this.plataformas[5].position.x + 18, this.plataformas[5].position.y + altura_plat, detras);

		//Nivel 6
		this.plataformas.push(new Plataforma(50, altura_plat));
		this.plataformas[6].modificarPosicion(this.plataformas[5].position.x - this.plataformas[5].ancho() / 2 - this.plataformas[6].ancho() / 2, salto * 5);
		this.arboles.push(new Arbol());
		this.arboles[26].modificarPosicion(this.plataformas[6].position.x - 18, this.plataformas[6].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[27].modificarPosicion(this.plataformas[6].position.x - 0, this.plataformas[6].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[28].modificarPosicion(this.plataformas[6].position.x + 18, this.plataformas[6].position.y + altura_plat, detras);

		//Nivel 7
		this.plataformas.push(new Plataforma(70, altura_plat));
		this.plataformas[7].modificarPosicion(this.plataformas[6].position.x - this.plataformas[6].ancho() / 2 - this.plataformas[7].ancho() / 2, salto * 6);
		this.arboles.push(new Arbol());
		this.arboles[29].modificarPosicion(this.plataformas[7].position.x - 30, this.plataformas[7].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[30].modificarPosicion(this.plataformas[7].position.x - 18, this.plataformas[7].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[31].modificarPosicion(this.plataformas[7].position.x - 8, this.plataformas[7].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[32].modificarPosicion(this.plataformas[7].position.x + 8, this.plataformas[7].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[33].modificarPosicion(this.plataformas[7].position.x + 18, this.plataformas[7].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[34].modificarPosicion(this.plataformas[7].position.x + 30, this.plataformas[7].position.y + altura_plat, detras);

		//Nivel 8
		this.plataformas.push(new Plataforma(30, altura_plat));
		this.plataformas[8].modificarPosicion(this.plataformas[7].position.x - this.plataformas[7].ancho() / 2 - this.plataformas[8].ancho() / 2, salto * 7);
		this.arboles.push(new Arbol());
		this.arboles[35].modificarPosicion(this.plataformas[8].position.x - 8, this.plataformas[8].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[36].modificarPosicion(this.plataformas[8].position.x + 8, this.plataformas[8].position.y + altura_plat, detras);

		//Nivel 9
		this.plataformas.push(new Plataforma(70, altura_plat));
		this.plataformas[9].modificarPosicion(this.plataformas[8].position.x - this.plataformas[8].ancho() / 2 - this.plataformas[9].ancho() / 2, salto * 8);
		this.arboles.push(new Arbol());
		this.arboles[37].modificarPosicion(this.plataformas[9].position.x - 30, this.plataformas[9].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[38].modificarPosicion(this.plataformas[9].position.x - 18, this.plataformas[9].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[39].modificarPosicion(this.plataformas[9].position.x - 8, this.plataformas[9].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[40].modificarPosicion(this.plataformas[9].position.x + 8, this.plataformas[9].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[41].modificarPosicion(this.plataformas[9].position.x + 18, this.plataformas[9].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[42].modificarPosicion(this.plataformas[9].position.x + 30, this.plataformas[9].position.y + altura_plat, detras);
		// VIDA
		this.vidas.push(new Corazon());
		this.vidas[0].modificarPosicion(this.plataformas[9].position.x + 0, this.plataformas[9].position.y + altura_plat);


		//Nivel 10 (Salto)
		this.plataformas.push(new Plataforma(30, altura_plat));
		this.plataformas[10].modificarPosicion(this.plataformas[9].position.x - this.plataformas[9].ancho() / 2 - this.plataformas[10].ancho() / 2, salto * 10);
		this.arboles.push(new Arbol());
		this.arboles[43].modificarPosicion(this.plataformas[10].position.x - 8, this.plataformas[10].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[44].modificarPosicion(this.plataformas[10].position.x + 8, this.plataformas[10].position.y + altura_plat, detras);

		//Nivel 11
		this.plataformas.push(new Plataforma(100, altura_plat));
		this.plataformas[11].modificarPosicion(this.plataformas[10].position.x + this.plataformas[10].ancho() / 2 + this.plataformas[11].ancho() / 2, salto * 12);
		this.arboles.push(new Arbol());
		this.arboles[45].modificarPosicion(this.plataformas[11].position.x - 40, this.plataformas[11].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[46].modificarPosicion(this.plataformas[11].position.x - 30, this.plataformas[11].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[47].modificarPosicion(this.plataformas[11].position.x - 20, this.plataformas[11].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[48].modificarPosicion(this.plataformas[11].position.x - 5, this.plataformas[11].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[49].modificarPosicion(this.plataformas[11].position.x + 5, this.plataformas[11].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[50].modificarPosicion(this.plataformas[11].position.x + 20, this.plataformas[11].position.y + altura_plat, detras);
		this.arboles.push(new Arbol());
		this.arboles[51].modificarPosicion(this.plataformas[11].position.x + 25, this.plataformas[11].position.y + altura_plat, delante);
		this.arboles.push(new Arbol());
		this.arboles[52].modificarPosicion(this.plataformas[11].position.x + 40, this.plataformas[11].position.y + altura_plat, detras);

		// ENEMIGOS
		this.enemigos.push(new Gusano(this.plataformas[0]));
		this.enemigos[0].modificarPosicion(this.plataformas[0].position.x + 12, this.plataformas[0].position.y + altura_plat);

		this.enemigos.push(new Gusano(this.plataformas[2]));
		this.enemigos[1].modificarPosicion(this.plataformas[2].position.x - 20, this.plataformas[2].position.y + altura_plat);

		this.enemigos.push(new Gusano(this.plataformas[2]));
		this.enemigos[2].modificarPosicion(this.plataformas[2].position.x + 40, this.plataformas[2].position.y + altura_plat);

		this.enemigos.push(new Gusano(this.plataformas[3]));
		this.enemigos[3].modificarPosicion(this.plataformas[3].position.x + 20, this.plataformas[3].position.y + altura_plat);

		this.enemigos.push(new Gusano(this.plataformas[4]));
		this.enemigos[4].modificarPosicion(this.plataformas[4].position.x + 0, this.plataformas[4].position.y + altura_plat);

		this.enemigos.push(new Mapache(this.plataformas[5]));
		this.enemigos[5].modificarPosicion(this.plataformas[5].position.x + 0, this.plataformas[5].position.y + altura_plat);

		this.enemigos.push(new Gusano(this.plataformas[6]));
		this.enemigos[6].modificarPosicion(this.plataformas[6].position.x - 15, this.plataformas[6].position.y + altura_plat);

		this.enemigos.push(new Mapache(this.plataformas[7]));
		this.enemigos[7].modificarPosicion(this.plataformas[7].position.x - 25, this.plataformas[7].position.y + altura_plat);

		this.enemigos.push(new Mapache(this.plataformas[9]));
		this.enemigos[8].modificarPosicion(this.plataformas[9].position.x - 15, this.plataformas[9].position.y + altura_plat);

		this.enemigos.push(new Gusano(this.plataformas[11]));
		this.enemigos[9].modificarPosicion(this.plataformas[11].position.x - 40, this.plataformas[11].position.y + altura_plat);

		this.enemigos.push(new Mapache(this.plataformas[11]));
		this.enemigos[10].modificarPosicion(this.plataformas[11].position.x + 40, this.plataformas[11].position.y + altura_plat);

		this.plataformas.forEach(plataforma => {
			this.add(plataforma);
			this.cajasPlataformas.push(plataforma.arriba);
			this.cajasPlataformas.push(plataforma.abajo);
		});

		this.enemigos.forEach(enemigo => {
			this.add(enemigo);
			this.cajasEnemigos.push(enemigo.cajaColision);
		});

		this.arboles.forEach(arbol => {
			this.add(arbol);
		});

		this.vidas.forEach(vida => {
			this.add(vida);
			this.cajasVidas.push(vida.cajaColision);
		})
	}


	consumirVida(i) {
		console.log("Se consume la vida: ")
		console.log(i);
		this.vidas[i].consumirVida();
		this.cajasVidas.splice(i, 1);
		this.vidas.splice(i, 1);
	}

	enemigoMuere(enemy) {
		console.log("Muere el enemigo: ")
		console.log(enemy);
		this.cajasEnemigos.splice(enemy, 1);
		this.enemigos.splice(enemy, 1);
	}


	update() {
		this.enemigos.forEach(enemigo => {
			enemigo.update();
		});

		this.vidas.forEach(vida => {
			vida.update();
		});
	}
}

export {Mapa}

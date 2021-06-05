import * as THREE from '../libs/three.module.js'

import { Plataforma } from './Plataforma.js'
import { Gusano } from './Gusano.js'

class Mapa extends THREE.Object3D{
    constructor(){
        super();

        this.plataformas = [];
        this.enemigos = [];
        this.cajasEnemigos = [];
        this.cajasPlataformas = [];

        var salto = 4;
        var amplitudSalto = 2;

        //Punto de inicio
        this.plataformas.push(new Plataforma(50,4));
        this.plataformas[0].modificarPosicion(0, -salto);
        
        //Nivel 1
        this.plataformas.push(new Plataforma(10,4));
        this.enemigos.push(new Gusano());
        this.enemigos[0].modificarPosicion(6, this.enemigos[0].position.y);
        
        //this.plataformas.push(new Plataforma(10,4));
        //this.plataformas.push(new Plataforma(10,4));
        //this.plataformas.push(new Plataforma(10,4));
        //this.plataformas.push(new Plataforma(10,4));

        this.plataformas[1].modificarPosicion(this.plataformas[0].ancho()/2 + this.plataformas[1].ancho()/2 + amplitudSalto , 0);
        //this.plataformas[2].modificarPosicion(this.plataformas[0].ancho()/2 + amplitudSalto * 2 , 0);
        //this.plataformas[3].modificarPosicion(this.plataformas[0].ancho()/2 + amplitudSalto * 3, 0);
        //this.plataformas[4].modificarPosicion(this.plataformas[0].ancho()/2 + amplitudSalto * 4, 0);
        //this.plataformas[5].modificarPosicion(this.plataformas[0].ancho()/2 + amplitudSalto * 5, 0);

        //Nivel 2
        //this.plataformas.push(new Plataforma(10,4));
        //this.plataformas.push(new Plataforma(10,4));
        //this.plataformas.push(new Plataforma(10,4));
        //this.plataformas.push(new Plataforma(10,4));
        //this.plataformas.push(new Plataforma(30,2));


        //this.plataformas[6].modificarPosicion(this.plataformas[0].ancho()/2 + 10 , salto);
        //this.plataformas[7].modificarPosicion(this.plataformas[0].ancho()/2 + amplitudSalto, salto);
        //this.plataformas[8].modificarPosicion(this.plataformas[0].ancho()/2 + amplitudSalto, salto);
        //this.plataformas[9].modificarPosicion(this.plataformas[0].ancho()/2 + amplitudSalto, salto);
        //this.plataformas[10].modificarPosicion(this.plataformas[0].ancho()/2 + this.plataformas[10].ancho()/2 + amplitudSalto, salto + 2);

        //Nivel 3
        
        //this.plataformas.push(new Plataforma(10,4));
        //this.plataformas.push(new Plataforma(10,4));
        //this.plataformas.push(new Plataforma(10,4));
        //this.plataformas.push(new Plataforma(10,4));
        //this.plataformas.push(new Plataforma(30,2));

        //this.plataformas[11].modificarPosicion(this.plataformas[0].ancho()/2 + this.plataformas[1].ancho() + this.plataformas[6].ancho()/2 + this.plataformas[11].ancho()/2 , salto*2);
        //this.plataformas[12].modificarPosicion(this.plataformas[0].ancho()/2 + this.plataformas[1].ancho() + this.plataformas[6].ancho()/2 + this.plataformas[12].ancho()/2 * 2 , salto*2);
        //this.plataformas[13].modificarPosicion(this.plataformas[0].ancho()/2 + this.plataformas[1].ancho() + this.plataformas[6].ancho()/2 + this.plataformas[13].ancho()/2 * 3, salto*2);
        //this.plataformas[14].modificarPosicion(this.plataformas[0].ancho()/2 + this.plataformas[1].ancho() + this.plataformas[6].ancho()/2 + this.plataformas[14].ancho()/2 * 4, salto*2);
        //this.plataformas[15].modificarPosicion(this.plataformas[0].ancho()/2 + this.plataformas[15].ancho()/2 + amplitudSalto, salto*2 + 2);
        
        //Nivel 4
        this.plataformas.forEach(plataforma => {
            this.add(plataforma);
            this.cajasPlataformas.push(plataforma.arriba);
            this.cajasPlataformas.push(plataforma.abajo);
        });

        this.enemigos.forEach(enemigo =>{
            this.add(enemigo);
            this.cajasEnemigos.push(enemigo.cajaColision);
        });
    }
}

export { Mapa }
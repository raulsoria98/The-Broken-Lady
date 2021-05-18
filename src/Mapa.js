import * as THREE from '../libs/three.module.js'

import { Plataforma } from './Plataforma.js'

class Mapa extends THREE.Object3D{
    constructor(){
        super();

        this.plataformas = [];

        this.plataformas.push(new Plataforma(24,5));
        this.plataformas.push(new Plataforma(10,5));
        this.plataformas.push(new Plataforma(20,5));
        this.plataformas.push(new Plataforma(5,5));
        this.plataformas.push(new Plataforma(8,5));

        this.plataformas[1].modificarPosicion(19, 5);
        this.plataformas[2].modificarPosicion(36, 5);
        this.plataformas[3].modificarPosicion(50, 10);
        this.plataformas[4].modificarPosicion(58, 15);
        
        this.plataformas.forEach(plataforma => {
            this.add(plataforma);
        });
    }
}

export { Mapa }
import * as THREE from '../libs/three.module.js'

class Cucaracha extends THREE.Object3D{
    constructor(){
        super();

        var texturaCuerpo = new THREE.TextureLoader().load('../img/cuerpo.jpeg');
        var materialCuerpo = new THREE.MeshPhongMaterial({ map: texturaCuerpo });

        var geomCuerpo = new THREE.SphereBufferGeometry(2, 30, 30);
        this.cucaracha = new THREE.Mesh(geomCuerpo, materialCuerpo);

        this.cucaracha.scale.x = 1.5;
        this.cucaracha.position.y = this.cucaracha.geometry.parameters.radius;

        this.add(this.cucaracha);
    }

    modificarPosicion(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
}

export { Cucaracha }
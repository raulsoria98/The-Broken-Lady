import * as THREE from '../libs/three.module.js'

class Plataforma extends THREE.Object3D{
    constructor(largo, alto){
        super();

        var texturaAbajo = new THREE.TextureLoader().load('../img/ladrillo-gris.jpg');
        var materialAbajo = new THREE.MeshPhongMaterial({ map: texturaAbajo });
        var texturaArriba = new THREE.TextureLoader().load('../img/hierba-verde.png');
        var materialArriba = new THREE.MeshPhongMaterial({ map: texturaArriba });

        var geomArriba = new THREE.BoxBufferGeometry(largo, alto/2, 10);
        var geomAbajo = new THREE.BoxBufferGeometry(largo - 1, alto/2, 9);
        geomAbajo.translate(0, geomAbajo.parameters.height / 2, 0);
        geomArriba.translate(0, geomArriba.parameters.height / 2 + geomAbajo.parameters.height, 0);

        this.arriba = new THREE.Mesh(geomArriba, materialArriba);
        this.abajo = new THREE.Mesh(geomAbajo, materialAbajo);

        this.plataforma = new THREE.Object3D();
        this.plataforma.add(this.arriba, this.abajo);
        
        this.add(this.plataforma);
    }

    modificarPosicion(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
}

export { Plataforma }
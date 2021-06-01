class Plataforma {
    constructor(scene, largo, alto){
  
        var texturaAbajo = new THREE.TextureLoader().load('../img/ladrillo-gris.jpg');
        var materialAbajo = new THREE.MeshPhongMaterial({ map: texturaAbajo });
        var texturaArriba = new THREE.TextureLoader().load('../img/hierba-verde.png');
        var materialArriba = new THREE.MeshPhongMaterial({ map: texturaArriba });
        this.largo = largo;

        var geomArriba = new THREE.BoxGeometry(largo, alto/2, 10);
        var geomAbajo = new THREE.BoxGeometry(largo - 1, alto/2, 9);

        var materialHierba = Physijs.createMaterial( materialArriba, 0.1, 0.9);
        var materialPiedra = Physijs.createMaterial( materialAbajo, 0.1, 0.9);

        geomAbajo.translate(0, geomAbajo.parameters.height / 2, 0);
        geomArriba.translate(0, geomArriba.parameters.height / 2 + geomAbajo.parameters.height, 0);

        this.arriba = new Physijs.BoxMesh(geomArriba, materialHierba, 20);
        this.abajo = new Physijs.BoxMesh(geomAbajo, materialPiedra, 20);
        // this.arriba = new THREE.Mesh(geomArriba, materialArriba);
        // this.abajo = new THREE.Mesh(geomAbajo, materialAbajo);

        //Constrait
        // var constraint = new Physijs.SliderConstraint(this.arriba, this.abajo, this.arriba.geometry.parameters.position);

        this.arriba.add(this.abajo);
        // scene.add(this.arriba);
        // scene.addConstraint(constraint);
        scene.add(this.arriba);
    }

    modificarPosicion(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    ancho(){
        return this.largo;
    }
}
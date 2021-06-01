import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'


function degToRad(deg) {
	return deg * (Math.PI / 180);
}

class Cucaracha extends THREE.Object3D{
    constructor(){
        super();
        
        //Cuerpo
        var texturaCuerpo = new THREE.TextureLoader().load('../img/metalico.jpg');
        var materialCuerpo = new THREE.MeshPhongMaterial({ map: texturaCuerpo });

        var geomCuerpo = new THREE.SphereBufferGeometry(2, 30, 30);
        this.cucaracha = new THREE.Mesh(geomCuerpo, materialCuerpo);
    

        this.cucaracha.scale.x = 1.5;
        this.cucaracha.position.y = this.cucaracha.geometry.parameters.radius;
        this.cucaracha.position.x = this.cucaracha.geometry.parameters.radius ;

        

        //Cabeza
        var geomCabeza = new THREE.SphereBufferGeometry(1.5, 30, 30);
        this.cabeza = new THREE.Mesh(geomCabeza, materialCuerpo);
        
        //Cuerno
       var geomCuerno = new THREE.ConeBufferGeometry(0.3, 0.8);
       var texturaCuerno = new THREE.TextureLoader().load('../img/cuerpo.jpeg');
       var materialCuerno = new THREE.MeshPhongMaterial({ map: texturaCuerno });
       
       this.cuerno = new THREE.Mesh(geomCuerno, materialCuerno);
       
        
        //Ojos
        var geomOjo = new THREE.SphereBufferGeometry(0.5, 30, 30);
        var materialOjitos = new THREE.MeshPhongMaterial({color: 0x000000, transparent: true, opacity: 0.7});

        this.ojoI = new THREE.Mesh(geomOjo, materialOjitos);
		this.ojoI.scale.y = geomOjo.parameters.radius * 0.5;
		this.ojoI.scale.x = geomOjo.parameters.radius * 0.5;
		this.ojoI.scale.z = geomOjo.parameters.radius * 0.5; 

		this.ojoI.position.set(0.4, 0.4, this.cabeza.geometry.parameters.radius);


		this.ojoD = new THREE.Mesh(geomOjo, materialOjitos);
		this.ojoD.scale.y = geomOjo.parameters.radius * 0.5; 
		this.ojoD.scale.x = geomOjo.parameters.radius * 0.5;
		this.ojoD.scale.z = geomOjo.parameters.radius * 0.5; 
	
		this.ojoD.position.set(-0.4, 0.4, this.cabeza.geometry.parameters.radius);

        this.cuerno.position.y = geomCabeza.parameters.radius ;

        this.cabezilla = new THREE.Object3D();
        this.cabezilla.add(this.cabeza);
        this.cabezilla.add(this.ojoD);
        this.cabezilla.add(this.ojoI);
        this.cabezilla.add(this.cuerno);

        this.cabezilla.position.x = this.cucaracha.geometry.parameters.radius*3 - 0.2;
        this.cabezilla.position.y = this.cabeza.geometry.parameters.radius + this.cucaracha.geometry.parameters.radius;
        this.cabezilla.rotation.y =  Math.PI / 2;

        

        

        //Patas
        var numPatas = 6;
        var geomPata = new THREE.CylinderBufferGeometry(0.2, 0.2, 0.8, 4, 30);
        this.patas = [];
        
   
        for(var x = 0 ; x < numPatas ; x++){
            var tmp = new THREE.Mesh(geomPata, materialCuerpo);
            tmp.position.y = geomPata.parameters.height/3;

            if(x % 2 == 0){
                //Subimos una pata derecha
                tmp.position.z = geomPata.parameters.radiusTop;

                tmp.position.x = geomPata.parameters.radiusTop * x + x/2;
            }else{
                //Subimos una pata izquierda
                tmp.position.z = -geomPata.parameters.radiusTop;
                tmp.position.x =  geomPata.parameters.radiusTop * x + x/2;
            }

            this.patas.push(tmp);
        }

        this.pata1 = new THREE.Mesh(geomPata, materialCuerpo);

        //Final
        this.final = new THREE.Object3D();
        this.final.add(this.cucaracha);
        this.final.add(this.cabezilla);
        this.patas.forEach(pata => {
            this.final.add(pata);
        });
        this.final.scale.x = 0.4;
        this.final.scale.y = 0.75;
        this.final.scale.z = 0.75;


        //Movimiento
        var origen0 = {derecha: 0, izquierda: 0}
		var fin0 = {derecha: -35, izquierda: 35}

        var movimiento0 = new TWEEN.Tween(origen0)
				.to(fin0, 300)
				.easing(TWEEN.Easing.Quadratic.InOut)
				.onUpdate(() => {
                    for(var i = 0 ; i < numPatas ; i++){
                        if(i % 2 == 0){
                            this.patas[i].rotation.z = degToRad(origen0.derecha);
                        }else{
                            this.patas[i].rotation.z = degToRad(origen0.izquierda);
                        }
                    }
				})

        var origen1 = {derecha:-35, izquierda: 35}
		var fin1 = {derecha: 0, izquierda: 0}

        var movimiento1 = new TWEEN.Tween(origen1)
				.to(fin1, 300)
				.easing(TWEEN.Easing.Quadratic.InOut)
				.onUpdate(() => {
                    for(var i = 0 ; i < numPatas ; i++){
                        if(i % 2 == 0){
                            this.patas[i].rotation.z = degToRad(origen1.derecha);
                        }else{
                            this.patas[i].rotation.z = degToRad(origen1.izquierda);
                        }
                    }
				})

        var origen2 = {derecha:0, izquierda: 0}
		var fin2 = {derecha: 35, izquierda: -35}

        var movimiento2 = new TWEEN.Tween(origen2)
				.to(fin2, 300)
				.easing(TWEEN.Easing.Quadratic.InOut)
				.onUpdate(() => {
                    for(var i = 0 ; i < numPatas ; i++){
                        if(i % 2 == 0){
                            this.patas[i].rotation.z = degToRad(origen2.derecha);
                        }else{
                            this.patas[i].rotation.z = degToRad(origen2.izquierda);
                        }
                    }
				})


        var origen3 = {derecha:35, izquierda: -35}
		var fin3 = {derecha: 0, izquierda: 0}

        var movimiento3 = new TWEEN.Tween(origen3)
				.to(fin3, 300)
				.easing(TWEEN.Easing.Quadratic.InOut)
				.onUpdate(() => {
                    for(var i = 0 ; i < numPatas ; i++){
                        if(i % 2 == 0){
                            this.patas[i].rotation.z = degToRad(origen3.derecha);
                        }else{
                            this.patas[i].rotation.z = degToRad(origen3.izquierda);
                        }
                    }
				}).onComplete(() => movimiento0.start())

        movimiento2.chain(movimiento3);
        movimiento1.chain(movimiento2);
        movimiento0.chain(movimiento1);
        
        
        

        
        movimiento0.start();

        this.add(this.final);

    }

    modificarPosicion(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    update(){
        TWEEN.update();
    }
}

export { Cucaracha }
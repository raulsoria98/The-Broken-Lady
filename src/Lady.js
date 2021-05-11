import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

class Lady extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        //Cabeza - nodo
        //Materiales
        var texturaCuerpo = new THREE.TextureLoader().load('../img/cuerpo.jpeg');
        var materialCuerpo = new THREE.MeshPhongMaterial({ map: texturaCuerpo });
        var materialOjitos = new THREE.MeshPhongMaterial({ color: 0x000000, transparent: true, opacity: 0.7 });
        var materialMofletes = new THREE.MeshPhongMaterial({ color: 0xFF0000, transparent: true, opacity: 0.7 });

        //Geometria ovalo
        var geomOvalo = new THREE.SphereBufferGeometry(1, 30, 30);

        //Malla cabeza
        this.craneo = new THREE.Mesh(geomOvalo, materialCuerpo);
        this.craneo.scale.y = 1.2;
        this.craneo.scale.x = 1.1;
        this.craneo.scale.z = 0.9;

        //Ojos
        this.ojoD = new THREE.Mesh(geomOvalo, materialOjitos);
        this.ojoD.scale.y = 1.2 * 0.4;
        this.ojoD.scale.x = 1.1 * 0.3;
        this.ojoD.scale.z = 0.9 * 0.2;
        this.ojoD.rotation.y = 0.4;
        this.ojoD.rotation.x = -0.4;
        this.ojoD.position.set(0.4, 0.4, 0.65);


        this.ojoI = new THREE.Mesh(geomOvalo, materialOjitos);
        this.ojoI.scale.y = 1.2 * 0.4;
        this.ojoI.scale.x = 1.1 * 0.3;
        this.ojoI.scale.z = 0.9 * 0.2;
        this.ojoI.rotation.y = -0.4;
        this.ojoI.rotation.x = -0.4;
        this.ojoI.position.set(-0.4, 0.4, 0.65);

        //Mofletes
        this.mofleteD = new THREE.Mesh(geomOvalo, materialMofletes);
        this.mofleteD.scale.y = 1.2 * 0.3;
        this.mofleteD.scale.x = 1.1 * 0.2;
        this.mofleteD.scale.z = 0.9 * 0.2;
        this.mofleteD.rotation.x = -0.4;
        this.mofleteD.rotation.z = Math.PI / 2;
        this.mofleteD.position.set(0.4, -0.025, 0.6);


        this.mofleteI = new THREE.Mesh(geomOvalo, materialMofletes);
        this.mofleteI.scale.y = 1.2 * 0.3;
        this.mofleteI.scale.x = 1.1 * 0.2;
        this.mofleteI.scale.z = 0.9 * 0.2;
        this.mofleteI.rotation.x = -0.4;
        this.mofleteI.rotation.z = Math.PI / 2;
        this.mofleteI.position.set(-0.4, -0.025, 0.6);

        //Cuernos
        //Material cuernos
        var texturaMadera =  new THREE.TextureLoader().load('../img/madera-negra.jpg');
        var materialCuernos = new THREE.MeshPhongMaterial({ map: texturaMadera,  transparent: true, opacity: 0.8});
        
        // Variables para la animacion
        this.altura_cuernos = 1.2;
        this.ancho_cuernos = 1;
        this.subir = true;
        
        //Geometria y creacion de las mallas de lo cuernos
        var cuernoGeom = new THREE.ConeBufferGeometry(0.2,0.5,30,30);

        this.cuernoI = new THREE.Mesh(cuernoGeom, materialCuernos);
        this.cuernoI.position.set(-this.ancho_cuernos, this.altura_cuernos, 0);
        this.cuernoI.rotation.z = degToRad(40);

        this.cuernoD = new THREE.Mesh(cuernoGeom, materialCuernos);
        this.cuernoD.position.set(this.ancho_cuernos, this.altura_cuernos, 0);
        this.cuernoD.rotation.z = degToRad(-40);


        this.cabeza = new THREE.Object3D();
        this.cabeza.add(this.craneo, this.ojoD, this.ojoI, this.mofleteD, this.mofleteI, this.cuernoD, this.cuernoI);
        this.cabeza.position.y = 1;

        // TODO: ¿Cómo podemos hacer una capa?
        //Cuerpo
        //Textura
        var texturaVestido = new THREE.TextureLoader().load('../img/vestido.jpg');
       
        //Materiales
        var materialTronquillo1 = new THREE.MeshPhongMaterial({ map: texturaVestido, color: 0x8d0002 });
        var materialTronquillo2 = new THREE.MeshPhongMaterial({ map: texturaVestido, color: 0x8d0002 });


        //Tronco
        var tronco1Geom = new THREE.CylinderBufferGeometry(0.5, 1.1, 1.7, 30, 30);
        this.tronco1 = new THREE.Mesh(tronco1Geom, materialTronquillo1);
        this.tronco1.position.y = -tronco1Geom.parameters.height / 2;
        this.tronco1.rotation.y = Math.PI;


        var tronco2Geom = new THREE.CylinderBufferGeometry(1.1, 1.8, 0.9, 30, 30);
        this.tronco2 = new THREE.Mesh(tronco2Geom, materialTronquillo2);
        this.tronco2.position.y = -tronco1Geom.parameters.height - tronco2Geom.parameters.height / 2;
        this.tronco2.rotation.y = Math.PI;

        this.cuerpo = new THREE.Object3D();
        this.cuerpo.add(this.tronco1, this.tronco2, this.cabeza);
        this.cuerpo.position.y = tronco1Geom.parameters.height + tronco2Geom.parameters.height;

        //Brazos
        var hombroGeom = new THREE.SphereBufferGeometry(0.3, 30, 30);
        var brazoGeom = new THREE.CylinderBufferGeometry(0.1, 0.3, 2, 30, 30);
        var manoGeom = new THREE.SphereBufferGeometry(0.2, 30, 30);

        //Brazo Derecho
        this.brazoDM = new THREE.Mesh(brazoGeom, materialCuerpo);
        this.brazoDM.rotation.z = -Math.PI / 2;
        this.brazoDM.position.x = brazoGeom.parameters.height / 2 + hombroGeom.parameters.radius - 0.1;
        this.hombroDM = new THREE.Mesh(hombroGeom, materialCuerpo);
        this.hombroDM.add(this.brazoDM);
        this.manoDM = new THREE.Mesh(manoGeom, materialCuerpo);
        this.manoDM.position.x = manoGeom.parameters.radius + hombroGeom.parameters.radius + brazoGeom.parameters.height - 0.2;

        //Brazo Izquierdo
        this.brazoIM = new THREE.Mesh(brazoGeom, materialCuerpo);
        this.brazoIM.rotation.z = Math.PI / 2;
        this.brazoIM.position.x = - (brazoGeom.parameters.height / 2 + hombroGeom.parameters.radius - 0.1);
        this.hombroIM = new THREE.Mesh(hombroGeom, materialCuerpo);
        this.hombroIM.add(this.brazoIM);
        this.manoIM = new THREE.Mesh(manoGeom, materialCuerpo);
        this.manoIM.position.x = -(manoGeom.parameters.radius + hombroGeom.parameters.radius + brazoGeom.parameters.height - 0.2);

        // Arma
        var geomMango = new THREE.CylinderBufferGeometry(0.15, 0.15, 2, 30, 30);
        var geomMazo = new THREE.BoxBufferGeometry(2,0.7,0.7);

        this.mango = new THREE.Mesh(geomMango, materialCuerpo);
        this.mazo = new THREE.Mesh(geomMazo, materialCuernos);
        this.mazo.position.y += this.mazo.geometry.parameters.height/2 + this.mango.geometry.parameters.height;
        this.mango.position.y += this.mango.geometry.parameters.height/2;

        this.arma = new THREE.Object3D();
        this.arma.add(this.mango, this.mazo);
        this.arma.rotation.y += degToRad(90);
        this.arma.position.x += this.brazoIM.geometry.parameters.height + this.hombroIM.geometry.parameters.radius;

        //Nodo brazos Izq
        var altura_brazos = 1.85;
        var separacion_brazos = 0.4;

        this.brazoI = new THREE.Object3D();
        this.brazoI.add(this.hombroIM, this.manoIM);
        this.brazoI.position.y = altura_brazos;
        this.brazoI.position.x = -separacion_brazos;
        this.brazoI.rotation.z = degToRad(40);

        //Nodo brazos Dcho
        this.brazoD = new THREE.Object3D();
        this.brazoD.add(this.hombroDM, this.manoDM, this.arma);
        this.brazoD.position.y = altura_brazos;
        this.brazoD.position.x = separacion_brazos;
        this.brazoD.rotation.z = degToRad(-40);


        //Piernas
        this.largoPierna = 2.5;
        var piernaGeom = new THREE.ConeBufferGeometry(0.4, this.largoPierna, 30, 5);
        var ingleGeom = new THREE.SphereBufferGeometry(0.3, 30, 30);

        this.piernaIM = new THREE.Mesh(piernaGeom, materialCuerpo);
        this.piernaI = new THREE.Mesh(ingleGeom, materialCuerpo);
        this.piernaI.add(this.piernaIM);
        this.piernaIM.rotation.z = Math.PI;
        this.piernaIM.position.y = -(piernaGeom.parameters.height / 2);

        this.piernaDM = new THREE.Mesh(piernaGeom, materialCuerpo);
        this.piernaD = new THREE.Mesh(ingleGeom, materialCuerpo);
        this.piernaD.add(this.piernaDM);
        this.piernaDM.rotation.z = Math.PI;
        this.piernaDM.position.y = -(piernaGeom.parameters.height / 2);

        //Nodo-brazo-izq - espada
        this.piernaD.position.x = 0.4;
        this.piernaI.position.x = -0.4;

        this.lady = new THREE.Object3D();
        this.lady.add(this.cuerpo, this.brazoD, this.brazoI, this.piernaD, this.piernaI);
        this.lady.position.y = piernaGeom.parameters.height;

        this.add(this.lady);

        //Para controlar el tiempo de la animacion
        this.tiempoAns = Date.now();
        this.tiempoAnterior = Date.now();
        this.cerrar = true;
        this.parpadeo = false;


        //Para controlar la animacion de las piernas
        this.pierna_d_mov = true;
        this.paso_tope = -0.5;

        //Para controlar la animacion del salto
        this.preparando_salto = true;
        this.saltar = true;

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

    //Funciones para el movimiento
    abajo(){

    }

    derecha(){
        this.position.x += 1;
    }

    izquierda(){
        this.position.x -= 1;
    }

    update() {

        //Animacion pasos
        /**if(this.piernaD.rotation.x > this.paso_tope && this.pierna_d_mov){ 
            this.piernaD.rotation.x-=0.001;
            this.piernaI.rotation.x+= 0.001;
        }
        else
            this.pierna_d_mov = false;

        if(!this.pierna_d_mov){
            if( this.piernaI.rotation.x > this.paso_tope){
                this.lady.position.z += 0.001;
                this.piernaI.rotation.x -= 0.001;
                this.piernaD.rotation.x += 0.001;
            }
            else
                this.pierna_d_mov = true;

        }*/

        var factor_escala_salto = 0.013;
        var factor_elevacion_salto = 0.1;
 
        //Animacion salto
        if(this.saltar){
        if(this.preparando_salto){
            if(this.piernaI.scale.y > 0.5){
                this.piernaI.scale.y -= factor_escala_salto;
                this.piernaD.scale.y -= factor_escala_salto;

                
                this.lady.position.y -= this.largoPierna * factor_escala_salto;
            }
            else{
                this.preparando_salto = false;
            }
        }

        if(!this.preparando_salto){
            if(this.piernaI.scale.y < 1){
                this.piernaI.scale.y += factor_escala_salto;
                this.piernaD.scale.y += factor_escala_salto;

                 
                this.lady.position.y += this.largoPierna * factor_escala_salto + factor_elevacion_salto;
            }
            else{
                this.preparando_salto = true;
                this.saltar = false;
            }
        }
        }

        
        //Animacion ojos
        var tiempoActual = Date.now();
        
        if(!this.parpadeo){
            var intervalo = ( tiempoActual - this.tiempoAnterior) / 1000;
        }
        else{
            var intervalo = 0;
        }

        //Para la animacion del cierre de los ojos
        var seg = ( tiempoActual - this.tiempoAns) / 1000;

        if(this.parpadeo){
            if(this.cerrar)
            {
                this.ojoD.scale.y -= 2.5 * seg;
                this.ojoI.scale.y -= 2.5 * seg;

                if(this.ojoD.scale.y <= 0.01)
                    this.cerrar = false;
            }
            else
            {
                this.ojoD.scale.y += 2.5 * seg;
                this.ojoI.scale.y += 2.5 * seg;
                
                if(this.ojoD.scale.y >= 1.2 * 0.4){
                    this.cerrar = true;
                    this.parpadeo = false;
                    this.tiempoAnterior = tiempoActual;
                }
            }
        }
        this.tiempoAns = tiempoActual;

        //Parpadeo   
         if(intervalo >= 5)
         {
            this.parpadeo = true;
            
         }

        // Animacion cuernos
        var altura_max = 1.4;
        var altura_min = 1.2;

        if(this.subir){
            this.altura_cuernos += 0.002;
            this.ancho_cuernos += 0.002;

            if(this.altura_cuernos >= altura_max )
                this.subir = false;
                
        }else if(!this.subir){
            this.altura_cuernos -= 0.002;
            this.ancho_cuernos -= 0.002;

            if(this.altura_cuernos <= altura_min )
                this.subir = true;
        }

        this.cuernoI.position.set(-this.ancho_cuernos, this.altura_cuernos, 0);
        this.cuernoD.position.set(this.ancho_cuernos, this.altura_cuernos, 0);

    }


    

}



export { Lady };
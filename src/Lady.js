import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'

class Lady extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        //Cabeza - nodo
        //Materiales
        var materialCabecilla = new THREE.MeshPhongMaterial();
        var materialOjitos = new THREE.MeshPhongMaterial({ color: 0x000000, transparent: true, opacity: 0.7 });
        var materialMofletes = new THREE.MeshPhongMaterial({ color: 0xFF0000, transparent: true, opacity: 0.7 });

        //Geometria ovalo
        var geomOvalo = new THREE.SphereBufferGeometry(1, 30, 30);

        //Malla cabeza
        this.craneo = new THREE.Mesh(geomOvalo, materialCabecilla);
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

        this.cabeza = new THREE.Object3D();
        this.cabeza.add(this.craneo, this.ojoD, this.ojoI, this.mofleteD, this.mofleteI);
        this.cabeza.position.y = 1;

        // TODO: ¿Cómo podemos hacer una capa?
        //Cuerpo
        //Materiales
        var materialTronquillo = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        var materialBracito = new THREE.MeshPhongMaterial();
        var materialPiernita = new THREE.MeshPhongMaterial();

        //Tronco
        var tronco1Geom = new THREE.CylinderGeometry(0.5, 1.1, 1.7, 30, 30);
        this.tronco1 = new THREE.Mesh(tronco1Geom, materialTronquillo);
        this.tronco1.position.y = -tronco1Geom.parameters.height / 2;


        var tronco2Geom = new THREE.CylinderGeometry(1.1, 1.8, 0.9, 30, 30);
        this.tronco2 = new THREE.Mesh(tronco2Geom, materialTronquillo);
        this.tronco2.position.y = -tronco1Geom.parameters.height - tronco2Geom.parameters.height / 2;
        this.cuerpo = new THREE.Object3D();
        this.cuerpo.add(this.tronco1, this.tronco2, this.cabeza);
        this.cuerpo.position.y = tronco1Geom.parameters.height + tronco2Geom.parameters.height;

        //Brazos
        var hombroGeom = new THREE.SphereGeometry(0.3, 30, 30);
        var brazoGeom = new THREE.CylinderGeometry(0.1, 0.3, 2, 30, 30);
        var manoGeom = new THREE.SphereGeometry(0.2, 30, 30);

        //Brazo Derecho
        this.brazoDM = new THREE.Mesh(brazoGeom, materialBracito);
        this.brazoDM.rotation.z = -Math.PI / 2;
        this.brazoDM.position.x = brazoGeom.parameters.height / 2 + hombroGeom.parameters.radius - 0.1;
        this.hombroDM = new THREE.Mesh(hombroGeom, materialBracito);
        this.hombroDM.add(this.brazoDM);
        this.manoDM = new THREE.Mesh(manoGeom, materialBracito);
        this.manoDM.position.x = manoGeom.parameters.radius + hombroGeom.parameters.radius + brazoGeom.parameters.height - 0.2;

        //Brazo Izquierdo
        this.brazoIM = new THREE.Mesh(brazoGeom, materialBracito);
        this.brazoIM.rotation.z = Math.PI / 2;
        this.brazoIM.position.x = - (brazoGeom.parameters.height / 2 + hombroGeom.parameters.radius - 0.1);
        this.hombroIM = new THREE.Mesh(hombroGeom, materialBracito);
        this.hombroIM.add(this.brazoIM);
        this.manoIM = new THREE.Mesh(manoGeom, materialBracito);
        this.manoIM.position.x = -(manoGeom.parameters.radius + hombroGeom.parameters.radius + brazoGeom.parameters.height - 0.2);

        //Nodo brazos Izq
        var altura_brazos = 1.85;
        var separacion_brazos = 0.4;

        this.brazoI = new THREE.Object3D();
        this.brazoI.add(this.hombroIM, this.manoIM);
        this.brazoI.position.y = altura_brazos;
        this.brazoI.position.x = -separacion_brazos;

        //Nodo brazos Dcho
        this.brazoD = new THREE.Object3D();
        this.brazoD.add(this.hombroDM, this.manoDM);
        this.brazoD.position.y = altura_brazos;
        this.brazoD.position.x = separacion_brazos;

        //Piernas
        var piernaGeom = new THREE.ConeBufferGeometry(0.4, 2.5, 30, 5);
        var ingleGeom = new THREE.SphereGeometry(0.3, 30, 30);

        this.piernaIM = new THREE.Mesh(piernaGeom, materialPiernita);
        this.piernaI = new THREE.Mesh(ingleGeom, materialPiernita);
        this.piernaI.add(this.piernaIM);
        this.piernaIM.rotation.z = Math.PI;
        this.piernaIM.position.y = -(piernaGeom.parameters.height / 2);

        this.piernaDM = new THREE.Mesh(piernaGeom, materialPiernita);
        this.piernaD = new THREE.Mesh(ingleGeom, materialPiernita);
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

    update() {

    }

}



export { Lady };
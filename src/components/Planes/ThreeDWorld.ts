import { World } from "@planes/World";
import { ISheet } from "@theatre/core";
import { Scene, PerspectiveCamera, WebGLRenderer, Color } from "three";
import { God, Audion, Creatio, Lumina, Movementur } from "@pantheon/Pantheon";

// Types

export class ThreeDWorld extends World {
  objects: any[];
  three: {
    camera?: PerspectiveCamera;
    scene?: Scene;
    renderer?: WebGLRenderer;
  };
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  alpha: boolean;
  creationGod: God;
  lightGod: God;
  motionGod: Movementur;
  musicGod: God;
  animating: boolean;
  time: number;
  colors: {
    accent: string;
  };
  theatre: any;
  currentMotionScene: ISheet;
  timeRate: number;

  constructor(options) {
    super();

    Object.assign(
      this,
      {
        colors: {
          accent: 0x000000,
        },
        animating: false,
        timeRate: 0.001,
        alpha: true,
      },
      options
    );

    this.objects = [];

    this.three = {};
    this.camera = this.three.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 10;

    this.scene = this.three.scene = new Scene();
    // this.scene.background = new Color(this.colors.activeBackgroundColor);

    this.renderer = this.three.renderer = new WebGLRenderer({
      alpha: this.alpha,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", (e) => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    this.creationGod = new Creatio(this, {
      defaultMaterialColor: this.colors.accent,
    });
    this.lightGod = new Lumina(this, {});
    if (this.animating) this.motionGod = new Movementur(this, {});
    // this.musicGod = new Audion(this, {});

    this.time = 0;

    document.body.appendChild(this.renderer.domElement);
  }

  setScene(worldScene) {
    this.scene = this.three.scene = worldScene;
  }
}

import { God } from "@pantheon/God";
import { getProject, IProject, ISheet } from "@theatre/core";
import studio from "@theatre/studio";
import { Camera, Scene } from "three";
import * as state from "../../motion/state.json";

export class Movementur extends God {
  theatre: {
    project: IProject;
    sheets: { [key: string]: ISheet };
  };
  currentMotionScene: ISheet;
  theatreProjectName: string;
  scene: Scene;
  camera: Camera;

  constructor(world, options) {
    super(world, options);

    // initialize the studio so the editing tools will show up on the screen
    if (process.env.NODE_ENV === "development" && this.world.theatre) {
      studio.initialize();
    }

    Object.assign(
      this,
      {
        theatreProjectName: "Project",
      },
      options
    );

    if (this.world.animating) {
      this.animate();
    } else {
      this.renderFrame();
    }

    const config = { state };
    const fourthWall = [];
    this.theatre = {
      project: getProject(this.theatreProjectName),
      sheets: {},
    };
    this.theatre.sheets = {
      mainScene: this.theatre.project.sheet("Main Scene"),
    };
    this.world.currentMotionScene = this.theatre.sheets["mainScene"];

    this.currentMotionScene = this.theatre.sheets.mainScene;
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.world.time += this.world.timeRate;
    this.world.objects.forEach((obj) => {
      if (obj.animated) obj.action();
    });

    this.world.renderer.render(this.world.scene, this.world.camera);
  }

  renderFrame() {
    this.world.renderer.render(this.scene, this.camera);
  }
}

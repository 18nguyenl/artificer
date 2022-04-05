import { God } from "@pantheon/God";
import { AmbientLight, Color, PointLight, Vector3 } from "three";

interface LightProps {
  color: Color | number | string;
  intensity: number;
  distance: number;
  decay: number;
  position: { x: number; y: number; z: number };
}

export class Lumina extends God {
  constructor(world, options) {
    super(world, options);
  }

  addAmbientLight(color, intensity) {
    this.world.scene.add(new AmbientLight(color, intensity));
  }

  addPointLight(options) {
    const params: LightProps = {
      color: 0xffffff,
      intensity: 1,
      distance: 0,
      decay: 1,
      position: {
        x: 50,
        y: 50,
        z: 50,
      },
    };
    Object.assign(params, options);
    const { color, intensity, distance, decay } = params;
    const { x, y, z } = params.position;

    const light = new PointLight(color, intensity, distance, decay);

    light.position.set(x, y, z);

    this.world.scene.add(light);
  }
}

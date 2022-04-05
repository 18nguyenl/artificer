// Types
import type { World } from "@planes/World";
import { AmbientLight, PointLight } from "three";

export class God {
  world: World;

  constructor(world, options) {
    Object.assign(this, {}, options);

    this.world = world;
  }
}

// Types
import { World } from "@planes/World";
import { AmbientLight, PointLight } from "three";

export class God {
  world: World;
  name: string;

  constructor(name, options) {
    Object.assign(this, {}, options);

    this.name = name;
  }
}

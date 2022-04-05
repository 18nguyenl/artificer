import { God } from "@pantheon/God";
import WorldObject from "@planes/WorldObject";
import {
  BoxGeometry,
  SphereGeometry,
  MeshBasicMaterial,
  Material,
  BufferGeometry,
} from "three";

interface ObjectProps {
  widthSegments: number;
  heightSegments: number;
  material?: Material;
}

interface BoxProps extends ObjectProps {
  width: number;
  height: number;
  depth: number;
}

interface SphereProps extends ObjectProps {
  radius: number;
}

export class Creatio extends God {
  defaultMaterialColor: number;

  constructor(world, options) {
    super(world, options);

    Object.assign(
      this,
      {
        defaultMaterialColor: 0xdddddd,
      },
      options
    );
  }

  addBox(name = "box", settings, material) {
    const params: BoxProps = {
      width: 1,
      height: 1,
      depth: 1,
      widthSegments: 1,
      heightSegments: 1,
      material: material,
    };

    Object.assign(params, settings);

    return this.addWorldObject(
      name,
      new BoxGeometry(
        params.width,
        params.height,
        params.depth,
        params.widthSegments,
        params.heightSegments
      ),
      params.material
    );
  }

  addSphere(name = "sphere", settings, material) {
    const params: SphereProps = {
      material: material,
      radius: 1,
      widthSegments: 10,
      heightSegments: 10,
    };

    Object.assign(params, settings);
    return this.addWorldObject(
      name,
      new SphereGeometry(
        params.radius,
        params.widthSegments,
        params.heightSegments
      ),
      params.material
    );
  }

  addWorldObject(
    name,
    geometry: BufferGeometry,
    material: Material = new MeshBasicMaterial({
      color: this.defaultMaterialColor,
    })
  ) {
    let motionState = undefined;
    if (this.world.animating && this.world.motionGod.theatre) {
      motionState = this.world.motionGod.currentMotionScene.object(name, {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
      });
    }
    const object = new WorldObject(name, geometry, material, motionState);
    this.world.objects.push(object);

    this.world.scene.add(object);

    return object;
  }
}

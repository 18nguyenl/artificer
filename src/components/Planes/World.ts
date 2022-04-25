import { God } from "@pantheon/God";

type GodsInfluence = {
  act: (action: (god: God) => void) => void;
  god: God;
};

export class World {
  pantheon: { [key: string]: GodsInfluence };
  constructor() {
    this.pantheon = {};
  }

  assignGod(god: God) {
    this.pantheon[god.name] = {
      act: (action) => {
        god.world = this;

        action(god);
      },
      god: god,
    };
  }
}

import { God } from "@pantheon/God";

export class Audion extends God {
  backgroundMusic: HTMLAudioElement;
  backgroundMusicURL: string;

  constructor(world, options) {
    super(world, options);

    Object.assign(
      this,
      {
        // backgroundMusicURL: "/VOLANT - NEOY2K.mp3",
        backgroundMusicURL: "/DVI-i PARAMETER.mp3",
      },
      options
    );

    this.backgroundMusic = new Audio(this.backgroundMusicURL);
    this.backgroundMusic.setAttribute("autoplay", "");
    let playAttempt = setInterval(() => {
      this.backgroundMusic
        .play()
        .then(() => {
          clearInterval(playAttempt);
        })
        .catch((error) => {
          console.log("Unable to play the video, User has not interacted yet.");
        });
    }, 3000);
  }
}

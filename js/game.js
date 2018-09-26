function makeSpriteObservable (spriteToChange, defaultScale, defaultAngle, hoverScale, hoverAngle)
{
    /* Modify a "large" sprite so that it is
     * viewable in a room at a smaller scale,
     * has a cursor/pointer hover effect, and
     * can be clicked to view the unscaled sprite.
     * In other words, it's basically a thumbnail
     * you ca click on to enlarge.
     *
     * Arguments:
     *   spriteToChange: Phaser v3 sprite to apply effects to.
     *   defaultScale: optional. The size/scale of the sprite by default.
     *      Think of this as the "thumbnail" scale relative to the actual
     *      image.
     *   defaultAngle: optional...
     *   hoverScale: optional. The size of the sprite when the cursor/pointer
     *      is over it. This helps indicate that an object is clickable. Scale
     *      relative to full image size.
     *   hoverAngle: optional. Change the angle when hovered.
     */

    originalScale = spriteToChange.scaleX;
    originalAngle = spriteToChange.angle;
    originalX = spriteToChange.x;
    originalY = spriteToChange.y;

    defaultScale = defaultScale || 0.26;
    defaultAngle = defaultAngle || 3;

    hoverScale = hoverScale || 0.33;
    hoverAngle = hoverAngle || 0;

    // Tweak the default "thumbnail"
    spriteToChange.setScale(defaultScale);
    spriteToChange.setAngle(defaultAngle);

    // Make it so when the cursor is hovered over spriteToChange
    // the cursor graphic changes to a custom hand cursor image
    spriteToChange.setInteractive({
        cursor: 'url(assets/input/cursors/hand.cur), pointer' 
    });

    // Scale the sprite and reset its angle to 0 when the cursor
    // is hovering over it.
    spriteToChange.on('pointerover', function (event) {
        // Condition makes it so the hover effect doesn't occur
        // when the sprite is being observed already.
        if (this.scaleX != 1) {
            this.setScale(hoverScale);
            this.setAngle(hoverAngle);
        }
    });

    // Reset the sprite's scale and angle to their original values
    // on mouse out.
    spriteToChange.on('pointerout', function (event) {
        // Condition makes it so the hover effect doesn't occur
        // when the sprite is being observed already.
        if (this.scaleX != 1) {
            this.setScale(defaultScale);
            this.setAngle(defaultAngle);
        }
    });

    // Make spriteToChange display center, fullscreen, no
    // angle, full scale on click. When it is clicked again
    // return it to its original scale, position, and angle.
    spriteToChange.on('pointerup', function (event) {
        if (this.scaleX != 1) {
            this.setScale(1);
            this.setAngle(0);
            this.setPosition(256, 171);  // center
        } else {
            this.setScale(defaultScale);
            this.setAngle(defaultAngle);
            this.setPosition(originalX, originalY);
        }
        game.canvas.style.cursor = "url(assets/input/cursors/pointer.cur), pointer";
    });

    return spriteToChange
}


class FirstRoom extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'FirstRoom', active: true });
    }

    preload ()
    {
        this.load.image('frame', 'assets/frame.png');
        this.load.image('roomShade', 'assets/room-shade.png');
        this.load.image('baileyPinup', 'assets/bailey-pinup.png');
    }

    create ()
    {
        this.add.image(256, 171, 'frame');
        this.add.image(256, 171, 'roomShade');

        // Cursor
        this.input.setDefaultCursor('url(assets/input/cursors/pointer.cur), pointer');

        // Bailey Jay pinup poster shows off the observation effect of simply
        // showing the picture at full size at center screen.
        this.posterButton = this.add.sprite(106, 86, 'baileyPinup');
        makeSpriteObservable(this.posterButton);
    }
}


// Runtime!
var config = {
    type: Phaser.AUTO,
    width: 512,
    height: 342,
    scene: [ FirstRoom ],
};

var game = new Phaser.Game(config);

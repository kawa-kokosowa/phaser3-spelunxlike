var config = {
    type: Phaser.AUTO,
    width: 512,
    height: 342,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function makeSpriteObservable (spriteToChange)
{
    /* Make it so spriteToChange can be clicked in
     * order to bring it to the center of the screen,
     * in full scale, for observation. Also applies
     * hover effects on the sprite to indicate
     * clickability.
     *
     * Arguments:
     *   spriteToChange: Phaser v3 sprite to apply effects to.
     *   hoverScale: optional...
     *   hoverAngle: optional...
     */

    originalScale = spriteToChange.scaleX;
    originalAngle = spriteToChange.angle;
    originalX = spriteToChange.x;
    originalY = spriteToChange.y;

    hoverScale = 0.33;
    hoverAngle = 0;

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
            this.setScale(originalScale);
            this.setAngle(originalAngle);
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
            this.setScale(originalScale);
            this.setAngle(originalAngle);
            this.setPosition(originalX, originalY);
        }
        game.canvas.style.cursor = "url(assets/input/cursors/pointer.cur), pointer";
    });

    return spriteToChange
}


function preload ()
{
    this.load.image('frame', 'assets/frame.png');
    this.load.image('roomShade', 'assets/room-shade.png');
    this.load.image('baileyPinup', 'assets/bailey-pinup.png');
}

function create ()
{
    this.add.image(256, 171, 'frame');
    this.add.image(256, 171, 'roomShade');

    // Cursor
    this.input.setDefaultCursor('url(assets/input/cursors/pointer.cur), pointer');

    // Bailey Jay pinup poster shows off the observation effect of simply
    // showing the picture at full size at center screen.
    this.posterButton = this.add.sprite(106, 86, 'baileyPinup');
    this.posterButton.setScale(0.26);
    this.posterButton.setAngle(3);
    makeSpriteObservable(this.posterButton);
}

function update ()
{

}



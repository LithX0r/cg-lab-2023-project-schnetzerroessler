/**
 * Creates two separate animations and returns them as an array with two elements.
 * Animation "turnAnim" alternates making the penguin rotate 20 degrees to the left and right.
 * Animation "walkAnim" moves the penguin to the final position {@param endPos} .
 * @param penguin   The penguin.
 * @param startPos  The starting position of the penguin.
 * @param endPos    The final position the penguin should be translated to.
 * @param angle     The angle the penguin is originally set to.
 * @param offset    The offset that is added to the turn animation in order to make the penguins waddle asynchronously.
 * @return An Array with the two defined animations needed for making a penguin waddle forward.
 */
function createPenguinWaddle(penguin, startPos, endPos, angle, offset) {
    let turnAnim = new Animation(penguin[1],[
        {matrix: mat4.rotateY(mat4.create(), mat4.create(), glm.deg2rad(angle + 20)), duration: 500 + offset},
        {matrix: mat4.rotateY(mat4.create(), mat4.create(), glm.deg2rad(angle - 20)), duration: 500 + offset}],
        true);
    turnAnim.start();

    let walkAnim = new Animation(penguin[0], [
        {matrix: mat4.translate(mat4.create(), mat4.create(), startPos), duration: 1},
        {matrix: mat4.translate(mat4.create(), mat4.create(), endPos), duration: 6000}],
        false);
    walkAnim.start();

    return [walkAnim, turnAnim];
}


/**
 * Creates the jump animation and returns it.
 * Loops endlessly after it is started.
 * @param penguin   The penguin.
 * @param position  The location where the penguin should jump up and down.
 * @param offset    The offset that is added to the animation in order to make the penguins jump asynchronously.
 * @param height    The height the penguin jumps.
 * @return The jump animation for the penguin.
 */
function createPenguinJump(penguin, position, offset, height) {
    let jumpAnim = new Animation(penguin[0], [
            {matrix: mat4.translate(mat4.create(), mat4.create(), position), duration: 1},
            {matrix: mat4.translate(mat4.create(), mat4.create(), [position[0], height, position[2]]), duration: 300 + offset},
            {matrix: mat4.translate(mat4.create(), mat4.create(), position), duration: 300 + offset},
            {matrix: mat4.translate(mat4.create(), mat4.create(), position), duration: 1}],
        true);
    jumpAnim.start();

    return jumpAnim;
}


/**
 * Implements the arm movements the penguin needs for pressing the button (up and down).
 * For this, it defines two separate animations and returns them as an array with two elements.
 * These animations first rotate the wing based on the set angles and then translate it to the position needed.
 * This principle applies to both animations, "wingUp" and "wingDown".
 * @param penguin   The penguin.
 * @return The arm rotation for the leading penguin.
 */
function createPenguinWingRotation(penguin) {
    let wingUp = new Animation(penguin[3], [
            {matrix: addKeyFrame([-0.145811, 0.947348, -0.00042], -70, 0, 0), duration: 1000}],
        false);
    wingUp.start()

    let wingDown = new Animation(penguin[3], [
            {matrix: addKeyFrame([-0.145811, 0.947348, -0.00042], -70, 0, 0), duration: 1},
            {matrix: addKeyFrame([-0.145811, 0.947348, -0.00042], 0, 0, 0), duration: 1500}],
        false);
    wingDown.start();

    return [wingUp, wingDown];
}


/**
 * Creates three separate animations and returns them as an array with three elements.
 * Animation "flightP1" defines the flight from the UFOs starting position to the position where the ice beam is activated.
 * Animation "flightP2 defines the flight the UFO takes when the ice beam is activated.
 * Animation "iceBeam" teleports the ice beam up from below the map and down again when it is no longer needed.
 * @param ufo       The UFO.
 * @param positions The positions that define the path that the UFO takes.
 * @return An Array with the three defined animations for the UFO.
 */
function createUfoAnim(ufo, positions) {
    let flightP1 = new Animation(ufo[0], [
            {matrix: mat4.translate(mat4.create(), mat4.create(), positions[0]), duration: 1},
            {matrix: mat4.translate(mat4.create(), mat4.create(), positions[1]), duration: 5000},
            {matrix: mat4.translate(mat4.create(), mat4.create(), positions[2]), duration: 1000}],
        false);
    flightP1.start();

    let flightP2 = new Animation(ufo[0], [
            {matrix: mat4.translate(mat4.create(), mat4.create(), positions[2]), duration: 1},
            {matrix: mat4.translate(mat4.create(), mat4.create(), positions[3]), duration: 2000},
            {matrix: mat4.translate(mat4.create(), mat4.create(), positions[4]), duration: 2000},
            {matrix: mat4.translate(mat4.create(), mat4.create(), positions[5]), duration: 2000},
            {matrix: mat4.translate(mat4.create(), mat4.create(), positions[6]), duration: 2000},
            {matrix: mat4.translate(mat4.create(), mat4.create(), positions[7]), duration: 2000}],
        false);
    flightP2.start();

    let iceBeam = new Animation(ufo[3], [
            {matrix: mat4.translate(mat4.create(), mat4.create(), [0, -7, 0]), duration: 1},
            {matrix: mat4.translate(mat4.create(), mat4.create(), [0, 0, 0]), duration: 1}],
        false);
    iceBeam.start();

    return [flightP1, flightP2, iceBeam];
}


/**
 * Implements the animation that makes the button sink down into the pillar.
 * @param button    The button.
 * @return The animation for the button.
 */
function createButtonAnim(button) {
    buttonAnim = new Animation(button, [
        {matrix: mat4.translate(mat4.create(), mat4.create(), [0, 0, 0]), duration: 1},
        {matrix: mat4.translate(mat4.create(), mat4.create(), [0, -0.05, 0]), duration: 350}],
        false);
    buttonAnim.start();

    return buttonAnim;
}


/**
 * Creates two separate animations and returns them as an array with two elements.
 * Animation "orbFLight" moves the orb to its final position {@link endPos}.
 * Animation "orbRot" makes the orb wobble using the effect of choosing negative degrees for rotations.
 * @param orb       The orb.
 * @param startPos  The starting position of the orb.
 * @param endPos    The final position of the orb.
 * @return An Array with the two defined animations needed for making the orb ascend into the sky.
 */
function createOrbAnim(orb, startPos, endPos) {
    let orbFlight = new Animation(orb[0], [
        {matrix: mat4.translate(mat4.create(), mat4.create(), startPos), duration: 1},
        {matrix: mat4.translate(mat4.create(), mat4.create(), endPos), duration: 5000}])
    orbFlight.start();

    let orbRot = new Animation(orb[1], [
        {matrix: mat4.rotateY(mat4.create(), mat4.create(), glm.deg2rad(145)), duration: 500},
        {matrix: mat4.rotateY(mat4.create(), mat4.create(), glm.deg2rad(-145)), duration: 500}],
        true);
    orbRot.start();

    return [orbFlight, orbRot];
}
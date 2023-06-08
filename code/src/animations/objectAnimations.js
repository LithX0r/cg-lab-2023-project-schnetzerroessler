function createPenguinWaddle(penguin, bPosition, fPosition, angle, offset) {
    var penguinMainTurnAnimation = new Animation(penguin[1],
        [{matrix: mat4.rotateY(mat4.create(), mat4.create(), glm.deg2rad(angle + 20)), duration: 500 + offset},
            {
                matrix: mat4.rotateY(mat4.create(), mat4.create(), glm.deg2rad(angle - 20)),
                duration: 500 + offset
            }], true);

    // */
    penguinMainTurnAnimation.start();

    var penguinMainWalk = new Animation(penguin[0], [{
        matrix: mat4.translate(mat4.create(), mat4.create(), bPosition),
        duration: 1
    },
        {matrix: mat4.translate(mat4.create(), mat4.create(), fPosition), duration: 7000}], false);
    penguinMainWalk.start();

    return [penguinMainWalk, penguinMainTurnAnimation];
}


function createOrbAnim(orb, startPos, endPos) {
    let orbFlight = new Animation(orb[0], [
        {matrix: mat4.translate(mat4.create(), mat4.create(), startPos), duration: 1},
        {matrix: mat4.translate(mat4.create(), mat4.create(), endPos), duration: 5000}])
    orbFlight.start();

    let orbRot = new Animation(orb[1], [
        {matrix: mat4.rotateY(mat4.create(), mat4.create(), glm.deg2rad(145)), duration: 500},
        {matrix: mat4.rotateY(mat4.create(), mat4.create(), glm.deg2rad(-145)), duration: 500}], true);
    orbRot.start();
    return [orbFlight, orbRot];
}


function createFlight(ufo, positions) {
    let flightP1 = new Animation(ufo[0], [
        {matrix: mat4.translate(mat4.create(), mat4.create(), positions[0]), duration: 1},
        {matrix: mat4.translate(mat4.create(), mat4.create(), positions[1]), duration: 5000},
        {matrix: mat4.translate(mat4.create(), mat4.create(), positions[2]), duration: 1000}], false);
    flightP1.start();

    let flightP2 = new Animation(ufo[0], [
        {matrix: mat4.translate(mat4.create(), mat4.create(), positions[2]), duration: 1},
        {matrix: mat4.translate(mat4.create(), mat4.create(), positions[3]), duration: 2000},
        {matrix: mat4.translate(mat4.create(), mat4.create(), positions[4]), duration: 2000},
        {matrix: mat4.translate(mat4.create(), mat4.create(), positions[5]), duration: 2000},
        {matrix: mat4.translate(mat4.create(), mat4.create(), positions[6]), duration: 2000},
        {matrix: mat4.translate(mat4.create(), mat4.create(), positions[7]), duration: 2000}], false);
    flightP2.start();


    let iceBeam = new Animation(ufo[3], [
        {matrix: mat4.translate(mat4.create(), mat4.create(), [0, -7, 0]), duration: 1},
        {matrix: mat4.translate(mat4.create(), mat4.create(), [0, 0, 0]), duration: 1}], false);
    iceBeam.start();
    return [flightP1, flightP2, iceBeam];
}

function createJump(penguin, position, offset, height) {
    let jumpAnim = new Animation(penguin[0], [
        {matrix: mat4.translate(mat4.create(), mat4.create(), position), duration: 1},
        {
            matrix: mat4.translate(mat4.create(), mat4.create(), [position[0], height, position [2]]),
            duration: 300 + offset
        },
        {matrix: mat4.translate(mat4.create(), mat4.create(), position), duration: 300 + offset},
        {matrix: mat4.translate(mat4.create(), mat4.create(), position), duration: 1},], true);
    jumpAnim.start();
    return jumpAnim;
}

// /*
function createArmRoation(penguin) {
    let armAnim = new Animation(penguin[3], [
        {matrix: glm.rotateX(45), duration: 1000}
    ], true);
    armAnim.start();
    return armAnim;
}
// */
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/BM-SU2JX)
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/BM-SU2JX)
# CG Lab Project

Submission template for the CG lab project at the Johannes Kepler University Linz.

### Explanation

This `README.md` needs to be pushed to Github for each of the 3 delivery dates.
For every submission change/extend the corresponding sections by replacing the *TODO* markers. Make sure that you push everything to your Github repository before the respective deadlines. For more details, see the Moodle page.

## Concept submission due on 31.03.2023

### Group Members

|               | Student ID | First Name | Last Name | E-Mail                        |
|---------------|------------|------------|-----------|-------------------------------|
| **Student 1** | k12102659  | Annabell   | Rößler    | annabell.roessler@outlook.com |
| **Student 2** | k12104562  | Leon       | Schnetzer | leon.schnetzer@gmail.com      |

### Concept Submission due on 31.03.2023

#### Basic story of the movie
A group of penguins is walking around in a landscape which does not resemble their natural habitat. Their walk is interrupted when they notice an ancient-looking illuminated button.
One particularly brave (or stupid) penguin comes forward and presses the button without hesitation. A glowing orb then ascends from the now dark button.
Responding to the signal, a UFO appears in the sky and seemingly assesses the situation. From previous adventures to Earth, the alien inside the UFO notices the lack of snow, where there was plenty in the past.
The visitor from space turns on the UFOs internal snow generator and starts casting a beam of ice onto the landscape, transforming it back into a frosty paradise. Now that the spirit of Antarctica is restored once again, the penguins are jumping up and down with excitement.


### Special Effects

Selected special effects must add up to exactly 30 points. Replace yes/no with either yes or no.

| Selected | ID | Name                                  | Points |
|----------|----|---------------------------------------|--------|
| no       | S1 | Multi texturing                       | 15     |  
| no       | S2 | Level of detail                       | 15     |
| no       | S3 | Billboarding                          | 15     |
| no       | S4 | Terrain from heightmap                | 30     |
| no       | S5 | Postprocessing shader                 | 30     |
| no       | S6 | Animated water surface                | 30     |
| no       | S7 | Minimap                               | 30     |
| yes      | S8 | Particle system (rain, smoke, fire)   | 30     |
| no       | S9 | Motion blur                           | 30     |
| no       | SO | Own suggestion (preapproved by email) | TODO   |

## Intermediate Submission due on 29.04.2023

Prepare a first version of your movie that:
 * is 30 seconds long,
 * contains animated objects, and
 * has an animated camera movement. 

Push your code on the day of the submission deadline. 
The repository needs to contain:
  * code/ Intermediate code + resources + libs
  * video/ A screen recording of the intermediate result

Nothing to change here in `README` file.

**Note:** You don’t need to use any lighting, materials, or textures yet. This will be discussed in later labs and can be added to the project afterwards!

## Final Submission due on 20.06.2023

The repository needs to contain:
  * code/ Documented code + resources + libs
  * video/ A screen recording of the movie
  * README.md


### Workload

| Student ID | Workload (in %) |
|------------|-----------------|
| k12102659  | 50              |
| k12104562  | 50              |

Workload has to sum up to 100%.

### Effects

Select which effects you have implemented in the table below. Replace yes/no/partial with one of the options.
Mention in the comments column of the table where you have implemented the code and where it is visible (e.g., spotlight is the lamp post shining on the street). 

| Implemented | ID | Name                                                                                                                                                 | Max. Points | Issues/Comments                                                                                                                                                                             |
|-------------|----|------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| yes         | 1a | Add at least one manually composed object that consists of multiple scene graph nodes.                                                               | 6           | visible in ufo, penguin and pillar; implemented in objectCreations.js                                                                                                                       |
| yes         | 1b | Animate separate parts of the composed object and also move the composed object itself in the scene.                                                 | 4           | visible in ufo and penguin; implemented in objectAnimations.js                                                                                                                              |
| yes         | 1c | Use at least two clearly different materials for the composed object.                                                                                | 3           | visible in ufo; implemented in objectCreations.js; documented in Material_doc.md                                                                                                            |
| yes         | 1d | Texture parts of your composed object by setting proper texture coordinates.                                                                         | 5           | visible in penguins and particle; implemented in objectCreations.js and TextureObjectNode.js                                                                                                |
| yes         | 2a | Use multiple light sources.                                                                                                                          | 5           | visible in all lights in the scene; implemented in lightCreations.js                                                                                                                        |
| yes         | 2b | One light source should be moving in the scene.                                                                                                      | 3           | visible in lights moving around beam of ufo and together with the ufo; implemented in lightCreations.js and main.js                                                                         |
| partial     | 2c | Implement at least one spot-light.                                                                                                                   | 10          | Did not work the way we wanted it to; implemented but not working in lightCreations.js, phong.vs.glsl and phong.fs.glsl                                                                     |
| yes         | 2d | Apply Phong shading to all objects in the scene.                                                                                                     | 4           | implemented in objectCreations.js, phong.fs.glsl and phong.vs.glsl                                                                                                                          |
| yes         | 3  | The camera is animated 30 seconds without user intervention. Animation quality and complexity of the camera and the objects influence the judgement. | 10          | visible in camera movement; implemented in camAnimation.js                                                                                                                                  |
| partial     | Sx | Particle system                                                                                                                                      | 30          | Could not get particle movement to work. Particle system can only spawn and remove particles near the origin location. implemented in ParticleSystemNode.js; visible in particles below ufo |
| partial     | SE | Special effects are nicely integrated and well documented                                                                                            | 20          | See point above                                                                                                                                                                             |

### Special Effect Description

TODO

Describe how the effects work in principle and how you implemented them. If your effect does not work but you tried to implement it, make sure that you explain this. Even if your code is broken do not delete it (e.g., keep it as a comment). If you describe the effect (how it works, and how to implement it in theory), then you will also get some points. If you remove the code and do not explain it in the README this will lead to 0 points for the effect and the integration SE.

The particle system is implemented as its own class ParticleSystemNode in the file ParticleSystemNode.js. The class contains the following functions:

#### constructor
inputs:
- **model:** the model which should be spawned by the particle system
- **texture:** texture of the spawned model
- **maxParticles:** the maximum number of particles of a system which are allowed to live at the same time
- **position:** Array containing the current position of the particle system relative to its root.

The constructor sets fields for all input parameters and adds arrays for spawn times (birth) of particles, the max age of particles (age) and the directions of particles (direction). It also sets a field called startupTime which contains the system time at construction of the system.

#### spawn
The spawn method spawns a particle until max particle size has been reached. Sets birth, max age an direction with every spawn
Max age is 1500ms and formula is age = 1500*Math.random();

#### isDead
inputs:
- **age:** max age of the given particle
- **birth:** spawn time of the given particle
Determines if a given particle has exceeded its age by subtracting the spawn time from Date.now();

#### setBuffer
Sets buffers for attributes for direction and time for particles.vs.glsl and particles.fs.glsl

#### update
Iterates over every node in the particle system and checks if the given node should be alive or dead. If it is dead its values get removed from this.birth, this.age and its is removed from the child list.
Array is iterated backwards in order to avoid problems while when removing values from array while iterating the same array. 'isDead' is used in order to check if particle is already dead.

#### render
Calls render of superclass. Loads values into attribute buffers and sets value for every uniform for particles.vs.glsl and particles.fs.glsl.

#### serDirection
Sets the direction of the particle in order to modify it in the shader. Uses (Math.round() ? 1 : -1) in order to also generate negative direction values.
Returns an array consisting of its x y and z offsets.

#### Notes
We could not get the moving in the shader to work. Scaling the direction with time always resulted in spawning the particles completely out of sight or spawning one big particle which obstructed the view.
Particle spawns and deletes work as they should besides the lag due to too many polygons. We also could not find a solution for the errors thrown while creating the buffers. 
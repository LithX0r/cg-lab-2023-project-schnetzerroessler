class ParticleSystemNode extends SGNode {
    constructor(model, texture, maxParticles, hasTexture, position) {
        super();
        this.position = position;
        this.model = model;
        this.texture = texture;
        this.birth = [];
        this.age = [];
        this.direction = [];
        this.maxParticles = maxParticles;
        // this.hasTexture = hasTexture;
    }
    init() {
        this.setBuffer();
    }
    spawn() {
        for(let i = this.children.length; i < this.maxParticles; i++) {
            this.children.push(new TransformationSGNode(glm.translate(Math.random()*i/this.maxParticles, Math.random(), Math.random()*i/this.maxParticles) ,[new MaterialSGNode(new TexturedObjectNode(this.texture, [new RenderSGNode(this.model)]))]));
            this.birth.push(Date.now());
            this.age.push(2000*Math.random());
            this.direction.push(vec3.fromValues(Math.random()*2*Math.pow(-1, i), -Math.random()*2, Math.random()*2*Math.pow(-1, i)))
        }
    }

    isDead(age, birth) {
        // console.log(Date.now()-birth);
        return Date.now()-birth > age;
    }

    setBuffer() {
        this.directionBuff = gl.createBuffer();
        this.timeBuff = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.directionBuff);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.timeBuff);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.direction), gl.STATIC_DRAW);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([Date.now()]), gl.STATIC_DRAW);
    }

    update() {

        for(let i = this.maxParticles-1; i >= 0; i--) {
            let cur = this.children[i];
            if(this.isDead(this.age[i], this.birth[i])) {
                console.log("dead");
                this.children.splice(i, 1);
                this.birth.splice(i, 1);
                this.age.splice(i, 1);
            }
        }
        this.spawn();
    }

    render(context) {
        super.render(context);
        const directionLocation = gl.getAttribLocation(context.shader, 'a_direction');
        const timeLocation = gl.getAttribLocation(context.shader, 'a_time');
        gl.enableVertexAttribArray(directionLocation)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.directionBuff);
        gl.vertexAttribPointer(directionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.vertexAttribPointer(timeLocation, 1, gl.FLOAT, false, 0, 0);


        let modelView = mat4.multiply(mat4.create(), context.viewMatrix, context.sceneMatrix);
        gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_modelView'), false, mat4.multiply(mat4.create(), context.viewMatrix, context.sceneMatrix));
        gl.uniformMatrix3fv(gl.getUniformLocation(context.shader, 'u_normalMatrix'), false, mat3.fromMat4(mat3.create(), modelView));
        gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_projection'), false, context.projectionMatrix);
        gl.uniform1f(gl.getUniformLocation(context.shader, 'u_age'), this.age);
        gl.uniform1f(gl.getUniformLocation(context.shader, 'u_birth'), this.birth);

    }
}

// class ParticleSystemNode extends SGNode {
//     constructor(gl, resources, texture, maxParticles, model, time, position) {
//         super();
//         this.gl = gl;
//         this.resources = resources;
//         this.texture = texture;
//         this.maxParticles = maxParticles;
//         this.model = model;
//         this.position = position;
//         // this.particles = [];
//     }
//
//     initSystem() {
//         for(let i = 0; i < this.maxParticles; i++) {
//             this.children.push(this.spawnParticle(this.texture, this.model, this.position, this.getDirection(), this.ttl));
//         }
//     }
//
//     spawnParticle(texture, model, position, direction, ttl) {
//         this.positionBuff = gl.createBuffer();
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuff);
//         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);
//
//         this.directionBuff = gl.createBuffer();
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.directionBuff);
//         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(direction), gl.STATIC_DRAW);
//
//         this.ttlBuff = gl.createBuffer();
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.ttlBuff);
//         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ttl), gl.STATIC_DRAW);
//
//         gl.bindBuffer(gl.ARRAY_BUFFER, null);
//         return  new ParticleNode(ttl, position, direction, [this.positionBuff, this.directionBuff, this.ttlBuff], new MaterialSGNode(new TexturedObjectNode(texture, [new RenderSGNode(model)])));
//     }
//
//     render(context) {
//         for(let i = this.children.length; i <= 0; i--) {
//             let particle = this.children[i];
//             particle.updateAge();
//             if(particle.isDead()) {
//                 this.children.splice(i, 1);
//                 this.children.push(new particle(this.ttl, this.position, this,this.getDirection()), [this.positionBuff, this.directionBuff, this.ttlBuff], new MaterialSGNode(new TexturedObjectNode(this.texture, [new RenderSGNode(this.model)])));
//             } else {
//                 // particle
//             }
//         }
//     }
//
//     getDirection() {
//         return [(.1)*Math.pow(-1,Math.floor(Math.random()*2)), -Math.random(), .1*Math.pow(-1,Math.floor(Math.random()*2)), 1];
//
//     }
//
//     update() {
//         this.children.forEach(n => n.update())
//     }
//
// }
//
//
//
// class ParticleNode extends SGNode {
//     constructor(ttl, position, direction, buffs, children) {
//         super(children);
//         this.ttl = ttl;
//         this.position = position;
//         this.direction = vec4.fromValues(direction[0], direction[1], direction[2], direction[3]);
//         this.buffers = buffs;
//     }
//
//     updateAge() {
//         this.ttl--;
//     }
//
//     isDead() {
//         return this.ttl <= 0;
//     }
//
//     render(context) {
//         super.render(context);
//         gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_modelView'), mat4.multiply(mat4.create(), context.viewMatrix, context.sceneMatrix));
//         gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_projection'), context.projectionMatrix);
//
//         // const positionLocation = gl.getAttribLocation(context.program, 'a_position');
//         // gl.enableVertexAttribArray(positionLocation);
//         // gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[0]);
//         // gl.vertexAttribPointer(positionLocation, 3, gl.float, false, 0,0);
//
//         const directionLocation = gl.getAttribLocation(context.program, 'a_direction');
//         gl.enableVertexAttribArray(directionLocation);
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[1]);
//         gl.vertexAttribPointer(directionLocation, 4, gl.float, false, 0, 0);
//
//         const ttlLocation = gl.getAttribLocation(context.program, 'a_ttl');
//         gl.enableVertexAttribArray(ttlLocation);
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[2]);
//         gl.vertexAttribPointer(ttlLocation, 1, gl.float, false, 0, 0);
//
//     }
//
//     update() {
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[1])
//         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.direction), gl.STATIC_DRAW);
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[2]);
//         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.ttl), gl.STATIC_DRAW);
//     }
//
//
// }

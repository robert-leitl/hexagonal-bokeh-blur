
import { mat4, quat, vec3 } from 'gl-matrix';

import drawVertShaderSource from './shader/draw.vert';
import drawFragShaderSource from './shader/draw.frag';
import compositeVertShaderSource from './shader/composite.vert';
import compositeFragShaderSource from './shader/composite.frag';
import { OrbitControl } from './orbit-control';
import { simplex2 } from './noise';

export class HexagonalBokeh {
    oninit;

    #time = 0;
    #frames = 0;
    #deltaTime = 0;
    #isDestroyed = false;

    camera = {
        matrix: mat4.create(),
        near: 1,
        far: 500,
        distance: 150,
        orbit: quat.create(),
        position: vec3.create(),
        rotation: vec3.create(),
        up: vec3.fromValues(0, 1, 0)
    };

    blur = {
        radius: 10,
        scale: 1
    }

    constructor(canvas, pane, oninit = null) {
        this.canvas = canvas;
        this.pane = pane;
        this.oninit = oninit;

        this.#init();
    }

    resize() {
        const gl = this.gl;

        this.#resizeCanvasToDisplaySize(gl.canvas);
        
        // When you need to set the viewport to match the size of the canvas's
        // drawingBuffer this will always be correct
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

        // resize the framebuffer textures
        this.#resizeTextures(gl);

        this.#updateProjectionMatrix(gl);
    }

    run(time = 0) {
        this.#deltaTime = time - this.#time;
        this.#time = time;
        this.#frames += this.#deltaTime / 16;

        if (this.#isDestroyed) return;

        this.control.update();

        const worldInvers = mat4.create();
        mat4.invert(worldInvers, this.drawUniforms.u_worldMatrix);
        mat4.transpose(this.drawUniforms.u_worldInverseTransposeMatrix, worldInvers);

        this.#render();

        requestAnimationFrame((t) => this.run(t));
    }

    #render() {
        /** @type {WebGLRenderingContext} */
        const gl = this.gl;

        gl.enable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);

        // draw depth and color 
        this.#setFramebuffer(gl, this.drawFramebuffer, this.drawFramebufferWidth, this.drawFramebufferHeight);
        gl.useProgram(this.drawProgram);
        gl.bindVertexArray(this.objectVAO);
        gl.uniformMatrix4fv(this.drawLocations.u_worldMatrix, false, this.drawUniforms.u_worldMatrix);
        gl.uniformMatrix4fv(this.drawLocations.u_viewMatrix, false, this.drawUniforms.u_viewMatrix);
        gl.uniformMatrix4fv(this.drawLocations.u_projectionMatrix, false, this.drawUniforms.u_projectionMatrix);
        gl.uniformMatrix4fv(this.drawLocations.u_worldInverseTransposeMatrix, false, this.drawUniforms.u_worldInverseTransposeMatrix);
        gl.uniform3f(this.drawLocations.u_cameraPosition, this.camera.position[0], this.camera.position[1], this.camera.position[2]);
        gl.clearBufferfv(gl.COLOR, 0, [0.0, 0.0, 0.0, 0.0]);
        gl.clearBufferfv(gl.DEPTH, 0, [1.]);
        gl.drawElements(gl.TRIANGLES, this.objectBuffers.numElem, gl.UNSIGNED_SHORT, 0);
        this.#setFramebuffer(gl, null, gl.drawingBufferWidth, gl.drawingBufferHeight);

        // blit depth and color
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.drawFramebuffer);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.blitFramebuffer);
        gl.clearBufferfv(gl.COLOR, 0, [0.0, 0.0, 0.0, 1.0]);
        gl.clearBufferfv(gl.DEPTH, 0, [0]);
        gl.blitFramebuffer(0, 0, this.drawFramebufferWidth, this.drawFramebufferHeight, 0, 0, this.drawFramebufferWidth, this.drawFramebufferHeight, gl.COLOR_BUFFER_BIT, gl.NEAREST);
        gl.blitFramebuffer(0, 0, this.drawFramebufferWidth, this.drawFramebufferHeight, 0, 0, this.drawFramebufferWidth, this.drawFramebufferHeight, gl.DEPTH_BUFFER_BIT, gl.NEAREST);
        this.#setFramebuffer(gl, null, gl.drawingBufferWidth, gl.drawingBufferHeight);

        // draw to the canvas
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(this.compositeProgram);
        gl.bindVertexArray(this.quadVAO);
        gl.uniform1i(this.compositeLocations.u_texture, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.colorTexture);
        gl.drawArrays(gl.TRIANGLES, 0, this.quadBuffers.numElem);
    }

    destroy() {
        this.#isDestroyed = true;
    }

    #init() {
        this.gl = this.canvas.getContext('webgl2', { antialias: false, alpha: false });

        /** @type {WebGLRenderingContext} */
        const gl = this.gl;

        if (!gl) {
            throw new Error('No WebGL 2 context!')
        }

        ///////////////////////////////////  PROGRAM SETUP

        // setup programs
        this.drawProgram = this.#createProgram(gl, [drawVertShaderSource, drawFragShaderSource]);
        this.compositeProgram = this.#createProgram(gl, [compositeVertShaderSource, compositeFragShaderSource], null, { a_position: 0 });

        // find the locations
        this.drawLocations = {
            a_position: gl.getAttribLocation(this.drawProgram, 'a_position'),
            a_normal: gl.getAttribLocation(this.drawProgram, 'a_normal'),
            a_uv: gl.getAttribLocation(this.drawProgram, 'a_uv'),
            a_instanceMatrix: gl.getAttribLocation(this.drawProgram, 'a_instanceMatrix'),
            u_worldMatrix: gl.getUniformLocation(this.drawProgram, 'u_worldMatrix'),
            u_viewMatrix: gl.getUniformLocation(this.drawProgram, 'u_viewMatrix'),
            u_projectionMatrix: gl.getUniformLocation(this.drawProgram, 'u_projectionMatrix'),
            u_worldInverseTransposeMatrix: gl.getUniformLocation(this.drawProgram, 'u_worldInverseTransposeMatrix'),
            u_cameraPosition: gl.getUniformLocation(this.drawProgram, 'u_cameraPosition')
        };
        this.compositeLocations = {
            a_position: gl.getAttribLocation(this.compositeProgram, 'a_position'),
            u_texture: gl.getUniformLocation(this.compositeProgram, 'u_texture')
        };

        // setup uniforms
        this.drawUniforms = {
            u_worldMatrix: mat4.create(),
            u_viewMatrix: mat4.create(),
            u_projectionMatrix: mat4.create(),
            u_worldInverseTransposeMatrix: mat4.create()
        };
        mat4.rotate(this.drawUniforms.u_worldMatrix, this.drawUniforms.u_worldMatrix, 90, [1, 0, 0]);
        mat4.scale(this.drawUniforms.u_worldMatrix, this.drawUniforms.u_worldMatrix, [50, 50, 50]);
        mat4.translate(this.drawUniforms.u_worldMatrix, this.drawUniforms.u_worldMatrix, [0, 0, 0]);

        /////////////////////////////////// GEOMETRY / MESH SETUP

        // create object VAO
        this.objectGeometry = this.#createXYPlaneGeometry(8, 8, 140, 140, (p) => {
            const scale = .8;
            const maxHeight = .2;
            const n = simplex2(p.x * scale, p.y * scale);
            return {x: p.x, y: p.y, z: n * maxHeight} 
        });
        console.log(this.objectGeometry);
        this.objectBuffers = { 
            position: this.#createBuffer(gl, this.objectGeometry.vertices),
            normal: this.#createBuffer(gl, this.objectGeometry.normals),
            uv: this.#createBuffer(gl, this.objectGeometry.uvs),
            numElem: this.objectGeometry.count
        };
        this.objectVAO = this.#makeVertexArray(gl, [
            [this.objectBuffers.position, this.drawLocations.a_position, 3],
            [this.objectBuffers.normal, this.drawLocations.a_normal, 3],
            [this.objectBuffers.uv, this.drawLocations.a_uv, 2]
        ], this.objectGeometry.indices);

        // create quad VAO
        const quadPositions = [
            -1, -1,
            3, -1,
            -1, 3
        ];
        this.quadBuffers = {
            position: this.#createBuffer(gl, quadPositions),
            numElem: quadPositions.length / 2
        };
        this.quadVAO = this.#makeVertexArray(gl, [[this.quadBuffers.position, this.drawLocations.a_position, 2]]);

        // initial client dimensions
        const clientWidth = gl.canvas.clientWidth;
        const clientHeight = gl.canvas.clientHeight;

         
        /////////////////////////////////// INITIAL DRAW PASS SETUP

        this.drawFramebufferWidth = clientWidth;
        this.drawFramebufferHeight = clientHeight;

        // the initial draw pass renders the scene using multisample renderbuffers for
        // color and depth which are then blitted to separate textures

        // draw framebuffer setup
        this.drawFramebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.drawFramebuffer);
        // depth render buffer setup
        this.depthRenderbuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthRenderbuffer);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, 4, gl.DEPTH_COMPONENT32F, this.drawFramebufferWidth, this.drawFramebufferHeight);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthRenderbuffer);
        // color renderbuffer setup
        this.colorRenderbuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.colorRenderbuffer);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, gl.getParameter(gl.MAX_SAMPLES), gl.RGBA8, this.drawFramebufferWidth, this.drawFramebufferHeight);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, this.colorRenderbuffer);
        if(gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
            console.error('could not complete render framebuffer setup')
        }

        // blit framebuffer setup
        this.blitFramebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.blitFramebuffer);
        // depth texture setup
        this.depthTexture = this.#createAndSetupTexture(gl, gl.NEAREST, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, this.depthTexture);
        gl.texImage2D(this. gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT32F, this.drawFramebufferWidth, this.drawFramebufferHeight, 0, gl.DEPTH_COMPONENT, gl.FLOAT, null);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture, 0);   
        // color texture setup
        this.colorTexture = this.#createAndSetupTexture(gl, gl.LINEAR, gl.LINEAR);
        gl.bindTexture(gl.TEXTURE_2D, this.colorTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.drawFramebufferWidth, this.drawFramebufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.colorTexture, 0);
        if(gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
            console.error('could not complete render framebuffer setup')
        }

        /////////////////////////////////// FIRST BLUR PASS SETUP


        /////////////////////////////////// SECOND BLUR PASS SETUP



        this.resize();

        this.#updateCameraMatrix();
        this.#updateProjectionMatrix(gl);

        this.#initOrbitControls();
        this.#initTweakpane();

        if (this.oninit) this.oninit(this);
    }

    #createXYPlaneGeometry(w, h, wSegments, hSegments, distort) {
        let sx = -w / 2;
        let sy = -h / 2;
        const dx = w / wSegments;
        const dy = h / hSegments;
        const count = wSegments * hSegments * 6;
        const vertices = [];
        const normals = [];
        const uvs = [];
        const indices = [];
        const wOff = wSegments + 1;
        const dd = Math.min(dx, dy) * .1;

        for(let iy = 0; iy <= hSegments; ++iy) {
            for(let ix = 0; ix <= wSegments; ++ix) {
                let p = {
                    x: sx + dx * ix,
                    y: sy + dy * iy,
                    z: 0
                };
                let n = {x: 0, y: 0, z: 1};

                if (distort) {
                    let x1 = {...p};
                    let x2 = {...p};
                    let y1 = {...p};
                    let y2 = {...p};
                    x1.x -= dd;
                    x2.x += dd;
                    y1.y -= dd;
                    y2.y += dd;
                    x1 = distort(x1);
                    x2 = distort(x2);
                    y1 = distort(y1);
                    y2 = distort(y2);
                    t = vec3.fromValues(
                        x2.x - x1.x,
                        x2.y - x1.y,
                        x2.z - x1.z
                    );
                    b = vec3.fromValues(
                        y2.x - y1.x,
                        y2.y - y1.y,
                        y2.z - y1.z
                    );
                    const normal = vec3.cross(vec3.create(), t, b);
                    vec3.normalize(normal, normal);
                    n.x = normal[0];
                    n.y = normal[1];
                    n.z = normal[2];

                    p = distort(p);
                }

                vertices.push(p.x, p.y, p.z);
                normals.push(n.x, n.y, n.z);
                uvs.push(ix / wSegments, iy / hSegments);
            }
        }

        for(let iy = 0; iy < hSegments; ++iy) {
            for(let ix = 0; ix < wSegments; ++ix) {
                indices.push(
                    iy * wOff + ix,
                    iy * wOff + ix + 1,
                    (iy + 1) * wOff + ix + 1
                );
                indices.push(
                    (iy + 1) * wOff + ix + 1,
                    (iy + 1) * wOff + ix,
                    iy * wOff + ix
                );
            }
        }

        return {
            vertices,
            normals,
            uvs,
            indices,
            count
        };
    }

    #createBuffer(gl, data) {
        const buffer = this.gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return buffer;
    }

    #initOrbitControls() {
        this.control = new OrbitControl(this.canvas, this.camera, () => this.#updateCameraMatrix());
    }

    #createFramebuffer(gl, colorAttachements) {
        const fbo = gl.createFramebuffer();
        const drawBuffers = [];
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        colorAttachements.forEach((texture, ndx) => {
            const attachmentPoint = gl[`COLOR_ATTACHMENT${ndx}`];
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,
                attachmentPoint,
                gl.TEXTURE_2D, 
                texture,
                0);
            drawBuffers.push(attachmentPoint);
        });
        gl.drawBuffers(drawBuffers);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return fbo;
    }

    #makeVertexArray(gl, bufLocNumElmPairs, indices) {
        const va = gl.createVertexArray();
        gl.bindVertexArray(va);
        for (const [buffer, loc, numElem] of bufLocNumElmPairs) {
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(
                loc,      // attribute location
                numElem,        // number of elements
                gl.FLOAT, // type of data
                false,    // normalize
                0,        // stride (0 = auto)
                0,        // offset
            );
        }
        if (indices) {
            const indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        }
        gl.bindVertexArray(null);
        return va;
    }

    #createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

        if (success) {
            return shader;
        }

        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

    #createProgram(gl, shaderSources, transformFeedbackVaryings, attribLocations) {
        const program = gl.createProgram();

        [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, ndx) => {
            const shader = this.#createShader(gl, type, shaderSources[ndx]);
            gl.attachShader(program, shader);
        });

        if (transformFeedbackVaryings) {
            gl.transformFeedbackVaryings(program, transformFeedbackVaryings, gl.SEPARATE_ATTRIBS);
        }

        if (attribLocations) {
            for(const attrib in attribLocations) {
                gl.bindAttribLocation(program, attribLocations[attrib], attrib);
            }
        }

        gl.linkProgram(program);
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);

        if (success) {
            return program;
        }

        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }

    #setFramebuffer(gl, fbo, width, height) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo); // all draw commands will affect the framebuffer
        gl.viewport(0, 0, width, height);
    }

    #createAndSetupTexture(gl, minFilter, magFilter) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
        return texture;
    }

    #resizeTextures(gl) {
        const clientWidth = gl.canvas.clientWidth;
        const clientHeight = gl.canvas.clientHeight;
        this.drawFramebufferWidth = clientWidth;
        this.drawFramebufferHeight = clientHeight;
        this.dofFramebufferWidth = clientWidth * this.DOF_TEXTURE_SCALE;
        this.dofFramebufferHeight = clientHeight * this.DOF_TEXTURE_SCALE;

        // resize draw/blit textures and buffers
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthRenderbuffer);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, 4, gl.DEPTH_COMPONENT32F, clientWidth, clientHeight);
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.colorRenderbuffer);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, gl.getParameter(gl.MAX_SAMPLES), gl.RGBA8, clientWidth, clientHeight);
        gl.bindTexture(gl.TEXTURE_2D, this.depthTexture);
        gl.texImage2D(this. gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT32F, clientWidth, clientHeight, 0, gl.DEPTH_COMPONENT, gl.FLOAT, null);
        gl.bindTexture(gl.TEXTURE_2D, this.colorTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, clientWidth, clientHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        // resize dof packed texture
        /*gl.bindTexture(gl.TEXTURE_2D, this.dofPackedTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.drawFramebufferWidth, this.drawFramebufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        // resize dof blur textures
        gl.bindTexture(gl.TEXTURE_2D, this.dofBlurHNearTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.dofFramebufferWidth, this.dofFramebufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.bindTexture(gl.TEXTURE_2D, this.dofBlurHMidFarTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.dofFramebufferWidth, this.dofFramebufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.bindTexture(gl.TEXTURE_2D, this.dofBlurVNearTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.dofFramebufferWidth, this.dofFramebufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.bindTexture(gl.TEXTURE_2D, this.dofBlurVMidFarTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.dofFramebufferWidth, this.dofFramebufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);*/
        
        // reset bindings
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    #updateCameraMatrix() {
        mat4.targetTo(this.camera.matrix, this.camera.position, [0, 0, 0], this.camera.up);
        mat4.invert(this.drawUniforms.u_viewMatrix, this.camera.matrix);
    }

    #updateProjectionMatrix(gl) {
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        mat4.perspective(this.drawUniforms.u_projectionMatrix, Math.PI / 4, aspect, this.camera.near, this.camera.far);
    }

    #resizeCanvasToDisplaySize(canvas) {
        // Lookup the size the browser is displaying the canvas in CSS pixels.
        const displayWidth  = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
       
        // Check if the canvas is not the same size.
        const needResize = canvas.width  !== displayWidth ||
                           canvas.height !== displayHeight;
       
        if (needResize) {
          // Make the canvas the same size
          canvas.width  = displayWidth;
          canvas.height = displayHeight;
        }
       
        return needResize;
    }

    #initTweakpane() {
        if (this.pane) {
            const maxFar = 700;

            const cameraFolder = this.pane.addFolder({ title: 'Camera' });
            this.#createTweakpaneSlider(cameraFolder, this.camera, 'near', 'near', 1, maxFar, null, () => this.#updateProjectionMatrix(this.gl));
            this.#createTweakpaneSlider(cameraFolder, this.camera, 'far', 'far', 1, maxFar, null, () => this.#updateProjectionMatrix(this.gl));
            const blurSettings = this.pane.addFolder({ title: 'Blur Settings' });
            this.#createTweakpaneSlider(blurSettings, this.blur, 'radius', 'radius', 0, 30, 1);
            this.#createTweakpaneSlider(blurSettings, this.blur, 'scale', 'scale', 1, 5, 0.1);
        }
    }

    #createTweakpaneSlider(folder, obj, propName, label, min, max, stepSize = null, callback) {
        const slider = folder.addBlade({
            view: 'slider',
            label,
            min,
            max,
            step: stepSize,
            value: obj[propName],
        });
        slider.on('change', e => {
            obj[propName] = e.value;
            if(callback) callback();
        });
    }
}

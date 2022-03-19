import { mat4, quat, vec3 } from 'gl-matrix';

export class OrbitControl {

    constructor(canvas, camera, updateCallback) {
        this.pointerDown = false;
        this.pointerDownPos = { x: 0, y: 0 };
        this.pointerPos = { x: 0, y: 0 };
        this.followPos = { x: 0, y: 0 };
        this.prevFollowPos = {x: 0, y: 0};
        this.phi = 0.;
        this.theta = 0.;
        this.camera = camera;
        this.updateCallback = updateCallback;

        canvas.addEventListener('pointerdown', e => {
            this.pointerDownPos = { x: e.clientX, y: e.clientY }
            this.followPos = { x: e.clientX, y: e.clientY }
            this.pointerPos = { x: e.clientX, y: e.clientY }
            this.prevFollowPos = { x: e.clientX, y: e.clientY }
            this.pointerDownCameraUp = [...this.camera.up];
            this.pointerDownRotation = [...this.camera.rotation];
            this.pointerDown = true;
        });
        canvas.addEventListener('pointerup', e => {
            this.pointerDown = false;
        });
        canvas.addEventListener('pointermove', e => {
            if (this.pointerDown) {
                this.pointerPos = { x: e.clientX, y: e.clientY }
            }
        });
    }

    update() {
        if (this.pointerDown) {
            const damping = 10;
            this.followPos.x += (this.pointerPos.x - this.followPos.x) / damping;
            this.followPos.y += (this.pointerPos.y - this.followPos.y) / damping;

            const delta = {
                x: this.followPos.x - this.prevFollowPos.x,
                y: this.followPos.y - this.prevFollowPos.y
            };
            this.prevFollowPos = { ...this.followPos };

            const speed = 0.2;
            this.phi = delta.x * speed;
            this.theta = delta.y * speed;
        } else {
            this.phi *= 0.96;
            this.theta *= 0.96;
        }

        this.camera.rotation[0] -= this.theta;
        this.camera.rotation[1] -= this.phi;

        const thetaLimitUp = -8;
        const thetaLimitDown = -80;
        if (this.camera.rotation[0] > thetaLimitUp) {
            this.camera.rotation[0] = thetaLimitUp;
        } else if (this.camera.rotation[0] < thetaLimitDown) {
            this.camera.rotation[0] = thetaLimitDown;
        }

        quat.fromEuler(this.camera.orbit, this.camera.rotation[0], this.camera.rotation[1], this.camera.rotation[2]);
        vec3.transformQuat(this.camera.position, [0, 0, this.camera.distance], this.camera.orbit);

        this.updateCallback();
    }

}
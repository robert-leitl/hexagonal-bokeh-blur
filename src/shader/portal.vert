#version 300 es

uniform mat4 u_worldMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_projectionMatrix;

in vec3 a_position;
in vec2 a_uv;

out vec3 v_position;
out vec2 v_uv;

void main() {
    v_uv = a_uv;
    vec4 worldPosition = u_worldMatrix * vec4(a_position, 1.);
    vec4 viewPosition = u_viewMatrix * worldPosition;
    gl_Position = u_projectionMatrix * viewPosition;
}

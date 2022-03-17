#version 300 es

uniform mat4 u_worldMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_projectionMatrix;
uniform mat4 u_worldInverseTransposeMatrix;
uniform vec3 u_cameraPosition;

in vec3 a_position;
in vec3 a_normal;
in vec2 a_uv;

out vec3 v_normal;
out vec2 v_uv;
out vec3 v_surfaceToView;

void main() {
    v_uv = a_uv;
    v_normal = (u_worldInverseTransposeMatrix * vec4(a_normal, 0.)).xyz;
    vec4 worldPosition = u_worldMatrix * vec4(a_position, 1.);
    gl_Position = u_projectionMatrix * u_viewMatrix * worldPosition;
    v_surfaceToView = u_cameraPosition - worldPosition.xyz;
}

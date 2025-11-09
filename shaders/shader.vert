#version 450

// Questo è un vertex shader "pass-through".
// Disegneremo un singolo triangolo che copre l'intero schermo,
// e le coordinate dei suoi vertici saranno generate internamente.
// Questo shader si assicura semplicemente che vengano passate
// alla fase successiva della pipeline.

// out vec2 fragCoord ci servirà dopo per calcolare il mandelbrot
layout(location = 0) out vec2 fragCoord;

void main() {
    // Genera le coordinate per un triangolo a schermo intero
    // vertice 0: (-1, -1) -> fragCoord = (0, 0)
    // vertice 1: ( 3, -1) -> fragCoord = (2, 0)
    // vertice 2: (-1,  3) -> fragCoord = (0, 2)
    vec2 positions[3] = vec2[](
        vec2(-1.0, -1.0),
        vec2( 3.0, -1.0),
        vec2(-1.0,  3.0)
    );
    gl_Position = vec4(positions[gl_VertexIndex], 0.0, 1.0);
    fragCoord = (gl_Position.xy + 1.0) / 2.0;
}

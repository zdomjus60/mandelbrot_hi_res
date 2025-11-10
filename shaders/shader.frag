#version 450
#extension GL_ARB_gpu_shader_fp64 : require

layout(location = 0) in vec2 fragCoord;
layout(location = 0) out vec4 outColor;

layout(binding = 0) uniform UniformBufferObject {
    dvec2 center;
    double zoom;
    vec3 color_offset;
    int palette_mode; // 0 for original, 1 for random
    vec3 random_palette[32];
} ubo;

void main() {
    // Mappa fragCoord (0.0-1.0) al piano complesso usando i dati dell'UBO
    double aspectRatio = 1920.0 / 1080.0;
    dvec2 uv = dvec2(fragCoord.x - 0.5, fragCoord.y - 0.5); // da 0..1 a -0.5..0.5
    dvec2 c = ubo.center + uv * dvec2(aspectRatio, 1.0) * ubo.zoom;

    dvec2 z = dvec2(0.0, 0.0);
    int i;
    int max_iter = 512;

    for (i = 0; i < max_iter; i++) {
        z = dvec2(z.x * z.x - z.y * z.y + c.x, 2.0 * z.x * z.y + c.y);
        if (dot(z, z) > 4.0) {
            break;
        }
    }

    if (i == max_iter) {
        outColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
        // Conteggio delle iterazioni per il colore
        float i_float = float(i);
        
        if (ubo.palette_mode == 0) {
            // Original psychedelic banded palette
            float r = 0.5 * (1.0 + cos(3.0 + i_float * 0.15 + ubo.color_offset.x));
            float g = 0.5 * (1.0 + cos(3.5 + i_float * 0.20 + ubo.color_offset.y));
            float b = 0.5 * (1.0 + cos(4.0 + i_float * 0.25 + ubo.color_offset.z));
            outColor = vec4(r, g, b, 1.0);
        } else {
            // Random non-graduated palette
            int palette_index = i % 32; // Use iteration count to index into the random palette
            outColor = vec4(ubo.random_palette[palette_index], 1.0);
        }
    }
}

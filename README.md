# Mandelbrot Renderer

This project implements a Mandelbrot set renderer using Vulkan, featuring high-precision zoom and psychedelic banded coloring.

## Features

- High-precision double-precision floating-point calculations for deep zooms into the Mandelbrot set.
- Psychedelic banded coloring algorithm.
- Interactive zoom:
    - Left-click to zoom in on the cursor position.
    - Right-click to zoom out.
    - Press 'C' to randomize the color offset.

## Building and Running

To build and run this project, you need to have the Vulkan SDK and GLFW installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/zdomjus60/mandelbrot.git
    cd mandelbrot
    ```

2.  **Create a build directory and run CMake:**
    ```bash
    mkdir build
    cd build
    cmake ..
    ```

3.  **Build the project:**
    ```bash
    cmake --build .
    ```

4.  **Run the application:**
    ```bash
    ./MandelbrotRenderer
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

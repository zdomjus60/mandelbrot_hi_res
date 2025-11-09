cmake_minimum_required(VERSION 3.10 FATAL_ERROR)
project(MandelbrotRenderer LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Trova l'SDK di Vulkan
find_package(Vulkan REQUIRED)

# Trova GLFW
find_package(glfw3 CONFIG REQUIRED)

# Trova GLM
find_package(glm REQUIRED)

# Trova il compilatore di shader glslangValidator
find_program(GLSLANG_VALIDATOR_EXECUTABLE glslangValidator)
if(NOT GLSLANG_VALIDATOR_EXECUTABLE)
    message(FATAL_ERROR "glslangValidator non trovato! Assicurati che glslang-tools sia installato e nel PATH.")
endif()

# Aggiungi l'eseguibile
add_executable(${PROJECT_NAME} src/main.cpp)

# Compilazione degli shader
set(SHADER_DIR ${CMAKE_CURRENT_SOURCE_DIR}/shaders)
set(COMPILED_SHADER_DIR ${CMAKE_CURRENT_BINARY_DIR}/shaders)
file(MAKE_DIRECTORY ${COMPILED_SHADER_DIR})

set(SHADERS
    ${SHADER_DIR}/shader.vert
    ${SHADER_DIR}/shader.frag
)

foreach(SHADER_SOURCE IN LISTS SHADERS)
    get_filename_component(SHADER_NAME ${SHADER_SOURCE} NAME)
    set(SHADER_BINARY ${COMPILED_SHADER_DIR}/${SHADER_NAME}.spv)

    add_custom_command(
        OUTPUT ${SHADER_BINARY}
        COMMAND ${GLSLANG_VALIDATOR_EXECUTABLE} -V --target-env vulkan1.1 -o ${SHADER_BINARY} ${SHADER_SOURCE}
        DEPENDS ${SHADER_SOURCE}
        COMMENT "Compiling ${SHADER_NAME} with glslangValidator"
    )
    list(APPEND SHADER_BINARIES ${SHADER_BINARY})
endforeach()

# Crea un target per compilare tutti gli shader
add_custom_target(Shaders ALL DEPENDS ${SHADER_BINARIES})

# Assicurati che gli shader siano compilati prima di costruire l'eseguibile
add_dependencies(${PROJECT_NAME} Shaders)


# Collega le librerie
target_link_libraries(${PROJECT_NAME}
    PRIVATE
        Vulkan::Vulkan
        glfw
        glm::glm
)

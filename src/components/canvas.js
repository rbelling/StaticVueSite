// https://codepen.io/hjortureh/pen/HJfbC?page=1&
import * as THREE from 'three'

let width
let height

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, null, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

const geometry = new THREE.CubeGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: 0x111111
})
const cube = new THREE.Mesh(geometry, material)

export const init = (container, multiplier = 1) => {
  const resize = () => {
    width = container.clientWidth
    height = container.clientHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  const render = () => {
    requestAnimationFrame(render)

    cube.rotation.x += 0.03 * multiplier
    cube.rotation.y += 0.03 * multiplier

    renderer.render(scene, camera)
  }

  resize()
  scene.add(cube)
  container.appendChild(renderer.domElement)

  // camera.position.z = 3

  render()
  return resize
}

export default init

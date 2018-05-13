// https://codepen.io/hjortureh/pen/HJfbC?page=1&
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  CubeGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three'

let width
let height

const scene = new Scene()
const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new WebGLRenderer({ antialias: true })
const geometry = new CubeGeometry(1, 1, 1)
const material = new MeshBasicMaterial({
  wireframe: true,
  color: 'rebeccapurple'
})
const cube = new Mesh(geometry, material)

export default (container, multiplier = 1) => {
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
  camera.position.z = 3
  container.appendChild(renderer.domElement)

  render()

  return resize
}

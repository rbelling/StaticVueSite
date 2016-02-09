// http://www.goodboydigital.com/pixi-js-tutorial-getting-started/

import 'pixi.js';

export default (() => {
  let renderer, container, bunny, texture;
  const init = () => {
    // create an new instance of a pixi container
    container = new PIXI.Container();

    // create a renderer instance.
    renderer = PIXI.autoDetectRenderer(400, 300);

    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
    requestAnimationFrame(animate);

    // create a texture from an image path
    texture = PIXI.Texture.fromImage("./images/test.png");
    // create a new Sprite using the texture
    bunny = new PIXI.Sprite(texture);

    // center the sprites anchor point
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // move the sprite t the center of the screen
    bunny.position.x = 200;
    bunny.position.y = 150;

    container.addChild(bunny);
  };
  const animate = () => {
    requestAnimationFrame(animate);
    // just for fun, lets rotate mr rabbit a little
    bunny.rotation += 0.1;
    // render the container
    renderer.render(container);
  }
  return {
    init,
  };
})();

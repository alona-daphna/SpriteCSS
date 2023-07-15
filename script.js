const UP = "top: calc(-64px * var(--pixels));";
const DOWN = "top: 0;";
const LEFT = "top: calc(-96px * var(--pixels));";
const RIGHT = "top: calc(-32px * var(--pixels));";
const directions = [UP, DOWN, LEFT, RIGHT];
const pathCount = 12;
const pixelSize = parseInt(
  getComputedStyle(document.body).getPropertyValue("--pixels")
);
const pixelFactor = getComputedStyle(document.body).getPropertyValue(
  "--pixel-factor"
);
let dynamicStyles = null;

const createSprite = () => {
  const addSpriteBtn = document.getElementById("add-sprite-button");

  addSpriteBtn.addEventListener("click", (e) => {
    const playground = document.getElementById("playground");

    // create the trajectory keyframe for the sprite
    let coors = createRandomCoor();

    console.log(coors)
    let childIndex = playground.children.length;
    let framePercent = 100 / pathCount;
    let keyframe = `@keyframes moveSprite${childIndex} {`;

    for (let i = 0; i < pathCount; i++) {
      if (i  === 0) {
        keyframe = keyframe.concat(`0%, 100% {
            left: ${coors[i][0]}px;
            top: ${coors[i][1]}px;
        }`);
      } else if (i < coors.length) {
        console.log(i)
        keyframe = keyframe.concat(`${framePercent * i + 1}% {
            left: ${coors[i][0]}px;
            top: ${coors[i][1]}px;
        }`);
      }
    }

    keyframe = keyframe.concat("}");
    console.log(keyframe);

    // add the keyframe to the stylesheet
    if (!dynamicStyles) {
      dynamicStyles = document.createElement("style");
      document.head.appendChild(dynamicStyles);
    }

    dynamicStyles.sheet.insertRule(
      keyframe,
      dynamicStyles.sheet.cssRules.length
    );

    const sprite = document.createElement("div");
    sprite.classList.add("sprite");
    sprite.style.animation = `moveSprite${childIndex} 30s steps(60) infinite`;
    const spriteImg = document.createElement("img");
    spriteImg.src = "assets/DemoRpgCharacter.png";
    spriteImg.classList.add("sprite-img");
    sprite.appendChild(spriteImg);
    playground.appendChild(sprite);
  });
};

const createRandomCoor = () => {
  const enclosure = document.getElementById("playground");
  const boundingObj = enclosure.getBoundingClientRect();
  const minX = boundingObj.left;
  const maxX = boundingObj.right - pixelSize * pixelFactor;
  const minY = boundingObj.top;
  const maxY = boundingObj.bottom - pixelSize * pixelFactor;

  const coors = [];

  for (let i = 0; i < pathCount - 1; i++) {
    let cooPair = [];
    cooPair.push(Math.floor(Math.random() * (maxX - minX)) + minX);
    cooPair.push(Math.floor(Math.random() * (maxY - minY)) + minY);
    coors.push(cooPair);
  }

  return coors;
};

window.addEventListener("DOMContentLoaded", () => {
  createSprite();
});

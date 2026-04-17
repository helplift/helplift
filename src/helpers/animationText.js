export const hideAllVisibleText = () => {
  const visibleTextElements = document.querySelectorAll(
    '.png__sequence__text_part.visible'
  );

  visibleTextElements.forEach((element) => {
    element.classList.remove('visible');
    element.classList.add('hidden');
  });
};

export const makeTextVisible = (textStage) => {
  const newVisibleTextElement = document.querySelector(
    `#text-stage-${textStage}`
  );

  hideAllVisibleText();

  if (newVisibleTextElement) {
    newVisibleTextElement.classList.remove('hidden');
    newVisibleTextElement.classList.add('visible');
  }
};

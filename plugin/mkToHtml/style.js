export const addStyle = (style) => {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = style;
  document.getElementsByTagName('head')[0].appendChild(styleElement);
}
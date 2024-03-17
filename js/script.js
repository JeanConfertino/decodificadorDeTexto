function run() {
  const sourceTextArea = document.querySelector('#sourceTextArea');
  const targetTextArea = document.querySelector('#targetTextArea');
  const encryptButton = document.querySelector('#encriptButton');
  const decryptButton = document.querySelector('#decriptButton');
  const copyButton = document.querySelector('#copyButton');
  const clickSound = document.querySelector('#clickSound');

  changeCharToUppercase(sourceTextArea);
  toggleButtonVisibility(copyButton, false);
  toggleTextAreaVisibility(targetTextArea, false);

  encryptButton.addEventListener('click', () => {
    encryptor(sourceTextArea, targetTextArea, true);
    clickSound.play();
  });
  decryptButton.addEventListener('click', () => {
    encryptor(sourceTextArea, targetTextArea, false);
    clickSound.play();
  });
  copyButton.addEventListener('click', () => copyText(targetTextArea));
}

const encryptor = (sourceElement, targetElement, isEncrypt) => {
  const vowelRegex = /a|e|i|o|u/g;
  const specialWordRegex = /ai|enter|imes|obter|ufat/g;

  const encryptionMap = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'obter',
    u: 'ufat',
  };
  const decryptionMap = {
    ai: 'a',
    enter: 'e',
    imes: 'i',
    obter: 'o',
    ufat: 'u',
  };

  const selectedMap = isEncrypt ? encryptionMap : decryptionMap;
  const selectedRegex = isEncrypt ? vowelRegex : specialWordRegex;

  const text = sourceElement.value.replace(
    selectedRegex,
    match => selectedMap[match] || match
  );

  const isEncrypted = specialWordRegex.test(sourceElement.value);

  if (!isEncrypt && !isEncrypted) {
    targetElement.value = '';
    toggleButtonVisibility(copyButton, false);
    viewAsideInfos(asideImg, textElements, true);
    toggleTextAreaVisibility(targetTextArea, false);
    return resultMessage(`O valor não está criptografado para continuar.`);
  }

  if (text !== '' && !checkForSpecialCharacters(text)) {
    targetElement.value = text.toUpperCase();
    toggleButtonVisibility(copyButton, true);
    toggleTextAreaVisibility(targetTextArea, true);
    viewAsideInfos(asideImg, textElements, false);
  } else {
    targetElement.value = '';
    toggleButtonVisibility(copyButton, false);
    viewAsideInfos(asideImg, textElements, true);
    toggleTextAreaVisibility(targetTextArea, false);
  }
};

const checkForSpecialCharacters = text => {
  const specialCharRegex = /\W|_/;
  const containsSpecialChars = specialCharRegex.test(text);

  if (containsSpecialChars) {
    resultMessage(`Caracteres especiais como acentos não são permitidos.`);
  } else {
    resultMessage(`Apenas letras minúsculas e sem acento.`);
  }

  return containsSpecialChars;
};

const changeCharToUppercase = element => {
  element.addEventListener('input', ev => {
    const texto = ev.target.value;
    ev.target.value = texto.toLowerCase();
  });
};

const copyText = element => navigator.clipboard.writeText(element.value);

const toggleButtonVisibility = (element, isView) =>
  isView ? (element.style.display = 'block') : (element.style.display = 'none');

const toggleTextAreaVisibility = (element, isView) =>
  isView ? (element.style.display = 'block') : (element.style.display = 'none');

const viewAsideInfos = (imgElement, textElements, isView) => {
  if (isView) {
    imgElement.style.visibility = 'visible';
    textElements.style.visibility = 'visible';
  } else {
    imgElement.style.visibility = 'hidden';
    textElements.style.visibility = 'hidden';
  }
};

const resultMessage = msg =>
  (document.querySelector('#msgResult').innerHTML = msg);

run();
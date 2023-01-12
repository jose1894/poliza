export function preventSpecialKey(evt:KeyboardEvent){
    const keyCode = evt.key;
    if (
      keyCode === 'Control' ||
      keyCode === 'Alt' ||
      keyCode === 'CapsLock' ||
      keyCode === 'Shift' ||
      keyCode === 'ArrowLeft' ||
      keyCode === 'ArrowUp' ||
      keyCode === 'ArrowDown' ||
      keyCode === 'ArrowRight' ||
      // keyCode === 'Meta' ||
      keyCode === 'ContextMenu' ||
      keyCode === 'Escape' ||
      keyCode === 'Tab' ||
      evt.code === 'KeyC'
    ) {
      return true;
    }


    return false
}
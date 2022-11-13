// TODO: Generalize (emit custom event caught in mixed component?)
const popupKeyboardControls = {
  created() {
    document.addEventListener('keyup', this.popupKeyboardControlsHandleKeyup);
  },
  methods: {
    popupKeyboardControlsHandleKeyup(evt) {
      if (evt.keyCode === 27) this.onEscapeKeyPress(evt);
      else if (evt.keyCode === 37) this.onLeftArrowKeyPress(evt);
      else if (evt.keyCode === 39) this.onRightArrowKeyPress(evt);
    }
  },
  destroyed() {
    document.removeEventListener(
      'keyup',
      this.popupKeyboardControlsHandleKeyup
    );
  }
};

export { popupKeyboardControls };

((window, document) => {
  const createElementFromHtmlString = htmlString => document.createRange().createContextualFragment(htmlString);
  const render = () => {
    const $display = document.createRange().createContextualFragment(`
      <div>
        <span>0</span>
      </div>
    `);

    const $plusButton = createElementFromHtmlString('<button class="plus">+</button>');
    const $minusButton = createElementFromHtmlString('<button class="minus">-</button>');
    const $buttons = ((...$buttons) => {
      const $container = document.createDocumentFragment();
      const $div = createElementFromHtmlString('<div></div>');
      $container.appendChild($div);
      $container.querySelector();
    })($plusButton, $minusButton);

    const wrap = (...$elements) => {
      const $container = document.querySelector('#app');
      $elements.forEach($element => $container.appendChild($element));
    };

    wrap($display, $buttons);
  };

  render();
})(window, document);

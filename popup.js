const $form = document.getElementById('form');
const $input = document.getElementById('input');
const $result = document.getElementById('result');
const selector = localStorage.getItem('selector');

function run(selector) {
  if (selector) {
    const code = `JSON.stringify([].slice.call(document.querySelectorAll('${selector}')).map(n => n.innerHTML))`;

    chrome.tabs.getSelected(null, tab => {
      chrome.tabs.executeScript(tab.id, { code }, ([res]) => {
        $result.value = res;
      });
    });
  }
}

$input.addEventListener('keyup', () => localStorage.setItem('selector', $input.value));
$form.addEventListener('submit', () => run($input.value));

if (selector) {
  $input.value = selector;
  run(selector);
}

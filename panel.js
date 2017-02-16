"use strict";
var port = chrome.runtime.connect(null, { name : 'panel' });
var tabId = chrome.devtools.inspectedWindow.tabId;

port.onMessage.addListener(function(msg) {
  switch (msg.action) {
    case 'got-media-info':
      const preEl = document.querySelector("pre");
      preEl.innerText = msg.value;
      break;
  }
});

function post(msg)
{
  msg.tabId = tabId;
  port.postMessage(msg);
}

var refreshRate = 1;
var stopped = true;
function countdown()
{
  if (!stopped) {
    post({ action : 'get-media' });
    setTimeout(countdown, refreshRate * 1000);
  }
}

var autoRefreshOn = true;
var autoRefreshBtn = document.getElementById("autoRefresh");
var rangeInput = document.getElementById("rangeVal");
var manualRefreshBtn = document.getElementById("manualRefresh");

rangeInput.addEventListener('change', function() {
  document.getElementById('rangeValLabel').innerHTML = this.value + 's';
  refreshRate = this.value;
});

autoRefreshBtn.addEventListener("click", function() {
  if (!stopped) {
    autoRefreshBtn.innerHTML = "Start";
    stopped = true;
  } else {
    autoRefreshBtn.innerHTML = "Stop";
    stopped = false;
    countdown();
  }

});
manualRefreshBtn.addEventListener(
  "click", function() { post({ action : 'get-media' }); });

window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 82: // R
      post({ action : 'get-media' });
      break;
  }

});
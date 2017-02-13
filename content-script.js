var port = chrome.runtime.connect({ name : 'contentScript' });

function post(msg)
{
  port.postMessage(msg);
}

port.onMessage.addListener(function(msg) {
  switch (msg.action) {
    // TODO
  }
});
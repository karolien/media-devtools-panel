"use strict";

var port = chrome.runtime.connect( null, { name: `panel` } );
var tabId = chrome.devtools.inspectedWindow.tabId;

port.onMessage.addListener( function( msg ) {

	switch( msg.action ) {

		case 'got-media-info':
		const preEl = document.querySelector("pre");
		preEl.innerText = msg.value;
		break;

	}

} );

function post( msg ) {

	msg.tabId = tabId;
	port.postMessage( msg );

}

window.addEventListener( 'keydown', function ( event ) {

	switch ( event.keyCode ) {

		case 81: // Q
		post( { action: 'get-media' } );
		break;
		
	}

});
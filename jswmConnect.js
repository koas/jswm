/*jshint esversion: 6 */
/*jshint -W097 */
/*jshint -W117 */

/**
 * This file must be included in the pages that will be used inside JSWM 
 * windows. It allows the page to notify JSWM when the user has clicked inside
 * it so that JSWM can make that window active.
 */

// This is the id of the window of this page in JSWM.
var jswmWindowId = "";

// When JSWM sends this window any event, it arrives here
window.addEventListener("message", (e) =>
{
	// If the event is window creation, save our window id
	if (e.data.event == "jswmWindowCreated")
		jswmWindowId = e.data.windowId;
    	
    // If there is a function to process this event, call it
    if (typeof window["on" + e.data.event] == "function")
    	window["on" + e.data.event](e.data);
});

// When user clicks inside this window, notify JSWM
document.getElementsByTagName("html")[0].addEventListener("click", () =>
{
	emitJSWMevent("jswmWindowFocus", {windowId: jswmWindowId});
});

/**
 * Send an event to JSWM
 * @param  {String} eventName Event name
 * @param  {Object} detail    Additional data for the event
 */
function emitJSWMevent(eventName, detail)
{
	if (jswmWindowId === "")
		return;

	// Create event and send it to JSWM
	let eventData = {windowId: jswmWindowId, event: eventName, detail: detail};
    window.parent.postMessage(eventData, "*");
}

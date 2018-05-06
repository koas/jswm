/**
 * This file must be included in the pages that will be used inside JSWM 
 * windows. It allows the page to notify JSWM when the user has clicked inside
 * it so that JSWM can make that window active.
 */
var jswmWindowId = "";
window.addEventListener("message", (e) =>
{
    jswmWindowId = e.data.windowId;
});

document.getElementsByTagName("html")[0].addEventListener("click", () =>
{
    window.parent.postMessage({windowId: jswmWindowId}, "*");
});

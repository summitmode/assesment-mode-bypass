// Because we cant have the same id as the Assesment Mode extention, we have to hook the chrome api

function fakeMode() {
	var oldSendMessage = chrome.runtime.sendMessage
	function fake(id,data,callback) {
		console.log("hooked function call",id,data,callback);
	        if (id == "lojeahlfbkkiopgolmojagpemoflmkhn") {
		     	if ( callback ) {
				callback({message: "success"})
			}
			return;
		} else {
			oldSendMessage(id,data,callback)
		}
	}
	window.chrome.runtime.sendMessage = fake
}

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id},
		function: fakeMode,
		world: "MAIN"
	});
});

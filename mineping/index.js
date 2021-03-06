/**
 * @function Ping a server and update the 
 * @param text What text to replace
**/
function updateText() {
	ipAddress = document.getElementById('ipInput').value;
	if (ipAddress !== "") {
		fetch(`https://api.mcsrvstat.us/2/${ipAddress}`)
		.then(data => {return data.json()})
		.then(response => {
			console.log(`Server ${ipAddress} pinged.`)
			if (response.debug.ping) {
				document.getElementById('output1').innerHTML = replaceMOTDText(response.motd.html[0])
				document.getElementById('output2').innerHTML = replaceMOTDText(response.motd.html[1])
				document.getElementById('logo').src = response.icon
				if (response.plugins !== undefined) {
					var plugins = "Plugin List:"
					response.plugins.raw.forEach(element => {
						plugins += `\n${element},`
					});
					document.getElementById('plugins').title = plugins
				}
			} else {
				document.getElementById('output1').innerHTML = `<span style=\"color: #F00\">Unable to reach server at <span style=\"color: #F77\">${ipAddress}</span>.</span>`
				document.getElementById('output2').innerHTML = ``
			}
		});
	}
}
/**
 * @function Replaces spaces with &nbsp's in order to allow for MOTDs to be centered.
 * @param text What text to replace
**/
function replaceMOTDText(text) {
	return text || ""
	//return text.replace(' ', '&nbsp;')
}
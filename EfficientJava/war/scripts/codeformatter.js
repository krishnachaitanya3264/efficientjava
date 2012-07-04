function formatCode() {
	var divList = document.getElementById("container").children;
	for (var i = 0; i < divList.length; i++) {
		if(divList[i].tagName == 'DIV') {
			//If you supply 0 as argument to getAttribute it code a case insensitive search
			//1 for case sensitive search
			//2 to return the value of the attribute as declared in the page
			if(divList[i].getAttribute("class",2) == 'code') {
				var div = divList[i].children;
				var j = 0;
				for(j = 0; j < div.length; j++) {
					if(div[j].tagName == 'TEXTAREA') {
						var wrapper = document.createElement("div");
						var header = document.createElement("div");
						var startText = document.createTextNode("___ ");
						header.appendChild(startText);
						var plainAnchor = document.createElement("a");
						plainAnchor.href="#";
						var plainAnchorText = document.createTextNode("view plain text");
						plainAnchor.appendChild(plainAnchorText);
						plainAnchor.setAttribute("onclick", "viewPlain(" + i + "); return false;");
						header.appendChild(plainAnchor);
						var separator = document.createTextNode("__");
						header.appendChild(separator);
						//var copyToClipBoardAnchor = document.createElement("a");
						//copyToClipBoardAnchor.href = "#";
						//var copyToClipBoardText = document.createTextNode("copy to clipboard");
						//copyToClipBoardAnchor.appendChild(copyToClipBoardText);
						//header.appendChild(copyToClipBoardAnchor);
						wrapper.appendChild(header);
						var orderedList = document.createElement("ol");
						orderedList.style.marginTop = "0px";
						for(var line = 0; line < div[j].value.match(/\n/g).length; line++) {
							var listItem = document.createElement("li");
							var textNode = document.createTextNode(div[j].value.split(/\n/g)[line]);
							listItem.appendChild(textNode);
							orderedList.appendChild(listItem);
							if(line % 2 == 0) {
								listItem.style.background = "#D6E2EE";
							} else {
								listItem.style.background = "#E7E7E7";
							}
						}
						wrapper.appendChild(orderedList);
						divList[i].appendChild(wrapper);
						div[j].setAttribute("id","code" + i);
						div[j].style.display = "none";
					}
				}
			}
		}
	}
}

function viewPlain(block) {
	var code = document.getElementById("code" + block).value.replace(/\t/g, "");
	var win = window.open("","_blank", "width=500, height=350, location=0, resizable=1, menubar=0, scrollbars=0");
	win.document.write("<textarea style='width:99%; height: 99%'>" + code + "</textarea>");
}
function isDashletRestricted() {
	var myConfig = new XML(config.script),
	restriction = myConfig["restriction"],
	showForSite = true,
	showForUser = true,
	showForGroup = true;

	if (restriction) {
		var usersRestriction = restriction["users"], 
			groupsRestriction = restriction["groups"],
			sitesRestriction = restriction["sites"];
		
		// Process users restrictions
		if (usersRestriction.toString() !== "") {
			var restrictedToUsersArray = usersRestriction.toString().split(",");
			var foundUser = false;
			for (var i = 0; i < restrictedToUsersArray.length; i++) {
				if (user.name == restrictedToUsersArray[i].trim()) {
					foundUser = true;
				}
			}
			if (!foundUser) {
				showForUser = false;
			}
		}
		
		// Process groups restrictions
		if (groupsRestriction.toString() !== "") {
			var restrictedToGroupsArray = groupsRestriction.toString().split(",");
			var connector = remote.connect("alfresco");
			var result = connector.get("/api/people/" + user.name + "?groups=true");
			var data = eval('(' + result + ')');
			var foundGroup = false;
			if (result.status == 200 && data.groups) {
				for (var j = 0; j < data.groups.length; j++) {
					for (var k = 0; k < restrictedToGroupsArray.length ; k++) {
						var groupId = "GROUP_" + restrictedToGroupsArray[k].trim();
						if (data.groups[j].itemName == groupId) {
							foundGroup = true;
						}
					}
				}
				if (!foundGroup) {
					showForGroup = false;
				}
			}
		}
		
		// Process sites restrictions
		if (sitesRestriction.toString() !== "") {
			if (page.url.templateArgs.site) {
				var restrictedToSiteArray = sitesRestriction.toString().split(",");
				var foundSite = false;
				for (var l = 0; l < restrictedToSiteArray.length; l++) {
					if (restrictedToSiteArray[l].trim() == page.url.templateArgs.site) {
						foundSite = true;
					}
				}
				if (!foundSite) {
					showForSite = false;
				}
			} else {
				showForSite = false;
			}
		}
	}
	
	if (logger.isLoggingEnabled()) {
		logger.log("dashlet-restriction-util.js - isDashletRestricted()- showForSite : " + showForSite);
		logger.log("dashlet-restriction-util.js - isDashletRestricted()- showForGroup : " + showForGroup);
		logger.log("dashlet-restriction-util.js - isDashletRestricted()- showForUser : " + showForUser);
	}
   
	// If there is at least one restriction
	if (showForSite && showForGroup && showForUser) {
		model.isRestrictDashlet = false;
		return false;
	} else {
		model.isRestrictDashlet = true;
		return true;
	}
}
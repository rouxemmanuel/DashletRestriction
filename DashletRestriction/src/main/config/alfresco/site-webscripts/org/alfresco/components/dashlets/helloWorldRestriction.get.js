<import resource="classpath:/alfresco/templates/org/alfresco/import/dashlet-restriction-util.js">

function main()
{
	model.name = user.properties.firstName + " " + user.properties.lastName;
	// Widget instantiation metdata...
	   var dashletTitleBarActions = {
	      id : "DashletTitleBarActions", 
	      name : "Alfresco.widget.DashletTitleBarActions",
	      useMessages : false,
	      options : {
	         actions: [
	            {
	               cssClass: "help",
	               bubbleOnClick:
	               {
	                  message: msg.get("dashlet.help")
	               },
	               tooltip: msg.get("dashlet.help.tooltip")
	            }
	         ]
	      }
	   };
	   model.widgets = [dashletTitleBarActions];
}

if (!isDashletRestricted()) {
	main();
}
# DashletRestriction

## Description
This plugin allows to control the display of dashlet with restriction on:
- user(s)
- group(s)
- site(s)

The restriction combinaison is a logical AND. So, If you combine restrictions, for example for a site and a group, only users in the specified group and for the specific site will see the dashlet.

The plugin includes a sample dashlet (Hello World Restriction) which illustrates how to control the restrictions.

## Compatibility
* Alfresco Community 4.0+
* Alfresco enterprise 4.0+

## How to use it
### Configuration of the restriction
The restriction configuration is under the file **[dashletName].get.config.xml** with the following parameters:
```
<config>
   <restriction>
   		<!-- 
   		Add the "users" tag if you want to restrict for some users (use comma to separate users). 
   		If you don't want to restrict for user delete the "users" tag.
   		-->
		<users>abeecher,mjackson</users>
		
		<!-- 
   		Add the "groups" tag if you want to restrict for some groups (use comma to separate groups).
   		Set groups without "GROUP_" prefix.
   		If you don't want to restrict for groups delete the "groups" tag.
   		-->
		<groups>ALFRESCO_ADMINISTRATORS</groups>
		
		<!-- 
   		Add the "sites" tag if you want to restrict for some sites (use comma to separate sites).
   		Set sites short name.
   		If you don't want to restrict for sites delete the "sites" tag.
   		-->
		<sites>swsdp</sites>
   </restriction>
</config>
```

### Dashlet JavaScript file
In **[dashletName].get.js**, add the following code :
```
<import resource="classpath:/alfresco/templates/org/alfresco/import/dashlet-restriction-util.js">

if (!isDashletRestricted()) {
	// Copy the original code of the Dashlet script
	// if there are functions in the original code of the dashlet, let functions outside this if
}
```

### Dashlet Freemarker file
In **[dashletName].get.html.ftl**, surround all code by :
```
<#if !isRestrictDashlet>
	<!-- Original HTML code of the dashlet -->
</#if>
```
<#if !isRestrictDashlet>
	<#assign el=args.htmlid?html>
	<@markup id="css" >
	   <#-- No CSS Dependencies -->
	</@>
	
	<@markup id="js">
	   <#-- No JavaScript Dependencies -->
	</@>
	
	<@markup id="widgets">
	   <@createWidgets group="dashlets"/>
	</@>
	
	<@markup id="html">
	   <@uniqueIdDiv>
	      <#assign el=args.htmlid?html>
	      <div class="dashlet">
	         <div class="title" id="${el}-title">Hello world restriction</div>
	         <div class="body scrollableList">
	            <div id="${el}-text" class="text-content">
	               <p>${msg("hello.text", name)}</p>
	            </div>
	         </div>
	      </div>
	   </@>
	</@>
</#if>
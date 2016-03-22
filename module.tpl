<% imports.forEach(function(value) { %>
import '<%= value %>';
<% }); %>

<% if(exportObjects) Object.keys(constants).forEach(function(key) { %>
export const <%= key %> = <%= JSON.stringify(constants[key]) %>;
<% }); %>

<% if(_export) { %> export const <%= _export %> = <% } %>
angular.module('<%= module %>'<% if(!useExistingModule) { %>, []<% } %>)

<% Object.keys(constants).forEach(function(key) { %>
  .constant('<%= key %>', <% if(exportObjects) %><%= key %><% else %><%= JSON.stringify(constants[key]) %><% ; %>)
  <% }); %>;



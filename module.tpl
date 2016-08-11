<% imports.forEach(function(value) { %>
import '<%= value %>';
<% }); %>

<% if(exportObjects) Object.keys(constants).forEach(function(key) { %>
export const <%= key %> = <%= JSON.stringify(constants[key]) %>;
<% }); %>

<% if(interfaces) Object.keys(interfaces).forEach(function(key) { %>
export interface <%= key %> <%= JSON.stringify(interfaces[key]).replace(/"(.*?)":"(.*?)"/g, '"$1": $2') %>
<% }); %>

<% if(_export) { %> export const <%= _export %> = <% } %>
angular.module('<%= module %>'<% if(!useExistingModule) { %>, []<% } %>)

<% Object.keys(constants).forEach(function(key) { %>
  .constant('<%= key %>', <% if(exportObjects) %><%= key %><% else %><%= JSON.stringify(constants[key]) %><% ; %>)
  <% }); %>;



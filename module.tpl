<% imports.forEach(function(value) { %>
import '<%= value %>';
<% }); %>
<% if(_export) { %> export var <%= _export %> = <% } %>
angular.module('<%= module %>'<% if(!useExistingModule) { %>, []<% } %>)<% Object.keys(constants).forEach(function(key) { %>
  .constant('<%= key %>', <%= JSON.stringify(constants[key]) %>)<% }); %>;

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"
          style="margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;">
    <meta name="viewport" content="width=device-width"
          style="margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;">
	<title>Countries and Movies</title>
</head>
<body>

<style>

	.container { margin: 10px; padding: 10px;}
	.title { color: #008080 }
	.country { color: #5f9ea0 }
	.column1 { width:10%; text-align: center; }
	.column2 { width:75%; }
	.column3 { width:15%; }

	p {
		font-size: 12pt;
		margin: 1em 0;
	}
	h1 {
		font-size: 14pt;
		font-weight: bold;
		margin: 0.67em 0;
	}
	table {
		width:100%;
		margin-bottom: 0.4pt;
		margin-top: 0;
		margin-left: 0;
		margin-right: 0;
		text-indent: 0;
	}
	tr {
		vertical-align: inherit;
	}
	table > tr {
		vertical-align: middle;
	}
	td {
		background-color:#F7F7F7;
		font-size:10pt;
		padding: 1px;
		text-align: inherit;
		vertical-align: inherit;
	}
	th {
		background-color: #5f9ea0;
		font-size:10pt;
		color:#FFFFFF;
		display: table-cell;
		font-weight: bold;
		padding: 1px;
		vertical-align: inherit;
	}
</style>

<div class="container">

	<h1 class="title">Countries and Movies</h1>
	<p>This is an overview of all the countries in our movie database.</p>

	<p>
	<h1 class="country">United States</h1>
	<p>This is a table containing all the movies that were entirely or partially produced in United States:</p>
	</p>
	<table>
<#--
		<#list entity as entities>

				<tr class="movierow">
					<td class="column1">${entity.name}</td>
				</tr>

		</#list>
-->

	</table>

</div>

</body>
</html>
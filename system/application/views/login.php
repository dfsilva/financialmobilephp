<html>
<head>
<title>Login</title>

<style>
.dr-pnl {
	background-color: #FFFFFF;
	border-color: #BED6F8;
	border-style: solid;
	border-width: 1px;
	padding: 1px;
}

.dr-pnl-h {
	background-color: #BED6F8;
	border-color: #BED6F8;
	color: #000000;
	font-family: Arial, Verdana, sans-serif;
	font-size: 20px;
	font-weight: bold;
	background-position: left top;
	background-repeat: repeat-x;
	border-style: solid;
	border-width: 1px;
	padding: 2px;
}

.dr-pnl-b {
	color: #000000;
	font-family: Arial, Verdana, sans-serif;
	font-size: 20px;
	padding: 10px;
}

.errorMessage {
	color: red;
	font-weight: bold;
}

.dr-pnl-f {
	background-color: #DFDFDF;
	color: #666666;
	font-size: 20px;
	padding: 2px;
}

a:link {
	color: black;
	text-decoration: none;
}

a:visited {
	color: black;
	text-decoration: none;
}

a:active {
	color: black;
	text-decoration: none;
}

a:hover {
	color: #0099FF;
	text-decoration: none;
}

a:focus {
	color: #0099FF;
}
</style>
</head>
<body>
<form action="<?=base_url();?>begin/login" method="post">
 <div id="painelLogin" class="dr-pnl rich-panel" style="margin: 25% auto; width: 300px;">
                <div id="painelLogin_header" class="dr-pnl-h rich-panel-header">
                    Login do Sistema
                </div>
                <div id="painelLogin_body" class="dr-pnl-b rich-panel-body">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label for="usuario">Usuário</label>
                                </td>
                                <td>
                                    <input id="usuario" name="usuario" type="text" /> 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="senha">Senha</label>
                                </td>
                                <td>
                                    <input id="senha" name="senha" type="password" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input id="login" type="submit" name="login" value="Enviar" style="margin: 0 0 0 200px; width: 80px" />
                </div>
                <div id="painelLogin_body" class="dr-pnl-f rich-panel-footter">
                <?php
					if(isset($erro)){
						echo '<spam class="errorMessage">'; 
						echo $erro;
						echo '</spam>';
					}
				?>
                </div>
            </div>
</body>
</html>

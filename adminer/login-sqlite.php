<?php

/** Plugin para permitir login no SQLite sem senha
 * @link https://www.adminer.org/plugins/#use
 */

class AdminerLoginPasswordLess {
    private $password_hash;
    
    function __construct($password_hash = "") {
        $this->password_hash = $password_hash;
    }
    
    function login($login, $password) {
        if (DRIVER == 'sqlite') {
            return true;
        }
        return ($login == 'admin' && $password == 'admin');
    }
    
    function loginForm() {
        ?>
        <table cellspacing="0">
        <tr><th>Sistema<td><?php echo html_select("auth[driver]", array("sqlite" => "SQLite"), DRIVER); ?>
        <tr><th>Servidor<td><input name="auth[server]" value="<?php echo h(SERVER); ?>" title="hostname[:port]">
        <tr><th>Usuário<td><input name="auth[username]" id="username" value="<?php echo h($_GET["username"]); ?>" autocomplete="username">
        <tr><th>Senha<td><input type="password" name="auth[password]" autocomplete="current-password">
        <tr><th>Base de dados<td><input name="auth[db]" value="<?php echo h($_GET["db"]); ?>" autocomplete="off">
        </table>
        <p><input type="submit" value="Entrar">
        <?php echo checkbox("auth[permanent]", 1, $_COOKIE["adminer_permanent"], "Permanente"); ?>
        <p class="message">Para SQLite: deixe usuário e senha em branco ou use admin/admin
        <?php
        return true;
    }
}

return new AdminerLoginPasswordLess(); 
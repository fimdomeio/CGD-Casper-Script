CGD-Casper-Script
=================

Casper Scripts to interact with Caixa Geral de Depositos (Caixa Directa)

This is part of a bigger project I'm currently working on which will be open-sourced a little bit later.

This script logs in a Caixa Geral de Depósitos Bank Account to get latest payments and deposits.
If you took at least a minute to read what Casperjs is, you probably know this script is surfing CGD webpage and if they change the page it might break.



== Dependencies ==
CasperJs
PhantonJs

== Running ==
$ casperjs movimentoscgd.js ‹contract-nr› ‹password›

=== Security ===
Use this at your own risk... as far as I know the passwords needed by this script don't allow you to make any kind of payments which is obviosly a good thing. :)

== Todo ==
* Add a script to get the account balance
* Output better formated content, probably json. (currently it's just plain text)
* What to do if the script fails.

=== Later ===
* Make it work for users with multiple bank accounts


== License ==
© Alexandre Castro and is distributed under the terms of the GNU General Public License 

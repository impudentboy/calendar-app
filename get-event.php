<?php

$db = sqlite_open('calendar.db', 0666, $sqliteerror);
$error = 'какая-то хуйня';
$query = sqlite_query($db, "select from events", $error);

echo($query);
	
?>
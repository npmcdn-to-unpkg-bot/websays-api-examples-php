<?php

/**
 * Websays Opinion Analytics Engine
 *
 * (Websays Copyright © 2010-2014. All rights reserved. http://websays.com )
 *
 * Primary Author: Marçal Juan <marcal@websays.com>
 * Contributors:
 *
 * @license MIT
 */

define('WEBSAYS_ROOTPATH', realpath(dirname(__FILE__)).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR);

require WEBSAYS_ROOTPATH.'vendor/autoload.php';

use \Websays\API;

// Set credentials
$threeScaleUserKey = '3SCALE_USER_KEY'; // 3scale user key
$username = 'USERNAME';
$password = 'PASSWORD';

$api = new API($threeScaleUserKey);

list ($status, $tokenResponse, $error) = $api->GetToken($username, $password);

if ($error) {
    echo "Cannot get token from server\n";
    var_dump($status);
    var_dump($tokenResponse);

    exit(1);
}

var_dump($tokenResponse);
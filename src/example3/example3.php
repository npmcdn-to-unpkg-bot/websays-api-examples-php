<?php

date_default_timezone_set('Europe/Madrid');

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

define('WEBSAYS_APPPATH', realpath(dirname(__FILE__)).DIRECTORY_SEPARATOR);
define('WEBSAYS_ROOTPATH', WEBSAYS_APPPATH.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR);
define('WEBSAYS_PUBLIC_FOLDER_PATH', WEBSAYS_ROOTPATH.'public/example3/');

require WEBSAYS_ROOTPATH.'vendor/autoload.php';

use \Websays\API;

// Set credentials
$threeScaleUserKey = '3SCALE_USER_KEY'; // 3scale user key
$jwt = 'YOUR_TOKEN_HERE'; // JSON Web Token

$api = new API($threeScaleUserKey);

$api->SetJWTCredentials($jwt);

$sf = array(
    'interval' => API::INTERVAL_LAST7DAYS
);

list ($status, $chartsData, $error) = $api->GetCorporateChannels(256, $sf);

if ($error) {
    echo "Cannot get data from server\n";
    var_dump($status);
    var_dump($chartsData);

    exit(1);
}

// Render template
echo renderTemplate(WEBSAYS_APPPATH.'template.php', array(
    'corporateChannelsList' => $chartsData
));

function renderTemplate($filePath, Array $data = array()) {
    try
    {
        // Import the view variables to local namespace
        extract($data, EXTR_SKIP);

        // Capture the view output
        ob_start();

        try
        {
            // Load the view within the current scope
            include $filePath;
        }
        catch (Exception $e)
        {
            // Delete the output buffer
            ob_end_clean();

            // Re-throw the exception
            throw $e;
        }

        // Get the captured output and close the buffer
        return ob_get_clean();
    }
    catch (Exception $e)
    {
        return $e->getMessage();
    }
}

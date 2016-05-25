<?php

namespace Websays;

/**
 * Class API
 * @package Websays
 *
 * NOTE To get response headers, have a look at:
 * @url http://stackoverflow.com/questions/9183178/php-curl-retrieving-response-headers-and-body-in-a-single-request/25118032#25118032
 * @url https://github.com/jmoraleda/php-rest-curl/blob/master/rest.inc.php
 */
class API
{
    const BASE_URL = "https://api-2445581273767.apicast.io:443/1.0/";

    const INTERVAL_LAST24HOURS = 'last24hours';
    const INTERVAL_LAST2DAYS = 'last2days';
    const INTERVAL_LAST7DAYS = 'last7days';
    const INTERVAL_LAST30DAYS = 'last30days';
    const INTERVAL_LAST12MONTHS = 'last12months';

    private $threeScaleUserKey;
    private $jwt;

    public function __construct($threeScaleUserKey)
    {
        if (!!$threeScaleUserKey) {
            $this->Set3scaleCredentials($threeScaleUserKey);
        }
    }

    public function Set3scaleCredentials($threeScaleUserKey)
    {
        $this->threeScaleUserKey = $threeScaleUserKey;
    }

    public function SetJWTCredentials($jwt)
    {
        $this->jwt = $jwt;
    }

    public function GetToken($username, $password)
    {
        $postData = array(
            'username' => $username,
            'password' => $password
        );

//        $postBodyJSON = json_encode($postData);

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, self::BASE_URL . 'auth');
//        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
//        curl_setopt($ch, CURLOPT_POSTFIELDS, $postBodyJSON);


        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Accept: application/json',
            'X-3scale-user-key: ' . $this->threeScaleUserKey
//            'Content-Type: application/json; charset=UTF-8',
//            'Content-Length: '.strlen($postBodyJSON)
        ));

        // receive server response ...
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);

        $responseBody = curl_exec($ch);

        // Get the response information
        $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        if (2 !== intval($httpStatusCode / 100)) { // 2XX status code
            return array($httpStatusCode, $responseBody, true);
        }

        return array($httpStatusCode, json_decode($responseBody, true), false);
    }

    public function GetChartsEvolution($profileId, Array $charts = array(), Array $sf)
    {
        $queryStringParams = array(
            'profile_id' => $profileId,
            'charts' => implode(',', $charts),
            'sf' => json_encode($sf)
        );

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, self::BASE_URL . 'charts/evolution?' . http_build_query($queryStringParams));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Accept: application/json',
            'X-3scale-user-key: ' . $this->threeScaleUserKey,
            'Authorization: Bearer ' . $this->jwt
        ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);

        $responseBody = curl_exec($ch);

        // Get the response information
        $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        if (2 !== intval($httpStatusCode / 100)) { // 2XX status code
            return array($httpStatusCode, $responseBody, true);
        }

        return array($httpStatusCode, json_decode($responseBody, true), false);
    }

    public function GetChartsFacet($profileId, Array $facets = array(), Array $sf)
    {
        $queryStringParams = array(
            'profile_id' => $profileId,
            'facets' => implode(',', $facets),
            'sf' => json_encode($sf)
        );

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, self::BASE_URL . 'charts/facet?' . http_build_query($queryStringParams));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Accept: application/json',
            'X-3scale-user-key: ' . $this->threeScaleUserKey,
            'Authorization: Bearer ' . $this->jwt
        ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);

        $responseBody = curl_exec($ch);

        // Get the response information
        $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        if (2 !== intval($httpStatusCode / 100)) { // 2XX status code
            return array($httpStatusCode, $responseBody, true);
        }

        return array($httpStatusCode, json_decode($responseBody, true), false);
    }

    public function GetCorporateChannels($profileId, Array $sf)
    {
        $queryStringParams = array(
            'profile_id' => $profileId,
            'sf' => json_encode($sf)
        );

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, self::BASE_URL . 'charts/corporate-channels?' . http_build_query($queryStringParams));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Accept: application/json',
            'X-3scale-user-key: ' . $this->threeScaleUserKey,
            'Authorization: Bearer ' . $this->jwt
        ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);

        $responseBody = curl_exec($ch);

        // Get the response information
        $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        if (2 !== intval($httpStatusCode / 100)) { // 2XX status code
            return array($httpStatusCode, $responseBody, true);
        }

        return array($httpStatusCode, json_decode($responseBody, true), false);
    }
}

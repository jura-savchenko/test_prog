<?php
function json_response($message = null, $code = 200)
{
    http_response_code($code);
    header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
    header('Content-type: application/json');

    $status = array(
        200 => '200 OK',
        400 => '400 Bad Request',
        422 => 'Unprocessable Entity',
        500 => '500 Internal Server Error'
    );

    header('Status: '.$status[$code]);
    if($code !== 200){
        header('message', $message);
        $response_array['message'] = $message;
        $response_array['status'] = $code;
        return json_encode($response_array);
    }
    return json_encode($message);
}
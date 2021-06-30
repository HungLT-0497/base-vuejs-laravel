<?php

if (! function_exists('responseSuccess')) {
    function responseSuccess($data, $message = 'Thành công')
    {
        return response()->json(["code" => 0,"data" => $data, 'message' => $message], 200);
    }
}
if (! function_exists('responseError')) {
    function responseError($message = 'Thất bại')
    {
        return response()->json(["code" => 1, "data" => '', 'message' => $message], 200);
    }
}

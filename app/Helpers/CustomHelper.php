<?php

function helpSort($model, $array)
{
    return $model::orderBy($array['sortBy'], $array['orderBy']);
}

function isPaginate($result, $paginate = false)
{
    return $paginate ? $result->paginate($paginate) : $result->get();
}

function querySort($model, $array, $paginate = false)
{
    $result = helpSort($model, $array);

    return isPaginate($result, $paginate);
}

function querySearch($model, $keyword, $order, $rows, $paginate = false)
{
    $a = strtolower($keyword);
    $k = cleanAccents($a);
    $result = helpSort($model, $order);
    $result = $result->whereLike($rows, $k);

    return isPaginate($result, $paginate);
}

function cleanAccents1($str)
{
    if ($str == "" || $str == NULL) {
        return $str;
    }

    $str = preg_replace("/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g", "a", $str);
    // $str = preg_replace("/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g", "e");
    // $str = preg_replace("/ì|í|ị|ỉ|ĩ/g, "i");
    // $str = preg_replace("/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    // $str = preg_replace("/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    // $str = preg_replace("/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    // $str = preg_replace("/đ/g, "d");
    // $str = preg_replace("/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    // $str = preg_replace("/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    // $str = preg_replace("/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    // $str = preg_replace("/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    // $str = preg_replace("/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    // $str = preg_replace("/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    // $str = preg_replace("/Đ/g, "D");
    // // Combining Diacritical Marks
    // $str = preg_replace("/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // huyền, sắc, hỏi, ngã, nặng
    // $str = preg_replace("/\u02C6|\u0306|\u031B/g, ""); // mũ â (ê), mũ ă, mũ ơ (ư)
    // $str = preg_replace("" ", "");
    // $str = preg_replace(""%20", "");
    // $str = $str.trim().toLowerCase();
    return $str;
};

function cleanAccents($str)
{
    if ($str == "" || $str == NULL) {
        return $str;
    }

    $str = preg_replace("/%20/", " ", $str);

    return $str;
}

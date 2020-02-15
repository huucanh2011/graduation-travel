<?php

function querySort($model, $array, $paginate = false)
{
    $q = $model::orderBy($array['sortBy'], $array['orderBy']);
    $q = $paginate ? $q->paginate($paginate) : $q->get();

    return $q;
}
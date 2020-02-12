<?php

// Route::get('/', 'SpaController@index');
// Route::get('/admin', 'SpaController@admin');
Route::get('/{any}', 'SpaController@index')->where('any', '.*');
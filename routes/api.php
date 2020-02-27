<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function () {
    Route::group(['namespace' => 'Api'], function () {
        Route::group(['namespace' => 'Auth', 'prefix' => 'auth'], function () {
            Route::post('register', 'AuthController@register');
            Route::post('login', 'AuthController@login');
            Route::get('logout', 'AuthController@logout');
            Route::post('refresh', 'AuthController@refresh');
            Route::get('me', 'AuthController@me');
            Route::post('forgotpassword', 'ForgotPasswordController@sendMail');
            Route::put('resetpassword', 'ResetPasswordController@process');
            // Route::group(['middleware' => ['web']], function () {
            //     Route::get('{provider}', 'AuthController@redirectToProvider');
            //     Route::get('{provider}/callback', 'AuthController@handleProviderCallback');
            // });
        });

        Route::apiResources([
            'payments' => 'PaymentController',
            'roles' => 'RoleController',
            'slides' => 'SlideController',
            'categories' => 'TourCategoryController',
            'tours' => 'TourController',
            'ratings' => 'TourRatingController',
            'users' => 'UserController',
            'feedbacks' => 'FeedbackController',
        ]);

        Route::apiResource('tours.dates', 'TourDepartureController')->except(['update', 'show']);
        Route::apiResource('tours.images', 'TourImageController')->except(['update', 'show']);

        Route::get('permissions', 'PermissionController@index');
        Route::put('permissions/{user}', 'PermissionController@update');

        Route::get('get-roles', 'RoleController@getRoles');

        Route::put('update-active-slide/{user}', 'SlideController@updateActive');

        Route::put('update-active-user/{user}', 'UserController@updateActive');

        // Route::post('upload/{model}', 'UploadController@store');
    });
});

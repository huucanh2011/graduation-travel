<?php

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
        ]);

        Route::apiResource('feedbacks', 'FeedbackController')->except(['update']);

        Route::apiResource('tours.dates', 'TourDepartureController')->except(['update', 'show']);
        Route::apiResource('tours.images', 'TourImageController')->except(['update', 'show']);
    });
});
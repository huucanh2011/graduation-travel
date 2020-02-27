<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
        <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
        <title>{{ config('app.name') }}</title>

        {{-- <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet"> --}}
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    </head>
    <body>
        <noscript>
            <strong>We're sorry but laravel-vue doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
        </noscript>
        <div id="app"></div>
        
        {{-- @if (app()->isLocal()) --}}
            <script src="{{ mix('js/app.js') }}" defer></script>
        {{-- @else --}}
            {{-- https://laravel.com/docs/5.8/mix#working-with-scripts --}}
            {{-- <script src="{{ mix('js/app.js') }}" defer></script>
            <script src="{{ mix('js/manifest.js') }}" defer></script>
            <script src="{{ mix('js/vendor.js') }}" defer></script>
        @endif --}}
        {{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script> --}}
    </body>
</html>

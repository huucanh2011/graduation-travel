<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;

class UploadController extends Controller
{
    public function store(Request $request, $model)
    {
        if ($request->has('image') && $model) {
            // $baseName = Str::random();
            $path = $request->file('image')->store('uploads/' . $model, 'public');

            // return $path;
            Image::make(public_path('storage/' . $path))->fit(400, 400)->save();

            return "ok";
        }
    }
}

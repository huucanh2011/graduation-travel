<?php

namespace App\Http\Requests;

use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exceptions\HttpResponseException;

class TourRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'tour_name' => 'required|string|max:255',
            'description' => 'required|string',
            'from_place' => 'required|string|max:255',
            'to_place' => 'required|string|max:255',
            'transport' => 'string|max:255',
            'number_days' => 'required|numeric',
            'number_persons' => 'required|numeric',
            'price_default' => 'required|numeric',
            'price_children' => 'required|numeric',
            'price_baby' => 'required|numeric',
            'note' => 'string',
            'is_active' => 'required|boolean',
            'tourcate_id' => 'required|numeric',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = (new ValidationException($validator))->errors();
        throw new HttpResponseException(response()->json([
            'errors' => $errors,
            'status_code' => 422,
        ], JsonResponse::HTTP_UNPROCESSABLE_ENTITY));
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Feedback;
use Illuminate\Http\Request;
use App\Http\Requests\FeedbackRequest;
use App\Http\Resources\FeedbackResource;
use App\Http\Controllers\Api\BaseController;
use Symfony\Component\HttpFoundation\Response;

class FeedbackController extends BaseController
{
    protected $feedback;

    public function __construct(Feedback $feedback)
    {
        $this->feedback = $feedback;
    }

    public function index()
    {
        // return cleanAccents();

        $array = array(
            'sortBy' => request()->sortBy ?? 'created_at',
            'orderBy' => request()->orderBy ?? 'desc',
        );
        $columnSearch = array(
            'name',
            'email',
            'phone_number',
            'subject',
            'content',
        );

        return FeedbackResource::collection(
            querySearch(Feedback::class, request()->keyword, $array, $columnSearch, 10)
        );
    }

    public function store(FeedbackRequest $request)
    {
        $feedback = $this->feedback->create($request->all());

        return $this->respondData(new FeedbackResource($feedback), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        return $this->respondData(
            new FeedbackResource($this->feedback->findOrFail($id))
        );
    }

    public function update(Request $request, $id)
    {
        $feedback = $this->feedback->findOrFail($id);
        $feedback->update($request->only('seen'));

        return $this->respondData(new FeedbackResource($feedback), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $this->feedback->findOrFail($id)->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }
}

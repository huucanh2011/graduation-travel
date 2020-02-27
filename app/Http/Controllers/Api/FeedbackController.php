<?php

namespace App\Http\Controllers\Api;


use App\Models\Feedback;
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
        $pageSize = request()->pageSize ? (int) request()->pageSize : 5;

        return FeedbackResource::collection(
            querySearch(Feedback::class, request()->q, $array, $columnSearch, $pageSize)
        );
    }

    public function store(FeedbackRequest $request)
    {
        $feedback = Feedback::create($request->all());

        return $this->respondData(new FeedbackResource($feedback), Response::HTTP_CREATED);
    }

    public function show(Feedback $feedback)
    {
        return $this->respondData(new FeedbackResource($feedback));
    }

    public function update(Request $request, Feedback $feedback)
    {
        $feedback->update($request->only('seen'));

        return $this->respondData(new FeedbackResource($feedback), Response::HTTP_ACCEPTED);
    }

    public function destroy(Feedback $feedback)
    {
        $feedback->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }
}

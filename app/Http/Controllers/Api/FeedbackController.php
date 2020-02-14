<?php

namespace App\Http\Controllers\Api;

use App\Feedback;
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
        return FeedbackResource::collection(
            Feedback::latest()->paginate(10)
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

    public function destroy($id)
    {
        $this->feedback->findOrFail($id)->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }
}

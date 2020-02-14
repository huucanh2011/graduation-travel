<?php

namespace App\Http\Controllers\Api;

use App\Payment;
use App\Http\Requests\PaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Http\Controllers\Api\BaseController;
use Symfony\Component\HttpFoundation\Response;

class PaymentController extends BaseController
{
    protected $payment;

    public function __construct(Payment $payment)
    {
        $this->payment = $payment;
    }

    public function index()
    {
        return PaymentResource::collection(
            Payment::oldest('id')->paginate(10)
        );
    }

    public function store(PaymentRequest $request)
    {
        $payment = $this->payment->create($request->all());

        return $this->respondData(new PaymentResource($payment), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        return $this->respondData(
            new PaymentResource($this->payment->findOrFail($id))
        );
    }

    public function update(PaymentRequest $request, $id)
    {
        $payment = $this->payment->findOrFail($id);
        $payment->update($request->all());

        return $this->respondData(new PaymentResource($payment), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $this->payment->findOrFail($id)->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }
}

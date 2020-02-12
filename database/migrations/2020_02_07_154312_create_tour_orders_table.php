<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTourOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tour_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone_number');
            $table->string('customer_address');
            $table->tinyInteger('quantity_people')->default(0);
            $table->tinyInteger('quantity_children')->default(0);
            $table->tinyInteger('quantity_baby')->default(0);
            $table->double('total_amount', 10, 2);
            $table->text('note')->nullable();
            $table->tinyInteger('status');
            $table->string('reason_cancel')->nullable();
            $table->boolean('paid')->default(false);
            $table->bigInteger('payment_id')->unsigned();
            $table->bigInteger('tourdepart_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->timestamps();

            $table->foreign('payment_id')->references('id')->on('payments')->onDelete('cascade');
            $table->foreign('tourdepart_id')->references('id')->on('tour_departures')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tour_orders');
    }
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTourRatingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tour_ratings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->tinyInteger('rating_scores');
            $table->text('rating_content');
            $table->boolean('is_active')->default(true);
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('tour_id')->unsigned();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('tour_id')->references('id')->on('tours')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tour_ratings');
    }
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateToursTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tours', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('tour_name');
            $table->string('slug');
            $table->string('image_cover')->nullable();
            $table->text('description');
            $table->string('from_place');
            $table->string('to_place');
            $table->string('transport')->nullable();
            $table->tinyInteger('number_days');
            $table->tinyInteger('number_persons');
            $table->double('price_default', 10, 2);
            $table->double('price_children', 10, 2);
            $table->double('price_baby', 10, 2);
            $table->text('note')->nullable();
            $table->boolean('is_active')->default(true);
            $table->bigInteger('tourcate_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->timestamps();
            
            $table->foreign('tourcate_id')->references('id')->on('tour_categories')->onDelete('cascade');
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
        Schema::dropIfExists('tours');
    }
}

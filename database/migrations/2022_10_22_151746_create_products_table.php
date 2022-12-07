<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->nullable();
            $table->integer('cat_id');
         //   $table->json('tag_id');
            $table->text('description');
            $table->string('image');
            $table->string('image2')->nullable(' ');
            $table->string('gallery')->nullable(' ');
            $table->string('promo1')->nullable(' ');
            $table->string('promo2')->nullable(' ');
            $table->string('sku')->nullable();
            $table->string('tax_class')->nullable(' ');
            $table->string('product_type')->default(' ');
            $table->float('regular_price')->default(0);
            $table->float('offer_price')->nullable();
            $table->integer('status');
            $table->integer('fetured');
            $table->json('variable');
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};

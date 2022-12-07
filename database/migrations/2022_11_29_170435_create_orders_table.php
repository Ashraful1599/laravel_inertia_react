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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('payment_id')->constrained()->onDelete('cascade');
            $table->foreignId('order_shipping_id')->constrained()->onDelete('cascade');
            $table->string('shipping')->nullable();
            $table->string('order_note')->nullable();
            $table->integer('total_qty')->nullable();
            $table->decimal('total_price',12,2)->nullable();
            $table->decimal('subtotal',12,2)->nullable();
            $table->decimal('tax',12,2)->nullable();
            $table->string('status')->nullable();
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
        Schema::dropIfExists('orders');
    }
};

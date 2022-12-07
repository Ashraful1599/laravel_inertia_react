<?php

namespace App\Http\Resources;

use App\Models\Category;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
       // return parent::toArray($request);

       $variable_min_max = "";
       if($this->product_type == "variable" && $this->skus != null){
            $variable = json_decode($this->variable);
            $variable_array = [];
            foreach($this->skus as $var){
            array_push($variable_array, $var->price);
            }
            if(!empty($variable_array)){
                $variable_min_max = min($variable_array)."$ - ".max($variable_array)."$";
            }

       }

       return [
        'id'=>$this->id,
        'name'=>$this->name,
        'slug'=>$this->slug,
        'description'=>$this->description,
        'cat_id'=>$this->cat_id,
        'tag_id'=>$this->tag_id,
        'image'=>$this->image,
        'image2'=>$this->image2,
        'gallery'=>json_decode($this->gallery),
        'status'=>$this->status,
        'fetured'=>$this->fetured,
        'sku'=>$this->sku,
        'promo1'=>$this->promo1,
        'promo2'=>$this->promo2,
        'product_type'=>$this->product_type,
        'tax_class'=>$this->tax_class,
        'variable'=>json_decode($this->variable),
        'category'=>$this->category,
        'variant'=>$this->variant,
        'variant_value'=>$this->variant_value,
        'variant_option'=>$this->variant_option,
        'sku_value'=>$this->sku_value,
        'tag'=>$this->tag,
        'variable_min_max'=>$variable_min_max,
        'regular_price'=>$this->regular_price."$",
        'offer_price'=>$this->offer_price."$",
    ];
    }
}

<?php 
    
    $newAray = [];

    $arrays = [
        0=> [1,2,3],
        1=> [1,2,3],
        2=> [1,2,3],
        3=> [1,2,3],
    ];
   
    $sizeofArray = sizeof($arrays[0]);

    for($i = 0; $i<$sizeofArray; $i++){

        $firstrowArray = [];
        foreach($arrays as $array){

            //   echo "<pre>";
            //   print_r($array);
               
             //  echo "</pre>";

               $j  = 0;
               foreach($array as $arr){
       
                   // array_splice(
                   //     $newAray, $i,0, $arr
                   // );
       
                   if($j == $i){
                  //  echo $arr;
                       array_push($firstrowArray, $arr);
                   }
              
                   $j++;
               }

           }

           array_push($newAray, $firstrowArray);
    }


  

     echo "<pre>";
       print_r($firstrowArray);
       print_r($newAray);
        
       echo "</pre>";





?>
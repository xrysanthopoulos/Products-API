<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Product extends Model
{
    use HasFactory;

    public static function get_products() {
        $results = DB::select('SELECT * FROM Products');
        return response()->json( $results,200, ["Content-type: application/json;"]);
    }

    public static function get_pagination_products() {
        $results = app('db')->table('Products')->paginate(5);
        $results = DB::select('SELECT * FROM Products');
        return response()->json( $results,200, ["Content-type: application/json;"]);
    }

    public static function get_product($id) {
        $results = app('db')->select("SELECT * FROM Products WHERE id = ?",[$id]);
        return response()->json( $results,200, ["Content-type: application/json;"]);
    }

    public static function new_product($name, $price) {
        DB::select("INSERT INTO Products (name, price) VALUES ('$name', '$price')");
        return response()->json( 'inserted',200, ["Content-type: application/json;"]);
    }

    public static function update_product($id, $name, $price) {
        app('db')->table('Products')->where('id', $id)->update(['name' => $name, 'price' => $price]);
        return response()->json( 'updated',200, ["Content-type: application/json;"]);
    }

    public static function delete_product($id) {
        $result = app('db')->table('products')->where('id',$id)->delete();
        if ($result) {
            return response()->json( 'deleted',200, ["Content-type: application/json;"]);
        } else {
            return response()->json( 'error',205, ["Content-type: application/json;"]);
        }

    }
}

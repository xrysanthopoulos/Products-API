<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Request;
use Illuminate\Routing\Controller;


class ProductController extends Controller
{
    public static function get_all_prodcuts()
    {
        return Product::get_products();
    }

    public static function get_product($id) {
        return Product::get_product($id);
    }

    public static function get_pagination_products() {
        return Product::get_pagination_products();
    }

    public static function add_product() {
        $data = Request::all();

        $name = $data["name"];
        $price = $data["price"];

        if ($name == '' && $price == '') {
            return null;
        }

        return Product::new_product($name, $price);
    }

    public static function update_product($id) {
        $data = Request::all();

        $name = $data["name"];
        $price = $data["price"];

        if ($name == '' && $price == '') {
            return null;
        }

        return Product::update_product($id, $name, $price);
    }

    public static function delete_product($id) {
        return Product::delete_product($id);
    }


}

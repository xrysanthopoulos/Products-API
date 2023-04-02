<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/get_products', function () {
    return ProductController::get_all_prodcuts();
});

Route::get('/pagination_products', function () {
    return ProductController::get_pagination_products();
});

Route::get('/get_product/{id}', function (Request $request, string $id) {
    return ProductController::get_product($id);
});

Route::post('/add_product', function () {
    return ProductController::add_product();
});

Route::put('/update_product/{id}', function (Request $request, string $id) {
    return ProductController::update_product($id);
});

Route::delete('/remove_product/{id}', function (Request $request, string $id) {
    return ProductController::delete_product($id);
});

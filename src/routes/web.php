<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('app');
});

Route::get('/endpoints', function () {
    return "<p>Products API endpoints</p></br>
        <p>/api/get_products</p><a href=".env('APP_URL')."/api/get_products>GET<a/>
        <p>/api/pagination_products</p><a href=".app('url')->full()."/pagination_products>GET<a/>
        <p>/api/get_product/{id}</p><a href=".app('url')->full()."/get_product>GET<a/>
        <p>/api/add_product</p><a href=".app('url')->full()."/add_product>POST<a/>
        <p>/api/update_product/{id}</p><a href=".app('url')->full()."/update_product>PUT<a/>
        <p>/api/remove_product/{id}</p><a href=".app('url')->full()."/remove_product>DELETE<a/>";
});


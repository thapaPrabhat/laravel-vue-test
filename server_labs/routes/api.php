<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return response(\App\User::pluck('email'));
});
Route::get('/test', function () {
    return response([1, 2, 3], 200);
});
Route::group(['prefix' => 'v1', 'middleware' => 'auth:api'], function () {
    Route::get('user-list', 'UserController@getUserList');
});

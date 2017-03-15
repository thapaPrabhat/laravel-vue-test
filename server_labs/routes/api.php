<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
    return response([1, 2, 3], 200);
});

Route::group(['prefix' => 'v1', 'middleware' => 'auth:api'], function () {
    Route::get('user-list', 'UserController@getUserList');
    Route::post('get-user-conversation', 'ChatController@getUserConversationById');
    Route::post('chat-save', 'ChatController@saveUserChat');
});

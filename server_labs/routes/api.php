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

//    chat url
    Route::post('get-user-conversation', 'ChatController@getUserConversationById');
    Route::post('chat-save', 'ChatController@saveUserChat');

//    private message url
    Route::post('get-private-message-notification', 'PrivateMessageController@getUserNotification');
    Route::post('get-private-messages', 'PrivateMessageController@getPrivateMessages');
    Route::post('get-private-message', 'PrivateMessageController@getPrivateMessagesById');
    Route::post('get-private-messages-sent', 'PrivateMessageController@getPrivateMessageSent');
    Route::post('send-private-messages', 'PrivateMessageController@sendPrivateMessage');
});

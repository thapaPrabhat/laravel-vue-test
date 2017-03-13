<?php

namespace App\Http\Controllers;

use App\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function getUserConversationById(Request $request)
    {
        $userId = $request->input('id');
        $authUserId = $request->user()->id;
        $chats = Chat::whereIn('sender_id', [$authUserId, $userId])->whereIn('receiver_id', [$authUserId, $userId])->orderBy('created_at', 'asc')->get();
        return response(['data' => $chats], 200);
    }
}

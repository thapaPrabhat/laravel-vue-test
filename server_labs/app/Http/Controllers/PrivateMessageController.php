<?php

namespace App\Http\Controllers;

use App\PrivateMessage;
use Illuminate\Http\Request;

class PrivateMessageController extends Controller
{
    public function getUserNotification(Request $request)
    {
        $notifications = PrivateMessage::where('read', 0)
            ->where('receiver_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();
        return response(['data' => $notifications], 200);
    }

    public function getPrivateMessages(Request $request)
    {
        $pms = PrivateMessage::where('receiver_id', $request->user()->id)->orderBy('created_at', 'desc')->get();
        return response(['data' => $pms], 200);
    }

    public function getPrivateMessagesById(Request $request)
    {
        $pm = PrivateMessage::where('id', $request->input('id'))->first();
        // if the message is not read, changing the status
        if ($pm->read == 0) {
            $pm->read = 1;
            $pm->save();
//            $redis = LRedis::connection();
//            $redis->publish('messageRead', $pm);
//            Log::info('123');
        }
        return response(['data' => $pm], 200);
    }

    public function getPrivateMessageSent(Request $request)
    {
        $pms = PrivateMessage::where('sender_id', $request->user()->id)->orderBy('created_at', 'desc')->get();
        return response(['data' => $pms], 200);
    }

    public function sendPrivateMessage(Request $request)
    {
        $attributes = [
            'sender_id' => $request->user()->id,
            'receiver_id' => $request->input('receiver_id'),
            'message' => $request->input('message'),
            'subject' => $request->input('subject'),
            'read' => 0,
        ];
        $pm = PrivateMessage::create($attributes);
        $data = PrivateMessage::where('id', $pm->id)->first();
//        $redis = LRedis::connection();
//        $redis->publish('message', $data);
        return response(['data' => $data], 201);
    }


    public function unreadPrivateMessage(Request $request)
    {
        $pm = PrivateMessage::where('id', $request->id)->first();
        $pm->read = 0;
        $pm->save();
//        $redis = LRedis::connection();
//        $redis->publish('message', $data);
        return response(['data' => $pm], 201);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RagChatController extends Controller
{
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $fastApiUrl = 'http://127.0.0.1:8001/api/rag/chat';

        try {
            $response = Http::timeout(30)->post($fastApiUrl, [
                'message' => $request->message,
            ]);

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json([
                'success' => false,
                'response' => 'FastAPI error',
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'response' => 'Cannot connect to AI service',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

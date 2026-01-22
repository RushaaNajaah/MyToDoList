<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        try {
            return Task::with('category')->latest()->get();
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title'       => 'required|string|max:255',
                'description' => 'nullable|string',
                'due_date'    => 'nullable|date',
                'category_id' => 'nullable|exists:categories,id',
            ]);

            $task = Task::create([
                'title'       => $validated['title'],
                'description' => $validated['description'],
                'due_date'    => $request->due_date,
                'category_id' => $validated['category_id'] ?? null,
                'is_completed'=> false,
            ]);

            return response()->json($task, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show(Task $task)
    {
        return response()->json($task->load('category'));
    }

    public function update(Request $request, Task $task)
    {
        try {
            $task->update($request->all());
            return response()->json($task);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $task = Task::findOrFail($id);
            $task->delete();
            return response()->json(['message' => 'Succès']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
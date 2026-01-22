<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category; 

class CategoryController extends Controller
{
    public function index() {
        return response()->json(Category::all());
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:7',
        ]);

        return response()->json(Category::create($validated), 201);
    }

    public function destroy($id) {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Supprimé avec succès']);
    }
}
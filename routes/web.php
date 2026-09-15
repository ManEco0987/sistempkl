<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SiswaController;

Route::get('/', function () {
    return view('home');
});

Route::get('/tentang', function () {
    return view('tentang');
});

Route::get('/materi', function () {
    return view('materi');
});

Route::get('/kontak', function () {
    return view('kontak');
});

Route::get('/siswa', [SiswaController::class, 'index']);
@extends('layouts.app')

@section('title', 'Tentang')

@section('content')

<div class="text-center mb-5">
    <h1 class="fw-bold">Tentang Website</h1>
    <p class="text-muted">
        Mengenal lebih jauh tentang website ini.
    </p>
</div>

<div class="card shadow-sm">
    <div class="card-body p-4">
        <h3>Tentang Saya</h3>

        <p>
            Website ini dibuat menggunakan framework Laravel
            sebagai latihan dalam pengembangan website.
        </p>

        <p>
            Di dalam website ini terdapat beberapa halaman,
            seperti Home, Tentang, Materi, Soal, dan Kontak.
        </p>
    </div>
</div>

@endsection
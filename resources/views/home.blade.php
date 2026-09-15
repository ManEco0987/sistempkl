@extends('layouts.app')

@section('title', 'Home')

@section('content')

<div class="text-center py-5">

    <h1 class="display-4 fw-bold">
        Selamat Datang di Website Saya
    </h1>

    <p class="lead mt-3">
        Website pembelajaran sederhana menggunakan Laravel.
    </p>

    <a href="{{ url('/materi') }}" class="btn btn-primary mt-3">
        Lihat Materi
    </a>

</div>

@endsection
@extends('layouts.app')

@section('title', 'Materi')

@section('content')

<div class="text-center mb-5">
    <h1 class="fw-bold">Materi Pembelajaran</h1>
    <p class="text-muted">
        Pilih materi yang ingin dipelajari.
    </p>
</div>

<div class="row g-4">

    <div class="col-md-4">
        <div class="card h-100 shadow-sm">
            <div class="card-body">
                <h4>HTML</h4>
                <p>
                    Mempelajari struktur dasar halaman website
                    menggunakan HTML.
                </p>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card h-100 shadow-sm">
            <div class="card-body">
                <h4>CSS</h4>
                <p>
                    Mempelajari cara mengatur tampilan dan desain
                    halaman website.
                </p>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card h-100 shadow-sm">
            <div class="card-body">
                <h4>PHP</h4>
                <p>
                    Mempelajari pemrograman website menggunakan
                    PHP dan Laravel.
                </p>
            </div>
        </div>
    </div>

</div>

@endsection
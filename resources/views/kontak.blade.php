@extends('layouts.app')

@section('title', 'Kontak')

@section('content')

<div class="text-center mb-5">
    <h1 class="fw-bold">Kontak</h1>
    <p class="text-muted">
        Silakan hubungi kami melalui informasi berikut.
    </p>
</div>

<div class="row justify-content-center">
    <div class="col-md-6">

        <div class="card shadow-sm">
            <div class="card-body p-4">

                <h4 class="mb-4">Informasi Kontak</h4>

                <p>
                    <strong>Email:</strong>
                    example@gmail.com
                </p>

                <p>
                    <strong>Instagram:</strong>
                    @mywebsite
                </p>

                <p>
                    <strong>Alamat:</strong>
                    Bali, Indonesia
                </p>

            </div>
        </div>

    </div>
</div>

@endsection
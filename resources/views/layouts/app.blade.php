<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>@yield('title', 'Website Laravel')</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">

            <a class="navbar-brand fw-bold" href="{{ url('/') }}">
                MyWebsite
            </a>

            <button class="navbar-toggler" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">

                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/') }}">Home</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/tentang') }}">Tentang</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/materi') }}">Materi</a>
                    </li>

                     <li class="nav-item">
                        <a class="nav-link" href="{{ url('/siswa') }}">Siswa</a>
                    </li>
                   

                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/kontak') }}">Kontak</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>


    <main class="container py-5">

        @yield('content')

    </main>


    <footer class="bg-dark text-white text-center py-3">
        <p class="mb-0">© 2026 MyWebsite</p>
    </footer>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
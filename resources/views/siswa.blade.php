<!DOCTYPE html>
<html>
<head>
    <title>Data Siswa</title>
</head>
<body>

    <h1>Data Siswa</h1>
    <button class="btn" type="submit" style="border:1px solidblack"><a href="{{route('tambah')}}">Tambah Data</a></button>
    <table border="1">
        <tr>
            <th>No</th>
            <th>NIS</th>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Jurusan</th>
        </tr>

        @foreach ($siswas as $siswa)
        <tr>
            <td>{{ $loop->iteration }}</td>
            <td>{{ $siswa->nis }}</td>
            <td>{{ $siswa->nama }}</td>
            <td>{{ $siswa->kelas }}</td>
            <td>{{ $siswa->jurusan }}</td>
        </tr>
        @endforeach

    </table>

</body>
</html>
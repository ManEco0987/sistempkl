/* Sistem PKL Siswa - Admin. Frontend murni (HTML/CSS/JS). Data relasional disimpan di localStorage. */
const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='pkl_db_v2',PS=8,dd=n=>new Date(Date.now()-n*864e5).toISOString().slice(0,10),today=()=>dd(0),now=()=>new Date().toTimeString().slice(0,5);

function seed(){
 const J=[['RPL','Rekayasa Perangkat Lunak'],['TKJ','Teknik Komputer Jaringan'],['TP','Teknik Pemesinan'],['TKR','Teknik Kendaraan Ringan'],['TBSM','Teknik Bisnis Sepeda Motor']].map((a,i)=>({id:i+1,kode:a[0],nama:a[1]}));
 const G=['Budi Santoso','Sari Wulandari','Made Wirawan','Komang Ayu','Putu Adnyana'].map((n,i)=>({id:i+1,nama:n,user:'guru'+(i+1),pass:'guru'+(i+1)+'123'}));
 const T=[['PT Teknologi Nusantara','Hendra Wijaya','Andi Firmansyah','Jl. Sunset Road No. 12, Badung','081234567801',[1,2]],['CV Digital Kreatif','Ayu Permata','Rina Kusuma','Jl. Teuku Umar No. 45, Denpasar','081234567802',[1,2]],['Bengkel Bali Motor','Wayan Darta','Nyoman Adi','Jl. Raya Kuta No. 88, Badung','081234567803',[4,5]],['PT Mesin Presisi Bali','Agus Salim','Dedi Kurniawan','Jl. Bypass Ngurah Rai, Denpasar','081234567804',[3]],['Astra Auto Service Denpasar','Bambang Sutrisno','Yoga Pratama','Jl. Gatot Subroto, Denpasar','081234567805',[4,5]],['Bali Net Solusi','Made Karya','Eka Putra','Jl. Raya Sesetan, Denpasar','081234567806',[2]]].map((a,i)=>({id:i+1,nama:a[0],pimpinan:a[1],pembimbing:a[2],alamat:a[3],cp:a[4],jurusan_ids:a[5]}));
 const S=[['Akbar Arshavin','XI RPL 2',1,'Laki-laki',1,1],['Bagas Pratama','XI RPL 2',1,'Laki-laki',2,1],['Sabdhy Putra','XI RPL 1',1,'Laki-laki',1,1],['Kadek Ayu Lestari','XI TKJ 1',2,'Perempuan',6,2],['Wayan Sudarma','XI TP 1',3,'Laki-laki',1,3],['Komang Dewi Sari','XI TKJ 2',2,'Perempuan',2,2],['Nia Ramadhani','XI TKR 1',4,'Perempuan',null,4],['Putu Rangga','XI TKR 2',4,'Laki-laki',5,4],['Made Surya','XI TBSM 1',5,'Laki-laki',3,5],['Gede Arya','XI TP 2',3,'Laki-laki',4,3],['Ketut Bayu','XI TBSM 2',5,'Laki-laki',3,5]].map((a,i)=>({id:i+1,nis:String(10234+i),nama:a[0],foto:'',kelas:a[1],jurusan_id:a[2],jk:a[3],user:'siswa'+(10234+i),pass:'pkl'+(10234+i),tempat_id:a[4],guru_id:a[5],bukti:''}));
 return{jurusan:J,guru:G,tempat:T,siswa:S,
  nilai:[[1,88,85,90,87,89],[2,84,80,86,88,85],[4,90,92,88,91,90],[8,78,75,80,79,82]].map((a,i)=>({id:i+1,siswa_id:a[0],kerajinan:a[1],prestasi:a[2],disiplin:a[3],kerjasama:a[4],tanggungjawab:a[5]})),
  monitoring:[[1,1,'Kunjungan rutin','Siswa aktif mengerjakan modul website perusahaan.','Lanjutkan, tambah dokumentasi harian.'],[3,5,'Ketidaksesuaian jurusan','Siswa TP ditempatkan di perusahaan bidang software.','Pindahkan ke perusahaan permesinan.'],[2,4,'Kunjungan rutin','Siswa disiplin dan komunikatif.','Pertahankan.']].map((a,i)=>({id:i+1,guru_id:a[0],siswa_id:a[1],tanggal:dd(i+1),kejadian:a[2],keterangan:a[3],tindakan:a[4]})),
  absensi:[[1,'Hadir'],[2,'Hadir'],[4,'Izin']].map((a,i)=>({id:i+1,siswa_id:a[0],tanggal:today(),jam:'08:0'+i,status:a[1],lokasi:'',foto:'',catatan:''})),
  berkas:[],
  jurnal:[[1,'Membuat halaman login dan dashboard.','Layout tidak rapi di HP.','Memakai flexbox dan media query.','Menunggu'],[2,'Instalasi dan konfigurasi database MySQL.','Error koneksi.','Cek kredensial dan port.','Terverifikasi'],[4,'Konfigurasi router dan switch kantor.','Kabel kurang.','Meminta stok ke pembimbing.','Menunggu'],[8,'Servis rutin kendaraan pelanggan.','Belum hafal SOP.','Bertanya pada mekanik senior.','Terverifikasi']].map((a,i)=>({id:i+1,siswa_id:a[0],tanggal:dd(i),kegiatan:a[1],kendala:a[2],solusi:a[3],dok:'',status:a[4],catatan:''})),
  pesan:[[1,'siswa','Selamat siang pak, bagaimana progress laporan saya?'],[1,'admin','Tolong lengkapi bagian dokumentasi ya.'],[1,'siswa','Baik pak, segera saya lengkapi.'],[7,'siswa','Pak, saya belum mendapat tempat PKL.'],[5,'siswa','Apakah boleh pindah perusahaan?']].map((a,i)=>({id:i+1,siswa_id:a[0],dari:a[1],teks:a[2],waktu:today()}))};
}
let db;try{db=JSON.parse(localStorage.getItem(KEY))}catch(e){}
db=db||seed();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){alert('Penyimpanan browser penuh. Gunakan file/foto yang lebih kecil.')}};
const by=(t,id)=>db[t].find(x=>x.id==id),nid=t=>Math.max(0,...db[t].map(x=>x.id))+1;
const jr=id=>by('jurusan',id)?.kode||'-',jb=id=>`<span class="jurcode">${esc(jr(id))}</span>`,gr=id=>by('guru',id)?.nama||'-',tp=s=>by('tempat',s.tempat_id),tn=s=>tp(s)?.nama||'-';
const bad=s=>{const t=tp(s);return !!t&&!t.jurusan_ids.includes(+s.jurusan_id)},need=t=>t.jurusan_ids.map(jr).join(', ');
const badge=(t,c)=>`<em class="${c}">${esc(t)}</em>`,tr=(s,n=48)=>esc(String(s||'').length>n?String(s).slice(0,n)+'…':s||'-');
const av=s=>s.foto?`<img class="ph" src="${s.foto}">`:`<span class="avatar">${esc((s.nama||'?').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase())}</span>`;
const bt=(l,f,c='')=>`<button class="${c}" onclick="${f}">${l}</button>`;
const intro=(t,h,p,b='')=>`<div class="intro"><div><span>${t}</span><h2>${h}</h2><p>${p}</p></div>${b}</div>`;
const ic=k=>$(`nav a[href="#${k}"] svg`)?.outerHTML||'';
const dl=a=>`<div class="tablewrap"><table class="dl">${a.map(([l,v])=>`<tr><th>${l}</th><td>${v||'-'}</td></tr>`).join('')}</table></div>`;
const nl=s=>db.nilai.find(x=>x.siswa_id==s.id),avg=n=>n?(['kerajinan','prestasi','disiplin','kerjasama','tanggungjawab'].reduce((a,k)=>a+ +n[k],0)/5):null,pred=v=>v>=90?'A':v>=80?'B':v>=70?'C':'D';
const A=(k,r,d)=>(d?bt('Detail',`det('${k}',${r.id})`):'')+bt('Edit',`frm('${k}',${r.id})`)+bt('Hapus',`del('${k}',${r.id})`,'danger');
const opt=(t,f)=>()=>db[t].map(x=>[x.id,f(x)]),optz=(t,f)=>()=>[['','— Belum ada —'],...opt(t,f)()];
const vwl=(t,r,f)=>r[f]?`<a class="lnk" onclick="vw('${t}',${r.id},'${f}')">Lihat</a>`:'-';
const SB={Menunggu:'pending',Terverifikasi:'ok',Ditolak:'rev'};

function alerts(){const a=[];
 db.siswa.filter(bad).forEach(s=>a.push({c:1,t:`Jurusan ${s.nama} (${jr(s.jurusan_id)}) tidak sesuai kebutuhan ${tn(s)} (${need(tp(s))}).`}));
 const n=db.siswa.filter(s=>!s.tempat_id).length;if(n)a.push({c:1,t:`${n} siswa belum memiliki tempat PKL.`});
 db.jurnal.filter(j=>j.status=='Menunggu').forEach(j=>a.push({c:0,t:`Jurnal ${by('siswa',j.siswa_id)?.nama||'-'} (${j.tanggal}) menunggu verifikasi.`}));
 return a}

const st={abs:{j:'',s:''}};
const M={
 siswa:{t:'siswa',tag:'DATA MASTER',ti:'Daftar Siswa',sub:'Kelola data siswa PKL.',add:'Tambah Siswa',fn:'Siswa',ph:'Cari NIS, nama, kelas...',
  rows:()=>db.siswa,q:r=>[r.nis,r.nama,r.kelas,jr(r.jurusan_id)].join(' '),
  cols:[['NIS',r=>esc(r.nis)],['Nama Siswa',r=>`<b>${esc(r.nama)}</b>`],['Foto',av],['Kelas',r=>esc(r.kelas)],['Jurusan',r=>jb(r.jurusan_id)],['Jenis Kelamin',r=>r.jk],['User',r=>esc(r.user)],['Password',r=>`<span class="pw" data-p="${esc(r.pass)}" onclick="this.textContent=this.dataset.p" title="Klik untuk melihat">••••••</span>`]],
  acts:r=>A('siswa',r,1),
  f:[['nis','NIS','t'],['nama','Nama Siswa','t'],['foto','Foto','i'],['kelas','Kelas','t'],['jurusan_id','Jurusan','s',opt('jurusan',x=>`${x.kode} - ${x.nama}`)],['jk','Jenis Kelamin','s',()=>[['Laki-laki','Laki-laki'],['Perempuan','Perempuan']]],['user','User','t'],['pass','Password','t'],['tempat_id','Tempat PKL','s',optz('tempat',x=>x.nama)],['guru_id','Guru Pembimbing','s',optz('guru',x=>x.nama)],['bukti','Bukti penempatan (opsional)','f']],
  req:['nis','nama','user','pass'],chk:(o,id)=>db.siswa.some(x=>x.nis==o.nis&&x.id!=id)?'NIS sudah dipakai.':'',def:()=>({jk:'Laki-laki'}),
  cas:id=>['nilai','absensi','jurnal','pesan','monitoring'].forEach(t=>db[t]=db[t].filter(x=>x.siswa_id!=id)),
  det:r=>{const n=nl(r),v=avg(n),t=tp(r);return[['Foto',av(r)],['NIS',esc(r.nis)],['Nama',esc(r.nama)],['Kelas',esc(r.kelas)],['Jurusan',esc(by('jurusan',r.jurusan_id)?.nama)],['Jenis Kelamin',r.jk],['Tempat PKL',esc(t?.nama)],['Pembimbing Industri',esc(t?.pembimbing)],['Guru Pembimbing',esc(gr(r.guru_id))],['Nilai Rata-rata',v==null?'':v.toFixed(1)+' ('+pred(v)+')'],['Absensi Hadir',db.absensi.filter(a=>a.siswa_id==r.id&&a.status=='Hadir').length+' hari'],['Jumlah Jurnal',db.jurnal.filter(a=>a.siswa_id==r.id).length],['User',esc(r.user)]]}},
 notifikasi:{tag:'SISTEM',ti:'Notifikasi',sub:'Penempatan siswa dan kesesuaian jurusan dengan kebutuhan perusahaan.',fn:'',ph:'Cari siswa / perusahaan...',
  rows:()=>db.siswa.filter(s=>s.tempat_id).sort((a,b)=>bad(b)-bad(a)),q:r=>r.nama+' '+tn(r),
  pre:()=>{const n=db.siswa.filter(bad).length;return n?`<div class="notice warn"><i class="notice-ic">${ic('notifikasi')}</i><div><b>Peringatan</b><small>${n} siswa ditempatkan di perusahaan yang tidak membutuhkan jurusannya.</small></div></div>`:''},
  cols:[['Nama Siswa',r=>`<b>${esc(r.nama)}</b>${bad(r)?'<br>'+badge('Jurusan tidak sesuai','rev'):''}`],['Jurusan',r=>jb(r.jurusan_id)],['Nama Perusahaan',r=>esc(tn(r))],['Nama Pimpinan',r=>esc(tp(r).pimpinan)],['Nama Pembimbing',r=>esc(tp(r).pembimbing)],['Jurusan yang Dibutuhkan',r=>need(tp(r))],['Bukti',r=>vwl('siswa',r,'bukti')]],
  acts:r=>bt(bad(r)?'Ubah Tempat':'Detail',bad(r)?`frm('siswa',${r.id})`:`det('siswa',${r.id})`)},
 nilai:{t:'nilai',tag:'PENILAIAN',ti:'Nilai PKL Siswa',sub:'Input dan rekap nilai PKL. Rata-rata dihitung otomatis.',fn:'Nilai PKL',ph:'Cari siswa / instansi...',
  rows:()=>db.siswa,q:r=>r.nama+' '+tn(r)+' '+r.kelas,
  cols:[['Nama Siswa',r=>`<b>${esc(r.nama)}</b>`],['Nama Instansi',r=>esc(tn(r))],['Kelas',r=>esc(r.kelas)],...['kerajinan','prestasi','disiplin','kerjasama','tanggungjawab'].map((k,i)=>[['Kerajinan','Prestasi Kerja','Disiplin','Kerjasama','Tanggung Jawab'][i],r=>nl(r)?.[k]??'-']),['Rata-rata',r=>{const v=avg(nl(r));return v==null?'-':`<b>${v.toFixed(1)}</b> (${pred(v)})`}]],
  acts:r=>bt(nl(r)?'Edit Nilai':'Input Nilai',`frm('nilai',${nl(r)?.id||0},{siswa_id:${r.id}})`),
  hd:r=>`<b>${esc(by('siswa',r.siswa_id)?.nama)}</b>`,
  f:[['kerajinan','Nilai Kerajinan (0-100)','n'],['prestasi','Nilai Prestasi Kerja (0-100)','n'],['disiplin','Nilai Disiplin (0-100)','n'],['kerjasama','Nilai Kerjasama (0-100)','n'],['tanggungjawab','Nilai Tanggung Jawab (0-100)','n']],
  req:['kerajinan','prestasi','disiplin','kerjasama','tanggungjawab'],chk:o=>['kerajinan','prestasi','disiplin','kerjasama','tanggungjawab'].some(k=>o[k]<0||o[k]>100)?'Nilai harus 0-100.':''},
 guru:{t:'guru',tag:'DATA MASTER',ti:'Daftar Guru',sub:'Guru pembimbing PKL.',add:'Tambah Guru',fn:'Guru',ph:'Cari nama guru...',
  rows:()=>db.guru,q:r=>r.nama,cols:[['Nama Guru',r=>`<b>${esc(r.nama)}</b>`],['User',r=>esc(r.user)],['Password',r=>`<span class="pw" data-p="${esc(r.pass)}" onclick="this.textContent=this.dataset.p" title="Klik untuk melihat">••••••</span>`]],
  acts:r=>A('guru',r),f:[['nama','Nama Guru','t'],['user','User','t'],['pass','Password','t']],req:['nama','user','pass'],
  chk:(o,id)=>db.guru.some(x=>x.user==o.user&&x.id!=id)?'User sudah dipakai.':'',cas:id=>db.siswa.forEach(s=>{if(s.guru_id==id)s.guru_id=null})},
 monitoring:{t:'monitoring',tag:'PENGAWASAN',ti:'Monitoring',sub:'Catatan kunjungan dan kejadian PKL oleh guru pembimbing.',add:'Input Monitoring',fn:'Monitoring',ph:'Cari nama guru...',
  rows:()=>db.monitoring.slice().reverse(),q:r=>gr(r.guru_id),
  cols:[['Nama Guru',r=>esc(gr(r.guru_id))],['Nama Siswa',r=>`<b>${esc(by('siswa',r.siswa_id)?.nama)}</b>`],['Jurusan',r=>jb(by('siswa',r.siswa_id)?.jurusan_id)],['Nama Perusahaan',r=>esc(tn(by('siswa',r.siswa_id)||{}))],['Kejadian',r=>esc(r.kejadian)],['Keterangan',r=>tr(r.keterangan)],['Tindakan/Rekomendasi',r=>tr(r.tindakan)]],
  acts:r=>A('monitoring',r,1),f:[['guru_id','Nama Guru','s',opt('guru',x=>x.nama)],['siswa_id','Nama Siswa','s',opt('siswa',x=>`${x.nama} (${x.kelas})`)],['tanggal','Tanggal','d'],['kejadian','Kejadian','t'],['keterangan','Keterangan','a'],['tindakan','Tindakan / Rekomendasi','a']],
  req:['guru_id','siswa_id','kejadian'],def:()=>({tanggal:today()}),
  det:r=>{const s=by('siswa',r.siswa_id)||{};return[['Tanggal',r.tanggal],['Guru',esc(gr(r.guru_id))],['Siswa',esc(s.nama)],['Jurusan',esc(by('jurusan',s.jurusan_id)?.nama)],['Perusahaan',esc(tn(s))],['Kejadian',esc(r.kejadian)],['Keterangan',esc(r.keterangan)],['Tindakan',esc(r.tindakan)]]}},
 penempatan:{tag:'PENEMPATAN',ti:'Tempat PKL Siswa',sub:'Relasi siswa dengan perusahaan tempat PKL (ubah lewat Daftar Siswa).',fn:'',ph:'Cari siswa / perusahaan...',
  rows:()=>db.siswa.filter(s=>s.tempat_id),q:r=>r.nama+' '+tn(r),
  cols:[['Nama Siswa',r=>`<b>${esc(r.nama)}</b>`],['Foto',av],['Jurusan',r=>jb(r.jurusan_id)],['Jenis Kelamin',r=>r.jk],['Nama Perusahaan',r=>esc(tn(r))],['Nama Pembimbing',r=>esc(tp(r).pembimbing)],['Alamat',r=>esc(tp(r).alamat)],['CP',r=>esc(tp(r).cp)]]},
 rekomendasi:{t:'tempat',tag:'MITRA',ti:'Tempat Rekomendasi',sub:'Perusahaan mitra dan jurusan yang dibutuhkan.',add:'Tambah Perusahaan',fn:'Perusahaan',ph:'Cari perusahaan...',
  rows:()=>db.tempat,q:r=>r.nama+' '+need(r),cols:[['Nama Perusahaan',r=>`<b>${esc(r.nama)}</b>`],['Jurusan',r=>r.jurusan_ids.map(jb).join(' ')],['Alamat',r=>esc(r.alamat)],['CP',r=>esc(r.cp)]],
  acts:r=>A('rekomendasi',r),f:[['nama','Nama Perusahaan','t'],['pimpinan','Nama Pimpinan','t'],['pembimbing','Nama Pembimbing','t'],['alamat','Alamat','a'],['cp','CP (kontak)','t'],['jurusan_ids','Jurusan yang dibutuhkan','m',opt('jurusan',x=>x.kode)]],
  req:['nama','alamat'],chk:o=>o.jurusan_ids.length?'':'Pilih minimal satu jurusan.',def:()=>({jurusan_ids:[]}),cas:id=>db.siswa.forEach(s=>{if(s.tempat_id==id)s.tempat_id=null})},
 jurusan:{t:'jurusan',tag:'DATA MASTER',ti:'Jurusan',sub:'Daftar jurusan di sekolah.',add:'Tambah Jurusan',fn:'Jurusan',ph:'Cari jurusan...',
  rows:()=>db.jurusan,q:r=>r.kode+' '+r.nama,cols:[['Nama Singkat',r=>jb(r.id)],['Nama Panjang',r=>esc(r.nama)]],acts:r=>A('jurusan',r),
  f:[['kode','Nama Singkat','t'],['nama','Nama Panjang','t']],req:['kode','nama'],chk:(o,id)=>db.jurusan.some(x=>x.kode.toLowerCase()==o.kode.toLowerCase()&&x.id!=id)?'Kode sudah ada.':'',
  dg:id=>db.siswa.some(s=>s.jurusan_id==id)||db.tempat.some(t=>t.jurusan_ids.includes(+id))?'Jurusan masih dipakai siswa/perusahaan.':''},
 absensi:{t:'absensi',tag:'KEHADIRAN',ti:'Absensi',sub:'Cek dan input absensi siswa PKL.',fn:'Absensi',ns:1,
  rows:()=>db.siswa.filter(s=>(!st.abs.j||s.jurusan_id==st.abs.j)&&(!st.abs.s||s.id==st.abs.s)),q:()=>'',
  pre:()=>`<div class="card"><h3>CARI ABSENSI DENGAN KAMERA</h3><p>Filter siswa lalu cek riwayat atau input absensi (foto kamera + lokasi GPS).</p><div class="srow"><select class="search" id="fj" onchange="fa(1)"><option value="">Semua Jurusan</option>${db.jurusan.map(j=>`<option value="${j.id}"${j.id==st.abs.j?' selected':''}>${esc(j.kode)}</option>`).join('')}</select><select class="search" id="fs"><option value="">Semua Siswa</option>${db.siswa.filter(s=>!st.abs.j||s.jurusan_id==st.abs.j).map(s=>`<option value="${s.id}"${s.id==st.abs.s?' selected':''}>${esc(s.nama)}</option>`).join('')}</select>${bt('Cari','fa()','primary')}</div></div>`,
  cols:[['Nama Siswa',r=>`<b>${esc(r.nama)}</b>`],['Jurusan',r=>jb(r.jurusan_id)],['Kelas',r=>esc(r.kelas)],['Nama Perusahaan',r=>esc(tn(r))],['Alamat',r=>esc(tp(r)?.alamat||'-')]],
  acts:r=>bt('Cek Absensi',`ca(${r.id})`)+bt('Input Absensi',`frm('absensi',0,{siswa_id:${r.id}})`),
  hd:r=>`<b>${esc(by('siswa',r.siswa_id)?.nama)}</b>`,f:[['tanggal','Tanggal','d'],['jam','Jam','c'],['status','Status','s',()=>['Hadir','Izin','Sakit','Alpa'].map(x=>[x,x])],['lokasi','Lokasi GPS','g'],['foto','Foto Kamera','k'],['catatan','Catatan','t']],req:['tanggal','jam'],def:()=>({tanggal:today(),jam:now(),status:'Hadir'})},
 berkas:{t:'berkas',tag:'DOKUMEN',ti:'Berkas',sub:'Upload, unduh, dan kelola berkas PKL (maks. 1,5 MB per file).',add:'Upload Berkas',fn:'Berkas',ph:'Cari nama berkas...',
  rows:()=>db.berkas,q:r=>r.nama+' '+(r.file_nama||''),cols:[['Nama Berkas',r=>`<b>${esc(r.nama)}</b>`],['File Berkas',r=>esc(r.file_nama)]],
  acts:r=>bt('Lihat',`vw('berkas',${r.id},'file')`)+`<a class="lnk" href="${r.file}" download="${esc(r.file_nama)}">Unduh</a>`+bt('Edit',`frm('berkas',${r.id})`)+bt('Hapus',`del('berkas',${r.id})`,'danger'),
  f:[['nama','Nama Berkas','t'],['file','File Berkas','f']],req:['nama'],chk:o=>o.file?'':'Pilih file untuk diupload.'},
 jurnal:{t:'jurnal',tag:'KEGIATAN',ti:'Jurnal PKL',sub:'Jurnal kegiatan siswa. Guru/admin dapat memverifikasi.',add:'Tambah Jurnal',fn:'Jurnal',ph:'Cari siswa / kegiatan...',
  rows:()=>db.jurnal.slice().sort((a,b)=>b.tanggal.localeCompare(a.tanggal)||b.id-a.id),q:r=>(by('siswa',r.siswa_id)?.nama||'')+' '+r.kegiatan+' '+r.status,
  cols:[['Tanggal',r=>r.tanggal],['Nama Siswa',r=>`<b>${esc(by('siswa',r.siswa_id)?.nama)}</b>`],['Kegiatan',r=>tr(r.kegiatan)],['Kendala',r=>tr(r.kendala,30)],['Solusi',r=>tr(r.solusi,30)],['Dokumentasi',r=>vwl('jurnal',r,'dok')],['Status',r=>badge(r.status,SB[r.status])]],
  acts:r=>(r.status=='Menunggu'?bt('Verifikasi',`vj(${r.id},'Terverifikasi')`)+bt('Tolak',`vj(${r.id},'Ditolak')`,'danger'):'')+A('jurnal',r,1),
  f:[['siswa_id','Nama Siswa','s',opt('siswa',x=>`${x.nama} (${x.kelas})`)],['tanggal','Tanggal','d'],['kegiatan','Kegiatan','a'],['kendala','Kendala','a'],['solusi','Solusi','a'],['dok','Dokumentasi (foto)','i'],['status','Status','s',()=>Object.keys(SB).map(x=>[x,x])]],
  req:['siswa_id','tanggal','kegiatan'],def:()=>({tanggal:today(),status:'Menunggu'}),
  det:r=>{const s=by('siswa',r.siswa_id)||{};return[['Tanggal',r.tanggal],['Siswa',esc(s.nama)],['Perusahaan',esc(tn(s))],['Kegiatan',esc(r.kegiatan)],['Kendala',esc(r.kendala)],['Solusi',esc(r.solusi)],['Dokumentasi',r.dok?`<img class="big" src="${r.dok}">`:''],['Status',badge(r.status,SB[r.status])],['Catatan guru',esc(r.catatan)]]}}
};

const P={};
const BLD=[[0,34,70],[36,26,110],[64,40,85],[106,30,125],[138,36,95],[176,28,115],[206,44,80],[252,30,105],[284,40,90],[326,34,120]];
const SKR=[0,360,720];
const skyL=(f,k)=>SKR.map(dx=>BLD.map(b=>`<rect x="${b[0]+dx}" y="${170-b[2]*k}" width="${b[1]}" height="${b[2]*k+10}" rx="2" fill="${f}"/>`).join('')).join('');
const WIN=(()=>{const g=['','',''];SKR.forEach((dx,k)=>BLD.forEach((b,i)=>{for(let y=170-b[2]+12;y<160;y+=12)for(let x=b[0]+5;x<b[0]+b[1]-6;x+=9)if((x*7+y*3+i+k*2)%5<2)g[(x+y+k)%3]+=`<rect class="w" x="${x+dx}" y="${y}" width="4" height="5"/>`}));return g.map((t,i)=>`<g class="wg wg${i}">${t}</g>`).join('')})();
const SKY=`<g>${skyL('rgba(60,120,235,.38)',.8)}</g><g>${skyL('#06197a',1)}${WIN}</g>`;
P.dashboard=()=>{const a=alerts(),h=new Date().getHours(),y=new Date().getFullYear(),m=new Date().getMonth(),ta=m>=6?`${y} / ${y+1}`:`${y-1} / ${y}`,
 sal=h<11?['Selamat Pagi','🌞']:h<15?['Selamat Siang','🌞']:h<18?['Selamat Sore','🌇']:['Selamat Malam','🌙'],
 S=[['siswa','Total Siswa',db.siswa.length,'Terdaftar'],['guru','Total Guru',db.guru.length,'Pembimbing'],['penempatan','Total Tempat PKL',db.tempat.length,'Perusahaan mitra'],['notifikasi','Total Notifikasi',a.length,'Perlu tindak lanjut']],
 tile=(i,t)=>`<div class="tile"><i>${ic(i)}</i><span>${t}</span></div>`;
 return `<section class="home"><div class="sky"></div>
 <svg class="skyline" viewBox="0 0 1080 170" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${SKY}</svg>
 <i class="rays"></i><i class="sun"></i>${[1,2,3,4,5,6,7].map(n=>`<i class="pt p${n}"></i>`).join('')}
 <i class="cloud c1"></i><i class="cloud c2"></i>
 ${[1,2,3].map(n=>`<svg class="bird b${n}" viewBox="0 0 24 10" aria-hidden="true"><path d="M0 8Q6 0 12 6Q18 0 24 8"/></svg>`).join('')}
 ${[1,2,3,4,5,6].map(n=>`<i class="leaf l${n}"></i>`).join('')}
 <div class="hbadge"><img src="${$('#logoimg').src}" alt="Logo SMK TI Bali Global Badung"><div><b>SMK TI Bali Global</b><small>Badung</small></div></div>
 <div class="htxt"><h2>Hi, Administrator</h2><p>${sal[0]} ${sal[1]}</p></div>
 <div class="hinfo">${a.length?`Ada ${a.length} notifikasi yang perlu ditindak lanjuti`:'Tidak ada notifikasi baru saat ini'}</div></section>
 <div class="tiles">${tile('absensi',ta)}${tile('siswa','Siswa: '+db.siswa.length)}${tile('penempatan','SMK TI Bali Global')}${tile('guru','Administrator')}</div>
 <h3 class="sect">Ringkasan</h3>
 <div class="stats">${S.map(x=>`<div><i class="stat-ic">${ic(x[0])}</i><span>${x[1]}</span><b>${x[2]}</b><small>${x[3]}</small></div>`).join('')}</div>
 <div class="grid2"><div class="card"><h3>Daftar Notifikasi Terbaru</h3><p>Ringkasan yang perlu ditindak lanjuti</p>${a.slice(0,6).map(x=>`<div class="notice${x.c?' warn':''}"><i class="notice-ic">${ic('notifikasi')}</i><div><small>${esc(x.t)}</small></div></div>`).join('')||'<p>Tidak ada notifikasi.</p>'}</div>
 <div class="card"><h3>Ringkasan Cepat</h3><p>Data real-time dari sistem</p>${[['berkas',db.berkas.length+' berkas','Terunggah'],['jurnal',db.jurnal.filter(j=>j.status=='Menunggu').length+' jurnal','Menunggu verifikasi'],['absensi',db.absensi.filter(x=>x.tanggal==today()).length+' absensi','Tercatat hari ini'],['chat',new Set(db.pesan.map(p=>p.siswa_id)).size+' percakapan','Dari siswa']].map(x=>`<div class="notice"><i class="notice-ic">${ic(x[0])}</i><div><b>${x[1]}</b><small>${x[2]}</small></div></div>`).join('')}</div></div>`};
const lm=i=>db.pesan.filter(p=>p.siswa_id==i).slice(-1)[0];
P.chat=()=>{const ids=[...new Set(db.pesan.map(p=>p.siswa_id))].filter(i=>by('siswa',i)).sort((a,b)=>lm(b).id-lm(a).id),sid=ids.includes(st.chat)?st.chat:ids[0],s=by('siswa',sid);
 return intro('KOMUNIKASI','Chat','Percakapan dengan siswa PKL.')+`<div class="chatwrap"><div class="chatlist">${ids.map(i=>{const x=by('siswa',i),m=lm(i);return `<div class="chatitem${i==sid?' active':''}" onclick="st.chat=${i};render()">${av(x)}<div><b>${esc(x.nama)}</b><small>${m.dari=='admin'?'Anda: ':''}${tr(m.teks,30)}</small></div>${m.dari=='siswa'?'<em class="dot"></em>':''}</div>`}).join('')||'<p style="padding:14px;color:var(--muted)">Belum ada pesan.</p>'}</div><div class="chatbox">${s?`<div class="chatbox-head"><b>${esc(s.nama)}</b><small>Siswa · ${esc(s.kelas)} · ${jr(s.jurusan_id)}</small></div><div class="chatmsgs" id="cm">${db.pesan.filter(p=>p.siswa_id==sid).map(p=>`<div class="msg ${p.dari=='admin'?'out':'in'}">${esc(p.teks)}</div>`).join('')}</div><div class="chatinput"><input id="ci" placeholder="Tulis pesan..." onkeydown="if(event.key=='Enter')snd(${sid})">${bt('Kirim',`snd(${sid})`)}</div>`:''}</div></div>`};
function snd(sid){const v=$('#ci').value.trim();if(!v)return;db.pesan.push({id:nid('pesan'),siswa_id:sid,dari:'admin',teks:v,waktu:today()});save();render()}

function list(k){const c=M[k],s=st[k]??={q:'',p:1};
 const all=c.rows().filter(r=>!s.q||c.q(r).toLowerCase().includes(s.q.toLowerCase())),n=all.length,pgs=Math.max(1,Math.ceil(n/PS));s.p=Math.min(s.p,pgs);
 const o=(s.p-1)*PS,sl=all.slice(o,o+PS);
 let h=intro(c.tag,c.ti,c.sub,c.add?bt('＋ '+c.add,`frm('${k}',0)`):'')+(c.pre?c.pre():'');
 if(!c.ns)h+=`<div class="srow"><input class="search" id="q" value="${esc(s.q)}" placeholder="${c.ph}" onkeydown="if(event.key=='Enter')cari('${k}')">${bt('Cari',`cari('${k}')`,'primary')}${bt('Reset Cari',`rst('${k}')`)}</div>`;
 h+=`<div class="card"><div class="tablewrap"><table><tr><th>No</th>${c.cols.map(x=>`<th>${x[0]}</th>`).join('')}${c.acts?'<th>Aksi</th>':''}</tr>`+(sl.map((r,i)=>`<tr><td>${o+i+1}</td>${c.cols.map(x=>`<td>${x[1](r)}</td>`).join('')}${c.acts?`<td class="acts">${c.acts(r)}</td>`:''}</tr>`).join('')||`<tr><td colspan="${c.cols.length+2}" style="text-align:center;color:var(--muted)">Belum ada data</td></tr>`)+`</table></div><div class="pager"><small>${n?`${o+1}–${o+sl.length} dari ${n} data`:'0 data'}</small><span>${bt('‹',`pg('${k}',${s.p-1})`)}${Array.from({length:pgs},(_,i)=>bt(i+1,`pg('${k}',${i+1})`,i+1==s.p?'on':'')).join('')}${bt('›',`pg('${k}',${s.p+1})`)}</span></div></div>`;
 return h}
const cari=k=>{st[k].q=$('#q').value;st[k].p=1;render()},rst=k=>{st[k].q='';st[k].p=1;render()},pg=(k,n)=>{st[k].p=Math.max(1,n);render()};
function fa(j){st.abs.j=$('#fj').value;st.abs.s=j?'':$('#fs').value;st.abs.p=1;st.absensi&&(st.absensi.p=1);render()}

/* Modal, form, simpan, hapus */
const om=h=>{$('#mbox').innerHTML=`<button class="x" onclick="cm()">×</button>`+h;$('#modal').classList.add('show')},cm=()=>$('#modal').classList.remove('show');
function fld([n,l,t,o],v){let h;
 if(t=='s')h=`<select name="${n}">${o().map(([a,b])=>`<option value="${a}"${a==v?' selected':''}>${esc(b)}</option>`).join('')}</select>`;
 else if(t=='m')h=`<div class="chk">${o().map(([a,b])=>`<label><input type="checkbox" name="${n}" value="${a}"${(v||[]).includes(+a)?' checked':''}>${esc(b)}</label>`).join('')}</div>`;
 else if(t=='a')h=`<textarea name="${n}">${esc(v)}</textarea>`;
 else if(t=='f'||t=='i'||t=='k')h=`<input type="file" name="${n}"${t=='i'?' accept="image/*"':t=='k'?' accept="image/*" capture="user"':''}>`;
 else if(t=='g')h=`<input name="${n}" value="${esc(v)}" placeholder="lat, long">${bt('Ambil Lokasi GPS','gps()')}`;
 else h=`<input name="${n}" type="${{n:'number',d:'date',t:'text',c:'time'}[t]}" value="${esc(v)}">`;
 return `<label>${l}${h}</label>`}
let cur={};
function frm(k,id,base){const c=M[k],r=id?by(c.t,id):{...(c.def?c.def():{}),...base};cur={k,id,base};
 om(`<span>${c.tag}</span><h2>${id?'Edit':'Tambah / Input'} ${c.fn}</h2>${c.hd?`<small>${c.hd(r.siswa_id?r:base)}</small>`:''}<form id="fm" onsubmit="return false">${c.f.map(f=>fld(f,r[f[0]])).join('')}</form><div class="actions">${bt('Batal','cm()')}${bt('Simpan','sv()','primary')}</div>`)}
const rd=(f,img)=>new Promise(res=>{const r=new FileReader();r.onload=()=>{if(!img)return res(r.result);const i=new Image();i.onload=()=>{const s=Math.min(1,480/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*s;c.height=i.height*s;c.getContext('2d').drawImage(i,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.7))};i.src=r.result};r.readAsDataURL(f)});
async function sv(){const{k,id,base}=cur,c=M[k],fd=new FormData($('#fm')),o=id?{...by(c.t,id)}:{...base};
 for(const[n,,t]of c.f){if(t=='m')o[n]=fd.getAll(n).map(Number);
  else if(t=='f'||t=='i'||t=='k'){const f=fd.get(n);if(f&&f.size){if(t=='f'&&f.size>1.5e6)return alert('File terlalu besar (maks. 1,5 MB).');o[n]=await rd(f,t!='f');o[n+'_nama']=f.name}}
  else if(t=='n')o[n]=fd.get(n)===''?'':+fd.get(n);
  else o[n]=n.endsWith('_id')?(fd.get(n)?+fd.get(n):null):fd.get(n)}
 if((c.req||[]).some(n=>!String(o[n]??'').trim()))return alert('Lengkapi data yang wajib diisi.');
 const m=c.chk?.(o,id);if(m)return alert(m);
 if(id)Object.assign(by(c.t,id),o);else db[c.t].push({...o,id:nid(c.t)});
 save();cm();render()}
function del(k,id){const c=M[k],m=c.dg?.(id);if(m)return alert(m);if(!confirm('Hapus data ini?'))return;c.cas?.(id);db[c.t]=db[c.t].filter(x=>x.id!=id);save();render()}
const det=(k,id)=>{const c=M[k];om(`<span>DETAIL</span><h2>${c.ti}</h2>${dl(c.det(by(c.t||'siswa',id)))}<div class="actions">${bt('Tutup','cm()')}</div>`)};
function vw(t,id,f){fetch(by(t,id)[f]).then(r=>r.blob()).then(b=>window.open(URL.createObjectURL(b),'_blank'))}
function vj(id,s){const j=by('jurnal',id);j.status=s;j.catatan=prompt('Catatan guru (opsional):','')||'';j.guru_id=by('siswa',j.siswa_id)?.guru_id||null;save();render()}
function ca(sid){const s=by('siswa',sid),r=db.absensi.filter(a=>a.siswa_id==sid).sort((a,b)=>(b.tanggal+b.jam).localeCompare(a.tanggal+a.jam));
 om(`<span>RIWAYAT</span><h2>Absensi ${esc(s.nama)}</h2><small>Hadir: ${r.filter(a=>a.status=='Hadir').length} · Izin: ${r.filter(a=>a.status=='Izin').length} · Sakit: ${r.filter(a=>a.status=='Sakit').length} · Alpa: ${r.filter(a=>a.status=='Alpa').length}</small><div class="tablewrap"><table><tr><th>Tanggal</th><th>Jam</th><th>Status</th><th>Lokasi</th><th>Foto</th><th></th></tr>${r.map(a=>`<tr><td>${a.tanggal}</td><td>${a.jam}</td><td>${badge(a.status,a.status=='Hadir'?'ok':a.status=='Alpa'?'rev':'pending')}</td><td>${esc(a.lokasi)||'-'}</td><td>${vwl('absensi',a,'foto')}</td><td>${bt('Hapus',`da(${a.id},${sid})`,'danger')}</td></tr>`).join('')||'<tr><td colspan="6" style="text-align:center">Belum ada absensi</td></tr>'}</table></div><div class="actions">${bt('Tutup','cm()')}${bt('Input Absensi',`frm('absensi',0,{siswa_id:${sid}})`,'primary')}</div>`)}
function da(id,sid){if(!confirm('Hapus absensi ini?'))return;db.absensi=db.absensi.filter(a=>a.id!=id);save();ca(sid)}
const gps=()=>navigator.geolocation?.getCurrentPosition(p=>$('[name=lokasi]').value=p.coords.latitude.toFixed(6)+', '+p.coords.longitude.toFixed(6),()=>alert('Lokasi tidak dapat diambil. Izinkan akses lokasi di browser.'));

/* Routing (hash). Alias sesuai URL yang diminta: #notif, #daftarSiswa, #nilaiSiswa, dst. */
const R={dashboard:'Dashboard Admin',notifikasi:'Notifikasi',siswa:'Daftar Siswa',nilai:'Nilai PKL Siswa',chat:'Chat',guru:'Daftar Guru',monitoring:'Monitoring',penempatan:'Tempat PKL Siswa',rekomendasi:'Tempat Rekomendasi',jurusan:'Jurusan',absensi:'Absensi',berkas:'Berkas',jurnal:'Jurnal PKL'};
const AL={notif:'notifikasi',daftarSiswa:'siswa',nilaiSiswa:'nilai',daftarGuru:'guru',tempatSiswa:'penempatan',tempatRekomendasi:'rekomendasi',daftarBerkas:'berkas'};
let cp='dashboard';
function route(){const h=location.hash.replace(/^#\/?(admin\/?)?/,'');cp=R[h]?h:(AL[h]||'dashboard');render()}
function render(){$('#title').textContent=R[cp];$('#view').innerHTML=(P[cp]||(()=>list(cp)))();$$('nav a,#bottom a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cp));document.body.classList.toggle('ishome',cp=='dashboard');const m=$('#cm');if(m)m.scrollTop=m.scrollHeight}
function closeMenu(){$('#sidebar').classList.remove('open');$('#backdrop').classList.remove('show');document.body.classList.remove('menuopen')}
function toggleMenu(){const o=$('#sidebar').classList.toggle('open');$('#backdrop').classList.toggle('show',o);document.body.classList.toggle('menuopen',o)}
const out=()=>{if(confirm('Keluar dari panel admin?')){$('#view').innerHTML='<div class="card"><h3>Anda telah keluar</h3><p>Muat ulang halaman untuk masuk kembali. (Login belum tersedia pada versi frontend ini.)</p></div>'}};
$('#modal').addEventListener('click',e=>{if(e.target.id=='modal')cm()});
$$('nav a').forEach(a=>a.addEventListener('click',()=>{closeMenu();scrollTo(0,0)}));
$('#bottom').innerHTML=[['dashboard','Beranda'],['chat','Chat'],['notifikasi','Notifikasi']].map(x=>`<a href="#${x[0]}">${ic(x[0])}<span>${x[1]}</span></a>`).join('')+`<a href="#" onclick="toggleMenu();return false">${$('.menu svg').outerHTML}<span>Menu</span></a>`;
addEventListener('hashchange',route);route();

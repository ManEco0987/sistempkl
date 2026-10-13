/* Sistem PKL Siswa - Pembimbing Industri. Frontend murni (HTML/CSS/JS). Data relasional disimpan di localStorage. */
const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='pkl_pembimbing_db_v1',PS=8,dd=n=>new Date(Date.now()-n*864e5).toISOString().slice(0,10),today=()=>dd(0),now=()=>new Date().toTimeString().slice(0,5);

function seed(){
 const S=[['Akbar Arshavin','SMK TI Bali Global Badung','Rekayasa Perangkat Lunak','Web Development','Budi Santoso','081234567810'],
  ['Bagas Pratama','SMK TI Bali Global Badung','Rekayasa Perangkat Lunak','Web Development','Budi Santoso','081234567810'],
  ['Sabdhy Putra','SMK TI Bali Global Badung','Rekayasa Perangkat Lunak','UI/UX Design','Sari Wulandari','081234567811'],
  ['Kadek Ayu Lestari','SMK Negeri 2 Denpasar','Teknik Komputer Jaringan','Network Support','Made Wirawan','081234567812']]
  .map((a,i)=>({id:i+1,nama:a[0],foto:'',asal_sekolah:a[1],jurusan:a[2],posisi:a[3],guru_sekolah:a[4],hp_guru:a[5],hp:'08213456'+(7820+i),email:('siswa'+(i+1)+'@mail.com')}));
 return{siswa:S,
  jurnal:[[1,'Membuat halaman login dan dashboard perusahaan.','Layout belum rapi di HP.','Memakai flexbox dan media query.','Menunggu'],
   [2,'Instalasi dan konfigurasi database MySQL.','Error koneksi ke server.','Cek kredensial dan port.','Disetujui'],
   [3,'Membuat wireframe halaman utama aplikasi kasir.','Belum terbiasa dengan Figma.','Belajar lewat tutorial internal.','Disetujui'],
   [4,'Konfigurasi router dan switch kantor.','Kabel jaringan kurang.','Meminta stok ke pembimbing.','Menunggu'],
   [1,'Perbaikan bug tampilan pada halaman profil.','-','Menyesuaikan CSS grid.','Revisi']]
   .map((a,i)=>({id:i+1,siswa_id:a[0],tanggal:dd(i),kegiatan:a[1],kendala:a[2],solusi:a[3],dok:'',status:a[4],catatan:i==4?'Perbaiki spacing tombol simpan.':''})),
  absensi:[[1,'08:00','17:05','Hadir'],[2,'08:05','17:00','Hadir'],[3,'08:00','','Hadir'],[4,'','','Izin']]
   .map((a,i)=>({id:i+1,siswa_id:a[0],tanggal:today(),jam_masuk:a[1],jam_pulang:a[2],status:a[3],catatan:''})),
  tugas:[[1,'Optimasi halaman produk','Percepat loading gambar produk pada halaman katalog.',dd(-3),'In Progress',''],
   [2,'Setup backup database','Buat jadwal backup otomatis harian.',dd(-1),'To Do',''],
   [3,'Desain ulang ikon menu','Sesuaikan ikon dengan panduan brand perusahaan.',dd(-5),'Done','Hasil sudah sesuai, rapi dan konsisten.']]
   .map((a,i)=>({id:i+1,siswa_id:a[0],judul:a[1],deskripsi:a[2],deadline:a[3],status:a[4],catatan:a[5]})),
  nilai:[[1,88,85,90,87,86,88,90,'Cepat memahami instruksi dan proaktif bertanya.','Draft'],
   [2,84,80,86,85,88,82,84,'Disiplin dan komunikatif dengan tim.','Terkirim']]
   .map((a,i)=>({id:i+1,siswa_id:a[0],kualitas_kerja:a[1],kecepatan:a[2],pemahaman_sop:a[3],kedisiplinan:a[4],etika_kerja:a[5],kerjasama_tim:a[6],tanggungjawab:a[7],inisiatif:a[7],catatan:a[8],status:a[9]})),
  pesan:[[1,'siswa','Selamat siang pak, bagaimana progress laporan saya?'],[1,'pembimbing','Tolong lengkapi bagian dokumentasi ya.'],[1,'siswa','Baik pak, segera saya lengkapi.'],[3,'siswa','Pak, apakah desain wireframe saya sudah sesuai?'],[4,'siswa','Pak, kabel jaringan sudah saya pesan.']]
   .map((a,i)=>({id:i+1,siswa_id:a[0],dari:a[1],teks:a[2],waktu:today()})),
  profil:{nama:'Andi Firmansyah',jabatan:'Supervisor IT',perusahaan:'PT Teknologi Nusantara',alamat:'Jl. Sunset Road No. 12, Badung',hp:'081234567801',email:'andi.firmansyah@teknologinusantara.co.id',foto:'',pass:'pembimbing123'}}}
let db;try{db=JSON.parse(localStorage.getItem(KEY))}catch(e){}
db=db||seed();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){alert('Penyimpanan browser penuh. Gunakan file/foto yang lebih kecil.')}};
const by=(t,id)=>db[t].find(x=>x.id==id),nid=t=>Math.max(0,...db[t].map(x=>x.id))+1;
const badge=(t,c)=>`<em class="${c}">${esc(t)}</em>`,tr=(s,n=48)=>esc(String(s||'').length>n?String(s).slice(0,n)+'…':s||'-');
const av=s=>s.foto?`<img class="ph" src="${s.foto}">`:`<span class="avatar">${esc((s.nama||'?').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase())}</span>`;
const bt=(l,f,c='')=>`<button class="${c}" onclick="${f}">${l}</button>`;
const intro=(t,h,p,b='')=>`<div class="intro"><div><span>${t}</span><h2>${h}</h2><p>${p}</p></div>${b}</div>`;
const ic=k=>$(`nav a[href="#${k}"] svg`)?.outerHTML||'';
const dl=a=>`<div class="tablewrap"><table class="dl">${a.map(([l,v])=>`<tr><th>${l}</th><td>${v||'-'}</td></tr>`).join('')}</table></div>`;
const nl=s=>db.nilai.find(x=>x.siswa_id==s.id),HARD=['kualitas_kerja','kecepatan','pemahaman_sop'],SOFT=['kedisiplinan','etika_kerja','kerjasama_tim','tanggungjawab','inisiatif'];
const avg=n=>n?([...HARD,...SOFT].reduce((a,k)=>a+ +n[k],0)/(HARD.length+SOFT.length)):null,pred=v=>v>=90?'A':v>=80?'B':v>=70?'C':'D';
const A=(k,r,d)=>(d?bt('Detail',`det('${k}',${r.id})`):'')+bt('Edit',`frm('${k}',${r.id})`)+bt('Hapus',`del('${k}',${r.id})`,'danger');
const opt=(t,f)=>()=>db[t].map(x=>[x.id,f(x)]);
const vwl=(t,r,f)=>r[f]?`<a class="lnk" onclick="vw('${t}',${r.id},'${f}')">Lihat</a>`:'-';
const SB={Menunggu:'pending',Disetujui:'ok',Revisi:'rev'},TB={'To Do':'pending','In Progress':'pending','Done':'ok'},NB={Draft:'pending',Terkirim:'ok'};

function alerts(){const a=[];
 db.jurnal.filter(j=>j.status=='Menunggu').forEach(j=>a.push({c:0,t:`Jurnal ${by('siswa',j.siswa_id)?.nama||'-'} (${j.tanggal}) menunggu persetujuan.`}));
 const n=db.absensi.filter(x=>x.tanggal==today()&&(x.status=='Izin'||x.status=='Sakit')).length;if(n)a.push({c:1,t:`${n} siswa izin/sakit hari ini.`});
 db.tugas.filter(t=>t.status!='Done'&&t.deadline<=dd(0)).forEach(t=>a.push({c:1,t:`Tugas "${t.judul}" (${by('siswa',t.siswa_id)?.nama||'-'}) mendekati/lewat tenggat waktu.`}));
 db.nilai.filter(n=>n.status=='Draft').forEach(n=>a.push({c:0,t:`Penilaian ${by('siswa',n.siswa_id)?.nama||'-'} masih berupa draft, belum dikirim ke sekolah.`}));
 return a}

const M={
 siswa:{t:'siswa',tag:'MENTEE',ti:'Siswa Bimbingan',sub:'Daftar siswa PKL yang berada di bawah bimbingan Anda.',fn:'Siswa Bimbingan',ph:'Cari nama, sekolah, posisi...',
  rows:()=>db.siswa,q:r=>[r.nama,r.asal_sekolah,r.jurusan,r.posisi].join(' '),
  cols:[['Foto',av],['Nama Siswa',r=>`<b>${esc(r.nama)}</b>`],['Asal Sekolah',r=>esc(r.asal_sekolah)],['Jurusan',r=>esc(r.jurusan)],['Posisi/Divisi',r=>esc(r.posisi)],['Guru Pembimbing Sekolah',r=>esc(r.guru_sekolah)]],
  acts:r=>A('siswa',r,1),
  f:[['nama','Nama Siswa','t'],['foto','Foto','i'],['asal_sekolah','Asal Sekolah','t'],['jurusan','Jurusan/Kompetensi Keahlian','t'],['posisi','Posisi/Divisi Penempatan','t'],['guru_sekolah','Guru Pembimbing Sekolah','t'],['hp_guru','HP/Email Guru Pembimbing','t'],['hp','HP Siswa','t'],['email','Email Siswa','t']],
  req:['nama','asal_sekolah'],
  det:r=>{const n=nl(r),v=avg(n);return[['Foto',av(r)],['Nama',esc(r.nama)],['Asal Sekolah',esc(r.asal_sekolah)],['Jurusan',esc(r.jurusan)],['Posisi/Divisi',esc(r.posisi)],['Guru Pembimbing Sekolah',esc(r.guru_sekolah)],['Kontak Guru',esc(r.hp_guru)],['HP Siswa',esc(r.hp)],['Email Siswa',esc(r.email)],['Nilai Rata-rata',v==null?'-':v.toFixed(1)+' ('+pred(v)+')'],['Kehadiran Hadir',db.absensi.filter(a=>a.siswa_id==r.id&&a.status=='Hadir').length+' hari'],['Jumlah Jurnal',db.jurnal.filter(a=>a.siswa_id==r.id).length],['Tugas Selesai',db.tugas.filter(t=>t.siswa_id==r.id&&t.status=='Done').length+'/'+db.tugas.filter(t=>t.siswa_id==r.id).length]]}},
 jurnal:{t:'jurnal',tag:'LOGBOOK',ti:'Jurnal Harian',sub:'Pantau dan validasi laporan kegiatan harian siswa.',add:'Tambah Catatan',fn:'Jurnal',ph:'Cari siswa / kegiatan...',
  rows:()=>db.jurnal.slice().sort((a,b)=>b.tanggal.localeCompare(a.tanggal)||b.id-a.id),q:r=>(by('siswa',r.siswa_id)?.nama||'')+' '+r.kegiatan+' '+r.status,
  cols:[['Tanggal',r=>r.tanggal],['Nama Siswa',r=>`<b>${esc(by('siswa',r.siswa_id)?.nama)}</b>`],['Kegiatan',r=>tr(r.kegiatan)],['Kendala',r=>tr(r.kendala,30)],['Solusi',r=>tr(r.solusi,30)],['Dokumentasi',r=>vwl('jurnal',r,'dok')],['Status',r=>badge(r.status,SB[r.status])]],
  acts:r=>(r.status=='Menunggu'?bt('Setujui',`vj(${r.id},'Disetujui')`)+bt('Revisi',`vj(${r.id},'Revisi')`,'danger'):'')+A('jurnal',r,1),
  f:[['siswa_id','Nama Siswa','s',opt('siswa',x=>x.nama)],['tanggal','Tanggal','d'],['kegiatan','Kegiatan','a'],['kendala','Kendala','a'],['solusi','Solusi','a'],['dok','Dokumentasi (foto)','i'],['status','Status','s',()=>Object.keys(SB).map(x=>[x,x])]],
  req:['siswa_id','tanggal','kegiatan'],def:()=>({tanggal:today(),status:'Menunggu'}),
  det:r=>{const s=by('siswa',r.siswa_id)||{};return[['Tanggal',r.tanggal],['Siswa',esc(s.nama)],['Posisi/Divisi',esc(s.posisi)],['Kegiatan',esc(r.kegiatan)],['Kendala',esc(r.kendala)],['Solusi',esc(r.solusi)],['Dokumentasi',r.dok?`<img class="big" src="${r.dok}">`:''],['Status',badge(r.status,SB[r.status])],['Catatan Pembimbing',esc(r.catatan)]]}},
 absensi:{t:'absensi',tag:'KEHADIRAN',ti:'Absensi & Kehadiran',sub:'Rekap kehadiran dan jam kerja siswa bimbingan.',add:'Input Absensi',fn:'Absensi',ph:'Cari nama siswa...',
  rows:()=>db.absensi.slice().sort((a,b)=>b.tanggal.localeCompare(a.tanggal)),q:r=>by('siswa',r.siswa_id)?.nama||'',
  cols:[['Tanggal',r=>r.tanggal],['Nama Siswa',r=>`<b>${esc(by('siswa',r.siswa_id)?.nama)}</b>`],['Jam Masuk',r=>r.jam_masuk||'-'],['Jam Pulang',r=>r.jam_pulang||'-'],['Status',r=>badge(r.status,r.status=='Hadir'?'ok':r.status=='Alpa'?'rev':'pending')],['Catatan',r=>tr(r.catatan,30)]],
  acts:r=>A('absensi',r),
  f:[['siswa_id','Nama Siswa','s',opt('siswa',x=>x.nama)],['tanggal','Tanggal','d'],['jam_masuk','Jam Masuk','c'],['jam_pulang','Jam Pulang','c'],['status','Status','s',()=>['Hadir','Izin','Sakit','Alpa'].map(x=>[x,x])],['catatan','Catatan','t']],
  req:['siswa_id','tanggal','status'],def:()=>({tanggal:today(),status:'Hadir'})},
 tugas:{t:'tugas',tag:'PENUGASAN',ti:'Tugas (Task Manager)',sub:'Berikan dan pantau penugasan / proyek kecil untuk siswa.',add:'Beri Tugas',fn:'Tugas',ph:'Cari judul tugas / siswa...',
  rows:()=>db.tugas.slice().sort((a,b)=>a.deadline.localeCompare(b.deadline)),q:r=>r.judul+' '+(by('siswa',r.siswa_id)?.nama||''),
  cols:[['Judul Tugas',r=>`<b>${esc(r.judul)}</b>`],['Nama Siswa',r=>esc(by('siswa',r.siswa_id)?.nama)],['Deadline',r=>r.deadline],['Status',r=>badge(r.status,TB[r.status])],['Catatan/Ulasan',r=>tr(r.catatan,30)]],
  acts:r=>A('tugas',r,1),
  f:[['siswa_id','Nama Siswa','s',opt('siswa',x=>x.nama)],['judul','Judul Tugas','t'],['deskripsi','Deskripsi/Jobdesk','a'],['deadline','Deadline','d'],['status','Status','s',()=>['To Do','In Progress','Done'].map(x=>[x,x])],['catatan','Catatan/Ulasan','a']],
  req:['siswa_id','judul','deadline'],def:()=>({status:'To Do'}),
  det:r=>{const s=by('siswa',r.siswa_id)||{};return[['Judul',esc(r.judul)],['Siswa',esc(s.nama)],['Deskripsi',esc(r.deskripsi)],['Deadline',r.deadline],['Status',badge(r.status,TB[r.status])],['Catatan/Ulasan',esc(r.catatan)]]}},
 nilai:{t:'nilai',tag:'PENILAIAN',ti:'Penilaian & Evaluasi',sub:'Nilai kompetensi teknis (hard skill) dan sikap kerja (soft skill) siswa.',fn:'Penilaian',ph:'Cari nama siswa...',
  rows:()=>db.siswa,q:r=>r.nama,
  cols:[['Nama Siswa',r=>`<b>${esc(r.nama)}</b>`],['Posisi/Divisi',r=>esc(r.posisi)],['Kualitas Kerja',r=>nl(r)?.kualitas_kerja??'-'],['Kecepatan',r=>nl(r)?.kecepatan??'-'],['Pemahaman SOP',r=>nl(r)?.pemahaman_sop??'-'],['Kedisiplinan',r=>nl(r)?.kedisiplinan??'-'],['Kerjasama Tim',r=>nl(r)?.kerjasama_tim??'-'],['Rata-rata',r=>{const v=avg(nl(r));return v==null?'-':`<b>${v.toFixed(1)}</b> (${pred(v)})`}],['Status',r=>nl(r)?badge(nl(r).status,NB[nl(r).status]):'-']],
  acts:r=>bt(nl(r)?'Edit Nilai':'Input Nilai',`frm('nilai',${nl(r)?.id||0},{siswa_id:${r.id}})`)+(nl(r)&&nl(r).status=='Draft'?bt('Kirim ke Sekolah',`kirimNilai(${nl(r).id})`,'primary'):''),
  hd:r=>`<b>${esc(by('siswa',r.siswa_id)?.nama)}</b>`,
  f:[['kualitas_kerja','Hard Skill - Kualitas Kerja (0-100)','n'],['kecepatan','Hard Skill - Kecepatan Kerja (0-100)','n'],['pemahaman_sop','Hard Skill - Pemahaman SOP (0-100)','n'],['kedisiplinan','Soft Skill - Kedisiplinan (0-100)','n'],['etika_kerja','Soft Skill - Etika Kerja (0-100)','n'],['kerjasama_tim','Soft Skill - Kerja Sama Tim (0-100)','n'],['tanggungjawab','Soft Skill - Tanggung Jawab & Inisiatif (0-100)','n'],['catatan','Catatan / Ulasan Kualitatif','a']],
  req:['kualitas_kerja','kecepatan','pemahaman_sop','kedisiplinan','etika_kerja','kerjasama_tim','tanggungjawab'],
  chk:o=>[...HARD,...SOFT.filter(k=>k!='inisiatif')].some(k=>o[k]<0||o[k]>100)?'Nilai harus 0-100.':'',
  def:()=>({status:'Draft'}),
  det:r=>{const s=by('siswa',r.siswa_id)||{};return[['Siswa',esc(s.nama)],['Kualitas Kerja',r.kualitas_kerja],['Kecepatan',r.kecepatan],['Pemahaman SOP',r.pemahaman_sop],['Kedisiplinan',r.kedisiplinan],['Etika Kerja',r.etika_kerja],['Kerjasama Tim',r.kerjasama_tim],['Tanggung Jawab & Inisiatif',r.tanggungjawab],['Catatan',esc(r.catatan)],['Status',badge(r.status,NB[r.status])]]}}
};
function kirimNilai(id){if(!confirm('Kirim nilai ini ke sekolah? Nilai akan difinalisasi.'))return;const n=by('nilai',id);n.status='Terkirim';save();render()}

const P={};
const BLD=[[0,34,70],[36,26,110],[64,40,85],[106,30,125],[138,36,95],[176,28,115],[206,44,80],[252,30,105],[284,40,90],[326,34,120]];
const SKR=[0,360,720];
const skyL=(f,k)=>SKR.map(dx=>BLD.map(b=>`<rect x="${b[0]+dx}" y="${170-b[2]*k}" width="${b[1]}" height="${b[2]*k+10}" rx="2" fill="${f}"/>`).join('')).join('');
const WIN=(()=>{const g=['','',''];SKR.forEach((dx,k)=>BLD.forEach((b,i)=>{for(let y=170-b[2]+12;y<160;y+=12)for(let x=b[0]+5;x<b[0]+b[1]-6;x+=9)if((x*7+y*3+i+k*2)%5<2)g[(x+y+k)%3]+=`<rect class="w" x="${x+dx}" y="${y}" width="4" height="5"/>`}));return g.map((t,i)=>`<g class="wg wg${i}">${t}</g>`).join('')})();
const SKY=`<g>${skyL('rgba(60,120,235,.38)',.8)}</g><g>${skyL('#06197a',1)}${WIN}</g>`;
P.dashboard=()=>{const a=alerts(),h=new Date().getHours(),
 sal=h<11?['Selamat Pagi','🌞']:h<15?['Selamat Siang','🌞']:h<18?['Selamat Sore','🌇']:['Selamat Malam','🌙'],
 isNight=h>=18,
 celestial=isNight?`<i class="moon"></i>${[1,2,3,4,5,6,7,8].map(n=>`<i class="star s${n}"></i>`).join('')}`:`<i class="rays"></i><i class="sun"></i>${[1,2,3,4,5,6,7].map(n=>`<i class="pt p${n}"></i>`).join('')}`,
 S=[['siswa','Siswa Bimbingan',db.siswa.length,'Terdaftar'],['jurnal','Jurnal Menunggu',db.jurnal.filter(j=>j.status=='Menunggu').length,'Perlu persetujuan'],['tugas','Tugas Berjalan',db.tugas.filter(t=>t.status!='Done').length,'To Do & In Progress'],['notifikasi','Total Notifikasi',a.length,'Perlu tindak lanjut']],
 tile=(i,t)=>`<div class="tile"><i>${ic(i)}</i><span>${t}</span></div>`;
 return `<section class="home"><div class="sky"></div>
 <svg class="skyline" viewBox="0 0 1080 170" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${SKY}</svg>
 ${celestial}
 <i class="cloud c1"></i><i class="cloud c2"></i>
 ${[1,2,3].map(n=>`<svg class="bird b${n}" viewBox="0 0 24 10" aria-hidden="true"><path d="M0 8Q6 0 12 6Q18 0 24 8"/></svg>`).join('')}
 ${[1,2,3,4,5,6].map(n=>`<i class="leaf l${n}"></i>`).join('')}
 <div class="hbadge"><img src="${$('#logoimg').src}" alt="Logo"><div><b>${esc(db.profil.perusahaan)}</b><small>${esc(db.profil.jabatan)}</small></div></div>
 <div class="htxt"><h2>Hi, ${esc(db.profil.nama)}</h2><p>${sal[0]} ${sal[1]}</p></div>
 <div class="hinfo">${a.length?`Ada ${a.length} notifikasi yang perlu ditindak lanjuti`:'Tidak ada notifikasi baru saat ini'}</div></section>
 <div class="tiles">${tile('absensi',db.absensi.filter(x=>x.tanggal==today()&&x.status=='Hadir').length+' hadir hari ini')}${tile('siswa','Siswa: '+db.siswa.length)}${tile('nilai',db.nilai.filter(n=>n.status=='Draft').length+' nilai draft')}${tile('profil',esc(db.profil.nama))}</div>
 <h3 class="sect">Ringkasan</h3>
 <div class="stats">${S.map(x=>`<div><i class="stat-ic">${ic(x[0])}</i><span>${x[1]}</span><b>${x[2]}</b><small>${x[3]}</small></div>`).join('')}</div>
 <div class="grid2"><div class="card"><h3>Daftar Notifikasi Terbaru</h3><p>Ringkasan yang perlu ditindak lanjuti</p>${a.slice(0,6).map(x=>`<div class="notice${x.c?' warn':''}"><i class="notice-ic">${ic('notifikasi')}</i><div><small>${esc(x.t)}</small></div></div>`).join('')||'<p>Tidak ada notifikasi.</p>'}</div>
 <div class="card"><h3>Ringkasan Cepat</h3><p>Data real-time dari sistem</p>${[['tugas',db.tugas.filter(t=>t.status=='Done').length+' tugas','Sudah selesai'],['jurnal',db.jurnal.filter(j=>j.status=='Menunggu').length+' jurnal','Menunggu persetujuan'],['absensi',db.absensi.filter(x=>x.tanggal==today()).length+' absensi','Tercatat hari ini'],['chat',new Set(db.pesan.map(p=>p.siswa_id)).size+' percakapan','Dari siswa']].map(x=>`<div class="notice"><i class="notice-ic">${ic(x[0])}</i><div><b>${x[1]}</b><small>${x[2]}</small></div></div>`).join('')}</div></div>`};
P.notifikasi=()=>{const a=alerts();return intro('SISTEM','Notifikasi','Jurnal, absensi, tugas, dan penilaian yang perlu ditindak lanjuti.')+`<div class="card">${a.map(x=>`<div class="notice${x.c?' warn':''}"><i class="notice-ic">${ic('notifikasi')}</i><div><small>${esc(x.t)}</small></div></div>`).join('')||'<p>Tidak ada notifikasi.</p>'}</div>`};
const lm=i=>db.pesan.filter(p=>p.siswa_id==i).slice(-1)[0];
P.chat=()=>{const ids=[...new Set(db.pesan.map(p=>p.siswa_id))].filter(i=>by('siswa',i)).sort((a,b)=>lm(b).id-lm(a).id),sid=ids.includes(st.chat)?st.chat:ids[0],s=by('siswa',sid);
 return intro('KOMUNIKASI','Chat','Percakapan dengan siswa bimbingan.')+`<div class="chatwrap"><div class="chatlist">${ids.map(i=>{const x=by('siswa',i),m=lm(i);return `<div class="chatitem${i==sid?' active':''}" onclick="st.chat=${i};render()">${av(x)}<div><b>${esc(x.nama)}</b><small>${m.dari=='pembimbing'?'Anda: ':''}${tr(m.teks,30)}</small></div>${m.dari=='siswa'?'<em class="dot"></em>':''}</div>`}).join('')||'<p style="padding:14px;color:var(--muted)">Belum ada pesan.</p>'}</div><div class="chatbox">${s?`<div class="chatbox-head"><b>${esc(s.nama)}</b><small>Siswa · ${esc(s.posisi)}</small></div><div class="chatmsgs" id="cm">${db.pesan.filter(p=>p.siswa_id==sid).map(p=>`<div class="msg ${p.dari=='pembimbing'?'out':'in'}">${esc(p.teks)}</div>`).join('')}</div><div class="chatinput"><input id="ci" placeholder="Tulis pesan..." onkeydown="if(event.key=='Enter')snd(${sid})">${bt('Kirim',`snd(${sid})`)}</div>`:''}</div></div>`};
function snd(sid){const v=$('#ci').value.trim();if(!v)return;db.pesan.push({id:nid('pesan'),siswa_id:sid,dari:'pembimbing',teks:v,waktu:today()});save();render()}
/* ===================== EDIT PROFIL (tampilan mengikuti aplikasi mobile, sama seperti panel Admin) ===================== */
let pft='profil';
const PFS=d=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const PFI={
 user:PFS('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'),
 brief:PFS('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),
 phone:PFS('<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>'),
 pen:PFS('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
 cam:PFS('<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>'),
 building:PFS('<path d="M3 21h18M5 21V9l7-5 7 5v12"/><path d="M9 21v-6h6v6"/>'),
 lock:PFS('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
 out:PFS('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>')
};
const pfIni=p=>{const w=(p.nama||'?').trim().split(' ');return(w.length>1?w[0][0]+w[1][0]:w[0].slice(0,2)).toUpperCase()};
function syncAcc(){const p=db.profil,a=$('.account .avatar'),b=$('.account b');if(b)b.textContent=p.nama||'Pembimbing Industri';if(a)a.innerHTML=p.foto?`<img src="${p.foto}" alt="">`:esc(pfIni(p))}
const pfRow=(id,lab,ico,val,ph,kind)=>`<div class="pfrow"><span class="pfl">${ico}<em>${lab}</em></span><input id="${id}" value="${esc(val)}" placeholder="${ph}" readonly${kind=='tel'?' inputmode="tel"':''}><button type="button" class="pfedit" onclick="pfEdit('${id}')" aria-label="Ubah ${lab}">${PFI.pen}</button></div>`;
const pfPw=(id,lab,ph,ac)=>`<div class="pfrow"><span class="pfl">${PFI.lock}<em>${lab}</em></span><input id="${id}" type="password" autocomplete="${ac}" placeholder="${ph}"></div>`;
function pfEdit(id){const i=$('#'+id);i.readOnly=false;i.focus()}
const pfMsg=(t,ok)=>{const e=$('#pf-m');if(e){e.textContent=t;e.className='pfmsg '+(ok?'pf-ok':'pf-er')}};
function pfView(){const p=db.profil,sandi=pft=='sandi';
 return `<div class="pf"><div class="pfhead"><div class="pfav">${p.foto?`<img src="${p.foto}" alt="Foto profil">`:`<span>${esc(pfIni(p))}</span>`}<label class="pfcam" title="Ganti foto" aria-label="Ganti foto profil">${PFI.cam}<input type="file" accept="image/*" onchange="pfFoto(this)"></label></div><b class="pfmail">${esc(p.email||'-')}</b><span class="pfschool">${PFI.building}${esc(p.perusahaan||'-')}</span></div>
 <div class="pfbody"><div class="pftabs"><button type="button" class="${sandi?'':'on'}" onclick="pft='profil';render()">Profil</button><button type="button" class="${sandi?'on':''}" onclick="pft='sandi';render()">Kata Sandi</button></div>
 ${sandi?`${pfPw('pf-o','Sandi Lama','Kata sandi saat ini','current-password')}${pfPw('pf-n','Sandi Baru','Minimal 6 karakter','new-password')}${pfPw('pf-r','Ulangi Sandi','Ulangi sandi baru','new-password')}<div id="pf-m" class="pfmsg" role="status"></div><button type="button" class="pfsave" onclick="pfSandi()">SIMPAN</button>`
 :`${pfRow('pf-d','Nama Lengkap',PFI.user,p.nama||'','Kosong')}${pfRow('pf-j','Jabatan',PFI.brief,p.jabatan||'','Kosong')}${pfRow('pf-h','No. HP/WhatsApp',PFI.phone,p.hp||'','Kosong','tel')}<div id="pf-m" class="pfmsg" role="status"></div><button type="button" class="pfsave" onclick="pfSimpan()">SIMPAN</button>`}
 <button type="button" class="pfout" onclick="out()">KELUAR ${PFI.out}</button></div></div>`}
function pfSimpan(){const p=db.profil,n=$('#pf-d').value.trim(),j=$('#pf-j').value.trim(),h=$('#pf-h').value.trim();
 if(!n)return pfMsg('Nama lengkap wajib diisi.');
 if(h&&(!/^[+0-9 \-]+$/.test(h)||h.replace(/\D/g,'').length<8||h.replace(/\D/g,'').length>15))return pfMsg('Nomor HP tidak valid (8–15 digit).');
 Object.assign(p,{nama:n,jabatan:j,hp:h});
 save();syncAcc();render();pfMsg('Profil berhasil disimpan.',1)}
/* Demo frontend: sandi disimpan apa adanya di browser. Di backend (Laravel) wajib Hash::make() dan cek sandi lama di server. */
function pfSandi(){const p=db.profil,o=$('#pf-o').value,n=$('#pf-n').value,r=$('#pf-r').value;
 if(!o||!n||!r)return pfMsg('Lengkapi semua kolom kata sandi.');
 if(p.pass&&o!==p.pass)return pfMsg('Kata sandi lama salah.');
 if(n.length<6)return pfMsg('Kata sandi baru minimal 6 karakter.');
 if(n!==r)return pfMsg('Ulangi kata sandi tidak sama.');
 if(n===o)return pfMsg('Kata sandi baru harus berbeda dari yang lama.');
 p.pass=n;save();render();pfMsg('Kata sandi berhasil diubah.',1)}
function pfFoto(inp){const f=inp.files[0];if(!f)return;if(!/^image\//.test(f.type))return pfMsg('File harus berupa gambar.');
 const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=320,c=document.createElement('canvas');c.width=c.height=s;const m=Math.min(im.width,im.height);c.getContext('2d').drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,s,s);db.profil.foto=c.toDataURL('image/jpeg',.82);save();syncAcc();render();pfMsg('Foto profil diperbarui.',1)};im.onerror=()=>pfMsg('Gambar tidak dapat dibaca.');im.src=r.result};r.readAsDataURL(f);inp.value=''}
P.profil=pfView;

function list(k){const c=M[k],s=st[k]??={q:'',p:1};
 const all=c.rows().filter(r=>!s.q||c.q(r).toLowerCase().includes(s.q.toLowerCase())),n=all.length,pgs=Math.max(1,Math.ceil(n/PS));s.p=Math.min(s.p,pgs);
 const o=(s.p-1)*PS,sl=all.slice(o,o+PS);
 let h=intro(c.tag,c.ti,c.sub,c.add?bt('＋ '+c.add,`frm('${k}',0)`):'')+(c.pre?c.pre():'');
 if(!c.ns)h+=`<div class="srow"><input class="search" id="q" value="${esc(s.q)}" placeholder="${c.ph}" onkeydown="if(event.key=='Enter')cari('${k}')">${bt('Cari',`cari('${k}')`,'primary')}${bt('Reset Cari',`rst('${k}')`)}</div>`;
 h+=`<div class="card"><div class="tablewrap"><table><tr><th>No</th>${c.cols.map(x=>`<th>${x[0]}</th>`).join('')}${c.acts?'<th>Aksi</th>':''}</tr>`+(sl.map((r,i)=>`<tr><td>${o+i+1}</td>${c.cols.map(x=>`<td>${x[1](r)}</td>`).join('')}${c.acts?`<td class="acts">${c.acts(r)}</td>`:''}</tr>`).join('')||`<tr><td colspan="${c.cols.length+2}" style="text-align:center;color:var(--muted)">Belum ada data</td></tr>`)+`</table></div><div class="pager"><small>${n?`${o+1}–${o+sl.length} dari ${n} data`:'0 data'}</small><span>${bt('‹',`pg('${k}',${s.p-1})`)}${Array.from({length:pgs},(_,i)=>bt(i+1,`pg('${k}',${i+1})`,i+1==s.p?'on':'')).join('')}${bt('›',`pg('${k}',${s.p+1})`)}</span></div></div>`;
 return h}
const st={chat:null};
const cari=k=>{st[k].q=$('#q').value;st[k].p=1;render()},rst=k=>{st[k].q='';st[k].p=1;render()},pg=(k,n)=>{st[k].p=Math.max(1,n);render()};

/* Modal, form, simpan, hapus */
const om=h=>{$('#mbox').innerHTML=`<button class="x" onclick="cm()">×</button>`+h;$('#modal').classList.add('show')},cm=()=>$('#modal').classList.remove('show');
function fld([n,l,t,o],v){let h;
 if(t=='s')h=`<select name="${n}">${o().map(([a,b])=>`<option value="${a}"${a==v?' selected':''}>${esc(b)}</option>`).join('')}</select>`;
 else if(t=='a')h=`<textarea name="${n}">${esc(v)}</textarea>`;
 else if(t=='f'||t=='i'||t=='k')h=`<input type="file" name="${n}"${t=='i'?' accept="image/*"':t=='k'?' accept="image/*" capture="user"':''}>`;
 else h=`<input name="${n}" type="${{n:'number',d:'date',t:'text',c:'time'}[t]}" value="${esc(v)}">`;
 return `<label>${l}${h}</label>`}
let cur={};
function frm(k,id,base){const c=M[k],r=id?by(c.t,id):{...(c.def?c.def():{}),...base};cur={k,id,base};
 om(`<span>${c.tag}</span><h2>${id?'Edit':'Tambah / Input'} ${c.fn}</h2>${c.hd?`<small>${c.hd(r.siswa_id?r:base)}</small>`:''}<form id="fm" onsubmit="return false">${c.f.map(f=>fld(f,r[f[0]])).join('')}</form><div class="actions">${bt('Batal','cm()')}${bt('Simpan','sv()','primary')}</div>`)}
const rd=(f,img)=>new Promise(res=>{const r=new FileReader();r.onload=()=>{if(!img)return res(r.result);const i=new Image();i.onload=()=>{const s=Math.min(1,480/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*s;c.height=i.height*s;c.getContext('2d').drawImage(i,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.7))};i.src=r.result};r.readAsDataURL(f)});
async function sv(){const{k,id,base}=cur,c=M[k],fd=new FormData($('#fm')),o=id?{...by(c.t,id)}:{...base};
 for(const[n,,t]of c.f){if(t=='f'||t=='i'||t=='k'){const f=fd.get(n);if(f&&f.size){if(t=='f'&&f.size>1.5e6)return alert('File terlalu besar (maks. 1,5 MB).');o[n]=await rd(f,t!='f');o[n+'_nama']=f.name}}
  else if(t=='n')o[n]=fd.get(n)===''?'':+fd.get(n);
  else o[n]=n.endsWith('_id')?(fd.get(n)?+fd.get(n):null):fd.get(n)}
 if((c.req||[]).some(n=>!String(o[n]??'').trim()))return alert('Lengkapi data yang wajib diisi.');
 const m=c.chk?.(o,id);if(m)return alert(m);
 if(id)Object.assign(by(c.t,id),o);else db[c.t].push({...o,id:nid(c.t)});
 save();cm();render()}
function del(k,id){const c=M[k];if(!confirm('Hapus data ini?'))return;db[c.t]=db[c.t].filter(x=>x.id!=id);save();render()}
const det=(k,id)=>{const c=M[k];om(`<span>DETAIL</span><h2>${c.ti}</h2>${dl(c.det(by(c.t||'siswa',id)))}<div class="actions">${bt('Tutup','cm()')}</div>`)};
function vw(t,id,f){fetch(by(t,id)[f]).then(r=>r.blob()).then(b=>window.open(URL.createObjectURL(b),'_blank'))}
function vj(id,s){const j=by('jurnal',id);j.status=s;j.catatan=prompt('Catatan pembimbing (opsional):','')||'';save();render()}

/* Routing (hash) */
const R={dashboard:'Dashboard Pembimbing',notifikasi:'Notifikasi',siswa:'Siswa Bimbingan',jurnal:'Jurnal Harian',absensi:'Absensi & Kehadiran',tugas:'Tugas (Task Manager)',nilai:'Penilaian & Evaluasi',chat:'Chat',profil:'Profil & Pengaturan'};
let cp='dashboard';
function route(){const h=location.hash.replace(/^#\/?(pembimbing\/?)?/,'');cp=R[h]?h:'dashboard';render()}
function render(){$('#title').textContent=R[cp];$('#view').innerHTML=(P[cp]||(()=>list(cp)))();$$('nav a,#bottom a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cp));document.body.classList.toggle('ishome',cp=='dashboard');const m=$('#cm');if(m)m.scrollTop=m.scrollHeight}
function closeMenu(){$('#sidebar').classList.remove('open');$('#backdrop').classList.remove('show');document.body.classList.remove('menuopen')}
function toggleMenu(){const o=$('#sidebar').classList.toggle('open');$('#backdrop').classList.toggle('show',o);document.body.classList.toggle('menuopen',o)}
const out=()=>{if(confirm('Keluar dari panel pembimbing industri?')){$('#view').innerHTML='<div class="card"><h3>Anda telah keluar</h3><p>Muat ulang halaman untuk masuk kembali. (Login belum tersedia pada versi frontend ini.)</p></div>'}};
$('#modal').addEventListener('click',e=>{if(e.target.id=='modal')cm()});
$$('nav a').forEach(a=>a.addEventListener('click',()=>{closeMenu();scrollTo(0,0)}));
$('#bottom').innerHTML=[['dashboard','Beranda'],['chat','Chat'],['notifikasi','Notifikasi']].map(x=>`<a href="#${x[0]}">${ic(x[0])}<span>${x[1]}</span></a>`).join('')+`<a href="#" onclick="toggleMenu();return false">${$('.menu svg').outerHTML}<span>Menu</span></a>`;
addEventListener('hashchange',route);route();syncAcc();

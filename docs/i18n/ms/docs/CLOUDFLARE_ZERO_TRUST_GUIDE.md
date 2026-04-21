# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Panduan ini mendokumenkan standard emas infrastruktur rangkaian untuk melindungi**OmniRoute**dan mendedahkan aplikasi anda ke Internet dengan selamat,**tanpa membuka sebarang port (Sifar Masuk)**.## What was done on your VM?

Kami mendayakan OmniRoute dalam mod**Split-Port**melalui PM2:

-**Port `20128`:**Berjalan**hanya API**`/v1`. -**Port `20129`:**Berjalan**hanya Papan Pemuka Pentadbiran**.

Selain itu, perkhidmatan dalaman memerlukan `REQUIRE_API_KEY=true`, yang bermaksud tiada ejen boleh menggunakan titik akhir API tanpa menghantar "Token Pembawa" yang sah yang dijana dalam tab Kunci API Papan Pemuka.

Ini membolehkan kami membuat dua peraturan rangkaian bebas sepenuhnya. Di sinilah**Cloudflare Tunnel (cloudflared)**masuk.---

## 1. How to Create the Tunnel in Cloudflare

Utiliti `cloudflared` sudah dipasang pada mesin anda. Ikuti langkah ini dalam awan:

1. Akses papan pemuka**Cloudflare Zero Trust**anda (one.dash.cloudflare.com).
2. Dalam menu sebelah kiri, pergi ke**Rangkaian > Terowong**.
3. Klik pada**Tambah Terowong**, pilih**Cloudflared**dan namakannya `OmniRoute-VM`.
4. Ia akan menjana arahan pada skrin yang dipanggil "Pasang dan jalankan penyambung".**Anda hanya perlu menyalin Token (rentetan panjang selepas `--token`)**.
5. Log masuk melalui SSH ke mesin maya anda (atau Terminal Proxmox) dan laksanakan: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Masih pada skrin Terowong yang baru dibuat, pergi ke tab**Nama Hos Awam**dan tambahkan**dua**laluan, mengambil kesempatan daripada pemisahan yang kami buat:### Route 1: Secure API (Limited)

-**Subdomain:**`api` -**Domain:**`yourglobal.com` (pilih domain sebenar anda) -**Jenis Perkhidmatan:**`HTTP` -**URL:**`127.0.0.1:20128` _(Port API Dalaman)_### Route 2: Zero Trust Dashboard (Closed)

-**Subdomain:**`laluan omni` atau `panel` -**Domain:**`yourglobal.com` -**Jenis Perkhidmatan:**`HTTP` -**URL:**`127.0.0.1:20129` _(Port Dalaman/Visual)_

Pada ketika ini, sambungan "Fizikal" diselesaikan. Sekarang mari kita benar-benar melindunginya.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Tiada kata laluan tempatan melindungi papan pemuka anda lebih baik daripada mengalih keluar sepenuhnya akses kepadanya daripada internet terbuka.

1. Dalam papan pemuka Zero Trust, pergi ke**Akses > Aplikasi > Tambah aplikasi**.
2. Pilih**Dihoskan sendiri**.
3. Dalam**Nama aplikasi**, masukkan `Panel OmniRoute`.
4. Dalam**Domain aplikasi**, masukkan `omniroute.yourglobal.com` (Yang sama yang anda gunakan dalam "Laluan 2").
5. Klik**Seterusnya**.
6. Dalam**Tindakan peraturan**, pilih `Benarkan`. Untuk nama Peraturan, masukkan `Pentadbir Sahaja`.
7. Dalam**Sertakan**, di bawah menu lungsur "Pemilih", pilih `E-mel` dan taipkan e-mel anda, contohnya `admin@spgeo.com.br`.
8. Simpan (`Tambah aplikasi`).

> **Apa yang dilakukan oleh ini:**Jika anda cuba membuka `omniroute.yourglobal.com`, ia tidak lagi sampai pada aplikasi OmniRoute anda! Ia mendarat pada skrin Cloudflare yang elegan meminta anda memasukkan e-mel anda. Hanya jika anda (atau e-mel yang anda masukkan) ditaip di sana, anda akan menerima kod 6 digit sementara dalam Outlook/Gmail yang membuka kunci terowong ke port `20129`.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Papan Pemuka Zero Trust tidak digunakan pada laluan API (`api.yourglobal.com`), kerana ia adalah akses terprogram melalui alat automatik (ejen) tanpa penyemak imbas. Untuk ini, kami akan menggunakan Firewall utama Cloudflare (WAF).

1. Akses**Papan Pemuka Cloudflare Biasa**(dash.cloudflare.com) dan pergi ke Domain anda.
2. Dalam menu sebelah kiri, pergi ke**Keselamatan > WAF > Peraturan mengehadkan kadar**.
3. Klik pada**Buat peraturan**. 4.**Nama:**`Anti-Penyalahgunaan API OmniRoute` 5.**Jika permintaan masuk sepadan...**
   - Pilih Medan: `Nama hos`
   - Operator: `sama dengan`
   - Nilai: `api.yourglobal.com`
4. Di bawah**Dengan ciri yang sama:**Simpan `IP`.
5. Untuk had (Had): -**Apabila permintaan melebihi:**`50` -**Tempoh:**`1 minit`
6. Pada penghujungnya, di bawah**Tindakan**: `Sekat` dan tentukan sama ada sekatan itu berlangsung selama 1 minit atau 1 jam. 9.**Kerahkan**.

> **Apa yang dilakukan oleh ini:**Tiada sesiapa boleh menghantar lebih daripada 50 permintaan dalam tempoh 60 saat ke URL API anda. Memandangkan anda menjalankan berbilang ejen dan penggunaan di belakangnya sudah mencapai had kadar dan menjejaki token, ini hanyalah ukuran di Lapisan Tepi Internet yang melindungi Contoh Di Premis anda daripada turun disebabkan tekanan haba sebelum trafik menuruni terowong.---

## Finalization

1. VM anda**tiada port terdedah**dalam `/etc/ufw`.
2. OmniRoute hanya bercakap HTTPS keluar (`cloudflared`) dan tidak menerima TCP langsung daripada dunia.
3. Permintaan anda kepada OpenAI dikaburkan kerana kami secara global mengkonfigurasinya untuk melalui Proksi SOCKS5 (Awan tidak mengambil berat tentang SOCKS5 kerana ia datang Masuk).
4. Papan pemuka web anda mempunyai pengesahan 2-Faktor dengan E-mel.
5. API anda dihadkan kadar di bahagian tepi oleh Cloudflare dan hanya memperdagangkan Token Pembawa.

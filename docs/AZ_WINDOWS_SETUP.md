# OmniRoute Windows Setup

Bu təlimat Windows istifadəçiləri üçündür. Məqsəd: istifadəçi çox texniki bilik olmadan OmniRoute-u qura bilsin.

## Ən rahat yol: Docker ilə

PowerShell açın və bu 2 sətri yazın:

```powershell
irm https://raw.githubusercontent.com/VusalAbdurahmanovX/OmniRoute/main/scripts/setup-windows.ps1 -OutFile setup-windows.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-windows.ps1 -InstallDocker
```

Bu script bunları edir:

- Docker Desktop yoxdursa `winget` ilə quraşdırmağa çalışır
- Docker Desktop-u başladır
- OmniRoute Docker image-i yükləyir
- OmniRoute container-i başladır
- onboarding səhifəsini avtomatik keçir
- password istəmir

Setup bitəndən sonra bunu açın:

```text
http://localhost:20128
```

API base URL:

```text
http://localhost:20128/v1
```

## Docker istəməyənlər üçün

Bəzi istifadəçilər Docker Desktop quraşdırmaq istəmir. Bu halda OmniRoute-u Node.js ilə işlətmək olar.

PowerShell açın və bunu yazın:

```powershell
irm https://raw.githubusercontent.com/VusalAbdurahmanovX/OmniRoute/main/scripts/setup-windows-node.ps1 -OutFile setup-windows-node.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-windows-node.ps1 -InstallNode
```

Bu script bunları edir:

- Docker quraşdırmır
- Node.js və npm yoxdursa `winget` ilə quraşdırmağa çalışır
- Git yoxdursa `winget` ilə quraşdırmağa çalışır
- OmniRoute source code-u `C:\Users\<user>\OmniRoute-node` qovluğuna clone edir
- `npm install` edir
- OmniRoute-u background-da başladır
- onboarding-i avtomatik keçir
- password istəmir

Node.js və ya Git yeni quraşdırılıbsa, PowerShell onları hələ görməyə bilər. Belə olsa PowerShell-i bağlayın, yenidən açın və eyni komandanı təkrar işlədin.

Loglara baxmaq:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-windows-node.ps1 -Logs
```

Stop etmək:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-windows-node.ps1 -Stop
```

## Əgər Docker yeni quraşdırıldısa

Docker Desktop ilk dəfə açılanda Windows restart və ya WSL setup istəyə bilər. Əgər istəsə:

1. Docker Desktop-un dediyini edin.
2. Kompüteri restart etmək lazımdırsa restart edin.
3. PowerShell-i yenidən açın.
4. Eyni komandanı yenidən işlədin:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-windows.ps1 -InstallDocker
```

## GitHub-dan clone ilə setup

Əgər source code-u da yükləmək istəyirsinizsə:

```powershell
cd $env:USERPROFILE
git clone https://github.com/VusalAbdurahmanovX/OmniRoute.git
cd OmniRoute
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup-windows.ps1 -InstallDocker
```

Diqqət: bunu yazmaq düzgün deyil:

```powershell
git clone https://github.com/VusalAbdurahmanovX
```

Düzgün clone linki budur:

```powershell
git clone https://github.com/VusalAbdurahmanovX/OmniRoute.git
```

## Password haqqında

Default setup password istəmir. Onboarding də avtomatik keçilir.

Əgər dashboard üçün password istəyirsinizsə:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-windows.ps1 -RequirePassword
```

Source clone içindən:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup-windows.ps1 -RequirePassword
```

Public link paylaşmazdan əvvəl dashboard-da güclü password qoymaq məsləhətdir:

```text
Dashboard -> Settings -> Security
```

## Faydalı komandalar

Container işləyirsə status:

```powershell
docker ps
```

Loglara baxmaq:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-windows.ps1 -Logs
```

Source clone içindən:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup-windows.ps1 -Logs
```

Stop etmək:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-windows.ps1 -Stop
```

Başqa portda işlətmək:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-windows.ps1 -Port 3000
```

Sonra açın:

```text
http://localhost:3000
```

## Video üçün qısa ssenari

1. PowerShell açın.
2. Setup komandasını yazın.
3. Docker Desktop quraşdırılması istənilsə təsdiqləyin.
4. Docker ilk dəfə restart istəsə restart edin.
5. Eyni setup komandasını yenidən işlədin.
6. Brauzerdə `http://localhost:20128` açın.
7. Providers səhifəsindən provider əlavə edin.
8. Endpoints səhifəsindən API key yaradın.
9. AI tool-larda base URL olaraq `http://localhost:20128/v1` istifadə edin.

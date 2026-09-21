# ADR: Pluggable persistence boundary (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **상태:** 제안됨 — 런타임 작업을 시작하기 전에 메인테이너 승인이 필요함
- **추적 이슈:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **범위:** 영속성 아키텍처만 해당하며, 이 결정은 외부 데이터베이스를 추가하거나 선택하지 않음

## 배경

현재 OmniRoute는 `src/lib/db/`에서 도메인 중심의 영속성 함수를 제공하며,
`src/lib/db/core.ts`에서 반환되는 공유 연결은 `src/lib/db/adapters/types.ts`의 동기식 `SqliteAdapter`
계약을 구현합니다. 이 어댑터는 여러 SQLite 런타임을 지원하지만, 해당 인터페이스는 여전히 SQLite에
특화되어 있습니다. 여기에는 동기식 준비된 문, `pragma`, 지연 및 즉시 트랜잭션, 네이티브/파일 복사
백업, 체크포인트, 로컬 데이터베이스 핸들이 포함됩니다.

현재 시작 및 복구 경로도 SQLite 파일 수명 주기를 관리합니다. `src/lib/db/core.ts`는
`storage.sqlite`를 확인하고, 프로세스 전역 어댑터 하나를 유지하며, WAL 체크포인트를 수행하고, 복구 중
선택된 테이블을 보존하며, 데이터베이스를 재구축할 때 SQLite 보조 파일을 제거합니다.
`src/lib/db/adapters/driverFactory.ts`의 드라이버 선택은 지원되는 SQLite 런타임 중 하나를 선택하는
것이며, 외부 백엔드 추상화가 아닙니다.

스키마 진화도 이와 유사하게 결합되어 있습니다. `src/lib/db/migrationRunner.ts`는 번호가 지정된 SQL
파일을 적용하고, `sqlite_master` 및 `PRAGMA table_info`를 조사하며, 선택적 FTS5 지원을 감지하고,
SQLite 트랜잭션에서 마이그레이션 작업을 실행합니다. `src/lib/db/backup.ts` 및
`src/lib/db/optimizationSettings.ts`와 같은 운영 모듈은 백업, `PRAGMA`, WAL, 페이지 크기,
자동 vacuum 및 `VACUUM` 의미 체계를 직접 사용합니다.

이러한 특성은 임베디드 SQLite 배포에서 유효합니다. PostgreSQL 또는 MySQL이 SQLite API를
모방하도록 강제하지 않으면서도 이러한 특성을 계속 사용할 수 있어야 합니다.

## 결정

이식 가능한 영구 상태를 위해 2단계 영속성 경계를 채택합니다.

1. **도메인 저장소 계약**은 비즈니스 및 라우팅 코드에 필요한 영속성 작업을 정의합니다. 호출자는 SQL
   텍스트, 준비된 문, 데이터베이스 파일 또는 방언 객체가 아니라 도메인 동작과 도메인 데이터에
   의존합니다.
2. **내부 비동기 백엔드 계약**은 트랜잭션 컨텍스트, 상태/준비 여부, 마이그레이션 조정, 백엔드 기능 및
   분류된 오류를 통해 저장소 구현을 지원합니다. 정확한 TypeScript 인터페이스는 첫 번째 구현 PR에서
   제안되고 적합성 테스트를 통해 검증될 예정이며, 이 ADR에서는 추측에 기반한 API를 의도적으로
   확정하지 않습니다.

SQLite는 기본 구현으로 유지됩니다. 도메인이 작은 수직 단위로 마이그레이션되는 동안 기존 SQLite
드라이버 캐스케이드와 동기식 `SqliteAdapter`는 SQLite 저장소 구현 뒤에 유지됩니다. 어떤 사용자도
외부 서비스를 구성할 필요가 없습니다.

PostgreSQL은 SQLite에 대해 저장소 경계가 검증된 후 제안되는 첫 번째 외부 구현입니다. MySQL은 두
번째 비즈니스 로직 포크가 아니라 동일한 적합성 테스트 모음에 대한 동등한 구현으로 후속 제공됩니다.

## 경계 규칙

### 이식 가능한 저장소 인터페이스

이식 가능한 저장소는 다음을 노출할 수 있습니다.

- 도메인 읽기 및 쓰기;
- 명시적 원자적 작업 및 트랜잭션 범위의 저장소 접근;
- 동시성 의미 체계가 도메인의 일부인 경우 비교/업데이트 또는 임대 작업;
- 백엔드 중립적인 페이지네이션, 정렬 및 제약 조건 오류.

백엔드 상태, 준비 여부 및 마이그레이션 조정은 개별 도메인 저장소가 아니라 내부 백엔드/운영 계약에
속합니다.

이식 가능한 저장소는 다음을 노출해서는 안 됩니다.

- `prepare`, `get`, `all`, `run` 또는 원시 드라이버 핸들;
- `PRAGMA`, WAL 체크포인트 모드, `VACUUM` 또는 페이지/캐시 튜닝;
- SQLite 파일 경로, 보조 파일 또는 파일 복사 백업;
- 교차 백엔드 도메인 계약으로서의 `lastInsertRowid`;
- FTS5 또는 `sqlite-vec` 구문;
- 일반 비즈니스 코드에서 사용하는 범용 방언 우회 수단.

### 백엔드 기능 인터페이스

백엔드별 동작은 명시적이고 검색 가능한 상태로 유지됩니다. 다음을 포함한 SQLite 전용 유지 관리는
고유한 구현 및 운영 인터페이스 뒤에 유지됩니다.

- 런타임 드라이버 선택;
- WAL 체크포인트 및 SQLite 종료 동작;
- 페이지 크기, 캐시 크기 및 자동 vacuum 설정;
- 데이터베이스 파일 백업, 복원 및 복구;
- SQLite 스키마 검사;
- FTS5 및 `sqlite-vec` 통합.

외부 백엔드는 이러한 기능을 모방할 필요가 없습니다. 저장소는 이식 가능한 기능을 사용하거나, 문서화된
동작을 갖춘 백엔드별 구현을 제공하거나, 해당 기능을 사용할 수 없음을 보고해야 합니다.

## 트랜잭션 및 마이그레이션 모델

리포지토리 API는 원자적 비즈니스 작업을 정의하며, 호출자는 SQL 트랜잭션 모드를 선택하지 않습니다.
각 작업은 보호되는 불변 조건, 충돌 감지, 재시도 분류, 멱등성 기대 사항 및 트랜잭션 컨텍스트 전파를 포함하여 외부에서 관찰 가능한 동시성 보장을 정의해야 합니다.
구현은 외부에서 관찰 가능한 보장이 동등하게 유지되는 경우에만 서로 다른 트랜잭션 및 격리 메커니즘을 사용할 수 있습니다. SQLite는 작업의 계약을 충족하는 경우 내부적으로 현재의 지연 또는 즉시 트랜잭션 동작을 계속 사용할 수 있습니다.

외부 백엔드에는 여러 애플리케이션 복제본이 동일한 스키마 변경을 두고 경합하지 않도록 명시적인 마이그레이션 소유권이 필요합니다. 백엔드 마이그레이션 이력은 논리적 마일스톤을 공유할 수 있지만, SQLite SQL 파일을 다른 방언으로 이식하거나 재사용할 수 있다고 가정해서는 안 됩니다.

## 백엔드 간 적합성 의미 체계

적합성 테스트는 리포지토리 메서드 시그니처뿐만 아니라 동작도 다뤄야 합니다. 마이그레이션된 각 도메인은 다음 사항을 정의하고 검증해야 합니다.

- 타임스탬프의 시간대, 정밀도 및 직렬화;
- `NULL` 정렬 순서, 콜레이션 및 대소문자 구분에 대한 기대 사항;
- JSON 표현 및 비교 동작;
- 정수, 십진수 및 금액의 정밀도;
- 페이지네이션을 위한 안정적인 정렬 및 결정론적 동률 해소 기준;
- SQLite 행 ID에 의존하지 않는 ID 생성;
- 고유성 및 외래 키 위반 분류;
- 무변경, 비교/업데이트 및 삭제 작업에서 영향받은 행의 동작;
- 동시 쓰기 결과, 재시도 가능한 충돌 및 멱등적 재시도.

도메인이 동등한 외부 관찰 가능 의미 체계를 명시할 수 없다면 아직 이식 가능한 상태가 아니며, 해당 계약이 설계될 때까지 백엔드별로 유지해야 합니다.

## 호환성 요구 사항

이 ADR을 따르는 모든 구현은 다음 속성을 유지해야 합니다.

- SQLite는 구성이 필요 없는 기본값으로 유지됩니다.
- 기존 SQLite 파일과 마이그레이션 이력은 계속 읽을 수 있어야 합니다.
- npm, Electron, Docker 및 제한된 런타임의 SQLite 폴백은 현재 시작 경로를 유지합니다.
- 저장된 공급자 자격 증명에는 기존 애플리케이션 암호화 동작이 계속 적용됩니다.
- 리포지토리 마이그레이션으로 인해 라우팅, 할당량, API 키 또는 감사 의미 체계가 암묵적으로 변경되어서는 안 됩니다.
- 백업 및 복구 동작은 보편적인 것으로 제시하지 않고 백엔드별로 문서화합니다.
- 외부 데이터베이스 드라이버는 SQLite 전용 신규 설치 환경에서 로드되거나 요구되지 않습니다.

## 제공 순서

1. 재현 가능한 SQLite 결합도 인벤토리를 별도의 검토 산출물로 게시합니다.
2. 첫 번째 도메인 리포지토리 계약과 적합성 테스트를 도입합니다.
3. 기본값을 변경하지 않고 기존 SQLite 구현을 해당 계약 뒤에 맞게 조정합니다.
4. 유지관리자의 승인을 전제로, 범위가 한정된 하나의 컨트롤 플레인 영역에 대해 PostgreSQL을 첫 번째 외부 구현으로 추가합니다.
5. 동시 쓰기 및 마이그레이션 소유권 테스트가 마련된 후에만 공유 상태를 확장합니다.
6. 데이터베이스 전환을 홍보하기 전에 검증된 오프라인 SQLite-외부 마이그레이션 경로를 추가합니다.
7. 검증된 리포지토리 및 백엔드 계약을 기반으로 MySQL을 추가합니다.

각 런타임 단계는 별도로 검토할 수 있는 독립적인 PR이어야 합니다. 이후 단계를 근거로 이전 단계의 검증되지 않은 추상화를 병합해서는 안 됩니다.

## 첫 번째 구현 슬라이스

첫 번째 런타임 슬라이스는 결합도 인벤토리를 검토한 후 선택해야 합니다. Provider
연결, API 키, 콤보 및 라우팅 구성은 기본 테이블이
`src/lib/db/core.ts`에 표시되어 있으므로 후보가 될 수 있지만, 이 ADR은 테이블 목록이나 마이그레이션 PR을 승인하지 않습니다.
이 슬라이스에는 다음이 포함되어야 합니다.

- SQLite 동작 보존 테스트;
- 리포지토리 적합성 테스트;
- 명시적인 트랜잭션 경계;
- 저장된 자격 증명에 대한 암호화 및 마스킹 검증;
- 기본 시작 구성 변경 없음.

## 검토한 대안

### `SqliteAdapter` 아래에 PostgreSQL 추가

기각되었습니다. `SqliteAdapter`는 SQLite 런타임을 위한 호환성 계층이며 SQLite 전용
작업을 노출합니다. 이 인터페이스를 에뮬레이션하면 동기식 및 방언별 가정이
새로운 백엔드로 누출됩니다.

### 모든 도메인에 일반적인 쿼리/실행 API 노출

주요 경계로는 기각되었습니다. 연결 처리를 중앙화할 수는 있지만 SQL 방언,
트랜잭션 및 테이블 결합이 비즈니스 모듈에 남게 됩니다. 저수준 백엔드 프리미티브는
애플리케이션 대상 영속성 API가 아니라 리포지토리 구현 내부에 존재할 수 있습니다.

### 하나의 슬라이스를 검증하기 전에 모든 영속성 재작성

기각되었습니다. 현재 영속성 인터페이스는 광범위하며 파일 수명 주기, 복구, 검색
및 운영 설정을 포함합니다. 수직 슬라이스는 검토 가능한 동작과 롤백 경계를 제공합니다.

### SQLite를 기본값에서 제외

기각되었습니다. 임베디드 및 데스크톱 배포는 현재의 별도 서비스가 필요 없는 시작 모델에 의존합니다.
외부 백엔드는 선택 사항입니다.

### Redis를 영속적 기준 저장소로 사용

기각되었습니다. Redis는 명시적으로 일시적인 조정, 캐시 또는 카운터를 지원할 수 있지만, 여기에서
설명하는 영속적 리포지토리 계약을 대체하지는 않습니다.

## 결과

### 긍정적 결과

- 비즈니스 코드는 데이터베이스 방언과 독립적인 안정적인 영속성 경계를 확보합니다.
- 외부 백엔드가 추상화를 정의하기 전에 SQLite 동작을 테스트합니다.
- PostgreSQL과 MySQL은 도메인 로직을 중복하는 대신 계약과 테스트를 공유합니다.
- SQLite 전용 기능은 누수되는 호환성 심이 되지 않고 일급 기능으로 유지됩니다.
- 다중 레플리카 마이그레이션 및 트랜잭션 동작이 명시적인 설계 고려 사항이 됩니다.

### 비용 및 위험

- 리포지토리 추출에는 호출 지점의 점진적인 마이그레이션이 필요합니다.
- 비동기 경계가 현재 동기식인 서비스 코드 전반으로 전파될 수 있습니다.
- 백엔드 간 의미 체계에는 SQL 구문 호환성을 넘어서는 적합성 테스트가 필요합니다.
- 백업, 검색, 벡터 저장소 및 유지보수는 기능별로 유지됩니다.
- 둘 이상의 영속성 구현을 운영하면 CI 및 운영 지원 비용이 증가합니다.

## 비목표

이 ADR은 다음을 수행하지 않습니다.

- 데이터베이스 종속성, 환경 변수, 스키마 또는 마이그레이션 추가;
- 라이브 SQLite 싱글턴 또는 드라이버 캐스케이드 변경;
- 특정 릴리스에서 PostgreSQL 또는 MySQL 지원 보장;
- FTS5, `sqlite-vec`, 백업 파일 또는 SQLite 유지보수의 이식성 제공;
- 공유 상태 및 조정 테스트가 존재하기 전에 액티브-액티브 준비 상태 정의;
- `src/lib/db/`의 일괄 재작성 승인.

## 유지 관리자 승인이 필요한 미해결 질문

1. 저장소와 내부 비동기 백엔드 경계를 함께 두는 것이 선호되는 방향인가요, 아니면
   외부 영속성을 별도의 컨트롤 플레인 서비스 뒤에 두어야 하나요?
2. SQLite 호환성 검증 이후 첫 번째 외부 구현으로 PostgreSQL을 사용하는 것이 허용되나요?
3. 어떤 도메인을 첫 번째 경계형 저장소 슬라이스로 지정해야 하나요?
4. 첫 번째 다중 복제본 마일스톤에서 어떤 상태를 공유해야 하며, 어떤 상태를 노드 로컬로 유지해야 하나요?
5. 중단되거나 롤백된 저장소 마이그레이션에 어느 정도의 호환 기간이 필요한가요?

이 질문들이 해결될 때까지 이 문서는 제안서이며, 런타임 리팩터링을 전제로 하지 않습니다.

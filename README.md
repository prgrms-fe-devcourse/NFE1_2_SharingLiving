# NFE1_2_SharingLiving

# 프로젝트 브랜치 관리

## 주요 브랜치

- **main**: 배포 가능한 안정적인 버전.
- **develop**: 모든 기능이 통합되는 개발 버전.

## 기능별 브랜치

각 기능은 `feature/*` 브랜치에서 작업한 후, 완료되면 `develop`에 병합합니다.

1. **회원가입 / 로그아웃**:

   - `feature/authentication`
   - 회원가입과 로그아웃 기능을 통합하여 작업.
   - 하위 브랜치: `feature/authentication-signup`, `feature/authentication-login`, `feature/authentication-logout`

2. **게시글 목록**:

   - `feature/post-list`
   - 게시글 목록 기능 담당.

3. **마이페이지**:

   - `feature/my-page`
   - 사용자 개인 정보 관리 기능.

4. **상세페이지**:

   - `feature/detail-page`
   - 게시글의 상세 내용을 보여주는 페이지 작업.

5. **등록페이지**:

   - `feature/create-post`
   - 게시글 작성 기능 담당.

6. **알림 기능**:

   - `feature/notification`
   - 알림 시스템 구현을 위한 브랜치.

7. **전체 기능**:
   - `feature/full-functionality`
   - 모든 기능이 정상적으로 동작하는지 통합 테스트 및 마무리 작업을 위해 사용하는 브랜치.

## 브랜치 생성 및 관리 예시

1. **기능 개발 시작**:

   - `develop`에서 새로운 feature 브랜치를 만듭니다.

   ```bash
   git checkout -b feature/authentication
   ```

## 하위 기능 브랜치 작업

- 각 기능을 개발할 때 feature/authentication, feature/post-list 등과 같은 개별 브랜치에서 작업합니다.

  ### 하위의 하위 브랜치 작업 예시

  - 하위의 하위 기능을 개발할 때는 feature/authentication-signup과 같이 하이픈(-)을 사용하여 브랜치를 구분합니다.

    1. 하위의 하위 브랜치 생성:

       - feature/authentication에서 하위의 하위 브랜치를 만듭니다.

       ```bash
       git checkout -b feature/authentication-signup
       ```

    2. 하위의 하위 브랜치에서 작업:

       - 기능 구현을 완료한 후, 하위 브랜치로 병합합니다.

       ```bash
       git checkout feature/authentication
       git merge feature/authentication-signup
       ```

    3. 하위 브랜치를 feature/full-functionality에 병합:
       - 이제 하위 브랜치를 feature/full-functionality에 병합합니다.
       ```bash
       git checkout feature/full-functionality
       git merge feature/authentication
       ```

## 하위 기능 브랜치 병합

- 각 하위 기능이 완료되면 feature/full-functionality 브랜치로 병합하여 모든 기능이 잘 동작하는지 확인합니다.

```bash
git checkout feature/full-functionality
git merge feature/authentication
git merge feature/post-list
# 필요한 모든 기능 브랜치를 병합합니다.
```

## 최종 테스트 및 통합

- feature/full-functionality에서 모든 기능을 테스트하여 문제가 없다면 develop 브랜치로 병합합니다.

```bash
git checkout develop
git merge feature/full-functionality
```

## 원격 저장소에 푸시

- 마지막으로 develop 브랜치를 원격 저장소에 푸시합니다.

```bash
git push origin develop
```

## 요약

- feature/full-functionality 브랜치는 여러 하위 기능의 통합과 테스트를 위한 브랜치입니다.
- 모든 하위 기능 작업이 완료되면 feature/full-functionality에 머지하고, 최종적으로 develop으로 병합하여 배포 준비를 할 수 있습니다.

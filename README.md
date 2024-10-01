# NFE1_2_SharingLiving

# API 명세서

## 10. 마이페이지

### 10.1 대시보드

#### 10.1.1 내 정보

- **GET** `/user/me`
  - **설명:** 로그인한 사용자의 기본 정보 조회
  - **응답 예시:**
    ```json
    {
      "nickname": "사용자닉네임",
      "email": "사용자이메일@example.com",
      "profileImage": "https://example.com/profile.jpg"
    }
    ```

#### 10.1.2 내 나무 스탬프

- **GET** `/user/me/stamps`
  - **설명:** 사용자의 나무 스탬프 목록 조회
  - **응답 예시:**
    ```json
    {
      "stamps": [
        {
          "id": 1,
          "name": "스탬프 이름",
          "image": "https://example.com/stamp1.jpg"
        }
      ]
    }
    ```

### 10.2 내 정보 수정

#### 10.2.1 닉네임 변경

- **PUT** `/user/me/nickname`
  - **설명:** 사용자의 닉네임 변경
  - **요청 예시:**
    ```json
    {
      "nickname": "새닉네임"
    }
    ```

#### 10.2.2 비밀번호 변경

- **PUT** `/user/me/password`
  - **설명:** 사용자의 비밀번호 변경
  - **요청 예시:**
    ```json
    {
      "currentPassword": "현재비밀번호",
      "newPassword": "새비밀번호"
    }
    ```

#### 10.2.3 주소 변경

- **PUT** `/user/me/address`
  - **설명:** 사용자의 주소 변경
  - **요청 예시:**
    ```json
    {
      "address": "새주소"
    }
    ```

#### 10.2.4 프로필 사진 변경

- **POST** `/user/me/profile-image`
  - **설명:** 사용자의 프로필 사진 변경
  - **요청 예시:** (form-data)
    ```json
    {
      "image": [파일]
    }
    ```

### 10.3 나눔 이용 내역

#### 10.3.1 제품 나눔 내역 목록

- **GET** `/user/me/sharing-history`
  - **설명:** 사용자의 제품 나눔 내역 조회
  - **응답 예시:**
    ```json
    {
      "sharingHistory": [
        {
          "id": 1,
          "productName": "제품 이름",
          "date": "2024-01-01"
        }
      ]
    }
    ```

### 10.4 메시지함

#### 10.4.1 받은 메시지 목록

- **GET** `/user/me/messages/inbox`
  - **설명:** 사용자가 받은 메시지 목록 조회
  - **응답 예시:**
    ```json
    {
      "messages": [
        {
          "id": 1,
          "from": "보낸사람",
          "subject": "메시지 제목",
          "date": "2024-01-01"
        }
      ]
    }
    ```

#### 10.4.2 받은 메시지 확인

- **GET** `/user/me/messages/inbox/{messageId}`
  - **설명:** 특정 메시지 상세 내용 조회
  - **응답 예시:**
    ```json
    {
      "id": 1,
      "from": "보낸사람",
      "subject": "메시지 제목",
      "body": "메시지 내용",
      "date": "2024-01-01"
    }
    ```

#### 10.4.3 보낸 메시지 목록

- **GET** `/user/me/messages/sent`
  - **설명:** 사용자가 보낸 메시지 목록 조회
  - **응답 예시:**
    ```json
    {
      "messages": [
        {
          "id": 1,
          "to": "받는사람",
          "subject": "메시지 제목",
          "date": "2024-01-01"
        }
      ]
    }
    ```

### 10.5 메시지 상세 내용

#### 10.5.1 이전 메시지

- **GET** `/user/me/messages/inbox/{messageId}/previous`
  - **설명:** 이전 메시지 조회

#### 10.5.2 다음 메시지

- **GET** `/user/me/messages/inbox/{messageId}/next`
  - **설명:** 다음 메시지 조회

#### 10.5.3 답장 작성 버튼

- **POST** `/user/me/messages/inbox/{messageId}/reply`
  - **설명:** 특정 메시지에 답장하기
  - **요청 예시:**
    ```json
    {
      "body": "답장 내용"
    }
    ```

### 10.6 공지사항

#### 10.6.1 공지사항 목록

- **GET** `/notices`
  - **설명:** 공지사항 목록 조회
  - **응답 예시:**
    ```json
    {
      "notices": [
        {
          "id": 1,
          "title": "공지사항 제목",
          "date": "2024-01-01"
        }
      ]
    }
    ```

#### 10.6.2 공지사항 상세 페이지

- **GET** `/notices/{noticeId}`
  - **설명:** 특정 공지사항 상세 내용 조회
  - **응답 예시:**
    ```json
    {
      "id": 1,
      "title": "공지사항 제목",
      "body": "공지사항 내용",
      "date": "2024-01-01"
    }
    ```

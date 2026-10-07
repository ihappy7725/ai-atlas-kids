/* =========================================================
   AI ATLAS 키즈 · 데이터 (2026년 10월 기준)
   - 대상: 초등 저학년(7~10세) + 부모님
   - 아이용·교육용으로 만들어졌거나, 나이 제한 없이 안전하게 쓸 수 있는 AI만 담았어요.
   ========================================================= */

/* 놀이(분야) */
const PLAYS = [
  { id: "draw",    name: "그림 놀이",     say: "끄적끄적 그리면 AI가 맞혀요", icon: "img/3d/cat-image.png",    color: "#ff7a8a" },
  { id: "story",   name: "이야기·책",     say: "나만의 그림책을 만들어요",   icon: "img/3d/cat-writing.png",  color: "#a17cff" },
  { id: "music",   name: "노래·소리",     say: "AI랑 같이 노래해요",         icon: "img/3d/cat-music.png",    color: "#ffb020" },
  { id: "english", name: "영어 말하기",   say: "소리 내어 읽고 말해요",      icon: "img/3d/cat-audio.png",    color: "#22c08a" },
  { id: "study",   name: "공부·수학",     say: "내 속도에 맞춰 배워요",      icon: "img/3d/cat-research.png", color: "#3aa0ff" },
  { id: "maker",   name: "AI 만들기",     say: "내가 직접 AI를 가르쳐요",    icon: "img/3d/cat-coding.png",   color: "#ff8a3d" }
];

/* 툴
   price: free | mix | paid
   age: 권장 나이 (숫자 = 그 나이부터)
   tags: nologin(로그인 없이) · ko(한국어) · en(영어로 배워요) · parent(부모님과 함께) · noads(광고 없음) · cam(카메라 사용) · mic(마이크 사용)
   kid: 아이에게 보여 줄 한 줄 · parent: 부모님 메모 */
const TOOLS = [
  /* ---------- 그림 놀이 ---------- */
  { name: "퀵 드로우", sub: "Quick, Draw!", play: "draw", url: "https://quickdraw.withgoogle.com", host: "quickdraw.withgoogle.com",
    price: "free", age: 6, tags: ["nologin", "ko"], star: true,
    kid: "20초 안에 그림을 그리면 AI가 뭔지 맞혀요!",
    parent: "구글의 그림 맞히기 게임이에요. 로그인이 필요 없어요. 그린 그림은 구글의 공개 연구 자료로 쓰일 수 있으니 이름·얼굴 같은 개인 정보는 그리지 않게 해 주세요." },
  { name: "오토드로우", sub: "AutoDraw", play: "draw", url: "https://www.autodraw.com", host: "autodraw.com",
    price: "free", age: 6, tags: ["nologin"],
    kid: "삐뚤빼뚤 그려도 AI가 예쁜 그림으로 바꿔 줘요",
    parent: "구글의 무료 그리기 도구예요. 대충 그린 모양을 보고 비슷한 그림을 추천해 줘요. 계정 없이 바로 쓸 수 있고, 완성한 그림을 저장·인쇄할 수 있어요." },
  { name: "움직이는 그림", sub: "Animated Drawings (Meta)", play: "draw", url: "https://sketch.metademolab.com", host: "metademolab.com",
    price: "free", age: 7, tags: ["nologin", "parent"],
    kid: "종이에 그린 내 캐릭터가 춤을 춰요!",
    parent: "메타(Meta)의 연구용 체험 사이트예요. 아이 그림 사진을 올리면 캐릭터가 움직여요. 업로드 전 사용 동의 화면이 있으니 부모님이 함께 읽어 주세요. 실험 서비스라 가끔 열리지 않을 수 있어요." },

  /* ---------- 이야기·책 ---------- */
  { name: "제미나이 스토리북", sub: "Gemini Storybook", play: "story", url: "https://gemini.google.com", host: "gemini.google.com",
    price: "free", age: 7, tags: ["ko", "parent"], star: true,
    kid: "말로 이야기를 들려주면 그림과 소리가 있는 동화책이 생겨요",
    parent: "구글 제미나이 앱의 그림책 만들기 기능이에요. 만 13세 미만은 부모님이 관리하는 구글 계정(패밀리 링크)으로만 쓸 수 있고, 나라에 따라 제공 범위가 다를 수 있어요. 아이 혼자 쓰기보다 부모님 계정으로 함께 만들어 보세요." },
  { name: "리드 어롱", sub: "Read Along by Google", play: "story", url: "https://readalong.google.com", host: "readalong.google.com",
    price: "free", age: 5, tags: ["en", "noads"],
    kid: "책을 소리 내어 읽으면 친구 '디야'가 잘했다고 칭찬해 줘요",
    parent: "구글의 무료 읽기 연습 서비스로, 광고가 없어요. 음성 인식은 기기 안에서 처리돼요. 영어 책이 가장 많아서 영어 읽기 연습에 좋아요." },
  { name: "리딩 코치", sub: "Microsoft Reading Coach", play: "story", url: "https://coach.microsoft.com", host: "coach.microsoft.com",
    price: "free", age: 6, tags: ["en", "parent", "mic"],
    kid: "내가 고른 주인공으로 이야기를 만들고 소리 내어 읽어요",
    parent: "마이크로소프트의 무료 읽기 연습 도구예요(6~11세 권장). 마이크로소프트 계정이 필요해서 부모님이 처음에 설정해 주셔야 해요. 영어 중심이에요." },

  /* ---------- 노래·소리 ---------- */
  { name: "블롭 오페라", sub: "Blob Opera", play: "music", url: "https://artsandculture.google.com/experiment/blob-opera/AAHWrq360NcGbw", host: "artsandculture.google.com",
    price: "free", age: 4, tags: ["nologin", "noads"], star: true,
    kid: "말랑말랑 젤리 친구 넷을 끌어당기면 오페라를 불러요",
    parent: "구글 아츠 앤 컬처의 음악 실험이에요. 실제 성악가 목소리로 학습한 AI가 화음을 맞춰 줘요. 로그인 없이 마우스나 손가락만으로 놀 수 있어요." },
  { name: "바흐 두들", sub: "Google Doodle · Bach", play: "music", url: "https://www.google.com/doodles/celebrating-johann-sebastian-bach", host: "google.com",
    price: "free", age: 6, tags: ["nologin", "noads"],
    kid: "멜로디를 몇 개 찍으면 AI가 바흐처럼 화음을 붙여 줘요",
    parent: "구글 최초의 AI 두들(2019)로 지금도 플레이할 수 있어요. 음표를 찍으면 바흐 곡을 배운 AI가 4성부 화음을 만들어 줘요. 음악 시간에 함께 해 보기 좋아요." },

  /* ---------- 영어 말하기 ---------- */
  { name: "AI 펭톡", sub: "EBS", play: "english", url: "https://apps.apple.com/kr/app/id1536912509", host: "ebs.co.kr",
    price: "free", age: 9, tags: ["ko", "mic"], star: true,
    kid: "펭수랑 게임하듯 영어로 말해요",
    parent: "EBS와 교육부가 만든 초등 영어 말하기 앱이에요. 음성 인식으로 발음을 확인해 줘요. 학교에서 안내받은 계정으로 로그인하는 경우가 많아요. 안드로이드는 구글 플레이에서 'AI펭톡'을 검색하세요." },
  { name: "칸 아카데미 키즈", sub: "Khan Academy Kids", play: "english", url: "https://learn.khanacademy.org/khan-academy-kids/", host: "khanacademy.org",
    price: "free", age: 2, tags: ["en", "noads"],
    kid: "귀여운 동물 친구들과 영어 단어·숫자 놀이를 해요",
    parent: "비영리 단체 칸 아카데미의 2~8세용 앱으로, 완전 무료이고 광고가 없어요. 아이 수준에 맞춰 다음 활동을 골라 줘요. 영어로 진행돼요." },

  /* ---------- 공부·수학 ---------- */
  { name: "똑똑! 수학탐험대", sub: "교육부", play: "study", url: "https://www.toctocmath.kr", host: "toctocmath.kr",
    price: "free", age: 7, tags: ["ko", "noads"], star: true,
    kid: "탐험하면서 수학 문제를 풀면 AI가 딱 맞는 문제를 골라 줘요",
    parent: "교육부가 만든 초등 1~4학년용 AI 수학 학습 서비스예요. 학교 수업과 연계돼 있고, 학생이 어려워하는 부분을 분석해 문제를 추천해요. 학교 계정 또는 개인 회원 가입으로 써요." },
  { name: "EBS AI 단추 플러스", sub: "EBS", play: "study", url: "https://ai-plus.ebs.co.kr", host: "ebs.co.kr",
    price: "free", age: 8, tags: ["ko", "noads"],
    kid: "국어·수학·영어를 내 수준에 맞게 공부해요",
    parent: "교육부와 EBS의 무료 AI 맞춤 학습 서비스(초·중·고)예요. 진단 평가 후 수준에 맞는 강의와 문제를 추천해요. 저학년은 부모님이 화면을 같이 봐 주세요." },
  { name: "아이스크림 홈런", sub: "유료 학습", play: "study", url: "https://www.home-learn.co.kr", host: "home-learn.co.kr",
    price: "paid", age: 7, tags: ["ko", "parent"],
    kid: "전용 태블릿으로 AI 선생님과 공부해요",
    parent: "AI 학습 분석 기능이 있는 초등 유료 학습 서비스예요. 월 구독료가 있으니 무료 체험으로 아이와 맞는지 먼저 확인해 보세요." },

  /* ---------- AI 만들기 ---------- */
  { name: "엔트리", sub: "Entry", play: "maker", url: "https://playentry.org", host: "playentry.org",
    price: "free", age: 8, tags: ["ko", "noads"], star: true,
    kid: "블록을 쌓아서 말을 알아듣는 AI 작품을 만들어요",
    parent: "네이버 커넥트재단의 무료 블록 코딩 플랫폼이에요. 번역·음성 인식·사물 인식 같은 인공지능 블록과 '모델 학습' 기능으로 AI 원리를 놀이처럼 배울 수 있어요. 작품 저장은 회원 가입이 필요해요." },
  { name: "티처블 머신", sub: "Teachable Machine", play: "maker", url: "https://teachablemachine.withgoogle.com", host: "teachablemachine.withgoogle.com",
    price: "free", age: 8, tags: ["nologin", "parent", "cam"],
    kid: "카메라로 보여 주면서 AI에게 '이건 고양이야!' 하고 가르쳐요",
    parent: "구글의 무료 AI 학습 도구예요. 로그인 없이 쓰고, 학습은 브라우저 안에서 이뤄져요. 카메라·마이크를 쓰니 처음엔 부모님이 함께 허용해 주세요. 영어 화면이지만 버튼이 단순해요." },
  { name: "AI 바다 청소", sub: "AI for Oceans · Code.org", play: "maker", url: "https://code.org/oceans", host: "code.org",
    price: "free", age: 8, tags: ["nologin", "ko", "noads"],
    kid: "AI에게 물고기와 쓰레기를 구별하는 법을 가르쳐 바다를 지켜요",
    parent: "비영리 단체 코드닷오알지(Code.org)의 무료 AI 수업이에요. 계정 없이 할 수 있고 한국어도 지원해요. AI가 데이터로 배우는 원리를 30분 정도면 체험할 수 있어요." },
  { name: "머신러닝 포 키즈", sub: "Machine Learning for Kids", play: "maker", url: "https://machinelearningforkids.co.uk", host: "machinelearningforkids.co.uk",
    price: "free", age: 9, tags: ["parent", "en"],
    kid: "내가 가르친 AI로 스크래치 게임을 만들어요",
    parent: "AI 모델을 학습시켜 스크래치에서 바로 쓰는 무료 교육 사이트예요. '지금 바로 해 보기'로 가입 없이 체험할 수 있어요. 영어 화면이 많아 부모님이나 선생님이 도와주세요." }
];

/* 아직 혼자 쓰면 안 되는 AI (부모님 가이드 표) */
const AGE_LIMITS = [
  { name: "ChatGPT",      age: "만 13세 이상", note: "18세 미만은 보호자 동의가 필요해요" },
  { name: "Claude",       age: "만 18세 이상", note: "어린이는 사용할 수 없어요" },
  { name: "Gemini",       age: "만 13세 이상", note: "13세 미만은 부모님 관리 계정(패밀리 링크)으로만" },
  { name: "Midjourney",   age: "만 13세 이상", note: "공개 갤러리에 다른 사람 그림이 많이 보여요" },
  { name: "Character.AI", age: "만 18세 이상", note: "18세 미만은 자유 대화 기능을 쓸 수 없어요" }
];

/* 아티와 약속 */
const PROMISES = [
  { emoji: "🙊", title: "내 비밀은 지켜요",       body: "이름, 학교, 집 주소, 전화번호는 AI에게 말하지 않아요." },
  { emoji: "🤔", title: "AI도 틀릴 수 있어요",    body: "AI 말이 진짜인지 책이나 어른에게 한 번 더 물어봐요." },
  { emoji: "🙋", title: "이상하면 바로 말해요",   body: "무섭거나 이상한 말이 나오면 화면을 끄고 어른에게 알려요." },
  { emoji: "⏰", title: "시간을 정해서 놀아요",   body: "타이머를 맞추고, 끝나면 눈도 쉬어 줘요." },
  { emoji: "🎨", title: "내 생각이 먼저예요",     body: "AI는 도와주는 친구! 그림과 이야기의 주인공은 바로 나예요." }
];

const UPDATED = "2026년 10월";

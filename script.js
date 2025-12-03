// 날짜 표시
function displayDate() {
    const dateBox = document.getElementById("date-box");
    const today = new Date();

    const dayNames = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    const text = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()} · ${dayNames[today.getDay()]}`;
    dateBox.textContent = text;
}

// 기본 키워드 DB
const keywordDB_default = {
    "help": { type: "text", value: "이름, 직업, 생일, MBTI, 좋아하는색, 포지션, 정동효" },

    "이름": { type: "text", value: "이경현" },
    "직업": { type: "text", value: "학생" },
    "생일": { type: "text", value: "2003년 12월 27일" },
    "MBTI": { type: "text", value: "ISFJ" },
    "좋아하는색": { type: "text", value: "파란색" },
    "포지션": { type: "text", value: "보컬" }
};

// 정동효 모드 전용 키워드 DB
const keywordDB_JDH = {
    "이름": { type: "text", value: "정동효" },
    "직업": { type: "text", value: "학생" },
    "나이": { type: "text", value: "23살" },
    "생일": { type: "text", value: "2003년 5월 30일" },
    "MBTI": { type: "text", value: "INFP" },
    "특징": { type: "text", value: "귀여움 + 착함 + 바보미" }
    
};

// 현재 사용 중인 DB (초기값: 기본)
let currentDB = keywordDB_default;

// 채팅 메시지 출력
function addChatMessage(text, isAI = false) {
    const chatBox = document.getElementById("chat-box");
    const msg = document.createElement("div");
    msg.className = isAI ? "chat-ai" : "chat-user";
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 이미지 바꾸기
function changeImage(src) {
    const imgBox = document.querySelector("#image-box img");
    imgBox.src = src;
}

// 입력 처리
function handleUserInput() {
    const input = document.getElementById("user-input");
    const value = input.value.trim();
    if (!value) return;

    addChatMessage(value, false);

    // 🔥 정동효 프로필 전환
    if (value === "정동효") {
        changeImage("https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/593250956_2045463929550927_1440551001475027068_n.jpg?stp=c0.39.413.413a_dst-jpg_s413x413_tt6&_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=S5t9_1vW_oUQ7kNvwGdTzEz&_nc_oc=AdluC4dqFrjIjMN7zTAQvNr4RtD222DYY0ygff3Oa9FIe_ruZOekpIomvAb05VqliII&_nc_zt=23&_nc_ht=scontent-ssn1-1.xx&_nc_gid=RGANrMvjcP1zo3yc9EqAhA&oh=00_Afn7HPTTYUZHA5ObojQQ2rgQz8wuMsM1OeMYko3eEkOe-A&oe=693606B2");
        addChatMessage("정동효입니다!", true);

        // 키워드 DB 교체
        currentDB = keywordDB_JDH;

        addChatMessage("정동효 모드로 전환되었습니다. 새로운 키워드를 입력해보세요!", true);

        input.value = "";
        return;
    }

    // 일반 키워드 처리 (현재 DB에서 검색)
    const data = currentDB[value];

    if (data) {
        if (data.type === "text") {
            addChatMessage(data.value, true);
        }
        else if (data.type === "image") {
            changeImage(data.value);
            if (data.text) addChatMessage(data.text, true);
        }
    } 
    else {
        addChatMessage("해당 정보는 없습니다!", true);
    }

    input.value = "";
}

// 입력 이벤트
document.getElementById("send-btn").addEventListener("click", handleUserInput);
document.getElementById("user-input").addEventListener("keypress", e => {
    if (e.key === "Enter") handleUserInput();
});

// 안쪽 배경 랜덤 변경
function changeInnerBackground() {
    const colors = [
        "#ffffff", "#f8f5ff", "#fff6f6",
        "#f6fff6", "#f0faff", "#f7f7f7"
    ];

    const idx = Math.floor(Math.random() * colors.length);
    document.getElementById("container").style.background = colors[idx];
}

// 버튼 연결
document.getElementById("bg-in-btn").addEventListener("click", changeInnerBackground);

// 실행
displayDate();

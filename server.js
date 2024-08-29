const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

// Express 애플리케이션 생성
const app = express();

// EJS 템플릿 엔진 설정
app.set("view engine", "ejs"); // 템플릿 엔진으로 EJS 사용
app.set("views", path.join(__dirname, "views")); // EJS 템플릿 파일이 위치한 디렉토리 설정

// 미들웨어 설정
app.use(expressLayouts); // EJS 레이아웃 사용
app.use(express.static("public")); // 정적 파일 제공
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터 파싱

app.set("layout", "layout"); // 기본 레이아웃 설정

// 예제 사용자 데이터
const users2 = [
  { name: "kim", age: 17, role: "front" },
  { name: "lee", age: 25, role: "back" },
  { name: "park", age: 30, role: "full" },
  { name: "choi", age: 16, role: "front" },
];

// 기본 페이지 렌더링
app.get("/", (req, res) => {
  res.render("index", {
    tasks: tasks, // 할 일 목록
    users2: users2, // 사용자 목록
  });
});

// About 페이지 렌더링
app.get("/about", (req, res) => {
  res.render("about");
});

// 사용자 입력 폼 페이지 렌더링
app.get("/form", (req, res) => {
  res.render("form");
});

// 폼 제출 데이터 처리 및 결과 페이지 렌더링
app.post("/submit", (req, res) => {
  const { name, email } = req.body; // 폼 데이터에서 이름과 이메일 추출
  res.render("result", { name, email }); // 결과 페이지 렌더링
});

let tasks = []; // 할 일 목록

// 새로운 할 일 추가
app.post("/addTask", (req, res) => {
  const newTask = req.body.newTask; // 폼 데이터에서 새 할 일 추출
  if (newTask) {
    tasks.push(newTask); // 할 일 목록에 추가
  }
  res.redirect("/"); // 기본 페이지로 리다이렉트
});

// 선택한 할 일 삭제
app.post("/deleteTask", (req, res) => {
  const deleteTask = req.body.task; // 삭제할 할 일 추출
  tasks = tasks.filter((task) => task !== deleteTask); // 할 일 목록에서 삭제
  res.redirect("/"); // 기본 페이지로 리다이렉트
});

// 서버 시작
app.listen(3000, () => {
  console.log("서버연결 http://localhost:3000"); // 서버 시작 메시지
});
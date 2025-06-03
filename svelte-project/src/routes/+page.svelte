<div class="link-container">
    <a href="/users/new">사용자 등록</a>
    <a href="/timetables/personal">개인 시간표 확인</a>
    <a href="/timetables/group">전체 시간표 확인</a>
    <a href="/timetables/new">시간표 추가</a>
    <a href="/timetables/personal/rough">시간표 수정</a>
    <a href="/timetables/personal/rough/remove">시간표 삭제</a>
</div>

<style>
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: sans-serif;
        background-color: #E1ECF7;
        padding: 20px;
        line-height: 1.6;
    }

    h1 {
        color: #343a40;
        text-align: center;
        margin-bottom: 20px;
    }

    .link-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
    }

    a {
        color: #007bff;
        text-decoration: none;
        display: inline-block;
        padding: 8px 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin: 5px;
        background-color: white;
    }

    a:hover {
        background-color: #e9ecef;
    }
</style>
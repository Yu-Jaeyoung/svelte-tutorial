<script>
    import { addUser } from '../../../store/api.js';

    let number = '';
    let name = '';
    let errorMessage;

    async function handleSubmit(event) {
        errorMessage = '';
        event.preventDefault();

        const userInfo = { userNumber: number, userName: name };

        try {
            await addUser(userInfo);
        } catch (error) {
            console.error('사용자 추가 오류:', error);
            errorMessage = `사용자 추가 실패 ${ errorMessage }`;
            alert(errorMessage);
        }
    }
</script>

<p>
    <a href="/" class="timetable-button">처음으로</a>
</p>

<form on:submit={handleSubmit}>
    <h2>사용자 등록</h2>
    <input bind:value={number} placeholder="학번" required/>
    <input bind:value={name} placeholder="이름" required/>
    <button type="submit">등록</button>
    {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
    {/if}
</form>

<style>
    /* Reset.css (간단 버전) */
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: sans-serif;
        background-color: #E1ECF7; /* 배경색 변경 */
        padding: 20px;
        line-height: 1.6; /* 줄 간격 */
    }

    h2 {
        color: #333; /* 제목 색상 변경 */
        margin-bottom: 10px;
    }

    input {
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: white; /* 입력 필드 배경색 */
    }

    button {
        background-color: #007bff;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
    }

    button:hover {
        opacity: 0.8;
    }

    .timetable-button {
        background-color: #007bff;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        display: inline-block;
        text-decoration: none;
    }

    .timetable-button:hover {
        opacity: 0.8;
    }

    p {
        margin-bottom: 10px;
    }

    p.error {
        color: red;
    }
</style>
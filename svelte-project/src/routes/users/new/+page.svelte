<script>
    import { addUser } from '../../../store/api.js';
    import HomeButton from '../../../components/HomeButton.svelte';

    let number = '';
    let name = '';
    let errorMessage = '';
    let successMessage = ''; // 성공 메시지 상태 변수

    async function handleSubmit(event) {
        errorMessage = '';
        successMessage = ''; // 성공 메시지 초기화
        event.preventDefault();

        const userInfo = { userNumber: number, userName: name };

        try {
            await addUser(userInfo);
            successMessage = '사용자 등록이 완료되었습니다.'; // 성공 메시지 설정
            // 입력 필드 초기화 (선택 사항)
            number = '';
            name = '';
        } catch (error) {
            console.error('사용자 추가 오류:', error);
            errorMessage = `사용자 추가 실패: ${error.message}`;
            alert(errorMessage);
        }
    }
</script>

<HomeButton/>

<form on:submit={handleSubmit}>
    <h2>사용자 등록</h2>
    <input bind:value={number} placeholder="학번" required/>
    <input bind:value={name} placeholder="이름" required/>
    <button type="submit">등록</button>
    {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
    {/if}
    {#if successMessage}
        <p style="color: green;">{successMessage}</p>
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
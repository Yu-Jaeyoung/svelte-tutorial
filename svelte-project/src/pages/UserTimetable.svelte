<script>
    import ScheduleTable from "../components/ScheduleTable.svelte";
    import { timetable } from "../store/index.js";

    let userId = "";
    let userData = null;
    let error = null;
    let loading = false;

    async function fetchUserData() {
        loading = true;
        error = null;
        userData = null;

        try {
            const data = await timetable.getTimetableByUserId(userId);
            userData = Array.isArray(data) ? data : [];
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    }
</script>

<div class="container">
    <div class="input-area">
        <input type="text" bind:value={userId} placeholder="사용자 ID 입력"/>
        <button on:click={fetchUserData}>데이터 가져오기</button>
    </div>

    {#if loading}
        <p class="loading-message">로딩 중...</p>
    {:else if error}
        <p class="error-message" style="color: red;">{error}</p>
    {:else if userData && userData.length === 0}
        <p class="not-found-message">사용자를 찾을 수 없습니다.</p>
    {:else if userData}
        <ScheduleTable {userData}/>
    {/if}
</div>

<style>
    .container {
        background-color: #E1ECF7;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .input-area {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }

    input[type="text"] {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-right: 10px;
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

    .loading-message {
        text-align: center;
        font-style: italic;
        color: #666;
        padding: 10px;
    }

    .error-message {
        padding: 10px;
        border: 1px solid red;
        border-radius: 4px;
        margin-bottom: 10px;
    }

    .not-found-message {
        text-align: center;
        color: #999;
        padding: 10px;
    }
</style>
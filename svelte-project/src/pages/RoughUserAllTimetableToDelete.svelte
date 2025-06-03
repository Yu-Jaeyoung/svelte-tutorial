<script>
    import { timetable } from '../store/index.js';

    let userId = '';
    let userData = null;
    let error = null;
    let loading = false;

    async function fetchUserData() {
        loading = true;
        error = null;
        userData = null;

        try {
            const data = await timetable.getTimetableByUserId(userId);
            console.log(typeof data);
            userData = Array.isArray(data) ? data : [];
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    }

    async function deleteTimetable(index, updatedData) {
        console.log('삭제 요청:', index, updatedData);
        await timetable.deleteTimetableByIdAndTimetableId(userId, updatedData);
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
    {:else if userData && Array.isArray(userData)}
        <ul>
            {#each userData as item, index}
                <li class="schedule-item">
                    <br>
                    <span>
                            요일: {item.day}, 시작 시간: {item.startTime}:00, 종료 시간: {item.endTime}:00
                        </span>
                    <button class="save-button" on:click={() => deleteTimetable(userId, item)}>삭제</button>
                </li>
            {/each}
        </ul>
    {:else if userData}
        {userData}
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

    .schedule-item {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 10px;
        background-color: white;
    }

    .edit-button {
        background-color: #28a745;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        margin-left: 10px;
    }

    .save-button {
        background-color: #007bff;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        margin-right: 5px;
    }

    .cancel-button {
        background-color: #dc3545;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
    }
</style>
<script>
    import { timetable } from '../store/index.js';

    let userId = '';
    let userData = null;
    let error = null;
    let loading = false;

    // 수정 모드 상태
    let editMode = {};

    async function fetchUserData() {
        loading = true;
        error = null;
        userData = null;

        try {
            const data = await timetable.getTimetableByUserId(userId);
            console.log(typeof data);
            userData = Array.isArray(data) ? data : [];
            Object.keys(userData).forEach(key => {
                editMode[key] = false;
            });
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    }

    function toggleEditMode(index) {
        editMode[index] = !editMode[index];
    }

    async function updateTimetable(index, updatedData) {
        console.log('업데이트 요청:', index, updatedData);
        await timetable.patchTimeTableById(updatedData);
        toggleEditMode(index); // 업데이트 후 수정 모드 해제
    }

    const hours = Array.from({ length: 14 }, (_, i) => i + 9);
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
                    {#if editMode[index]}
                        <label>
                            요일:
                            <select bind:value={item.day}>
                                <option value="Sun">Sun</option>
                                <option value="Mon">Mon</option>
                                <option value="Tue">Tue</option>
                                <option value="Wed">Wed</option>
                                <option value="Thu">Thu</option>
                                <option value="Fri">Fri</option>
                                <option value="Sat">Sat</option>
                            </select>
                        </label>
                        <br>
                        <label>
                            시작 시간:
                            <select bind:value={item.startTime}>
                                {#each hours as hour}
                                    <option value={hour}>{hour}:00</option>
                                {/each}
                            </select>
                        </label>
                        <br>
                        <label>
                            종료 시간:
                            <select bind:value={item.endTime}>
                                {#each hours as hour}
                                    <option value={hour}>{hour}:00</option>
                                {/each}
                            </select>
                        </label>
                        <br>
                        <button class="save-button" on:click={() => updateTimetable(index, item)}>저장</button>
                        <button class="cancel-button" on:click={() => toggleEditMode(index)}>취소</button>
                    {:else}
                        <span>
                            요일: {item.day}, 시작 시간: {item.startTime}:00, 종료 시간: {item.endTime}:00
                        </span>
                        <button class="edit-button" on:click={() => toggleEditMode(index)}>수정</button>
                    {/if}
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
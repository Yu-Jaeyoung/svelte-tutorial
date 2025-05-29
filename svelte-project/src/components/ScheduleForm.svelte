<script>
    import { timetable } from '../store/index.js';

    const days = [ 'Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat' ];
    const hours = Array.from({ length: 14 }, (_, i) => i + 9);


    const dateObject = new Date();

    const month = dateObject.getMonth();
    const date = dateObject.getDate();


    function getISOWeek(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0); // Normalize to start of day
        d.setDate(d.getDate() + 4 - d.getDay()); // Thursday of the current week
        const yearStart = new Date(d.getFullYear(), 0, 1);
        const dayDiff = (d - yearStart) / (1000 * 60 * 60 * 24);
        return Math.ceil(dayDiff / 7);
    }

    const weekNumber = getISOWeek(dateObject);


    let studentId = '';
    let day = 'Mon';
    let startTime = 9;
    let endTime = 10;
    let week = weekNumber;

    async function submitForm() {
        if (!studentId || startTime >= endTime) {
            alert('올바른 정보를 입력해주세요.');
            return;
        }

        let schedule = {
            studentId: Number(studentId),
            day,
            startTime: Number(startTime),
            endTime: Number(endTime),
            week: Number(week),
        };

        try {
            await timetable.addTimetable(schedule);
        } catch (error) {
            console.error(error);
        }
    }

</script>

<form on:submit|preventDefault={submitForm} class="form-container">
    <label class="label">
        학번
        <input type="number" bind:value={studentId}/>
    </label>
    <br><br>
    <label class="label">
        요일
        <select bind:value={day}>
            {#each days as d}
                <option value={d}>{d}</option>
            {/each}
        </select>
    </label>
    <br><br>
    <label class="label">
        시작 시간
        <select bind:value={startTime}>
            {#each hours as h}
                <option value={h}>{h}:00</option>
            {/each}
        </select>
    </label>
    <br><br>
    <label class="label">
        종료 시간
        <select bind:value={endTime}>
            {#each hours as h}
                <option value={h}>{h}:00</option>
            {/each}
        </select>
    </label>
    <br><br>
    <label class="info-label">
        오늘은 {month}월 {date}일 {weekNumber} 주차 입니다.
    </label>
    <br><br>
    <label>
        <input type="number" bind:value={week}/>
        주차
    </label>
    <br><br>
    <button type="submit" class="submit-button">일정 추가</button>
</form>

<style>
    .form-container {
        background-color: #E1ECF7;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
    }

    input[type="number"], select {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 150px;
        margin-top: 5px;
    }

    .info-label {
        font-style: italic;
        color: #666;
    }

    .submit-button {
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        font-weight: bold;
    }

    .submit-button:hover {
        opacity: 0.8;
    }
</style>
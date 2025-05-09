<script>
    // 요일과 시간 정의
    export let userData = []; // 부모 컴포넌트 또는 fetch 함수에서 전달받는 데이터

    const days = [ "Sun", "Mon", "Tue", "Wen", "Thur", "Fri", "Sat" ];
    const hours = Array.from({ length: 24 }, (_, i) => i); // 0 ~ 23시

    // 해당 시간과 요일에 일정이 있는지 여부를 확인
    function isScheduled(day, hour) {
        return userData.some(item =>
            item.day === day &&
            hour >= item.startTime &&
            hour < item.endTime,
        );
    }
</script>

<style>
    table {
        border-collapse: collapse;
        margin-top: 20px;
        width: 100%;
        text-align: center;
    }

    th, td {
        border: 1px solid #ccc;
        padding: 6px;
        width: 40px;
        height: 30px;
    }

    .scheduled {
        background-color: #6ec6ff;
    }
</style>

<table>
    <thead>
    <tr>
        <th>Hour</th>
        {#each days as day}
            <th>{day}</th>
        {/each}
    </tr>
    </thead>
    <tbody>
    {#each hours as hour}
        <tr>
            <td>{hour}</td>
            {#each days as day}
                <td class:scheduleHighlight={isScheduled(day, hour)}
                    class={isScheduled(day, hour) ? 'scheduled' : ''}></td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>

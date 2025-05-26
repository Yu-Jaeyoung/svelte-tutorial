<script>
    // 요일과 시간 정의
    export let userData = [];

    const days = [ "Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat" ];
    const hours = Array.from({ length: 14 }, (_, i) => i + 9);

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
        width: 50%;
        text-align: center;
    }

    th, td {
        border: 1px solid #ccc;
        padding: 6px;
        width: 36px;
        height: 30px;
    }

    .scheduled {
        background-color: #e1ecf7
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
                <td class={isScheduled(day, hour) ? 'scheduled' : ''}></td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>

<script>
    export let customer;
</script>

<div class="card">
    <div class="card-header">
        <h3>{customer.name}</h3>
    </div>
    <div class="card-content">
        <strong>Email:</strong> {customer.email} <br/>
        <strong>Cellphone:</strong> {customer.cellphone} <br/>
    </div>
</div>

<style>
    .card {
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        overflow: hidden; /* 내용이 넘칠 경우 숨김 */
        width: 350px;
        transition: transform 0.3s ease; /* 호버 효과 */
    }

    .card:hover {
        transform: translateY(-5px); /* 호버 시 약간 위로 이동 */
    }

    .card-header {
        background-color: #f0f0f0;
        padding: 15px;
        border-bottom: 1px solid #ddd;
    }

    .card-header h3 {
        margin: 0;
        font-size: 1.2em;
        color: #333;
    }

    .card-content {
        padding: 15px;
    }
</style>
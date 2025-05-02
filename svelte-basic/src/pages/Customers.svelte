<script>
    import CustomerInfo from "../components/CustomerInfo.svelte";
    import { onMount } from "svelte";
    import { customers } from "../store/index.js";

    onMount(()=> {
        customers.fetch();
    })
</script>

<h1>
    고객 목록
</h1>

{#each $customers as customer}
    <CustomerInfo customer={customer}></CustomerInfo>
    <hr/>
{/each}
<style>

</style>
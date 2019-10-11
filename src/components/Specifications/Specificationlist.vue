<template>
<div id='SpecificationsList'>
<div id='SpecificationsTable'>
<b-table striped hover :items="specifications"></b-table>
</div>
</div>
</template>

<script>
export default {
    name: "Specification",
    data(){
        return{

        }
    },
    props:['specifications'],
}
</script>
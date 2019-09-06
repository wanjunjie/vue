<template>
        <dl v-bind:class="[style, 'pass-word-box']">
            <dd></dd>
            <dd></dd>
            <dd></dd>
            <dd></dd>
            <dd></dd>
            <dd></dd>
            <dt><input type="tel" @keyup="changeInput" maxlength="6"></dt>
        </dl>
</template>

<script>
    export default {
        name: 'passWord',
        data() {
            return {
                style: 'zero'
            }
        },
        methods:{
            changeInput(event){
                event.target.value=event.target.value.replace(/\D/g,'')
                this.$emit('child-value', event.target.value)
                let length = event.target.value.length
                switch(length){
                    case 0:
                        this.style = 'zero'
                        break;
                    case 1:
                        this.style = 'one'
                        break;
                     case 2:
                        this.style = 'two'
                        break;
                     case 3:
                        this.style = 'third'
                        break;
                     case 4:
                        this.style = 'four'
                        break;
                     case 5:
                        this.style = 'five'
                        break;
                     case 6:
                        this.style = ''
                        break;
                }
            }
        }
    }
</script>
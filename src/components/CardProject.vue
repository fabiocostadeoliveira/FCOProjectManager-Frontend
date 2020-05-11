<template>
    <div class="md-layout-item">
        <md-card md-with-hover>
            <md-ripple>
                <md-card-header>
                <div class="md-title">{{ value.name | mainTitle }}  </div>
                <div class="md-subhead">Data Inicio: {{ value.startData }}</div>
                <div class="md-subhead">Data Fim: {{ value.endData }}</div>
                </md-card-header>

                <md-card-content>
                    {{ value.name }}
                </md-card-content>

                <md-card-actions>
                    <md-button>Deletar</md-button>
                    <md-button>Editar</md-button>
                    <md-button>Tarefas</md-button>                
                </md-card-actions>

            </md-ripple>
        </md-card>
    </div>    
  
</template>

<script>
export default {
    name:'CardProject',
    components: {

    },

    data: () =>({
        

    }),

    props: {
        value: {
            type: Object,
            required: true
        }
    },

    filters:{
    
        mainTitle(text){
            if(text === undefined) return ''

            let newText = text.substring(0, 25)
            
            if(text.length > 20) 
                newText += '...'

            return newText
        },


    }

}
</script>

<style>
    .md-card {
        width: 320px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
    }
</style>
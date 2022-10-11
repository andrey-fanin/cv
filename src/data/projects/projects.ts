import {vuelance, todo, beats, videoProduction} from "../links/links";

export default [{
    id: 1,
    name: 'Video-production',
    link: videoProduction,
    descr: 'Многостраничный сайт с резиновой вёрсткой и формами отправки отзывов. HTML + CSS.'
},
    {
        id: 2,
        name: 'Beats',
        link: beats,
        descr: 'Лендинг с виджетами JS + JQuery. Реализован адаптивной вёрсткой с One Page Scroll и с формой обработки xhr.'
    },
    {
        id: 3,
        name: 'Vuelance',
        link: vuelance,
        descr: 'Лайт-версия фриланс-биржи. Сделано с использованием Composition API, Vuex, Vue-router.'
    },
    {
        id: 4,
        name: 'Todo',
        link: todo,
        descr: 'Классика жанра! SPA с использованием всего основного функционала Vue. Задачи сохранятся в localstorage. При создании пятого таска вам покажут любимую собаку, а при очистке списков вы увидите полезный совет'
    }
]
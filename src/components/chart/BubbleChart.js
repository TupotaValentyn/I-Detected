import { Bubble } from './BaseChart';

export default {
    extends: Bubble,
    props: ['data'],
    mounted() {
        setTimeout(() => {
            this.renderChart({
                datasets: [
                    ...this.data
                ]
            }, {responsive: true, maintainAspectRatio: false})
        }, 0);
    }
}

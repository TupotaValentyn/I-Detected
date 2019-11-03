import { Bubble } from './BaseChart';

export default {
    extends: Bubble,
    props: ['data'],
    beforeMount() {
        setTimeout(() => {
            console.log(this.data);
            this.renderChart({
                datasets: [
                    ...this.data
                ]
            }, {responsive: true, maintainAspectRatio: false})
        }, 0);
    }
}

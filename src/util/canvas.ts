import { CanvasRenderService } from 'chartjs-node-canvas';

const width = 1000;
const height = 800;

const smallCanvas = new CanvasRenderService(width, height, (ChartJS) => {
    ChartJS.plugins.register({
        beforeDraw: (chart, options) => {
            const ctx = chart.ctx;
            ctx.save();
            ctx.fillStyle = '#36393E';
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
          }
	});
});

export const renderSmallChart = (config) => {
    return smallCanvas.renderToStream(config);
}
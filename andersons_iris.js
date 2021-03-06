const w = undefined;
const h = undefined;
const sw = 100; // specimen width
const sh = 100; // specimen height
const sc = 7; // specimen columns
var svg = undefined;

window.onload = () => work();

function work() {
    console.log("plotting");
    d3.json('iris.json').then(iris => anderson_plot(iris))
}

function anderson_plot(iris) {
    console.log(iris);

    x = d3.scaleLinear()
	.domain([0, 8])
	.range([0, sw]);

    y = d3.scaleLinear()
	.domain([0, 8])
	.range([0, sh]);

    svg = d3.select('#viz').append('svg')
	.attr('width', sw * sc + (sw / 2))
	.attr('height', sh * (iris.length / sc));

    svg.selectAll('rect.sepal')
	.data(iris)
	.enter()
	.append('rect')
	.attr('class', 'sepal')
	.attr('x', (d, i) => ((sw / 2) + (i % sc) * x.range()[1] + (sw / 2) - (x(d['sepal width (cm)']) / 2)))
	.attr('y', (d, i) => sh * Math.floor(i / sc) - y(d['sepal length (cm)']))
	.attr('width', d => x(d['sepal width (cm)']))
	.attr('height', d => y(d['sepal length (cm)']));

    svg.selectAll('rect.petal')
	.data(iris)
	.enter()
	.append('rect')
	.attr('class', 'petal')
	.attr('x', (d, i) => ((sw / 2) + (i % sc) * x.range()[1] + (sw / 2) - (x(d['petal width (cm)']) / 2)))
	.attr('y', (d, i) => sh * Math.floor(i / sc) - y(d['petal length (cm)']))
	.attr('width', d => x(d['petal width (cm)']))
	.attr('height', d => y(d['petal length (cm)']));
}

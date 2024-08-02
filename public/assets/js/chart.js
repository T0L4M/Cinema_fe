//Payment Chart
let ctxbar2 = document.getElementById("paymentChart").getContext("2d");
let barChart2 = new Chart(ctxbar2, {
    type: "bar",
    data: {
        labels: dates,
        datasets: [
            {
                label: "Amount",
                data: amounts,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                precision: 0,
            },
        },
    },
});

//Product Chart
let lineCtx1 = document.getElementById("productChart").getContext("2d");
let lineChart1 = new Chart(lineCtx1, {
    type: "pie",
    data: {
        labels: names,
        datasets: [
            {
                label: "Products Sold",
                data: quantities,
                backgroundColor: [
                    "#fd7f6f",
                    "#7eb0d5",
                    "#b2e061",
                    "#bd7ebe",
                    "#ffb55a",
                    "#ffee65",
                    "#beb9db",
                    "#fdcce5",
                    "#8bd3c7",
                    "#54bebe",
                    "#76c8c8",
                    "#98d1d1",
                    "#badbdb",
                    "#dedad2",
                    "#e4bcad",
                    "#df979e",
                    "#d7658b",
                    "#c80064",
                ],
                hoverOffset: 4,
            },
        ],
    },
    options: {
        responsive: true,
    },
});

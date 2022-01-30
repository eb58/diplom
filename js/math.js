const { complex, add, subtract, multiply, divide, pi } = { ...math }

const DIM = 3;
const i = complex(0, 1)

const range = (n) => [...Array(n).keys()];
const zline = (x, z1, z2) => add(multiply(x, z2), multiply(1 - x, z1))
const zip = (xs, ys, f) => xs.map((x, i) => f ? f(xs[i], ys[i]) : [xs[i], ys[i]])
const csqr = (z) => multiply(z, z)
const v3add = (v1, v2) => zip(v1, v2, (x, y) => x + y)
const transpose = m => m[0].map((x, i) => m.map(x => x[i]))

lineIntegral = (z1, z2, F) => {
    const N = 10
    const dx = 1.0 / N
    let x = 0
    let sum = complex(0, 0)
    for (let i = 0; i < N; i++, x += dx) {
        const kk1 = zline(x, z1, z2)
        const kk2 = zline(x + dx, z1, z2)
        const ff = F(zline(x + dx / 2.0, z1, z2))
        sum = add(sum, multiply(ff, subtract(kk2, kk1)))
    }
    return sum
}

circleGrid = (r1, r2, w1, w2) => {  // Parameterbereich: Kreisring um 0
    const GRIDSIZE_R = 30
    const GRIDSIZE_W = 70

    const xinc = (r2 - r1) / GRIDSIZE_R
    const yinc = (w2 - w1) / GRIDSIZE_W

    const data = [];
    for (let i = 0, x = r1; i <= GRIDSIZE_R; i++, x += xinc) {
        data.push([])
        for (let j = 0, y = w1; j <= GRIDSIZE_W; j++, y += yinc) {
            data[i].push(complex(x * Math.cos(y), x * Math.sin(y)))
        }
    }
    return data
}

const evalWeierstrass = (grid, f, g) => {
    const Phi1 = (z) => {
        const ff = multiply(0.5, f(z))
        const gg = g(z)
        return multiply(ff, subtract(1, csqr(gg)))
    }
    const Phi2 = (z) => {
        const ff = multiply(0.5, f(z))
        const gg = g(z)
        return multiply(i, multiply(ff, add(1, csqr(gg))));
    }
    const Phi3 = (z) => multiply(f(z), g(z))

    const weierstrass = (za, ze, Phi1, Phi2, Phi3) => [
        lineIntegral(za, ze, Phi1).re,
        lineIntegral(za, ze, Phi2).re,
        lineIntegral(za, ze, Phi3).re,
    ]

    const data = Array(grid.length).fill(0).map(() => Array(grid[0].length).fill([0, 0, 0]))
    for (let i = 0; i < grid.length - 1; i++) { // Integration entlang Kreisbogen
        const gridRow = grid[i], dataX = data[i]
        for (let j = 0; j < gridRow.length - 1; j++) {
            const v = weierstrass(gridRow[j], gridRow[j + 1], Phi1, Phi2, Phi3)
            dataX[j + 1] = v3add(dataX[j], v)
        }
    }
    return data;
}
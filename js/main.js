const catenoid = (a) => {
    // g = z => z
    // f = z => -2/z*z 
    const g = z => z
    const f = z => divide(2, csqr(z))
    const grid = circleGrid(1, a, 0, Math.PI)
    return evalWeierstrass(grid, f, g);
}

const diplomBeispiel1 = (a) => {
    // g = z => z*z*(z-1)/(z+1);
    // f = z => -i*(z+1)*(z+1)/(z*z*z*z); 
    const g = z => divide(multiply(csqr(z), subtract(z, 1)), add(z, 1));
    const f = z => multiply(complex(0, -1), divide(csqr(add(z, 1)), csqr(csqr(z))))
    const grid = circleGrid(1 / a, a, 0, Math.PI)
    return evalWeierstrass(grid, f, g);
}

/*
// Bsp. 1
const double xx1 = 0.6; 
Grid3D gr1( xx1, 1/xx1, 0, M_PI );
complex g1(complex &z){ return z*z*(z-1)/(z+1); }
complex f1(complex &z){ return complex(0,-1)*(z+1)*(z+1)/(z*z*z*z); }

// Bsp. 2
const double xx2 = 0.7; 
Grid3D gr2( xx2, 1/xx2, 0, M_PI);
complex g2(complex &z){ complex z2=z*z, z3=z2*z; return z2*(z3-1)/(z3+1); }
complex f2(complex &z){	complex z3=z*z*z; return i*(z3+1)*(z3+1)/sqr(z3); }

// Bsp. 3
const double xx3 = 0.8; 
Grid3D gr3( xx3, 1/xx3, 0, M_PI);
complex g3(complex &z){
    complex Z  = z*z*z*(z-1)*(z-i);
    complex N  = (z+1)*(z+i);
    return Z/N;
}
complex f3(complex &z){ complex z3= z*z*z; return sqr(z+1)*sqr(z+i)/sqr(z3); }

// Bsp. 4
const double xx4 = 0.9; 
Grid3D gr4( xx4, 1/xx4, 0, M_PI*2 );
complex g4(complex &z){
    complex Z = z*z*z*(z-1);
    complex N = (z+1);
    return Z/N;
}
complex f4(complex &z){ return sqr(z+1)/(z*z*z*z*z); }

*/
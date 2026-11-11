import createM1 from './module1.mjs';
import createM2 from './module2.mjs';
import module3 from './module3.mjs';
import module4 from './module4.mjs';

try {
    const module2 = createM2(module4);
    const module1 = createM1(module2, module3);
    
    module1.printAll();
} catch (err) {
    console.error(err);
}
